/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { WebsiteIdeaService } from '../services/create-website.service';
import {
  CreateWebsiteIdeaDto,
  UpdateWebsiteIdeaDto,
} from '../dto/create-website.dto';

// This class handles requests to /api/website-ideas
@Controller('api/website-ideas')
export class WebsiteIdeaController {
  // This is a special function that runs when the class is created
  constructor(private readonly websiteIdeaService: WebsiteIdeaService) {}

  @Post() // method handles POST requests
  //adds validation to check incoming data is correct
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createWebsiteIdeaDto: CreateWebsiteIdeaDto) {
    //@Body() gets the data sent in the request body
    // The data must match the CreateWebsiteIdeaDto format
    try {
      const result = await this.websiteIdeaService.create(createWebsiteIdeaDto);
      return {
        success: true,
        data: result,
        message: 'Website idea created successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to create website idea',
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get() //handles GET requests to get all website
  async findAll() {
    try {
      const result = await this.websiteIdeaService.findAll();
      return {
        success: true,
        data: result,
        message: 'Website ideas retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to retrieve website ideas',
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get(':id') //GET requests with an ID parameter
  async findOne(@Param('id') id: string) {
    //@Param('id') gets the ID from the URL, The ID is stored as a string
    try {
      const result = await this.websiteIdeaService.findOne(id);
      return {
        success: true,
        data: result,
        message: 'Website idea retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to retrieve website idea',
        statusCode: error.status || HttpStatus.NOT_FOUND,
      };
    }
  }
  // used in feature to update a website idea
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateWebsiteIdeaDto: UpdateWebsiteIdeaDto, //Validates the update data
  ) {
    try {
      const result = await this.websiteIdeaService.update(
        id,
        updateWebsiteIdeaDto,
      );
      return {
        success: true,
        data: result,
        message: 'Website idea updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to update website idea',
        statusCode: error.status || HttpStatus.NOT_FOUND,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.websiteIdeaService.remove(id);
      return {
        success: true,
        message: 'Website idea deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to delete website idea',
        statusCode: error.status || HttpStatus.NOT_FOUND,
      };
    }
  }
}
