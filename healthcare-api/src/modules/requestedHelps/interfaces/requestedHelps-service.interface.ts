import { RequestedHelp } from "../entity/requestedHelp.entity";
import { CreateRequestedHelpDto } from "../dto/createRequestedHelpDto";
import { HttpException } from "@nestjs/common";
import {ConfirmHelpDto} from "../dto/confirmHelpDto";

export interface IRequestedHelpsService {
    findById(id: string): Promise<RequestedHelp>;
    findOne(query: object): Promise<RequestedHelp>;
    create(createRequestedHelpDto: CreateRequestedHelpDto): Promise<RequestedHelp | HttpException>;
    confirmRequestedHelp(confirmHelpDto: ConfirmHelpDto): Promise<void>;
}
