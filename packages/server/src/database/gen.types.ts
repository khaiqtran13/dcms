export interface IReview {
    user_id: number;
    professionalism: number;
    communication: number;
    cleanliness: number;
    value: number;
}

export interface IAppointment {
    fee_id?: string;
    patient_id?: string;
    dentist_id: number; // fk
    cancel_date?: Date;
    date: Date;
    duration: number; // minutes
    appointment_type: string;
    status: string;
    appointment_id: number; // pk
    procedure_id?: number; // fk
}

export interface IRecord {
    charts: string[];
    notes: string[];
}
