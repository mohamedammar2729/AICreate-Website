/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import {
  WebsiteIdea,
  WebsiteIdeaDocument,
} from '../schemas/create-website.schema';
import {
  CreateWebsiteIdeaDto,
  UpdateWebsiteIdeaDto,
} from '../dto/create-website.dto';
import { ConfigService } from '@nestjs/config';
import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';

@Injectable()
export class WebsiteIdeaService {
  constructor(
    @InjectModel(WebsiteIdea.name)
    private websiteIdeaModel: Model<WebsiteIdeaDocument>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  //function that creates new website ideas. It takes data and returns a promise of a website idea.
  async create(
    createWebsiteIdeaDto: CreateWebsiteIdeaDto,
  ): Promise<WebsiteIdea> {
    try {
      // Calls AI to generate website sections based on the user's idea and waits for the result.
      const sections = await this.generateSectionsWithAI(
        createWebsiteIdeaDto.idea,
      );
      // Creates a new website idea object
      const createdIdea = new this.websiteIdeaModel({
        idea: createWebsiteIdeaDto.idea,
        userId: createWebsiteIdeaDto.userId || 'anonymous',
        sections,
        status: 'completed',
      });
      //Saves the new idea to the database and returns it
      return createdIdea.save();
    } catch (error) {
      console.error('Error creating website idea:', error);
      throw new HttpException(
        'Failed to create website idea',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //gets all website ideas from database, sorted by newest first
  async findAll(): Promise<WebsiteIdea[]> {
    return this.websiteIdeaModel.find().sort({ createdAt: -1 }).exec();
  }
  //finds one specific website idea by its ID
  async findOne(id: string): Promise<WebsiteIdea> {
    const idea = await this.websiteIdeaModel.findById(id).exec();
    if (!idea) {
      throw new HttpException('Website idea not found', HttpStatus.NOT_FOUND);
    }
    return idea;
  }
  // will be used in feature to update website ideas
  async update(
    id: string,
    updateWebsiteIdeaDto: UpdateWebsiteIdeaDto,
  ): Promise<WebsiteIdea> {
    const updatedIdea = await this.websiteIdeaModel
      .findByIdAndUpdate(id, updateWebsiteIdeaDto, { new: true })
      .exec();

    if (!updatedIdea) {
      throw new HttpException('Website idea not found', HttpStatus.NOT_FOUND);
    }

    return updatedIdea;
  }

  async remove(id: string): Promise<void> {
    const result = await this.websiteIdeaModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpException('Website idea not found', HttpStatus.NOT_FOUND);
    }
  }

  // private function that uses AI to generate website sections based on an idea
  private async generateSectionsWithAI(idea: string): Promise<any[]> {
    try {
      const githubToken = this.configService.get<string>('GITHUB_TOKEN');

      if (!githubToken) {
        console.warn('GitHub token not found, falling back to dummy data');
        return this.generateFallbackSections(idea);
      }

      const endpoint = 'https://models.github.ai/inference';
      const model = 'openai/gpt-4.1'; // Using the correct OpenAI GPT-4.1 model

      // Creates a connection to the AI service using the GitHub token
      const client = ModelClient(endpoint, new AzureKeyCredential(githubToken));

      const prompt = `You are an AI web designer with unlimited creative freedom. Create a complete landing page for: "${idea}".
      
You have ZERO constraints. Design everything from scratch:
- Choose ANY color scheme that fits the topic
- Pick ANY fonts and typography style  
- Create ANY layout structure you want
- Use ANY content tone (playful, serious, minimal, bold, etc.)
- Design ANY visual style (modern, vintage, artistic, corporate, fun, etc.)
- Include ANY sections you think are needed
- Write ALL content yourself based on the topic

Generate 1 complete HTML landing page in this JSON format:
[
  {
    "name": "AI Generated Landing Page",
    "description": "Complete creative landing page",
    "content": "your_complete_html_page_here",
    "order": 1
  }
]

Rules:
- Base EVERYTHING on the topic: "${idea}"
- Use your creativity to decide style, colors, layout, content
- Make it a complete HTML page with CSS
- Include CDN links for any CSS frameworks you want
- Write realistic content for the topic
- Make it professional and conversion-focused
- No restrictions on design choices

Return ONLY the JSON array, nothing else.`;

      const response = await client.path('/chat/completions').post({
        body: {
          messages: [
            {
              role: 'system',
              content:
                'You are an expert web designer and copywriter specializing in high-converting landing pages. Generate beautiful, modern website sections with professional Tailwind CSS styling. You must return ONLY valid JSON with no additional formatting or text.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 6000,
          model: model,
        },
      });

      if (isUnexpected(response)) {
        console.error('AI API Error:', response.body.error);
        return this.generateFallbackSections(idea);
      }

      const aiContent = response.body.choices[0]?.message?.content;

      if (!aiContent) {
        console.warn('No content received from AI, using fallback');
        return this.generateFallbackSections(idea);
      }

      console.log('AI Response received:', aiContent.substring(0, 200) + '...');

      // Try to parse AI response as JSON
      try {
        // Clean the response - remove any markdown formatting
        let cleanedContent = aiContent.replace(/```json\n?|\n?```/g, '').trim();

        // Handle cases where the AI might wrap in other markdown
        if (cleanedContent.startsWith('```')) {
          cleanedContent = cleanedContent
            .replace(/```[\w]*\n?|\n?```/g, '')
            .trim();
        }

        // Finds and extracts JSON array from the cleaned response
        const jsonMatch = cleanedContent.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          cleanedContent = jsonMatch[0];
        }
        // Converts the cleaned text into a JavaScript object/array
        const sections = JSON.parse(cleanedContent) as any[];

        // Validate the response structure
        if (Array.isArray(sections) && sections.length > 0) {
          console.log(
            `Successfully generated ${sections.length} sections with AI`,
          );
          return sections.map((section: any, index: number) => ({
            name: String(section['name'] || `Section ${index + 1}`),
            description: String(
              section['description'] || 'AI Generated section',
            ),
            content: String(
              section['content'] ||
                '<div class="p-8 text-center">AI Generated Content</div>',
            ),
            order: Number(section['order'] || index + 1),
          }));
        } else {
          console.warn('AI response is not a valid array, using fallback');
          return this.generateFallbackSections(idea);
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        console.log('Raw AI response:', aiContent);
        return this.generateFallbackSections(idea);
      }
    } catch (error) {
      console.error('AI generation failed:', error);
      return this.generateFallbackSections(idea);
    }
  }

  private generateFallbackSections(idea: string): any[] {
    // Simple fallback - let AI decide everything based on the topic
    return [
      {
        name: 'AI Generated Page',
        description: 'Complete landing page generated by AI',
        content: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${this.capitalizeWords(idea)}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
              body { font-family: 'Inter', sans-serif; }
            </style>
          </head>
          <body>
            <div class="min-h-screen bg-gray-50 flex items-center justify-center">
              <div class="max-w-4xl mx-auto p-8 text-center">
                <h1 class="text-5xl font-bold text-gray-900 mb-6">
                  ${this.capitalizeWords(idea)}
                </h1>
                <p class="text-xl text-gray-600 mb-8">
                  Welcome to the future of ${idea.toLowerCase()}. Experience innovation and excellence in every interaction.
                </p>
                <button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </body>
          </html>
        `,
        order: 1,
      },
    ];
  }

  private capitalizeWords(str: string): string {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
