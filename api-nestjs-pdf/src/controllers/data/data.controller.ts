import { Controller, Get, UploadedFile, UseInterceptors, Res, HttpException, Post} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from '../../services/data/data.service';
import { Response } from 'express';
import {PDFExtract, PDFExtractOptions} from 'pdf.js-extract';
import { MulterModule } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { CvService } from 'src/services/cv/cv.service';



@Controller('data')
export class DataController {

    //Construction of dataService
    constructor( private readonly dataService: DataService, private readonly cvService: CvService) {}
    /**
     * Root : data/text
     * 
     */
    @Get('text')
    @UseInterceptors(FileInterceptor('file'))
    async sendTextPdf(@UploadedFile() file, @Res() res: Response) {
        const textPdf = await this.dataService.getTextFromPdf(file.buffer);
        if (textPdf === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        res.status(200).send({textPdf});
    }

    //Root "data/numpage" take a file (pdf) in parameter and return the number of page
    @Get('numpage')
    @UseInterceptors(FileInterceptor('file'))
    async sendNumPagePdf(@UploadedFile() file, @Res() res: Response) {
        const numPagePdf = await this.dataService.getNumPagePdf(file.buffer);
        if (numPagePdf === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        res.status(200).send({numPagePdf});
    }

    //Root "data/info" take a file (pdf) in parameter and return some information about the file
    @Get('info')
    @UseInterceptors(FileInterceptor('file'))
    async sendInfoPdf(@UploadedFile() file, @Res() res: Response) {
        const infoPdf = await this.dataService.getInfoPdf(file.buffer);
        if (infoPdf === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        res.status(200).send({infoPdf});
    }
}
