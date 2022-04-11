export interface IUser {
  user_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  street_address: string;
  city: string;
  province: string;
  password: string;
  role?: string;
  ssn: number;
}

export interface IEmployee extends IUser {
  employee_id: number; // PK
  record_id: string; // FK
  employee_type: string;
  salary: number;
}

export interface IPatient extends IUser {
  patient_id?: number; // PK
  gender: string;
  insurance: string;
  email_address: string;
  date_of_birth: Date; // or string?
  payment_id?: string; // FK
  record_id?: string; // FK
}
