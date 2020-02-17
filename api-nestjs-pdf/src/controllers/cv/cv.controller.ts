import { Controller, Get, UploadedFile, UseInterceptors, Res, HttpException} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataService } from '../../services/data/data.service';
import { Response } from 'express';
import { CvService } from 'src/services/cv/cv.service';

@Controller('cv')
export class CvController {

    constructor( private readonly dataService: DataService, private readonly cvService: CvService) {}

    /**
     * Root : cv/experience
     * Return value type : response (contain a status code and the informations about the language)
     * Error code : 502 
     * Sucess code : 200
     */
    @Get('experience')
    @UseInterceptors(FileInterceptor('file'))
    async sendExperienceFromCv(@UploadedFile() file, @Res() res: Response) {
        const experienceFromPdf = await this.cvService.getExperienceFromCv(file.path);
        if (experienceFromPdf === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        return res.status(200).send({experienceFromPdf});
    }


    /**
     * Root : cv/personal-information
     * Return value type : response (contain a status code and the informations about the language)
     * Error code : 502 
     * Sucess code : 200
     */
    @Get('personal-information')
    @UseInterceptors(FileInterceptor('file'))
    async sendInformationPersonnelFromCv(@UploadedFile() file, @Res() res: Response) {
        const infoPersoFromPdf = await this.cvService.getInfoPersoFromCv(file.path);
        if (infoPersoFromPdf === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        return res.status(200).send({infoPersoFromPdf});
    }

     /**
     * Root : cv/associative-experience
     * Return value type : response (contain a status code and the informations about the language)
     * Error code : 502 
     * Sucess code : 200
     */
    @Get('associative-experience')
    @UseInterceptors(FileInterceptor('file'))
    async sendAssociativeExperienceFromCv(@UploadedFile() file, @Res() res: Response) {
        const associationXpFromPdf= await this.cvService. getAssociativeExperienceFromCv(file.path);
        if (associationXpFromPdf === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        return res.status(200).send({associationXpFromPdf});
    }

     /**
     * Root : cv/language
     * Return value type : response (contain a status code and the informations about the language)
     * Error code : 502 
     * Sucess code : 200
     */
    @Get('language')
    @UseInterceptors(FileInterceptor('file'))
    async sendLanguageFromCv(@UploadedFile() file, @Res() res: Response) {
        const languageFromPdf = await this.cvService.getLanguageFromCv(file.path);
        if (languageFromPdf === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        return res.status(200).send({languageFromPdf});
    }

    /**
     * Root : cv/formation
     * Return value type : response (contain a status code and the informations about the formation)
     * Error code : 502 
     * Sucess code : 200
     */
    @Get('formation')
    @UseInterceptors(FileInterceptor('file'))
    async sendFormationFromCv(@UploadedFile() file, @Res() res: Response) {
        const formationFromCv = await this.cvService.getFormationFromCv(file.path);
        if (formationFromCv === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        return res.status(200).send({formationFromCv});
    }

    /**
     * Root : cv/hobbies
     * Return value type : response (contain a status code and the informations about hobbies)
     * Error code : 502 
     * Sucess code : 200
     */
    @Get('hobbies')
    @UseInterceptors(FileInterceptor('file'))
    async sendHobbiesFromCv(@UploadedFile() file, @Res() res: Response) {
        const hobbiesFromCv= await this.cvService.getHobbiesFromCv(file.path);
        if (hobbiesFromCv === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        return res.status(200).send({hobbiesFromCv});
    }

    /**
     * Root : cv/description
     * Return value type : response (contain a status code and a short description)
     * Error code : 502 
     * Sucess code : 200
     */
    @Get('description')
    @UseInterceptors(FileInterceptor('file'))
    async sendDescriptionFromCv(@UploadedFile() file, @Res() res: Response) {
        const descriptionFromCv = await this.cvService.getDescriptionFromCv(file.path);
        if (descriptionFromCv === null) {
            throw new HttpException("Invalid Argument", 502);
        }
        return res.status(200).send({descriptionFromCv});
    }
}
