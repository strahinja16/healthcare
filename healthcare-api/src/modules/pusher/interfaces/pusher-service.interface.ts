
import { Measurement } from '../../measurements/entity/measurement.entity';
import { User } from '../../users/entity/user.entity';
import { Examination } from '../../examinations/entity/examination.entity';
import { Prescription } from 'src/modules/prescriptions/entity/prescription.entity';
import { RequestedHelp } from '../../requestedHelps/entity/requestedHelp.entity';
import { ConfirmHelpDto } from '../../requestedHelps/dto/confirmHelpDto';

export interface IPusherService {
    createMeasurement(measurement: Measurement, userId): Promise<void>;
    updateUser(user: User): Promise<void>;
    createPrescription(prescription: Prescription, userId): Promise<void>;
    createExamination(examination: Examination, userId): Promise<void>;
    requestHelp(requestedHelp: Partial<RequestedHelp>, channel: string): Promise<void>;
    confirmHelp(confirmHelpDto: ConfirmHelpDto): Promise<void>;
}
