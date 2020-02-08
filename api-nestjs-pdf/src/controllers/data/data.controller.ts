import { Controller, Get, UploadedFile, UseInterceptors, Res} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from '../../services/data/data.service';
import { Response } from 'express';

@Controller('data')
export class DataController {
    //Construction of dataService
    constructor( private readonly dataService: DataService) {}

    //Root "data/text" take a file in parameters and return the text of the file
    @Get('text')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Res() res: Response) {
        const textPdf = await this.dataService.getTextFromPdf(file.buffer);
        res.send({textPdf}); 
    };
}
