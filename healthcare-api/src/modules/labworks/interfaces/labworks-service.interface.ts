import {Labwork} from "../entity/labwork.entity";
import {CreateLabworkDto} from "../dto/createLabworkDto";
import {HttpException} from "@nestjs/common";

export interface ILabworksService {
    findById(id: string): Promise<Labwork>;
    findOne(query: object): Promise<Labwork>;
    create(file: any, createLabworkDto: CreateLabworkDto): Promise<Labwork | HttpException>;
    getLabworkFile(id: string): Promise<string | HttpException>;
    deleteLabwork(id: string): Promise<void | HttpException>;
}
