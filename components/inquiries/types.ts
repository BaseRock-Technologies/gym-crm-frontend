import { SelectOption } from "@/types/form";

export interface InquiryRecord {
    name: string;
    contactNumber: number;
    inquiryFor: string;
    followupDate: number;
    attendedBy: string;
    status: string;
    convertibility: string;
    _id: string;
  }
  

 export interface FilterOptions {
    convertibility:SelectOption[];
    status:SelectOption[];
    attendedByOptions:SelectOption[];
  }