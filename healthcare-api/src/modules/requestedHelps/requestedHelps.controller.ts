import {
    Body,
    Controller,
    HttpStatus, Inject,
    Post,
    Response,
    UsePipes, ValidationPipe
} from '@nestjs/common';
import { IRequestedHelpsService } from './interfaces/requestedHelps-service.interface';
import { CreateRequestedHelpDto } from './dto/createRequestedHelpDto';

@Controller('request-help')
export class RequestedHelpsController {
    private readonly requestedHelpsService: IRequestedHelpsService;

    constructor(@Inject('RequestedHelpsService') requestedHelpsService: IRequestedHelpsService) {
        this.requestedHelpsService = requestedHelpsService;
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createRequestHelp(@Body() body: CreateRequestedHelpDto,  @Response() res) {
        const requestHelp = await this.requestedHelpsService.create(body);
        return res.status(HttpStatus.OK).json(requestHelp);
    }
}

