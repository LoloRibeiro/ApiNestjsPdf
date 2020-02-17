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
     * Return value type : response (contain a status code and the text of the pdf)
     * Error code : 502 
     * Sucess code : 200
     */
    @Get('text')
    @UseInterceptors(FileInterceptor('file'))
    async sendTextPdf(@UploadedFile() file, @Res() res: Response) {
        console.log(file);
        const textPdf = await this.dataService.getTextFromPdf(file.path);
        if (textPdf === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        res.status(200).send({textPdf});
    }

     /**
     * Root : data/numpage
     * Return value type : response (contain a status code and the number of page in the pdf)
     * Error code : 502 
     * Sucess code : 200
     */
    @Get('numpage')
    @UseInterceptors(FileInterceptor('file'))
    async sendNumPagePdf(@UploadedFile() file, @Res() res: Response) {
        const numPagePdf = await this.dataService.getNumPagePdf(file.path);
        if (numPagePdf === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        res.status(200).send({numPagePdf});
    }

    /**
     * Root : data/info
     * Return value type : response (contain a status code and some information about pdf (pdf version ...))
     * Error code : 502 
     * Sucess code : 200
     */
    @Get('info')
    @UseInterceptors(FileInterceptor('file'))
    async sendInfoPdf(@UploadedFile() file, @Res() res: Response) {
        const infoPdf = await this.dataService.getInfoPdf(file.path);
        if (infoPdf === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        res.status(200).send({infoPdf});
    }
}
