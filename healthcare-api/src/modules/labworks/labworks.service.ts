import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Labwork} from "./entity/labwork.entity";
import {InjectRepository} from '@nestjs/typeorm';
import {CreateLabworkDto} from "./dto/createLabworkDto";
import {ILabworksService} from "./interfaces/labworks-service.interface";
import * as path from "path";
import {User} from "../users/entity/user.entity";
import * as fs from "fs";

@Injectable()
export class LabworksService implements ILabworksService{
    constructor(
        @InjectRepository(Labwork)
        private readonly labworksRepository: Repository<Labwork>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findById(id: string): Promise<Labwork> {
        return await this.labworksRepository.findOne(id);
    }

    async findOne(query: object): Promise<Labwork> {
        return await this.labworksRepository.findOne(query);
    }

    async create(file: any, createLabworkDto: CreateLabworkDto): Promise<Labwork | HttpException> {
        const { userId, analysis } = createLabworkDto;
        const user = await this.usersRepository.findOne(userId);

        if(!user) {
            throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
        }

        const labwork: Partial<Labwork> = {
            analysis,
            fileName: file.filename,
            originalName: file.originalname,
            user,
        };

        return await this.labworksRepository.save(labwork as Labwork);
    }

    async getLabworkFile(id: string): Promise<string | HttpException> {
        const labwork = await this.findById(id);

        if(!labwork) {
            throw new HttpException('Labwork does not exist', HttpStatus.BAD_REQUEST);
        }

        return path.join(__dirname, '../../../uploads', labwork.fileName);
    }

    async deleteLabwork(id: string): Promise<void | HttpException> {
        const file = await this.getLabworkFile(id);

        if (typeof file !== 'string') {
           throw new HttpException('Labwork or file does not exist', HttpStatus.BAD_REQUEST);
        }

        await fs.unlink(file, (err) => {
            if (err) {
                throw new HttpException(`Labwork file deletion failed. Error: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });

        await this.labworksRepository.delete(id);
    }
}
