import * as ImportedPusher from 'pusher';
import {Measurement} from "../measurements/entity/measurement.entity";
import {User} from "../users/entity/user.entity";
import {Prescription} from "../prescriptions/entity/prescription.entity";
import {Examination} from "../examinations/entity/examination.entity";
import {EventType} from "./event-type.enum";

export class Pusher {
    private static pusher: ImportedPusher = Pusher.intializePusher();

    private constructor() {}

    public static getInstance() {
        return Pusher.pusher;
    }

    public static async createMeasurement(measurement: Measurement, userId): Promise<void> {
        Pusher
            .getInstance()
            .trigger(
                `measurements-${userId}`,
                EventType.Create,
                { measurement }
                );
    }

    public static async updateUser(user: User): Promise<void> {
        Pusher
            .getInstance()
            .trigger(
                `users-${user.id}`,
                EventType.Update,
                { user }
            );
    }

    public static async createPrescription(prescription: Prescription, userId): Promise<void> {
        Pusher
            .getInstance()
            .trigger(
                `prescriptions-${userId}`,
                EventType.Create,
                { prescription }
            );
    }

    public static async createExamination(examination: Examination, userId): Promise<void> {
        Pusher
            .getInstance()
            .trigger(
                `examinations-${userId}`,
                 EventType.Create,
                { examination }
            );
    }

    private static intializePusher(): ImportedPusher {
        return new ImportedPusher({
            appId: '683863',
            key: 'f15495b1a9cc2b74d7ed',
            secret: '2f20085f5836beac3089',
            cluster: 'eu',
            useTLS: true
        });
    }
}
