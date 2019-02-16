import {
    Body,
    Controller, Delete,
    FileInterceptor,
    Get,
    HttpStatus, Inject, Param,
    Post,
    Response,
    UploadedFile,
    UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import {ILabworksService} from './interfaces/labworks-service.interface';
import {CreateLabworkDto} from "./dto/createLabworkDto";

@Controller('labworks')
export class LabworksController {
    private readonly labworksService: ILabworksService;

    constructor(@Inject('LabworksService') labworksService: ILabworksService) {
        this.labworksService = labworksService;
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', { dest: 'uploads/'}))
    @UsePipes(new ValidationPipe())
    public async createLabworks(@UploadedFile() file, @Body() body: CreateLabworkDto,  @Response() res) {
        const labwork = await this.labworksService.create(file, body);
        return res.status(HttpStatus.OK).json(labwork);
    }

    @Get('/:id/file')
    public async getLabworkFile(@Param() param, @ Response() res) {
        const file = await this.labworksService.getLabworkFile(param.id);
        return res.status(HttpStatus.OK).download(file);
    }

    @Delete('/:id')
    public async deleteLabwork(@Param() param, @Response() res) {
        await this.labworksService.deleteLabwork(param.id);
        return res.status(HttpStatus.OK).json(param.id);
    }
}

