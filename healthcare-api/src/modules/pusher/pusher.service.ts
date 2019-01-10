import { Injectable} from '@nestjs/common';
import { IPusherService} from './interfaces/pusher-service.interface';
import * as Pusher from 'pusher';
import { Measurement } from '../measurements/entity/measurement.entity';
import { EventType } from './enum/event-type.enum';
import { User } from '../users/entity/user.entity';
import { Prescription } from '../prescriptions/entity/prescription.entity';
import { Examination } from '../examinations/entity/examination.entity';
import { ConfigService } from '../config/config.service';
import { IPusherOptions } from './interfaces/pusher-options.interface';
import { RequestedHelp } from '../requestedHelps/entity/requestedHelp.entity';
import { ConfirmHelpDto } from '../requestedHelps/dto/confirmHelpDto';

@Injectable()
export class PusherService implements IPusherService {
    constructor(private readonly configService: ConfigService ) {
        this.pusher = new Pusher({ ...this._options });
    }

    private readonly pusher: Pusher;

    private _options: IPusherOptions = {
        appId: this.configService.get('PUSHER_APP_ID'),
        key: this.configService.get('PUSHER_KEY'),
        secret: this.configService.get('PUSHER_SECRET'),
        cluster: this.configService.get('PUSHER_CLUSTER'),
        useTLS: true,
    };

    public async createMeasurement(measurement: Measurement, userId): Promise<void> {
       this.pusher
            .trigger(
                `measurements-${userId}`,
                EventType.Create,
                { measurement }
            );
    }

    public async updateUser(user: User): Promise<void> {
        this.pusher
            .trigger(
                `users-${user.id}`,
                EventType.Update,
                { user }
            );
    }

    public async createPrescription(prescription: Prescription, userId): Promise<void> {
        this.pusher
            .trigger(
                `prescriptions-${userId}`,
                EventType.Create,
                { prescription }
            );
    }

    public async createExamination(examination: Examination, userId): Promise<void> {
        this.pusher
            .trigger(
                `examinations-${userId}`,
                EventType.Create,
                { examination }
            );
    }

    public async requestHelp(requestedHelp: RequestedHelp, channel: string): Promise<void> {
        const coordinates = JSON.parse(requestedHelp.coordinates.toString());
        const data = { coordinates, channel };
        this.pusher
            .trigger(
                'sos',
                EventType.RequestHelp,
                { data },
            );
    }

    public async confirmHelp(confirmHelpDto: ConfirmHelpDto): Promise<void> {
        const { distance, duration, channel } = confirmHelpDto;
        const data = { distance, duration };
        this.pusher
            .trigger(
                'sos-requested',
                `help-${channel}`,
                { data },
            );
    }
}
