import {Customer, Employee, Company} from '../src/demo-code/models';
import {validateCompany, validateCustomer, validateEmployee} from '../src/demo-code/validation';

describe('Test validations', () => {
  describe('Customer validation', () => {
    it('Should return no validation errors', () => {
      const customer: Customer = {
        name: 'Alan',
        age: 10,
        address: {
          street: 'Dorobantilor',
          no: 12,
          country: 'Romania',
        },
      };
      expect(validateCustomer(customer)).toEqual(new Map());
    });

    it('Should return invalid age for customer', () => {
      const customer: Customer = {
        name: 'Alan',
        age: -1,
      };
      expect(validateCustomer(customer)).toEqual(new Map([['age', ['Invalid age for customer Alan!']]]));
    });

    it('Should return invalid country for customer', () => {
      const customer: Customer = {
        name: 'Alan',
        age: 20,
        address: {
          street: 'Dorobantilor',
          no: 12,
          country: 'Germany',
        },
      };
      expect(validateCustomer(customer)).toEqual(new Map([['country', ['We do not support external customers!']]]));
    });
  });

  describe('Employee validation', () => {
    it('Should return no validation errors', () => {
      const employee: Employee = {
        name: 'John',
        age: 26,
        experience: 5,
        performanceGrade: 'A',
        address: {
          street: 'Dorobantilor',
          no: 12,
          country: 'Romania',
        },
      };
      expect(validateEmployee(employee)).toEqual(new Map());
    });

    it('Should return invalid age for employee', () => {
      const employee: Employee = {
        name: 'John',
        age: -10,
        experience: 5,
        performanceGrade: 'A',
        address: {
          street: 'Dorobantilor',
          no: 12,
          country: 'Romania',
        },
      };
      expect(validateEmployee(employee)).toEqual(new Map([['age', ['Invalid age for employee John!']]]));
    });

    it('Should return invalid performance grade for employee', () => {
      const employee: Employee = {
        name: 'John',
        age: 26,
        experience: 5,
        performanceGrade: 'adfda',
        address: {
          street: 'Dorobantilor',
          no: 12,
          country: 'Romania',
        },
      };
      expect(validateEmployee(employee)).toEqual(
        new Map([['performanceGrade', ['Invalid performance grade for employee John!']]]),
      );
    });
  });

  describe('Company validation', () => {
    it('Should return no validation errors', () => {
      const company: Company = {
        name: 'Demo LTD',
        employeesNo: 10,
        companyId: 'iad1234-adfa',
        customers: [
          {
            name: 'Alan',
            age: 20,
            address: {
              street: 'Dorobantilor',
              no: 12,
              country: 'Romania',
            },
          },
          {
            name: 'Maria',
            age: 21,
            address: {
              street: 'Dorobantilor',
              no: 12,
              country: 'Romania',
            },
          },
        ],
        employees: [
          {
            name: 'John',
            age: 26,
            experience: 5,
            performanceGrade: 'B',
            address: {
              street: 'Dorobantilor',
              no: 12,
              country: 'Romania',
            },
          },
        ],
      };
      expect(validateCompany(company)).toEqual(new Map());
    });

    it('Should return invalid age for customers', () => {
      const company: Company = {
        name: 'Demo LTD',
        employeesNo: 10,
        companyId: 'iad1234-adfa',
        customers: [
          {
            name: 'Alan',
            age: -20,
            address: {
              street: 'Dorobantilor',
              no: 12,
              country: 'Romania',
            },
          },
          {
            name: 'Maria',
            age: -21,
            address: {
              street: 'Dorobantilor',
              no: 12,
              country: 'Romania',
            },
          },
        ],
        employees: [
          {
            name: 'John',
            age: 26,
            experience: 5,
            performanceGrade: 'B',
            address: {
              street: 'Dorobantilor',
              no: 12,
              country: 'Romania',
            },
          },
        ],
      };
      expect(validateCompany(company)).toEqual(
        new Map([['customers', ['Invalid age for customer Alan!', 'Invalid age for customer Maria!']]]),
      );
    });

    it('Should return invalid country for customers and invalid performance grade for employee', () => {
      const company: Company = {
        name: 'Demo LTD',
        employeesNo: 10,
        companyId: 'iad1234-adfa',
        customers: [
          {
            name: 'Alan',
            age: -20,
            address: {
              street: 'Dorobantilor',
              no: 12,
              country: 'Romania',
            },
          },
          {
            name: 'Maria',
            age: 21,
            address: {
              street: 'Dorobantilor',
              no: 12,
              country: 'Spain',
            },
          },
        ],
        employees: [
          {
            name: 'John',
            age: 26,
            experience: 5,
            performanceGrade: '123',
            address: {
              street: 'Dorobantilor',
              no: 12,
              country: 'Romania',
            },
          },
        ],
      };
      expect(validateCompany(company)).toEqual(
        new Map([
          ['customers', ['Invalid age for customer Alan!', 'We do not support external customers!']],
          ['employees', ['Invalid performance grade for employee John!']],
        ]),
      );
    });
  });
});
