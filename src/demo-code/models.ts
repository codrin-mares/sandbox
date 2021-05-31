interface Address {
  street: string;
  no: number;
  country: string;
}

export interface Customer {
  name: string;
  age: number;
  address?: Address;
}

export interface Employee {
  name: string;
  age: number;
  experience: number;
  performanceGrade: string;
  address: Address;
}

export interface Company {
  name: string;
  employeesNo: number;
  customers: Customer[];
  employees: Employee[];
  companyId: string;
}

export type IdType<T> = T & {id: string};
