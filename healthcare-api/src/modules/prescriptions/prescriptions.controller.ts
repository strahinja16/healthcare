import {
    Controller,
    Response,
    HttpStatus,
    Param,
    Body,
    Post,
    Put,
    UsePipes,
    ValidationPipe, Inject, Get, HttpException,
} from '@nestjs/common';
import { CreatePrescriptionDto} from './dto/createPrescription.dto';
import {IPrescriptionsService} from "./interfaces/prescriptions-service.interface";
import {Broker} from '../moleculer/broker';

@Controller('prescriptions')
export class PrescriptionsController {
    private readonly prescriptionsService: IPrescriptionsService;

    constructor(@Inject('IPrescriptionsService') prescriptionsService: IPrescriptionsService) {
        this.prescriptionsService = prescriptionsService;
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createPrescription(@Response() res, @Body() createPrescriptionDto: CreatePrescriptionDto) {
        const prescription = await this.prescriptionsService.create(createPrescriptionDto);
        return res.status(HttpStatus.OK).json(prescription);
    }

    @Put('/:id')
    public async updatePrescription(@Param() param, @Response() res, @Body() body) {
        const prescription = await this.prescriptionsService.update(param.id, body);
        return res.status(HttpStatus.OK).json(prescription);
    }

    @Get('/disease/search/:like')
    public async getDiseasesNameLike(@Param() param, @Response() res, @Body() body) {
        const diseases = await Broker.getDiseasesNameLike(param.like);
        return res.status(HttpStatus.OK).json(diseases);
    }

    @Get('/disease/:name/medications')
    public async getMedicationsForDisease(@Param() param, @Response() res, @Body() body) {
        const medications = await Broker.getMedicationsForDisease(param.name);
        return res.status(HttpStatus.OK).json(medications);
    }

    @Get('/disease/:name')
    public async getDisease(@Param() param, @Response() res, @Body() body) {
        const disease = await Broker.getDisease(param.name);

        if(!disease) {
            throw new HttpException('Not found.', HttpStatus.BAD_REQUEST);
        }

        return res.status(HttpStatus.OK).json(disease);
    }

    @Get('/side-effects/:drugName')
    public async getSideEffectsForDrug(@Param() param, @Response() res, @Body() body) {
        const sideEffects = await Broker.getSideEffectsForDrug(param.drugName);

        if(!sideEffects) {
            throw new HttpException('Not found.', HttpStatus.BAD_REQUEST);
        }

        return res.status(HttpStatus.OK).json(sideEffects);
    }

}
