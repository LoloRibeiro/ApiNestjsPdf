import { Controller, Get, UploadedFile, UseInterceptors, Res} from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { DataService } from '../../services/data/data.service';
import { Response } from 'express';
import { fileURLToPath } from 'url';

@Controller('data')
export class DataController {
    //Construction of dataService
    constructor( private readonly dataService: DataService) {}

    //Root "data/text" take a file in parameters and return the text of the file
    @Get('text')
    @UseInterceptors(FileInterceptor('file'))
    async sendTextPdf(@UploadedFile() file, @Res() res: Response) {
        const textPdf = await this.dataService.getTextFromPdf(file.buffer);
        res.send({textPdf}); 
    };

    //Root "data/numpage" take the number of page in a file pdf
    @Get('numpage')
    @UseInterceptors(FileInterceptor('file'))
    async sendNumPagePdf(@UploadedFile() file, @Res() res: Response) {
        const numPagePdf = await this.dataService.getNumPagePdf(file.buffer);
        res.send({numPagePdf});
    }
}
