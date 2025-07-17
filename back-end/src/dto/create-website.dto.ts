import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateWebsiteIdeaDto {
  @IsNotEmpty()
  @IsString()
  idea: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

export class WebsiteSectionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  order: number;
}

export class UpdateWebsiteIdeaDto {
  @IsOptional()
  @IsString()
  idea?: string;

  @IsOptional()
  @IsArray()
  sections?: WebsiteSectionDto[];

  @IsOptional()
  @IsString()
  status?: string;
}
