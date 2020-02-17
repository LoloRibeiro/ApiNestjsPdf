import { Controller, Get, UploadedFile, UseInterceptors, Res, HttpException} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from '../../services/data/data.service';
import { Response } from 'express';
import { CvService } from 'src/services/cv/cv.service';

@Controller('cv')
export class CvController {
    constructor( private readonly dataService: DataService, private readonly cvService: CvService) {}

    @Get('experience')
    @UseInterceptors(FileInterceptor('file'))
    async test(@UploadedFile() file, @Res() res: Response) {
        const experienceFromPdf = await this.cvService.getExperienceFromCv(file.path);
        if (experienceFromPdf === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        return res.status(200).send({experienceFromPdf});
    }
}
