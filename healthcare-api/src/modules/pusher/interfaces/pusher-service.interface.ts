
import {Measurement} from "../../measurements/entity/measurement.entity";
import {User} from "../../users/entity/user.entity";
import {Examination} from "../../examinations/entity/examination.entity";
import {Prescription} from "src/modules/prescriptions/entity/prescription.entity";

export interface IPusherService {
    createMeasurement(measurement: Measurement, userId): Promise<void>;
    updateUser(user: User): Promise<void>;
    createPrescription(prescription: Prescription, userId): Promise<void>;
    createExamination(examination: Examination, userId): Promise<void>;
}
