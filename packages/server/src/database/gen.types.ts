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
    dentist_id: number;
    cancel_date?: Date;
    user_id: number;
    start_date: Date;
    end_time?: string;
    status: string;
    appointment_type: string;
    appointment_id: number; // idk
}
