import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { RequestedHelp } from './entity/requestedHelp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRequestedHelpDto } from './dto/createRequestedHelpDto';
import { IRequestedHelpsService } from './interfaces/requestedHelps-service.interface';
import { User } from '../users/entity/user.entity';
import { IPusherService } from '../pusher/interfaces/pusher-service.interface';
import {ConfirmHelpDto} from "./dto/confirmHelpDto";

@Injectable()
export class RequestedHelpsService implements IRequestedHelpsService {
    constructor(
        @InjectRepository(RequestedHelp)
        private readonly requestedHelpsRepository: Repository<RequestedHelp>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @Inject('PusherService') private readonly pusherService: IPusherService,
    ) {}

    async findById(id: string): Promise<RequestedHelp> {
        return await this.requestedHelpsRepository.findOne(id);
    }

    async findOne(query: object): Promise<RequestedHelp> {
        return await this.requestedHelpsRepository.findOne(query);
    }

    async create(createRequestedHelpDto: CreateRequestedHelpDto): Promise<RequestedHelp | HttpException> {
        const { userId } = createRequestedHelpDto;
        const user = await this.usersRepository.findOne(userId);

        if(!user) {
            throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
        }

        const requestedHelp: Partial<RequestedHelp> = {
            coordinates: createRequestedHelpDto.coordinates,
            user,
        };

        await this.pusherService.requestHelp(requestedHelp, createRequestedHelpDto.channel);

        return await this.requestedHelpsRepository.save(requestedHelp as RequestedHelp);
    }

    async confirmRequestedHelp(confirmHelpDto: ConfirmHelpDto): Promise<void> {
        await this.pusherService.confirmHelp(confirmHelpDto);
    }
}
