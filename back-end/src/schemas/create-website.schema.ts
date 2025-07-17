import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebsiteIdeaDocument = WebsiteIdea & Document;

@Schema({ timestamps: true })
export class WebsiteIdea {
  @Prop({ required: true })
  idea: string;

  @Prop({ required: false, default: 'anonymous' })
  userId?: string; // Optional for now, can be expanded later

  @Prop([
    // creates an array (list) of website sections
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      content: { type: String, required: true },
      order: { type: Number, required: true },
    },
  ])
  sections: {
    name: string;
    description: string;
    content: string;
    order: number;
  }[];

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

// This takes our WebsiteIdea class and turns it into a MongoDB schema that can be used in the database
export const WebsiteIdeaSchema = SchemaFactory.createForClass(WebsiteIdea);
