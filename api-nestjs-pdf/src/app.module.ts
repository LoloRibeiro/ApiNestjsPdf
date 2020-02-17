import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataController } from './controllers/data/data.controller';
import { DataService } from './services/data/data.service';
import { CvController } from './controllers/cv/cv.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CvService } from './services/cv/cv.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [AppController, DataController, CvController],
  providers: [AppService, DataService, CvService],
})
export class AppModule {}
