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
    dentist_id?: number;
    user_id: number;
    startDate: Date;
    endDate: Date;
    status: string;
    cancelDate: Date;
    appointment_type: string;
    appointment_id: number; // idk
}
