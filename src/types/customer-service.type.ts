export interface CustomerServiceType {
  success: boolean;
  message: string;
  data: DataType;
}

export interface DataType {
  report_number: string;
  name: string;
  phone_number: string;
  remark: string;
  status: string;
  uuid: string;
  version: number;
}
