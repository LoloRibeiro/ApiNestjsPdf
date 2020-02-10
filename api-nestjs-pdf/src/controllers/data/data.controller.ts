import { Controller, Get, UploadedFile, UseInterceptors, Res} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from '../../services/data/data.service';
import { Response } from 'express';

@Controller('data')
export class DataController {

    //Construction of dataService
    constructor( private readonly dataService: DataService) {}

    //Root "data/text" take a file (pdf) in parameter and return the text of the file
    @Get('text')
    @UseInterceptors(FileInterceptor('file'))
    async sendTextPdf(@UploadedFile() file, @Res() res: Response) {
        const textPdf = await this.dataService.getTextFromPdf(file.buffer);
        res.send({textPdf}); 
    };

    //Root "data/numpage" take a file (pdf) in parameter and return the number of page
    @Get('numpage')
    @UseInterceptors(FileInterceptor('file'))
    async sendNumPagePdf(@UploadedFile() file, @Res() res: Response) {
        const numPagePdf = await this.dataService.getNumPagePdf(file.buffer);
        res.send({numPagePdf});
    }

    //Root "data/info" take a file (pdf) in parameter and return some information about the file
    @Get('info')
    @UseInterceptors(FileInterceptor('file'))
    async sendInfoPdf(@UploadedFile() file, @Res() res: Response) {
        const infoPdf = await this.dataService.getInfoPdf(file.buffer);
        res.send({infoPdf});
    }
}
