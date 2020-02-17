import { Injectable } from '@nestjs/common';
import {PDFExtract, PDFExtractOptions, PDFExtractResult} from 'pdf.js-extract';

@Injectable()
export class CvService {

    parsePdfInfo = async (data : PDFExtractResult ) => {
        for (let i = 0 ; i < data.pages.length; i++) {
            //We sort the elements according to their position in y
            data.pages[i].content.sort(function (a, b) {
                return a.y - b.y;
            });
            data.pages[i].content.forEach(element => {
                element.str = element.str.trim();
                //We round the x and y positions of each element
                element.x = Math.round(element.x);
                element.y = Math.round(element.y);
                //We remove the empty string and the string fills with space
                if (element.str === ' ' || element.str === '') {
                    data.pages[i].content.splice(data.pages[i].content.indexOf(element), 1);
                }
            });
        }
        return (data);
    }

    findEndOfPartS = async (data : PDFExtractResult, x: number, y: number, height: number, p: number) => {

        let end = data.pages[p].pageInfo.height;

            for (let i = 0; i < data.pages[p].content.length; i++) {
                if (data.pages[p].content[i].x >= x
                    && data.pages[p].content[i].x <= data.pages[p].pageInfo.width / 3
                    && Math.round(data.pages[p].content[i].y) > y
                    && data.pages[p].content[i].height == height ) {
                        end = data.pages[p].content[i].y;
                        break;
                    }
            };
            return (end);
        }

    createPartS = async (data : PDFExtractResult, x: number, y: number, height: number, p: number, end : number) => {
        let part = [];
        data.pages[p].content.forEach(element => {
            if (element.x >= x && element.y >= y && element.y < end && element.x <= data.pages[p].pageInfo.width / 3) {
                part.push(element.str);
            }
        });
        console.log(part);
        return (part);
    }

    findEndOfPartXL = async (data : PDFExtractResult, x: number, y: number, height: number, p: number) => {

        let end = data.pages[p].pageInfo.height;
    
        for (let i = 0; i < data.pages[p].content.length; i++) {
            if (data.pages[p].content[i].x >= x
                && Math.round(data.pages[p].content[i].y) > y
                && data.pages[p].content[i].height == height ) {
                end = data.pages[p].content[i].y;
                    break;
                }
            };
            return (end);
        }


     createPartXL = async (data : PDFExtractResult, x: number, y: number, height: number, p: number, end : number) => {
        let part = [];
        data.pages[p].content.forEach(element => {
            if (element.x >= x && element.y >= y && element.y < end) {
                part.push(element.str);
            }
        });
        console.log(part);
        return (part);
    }


    getExperienceFromCv = async (filePath: string) => {
        let height = 0;
        let partX = 0;
        let partY = 0;
        let partPage = 0;
        let partEnd = 0;
        const pdfExtract = new PDFExtract();
        const options: PDFExtractOptions = {};
        return (pdfExtract.extract(filePath, options)
        .then(async data => {
            data = await this.parsePdfInfo(data);
            for (let i = 0 ; i < data.pages.length; i++) {
                data.pages[i].content.forEach( element => {
            if ((element.str.toLowerCase()).trim() == "expériences professionnelles" 
                || (element.str.toLowerCase()).trim() == "expériences" 
                || (element.str.toLowerCase()).trim() == "experience" 
                || (element.str.toLowerCase()).trim() == "work experience"){
                partX = Math.round(element.x) - 3;
                partY = Math.round(element.y);
                height = element.height;
                partPage = i;
                }
            });
            }
            if (partX === 0 && partY === 0 && height === 0 && partPage === 0) {
                return (null)
            }
            if (partX < (data.pages[partPage].pageInfo.width / 3)) {
                partEnd = await this.findEndOfPartS(data, partX, partY, height,partPage);
                return (await this.createPartS(data, partX, partY, height, partPage, partEnd));
            } else {
                partEnd = await this.findEndOfPartXL(data, partX, partY, height,partPage);
                return (await this.createPartXL(data, partX, partY, height, partPage, partEnd));
            }
        }) .catch(function(error) {
            return null;
        })
    )
}}