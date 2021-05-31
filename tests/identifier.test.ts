import {Company, Customer, Employee} from '../src/demo-code/models';
import {staticId, applyId, unknownId, composedId, inValueId} from '../src/demo-code/id-adt';

describe('Test indentifier', () => {
  it('Should create a customer with static id', () => {
    const customer: Customer = {
      name: 'Alan',
      age: 21,
      address: {
        street: 'Dorobantilor',
        no: 12,
        country: 'Romania',
      },
    };

    const id = staticId('new-id-for-customer');

    expect(applyId(customer, id)).toEqual({
      ...customer,
      id: 'new-id-for-customer',
    });
  });

  it('Should create a customer with generated id', () => {
    const customer: Customer = {
      name: 'Alan',
      age: 21,
      address: {
        street: 'Dorobantilor',
        no: 12,
        country: 'Romania',
      },
    };

    const id = unknownId();
    const idCustomer = applyId(customer, id);

    expect(idCustomer.id).toBeDefined();
    expect(idCustomer).toEqual(expect.objectContaining(customer));
  });

  it('Should create a employee with composed id', () => {
    const employee: Employee = {
      name: 'John',
      age: 23,
      experience: 4,
      performanceGrade: 'C',
      address: {
        street: 'Dorobantilor',
        no: 12,
        country: 'Romania',
      },
    };

    const id = composedId((employee: Employee) => `${employee.name}-${employee.age}-${employee.experience}`);

    expect(applyId(employee, id)).toEqual({
      ...employee,
      id: 'John-23-4',
    });
  });

  it('Should create a company with in value id', () => {
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

    const id = inValueId('companyId');

    expect(applyId(company, id)).toEqual({
      ...company,
      id: 'iad1234-adfa',
    });
  });
});
