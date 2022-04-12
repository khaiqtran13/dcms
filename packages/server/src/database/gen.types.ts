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
    cancelDate?: Date;
    user_id: number;
    startDate: Date;
    endDate: Date;
    status: string;
    appointment_type: string;
    appointment_id: number; // idk
}
