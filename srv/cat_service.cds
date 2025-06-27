// using app.employees as employee from '../db/schema';

// service EmployeeService{
//     entity Employees @(restrict: [{grant: ['READ', 'UPDATE'], to: 'Employee', where: 'email = $user.email'}, 
//                                     {grant: ['READ', 'CREATE', 'UPDATE'], to: 'Department Lead', where: 'departmentName = $user.departmentName'},
//                                     {grant: ['READ', 'CREATE', 'UPDATE', 'DELETE'], to: 'Admin', where: 'companyCode = $user.companyCode'},
//                                     {grant: ['READ', 'CREATE', 'UPDATE', 'DELETE'], to: 'superAdmin'}]) as projection on employee.Employees;
                            
// }