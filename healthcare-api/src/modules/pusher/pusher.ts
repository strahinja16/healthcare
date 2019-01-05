import * as Pusher from 'pusher';
import {Measurement} from "../measurements/entity/measurement.entity";
import {User} from "../users/entity/user.entity";
import {Prescription} from "../prescriptions/entity/prescription.entity";
import {Examination} from "../examinations/entity/examination.entity";
import {EventType} from "./event-type.enum";

export class PusherService {
    private static pusherService: PusherService = new PusherService();
    private readonly pusher: Pusher;

    private constructor() {
        this.pusher = new Pusher({
            appId: '683863',
            key: 'f15495b1a9cc2b74d7ed',
            secret: '2f20085f5836beac3089',
            cluster: 'eu',
            useTLS: true
        });
    }

    public static getInstance() {
        return this.pusherService.pusher;
    }

    public static async createMeasurement(measurement: Measurement, userId): Promise<void> {
        PusherService
            .getInstance()
            .trigger(
                `measurements-${userId}`,
                EventType.Create,
                { measurement }
                );
    }

    public static async updateUser(user: User): Promise<void> {
        PusherService
            .getInstance()
            .trigger(
                `users-${user.id}`,
                EventType.Update,
                { user }
            );
    }

    public static async createPrescription(prescription: Prescription, userId): Promise<void> {
        PusherService
            .getInstance()
            .trigger(
                `prescriptions-${userId}`,
                EventType.Create,
                { prescription }
            );
    }

    public static async createExamination(examination: Examination, userId): Promise<void> {
        PusherService
            .getInstance()
            .trigger(
                `examinations-${userId}`,
                 EventType.Create,
                { examination }
            );
    }
}
