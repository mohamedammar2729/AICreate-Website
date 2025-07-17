import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsiteIdeaController } from './controllers/create-website.controller';
import { WebsiteIdeaService } from './services/create-website.service';
import {
  WebsiteIdea,
  WebsiteIdeaSchema,
} from './schemas/create-website.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: WebsiteIdea.name, schema: WebsiteIdeaSchema },
    ]),
    HttpModule,
  ],
  controllers: [AppController, WebsiteIdeaController],
  providers: [AppService, WebsiteIdeaService],
})
export class AppModule {}
