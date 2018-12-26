import {
    Controller,
    Response,
    HttpStatus,
    Param,
    Body,
    Post,
    Put,
    UsePipes,
    ValidationPipe, Inject,
} from '@nestjs/common';
import { CreatePrescriptionDto} from './dto/createPrescription.dto';
import {IPrescriptionsService} from "./interfaces/prescriptions-service.interface";

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

}
