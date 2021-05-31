import {map} from 'fp-ts/lib/Array';

import {Customer, Company, Employee} from './models';

type Errors = [string, string[]];
export type ErrorsMap = Map<string, string[]>;

type ValidationRule<T> = (o: T) => Errors;

type CustomerValidationRule = ValidationRule<Customer>;
type CompanyValidationRule = ValidationRule<Company>;
type EmployeeValidationRule = ValidationRule<Employee>;

function evaluate<T, RuleT extends ValidationRule<T>>(o: T, rules: RuleT[]): ErrorsMap {
  return new Map(map((rule: RuleT) => rule(o))(rules).filter(([, errorMessages]) => errorMessages.length));
}

const customerRules: CustomerValidationRule[] = [
  (customer: Customer): Errors => ['age', customer.age < 0 ? [`Invalid age for customer ${customer.name}!`] : []],

  (customer: Customer): Errors => [
    'country',
    customer.address?.country && customer.address?.country !== 'Romania'
      ? ['We do not support external customers!']
      : [],
  ],
];

const employeeRules: EmployeeValidationRule[] = [
  (employee: Employee): Errors => ['age', employee.age < 0 ? [`Invalid age for employee ${employee.name}!`] : []],

  (employee: Employee): Errors => [
    'performanceGrade',
    !employee.performanceGrade.match(/^[A-F]{1}$/g) ? [`Invalid performance grade for employee ${employee.name}!`] : [],
  ],
];

const companyRules: CompanyValidationRule[] = [
  (company: Company): Errors => [
    'employees',
    company.employees.flatMap((employee) => employeeRules.flatMap((rule) => rule(employee)[1])),
  ],
  (company: Company): Errors => [
    'customers',
    company.customers.flatMap((customer) => customerRules.flatMap((rule) => rule(customer)[1])),
  ],
];

export function validateCustomer(customer: Customer): ErrorsMap {
  return evaluate(customer, customerRules);
}

export function validateEmployee(employee: Employee): ErrorsMap {
  return evaluate(employee, employeeRules);
}

export function validateCompany(company: Company): ErrorsMap {
  return evaluate(company, companyRules);
}
