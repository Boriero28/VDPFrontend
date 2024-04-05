export interface Customer {
    _id?: string;
    firstName: string;
    lastName: string;
    company: string;
    email:string;
    date: Date;
    arrivalTime: Date;
    departureTime?: Date;
    reason: string;
    referencePersons: string[];
    notes?: string;
    // businessCard?: File;
  }
  