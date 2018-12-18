import {
    Controller,
    Response,
    HttpStatus,
    Param,
    Body,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto} from './dto/createPrescription.dto';

@Controller('prescriptions')
export class PrescriptionsController {
    constructor(private readonly prescriptionsService: PrescriptionsService) { }

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
