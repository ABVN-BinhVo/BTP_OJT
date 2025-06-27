// using employee.management as employee from '../db/schema';

// service AdminService {
//     entity Employees @(restrict: [{grant: ['READ', 'CREATE', 'UPDATE'], to: 'Department Lead', where: 'departmentName = $user.departmentName'}, 
//                                 {grant: ['READ', 'CREATE', 'UPDATE', 'DELETE'], to: 'Admin', where: 'companyCode = $user.companyCode'},
//                                 {grant: ['READ', 'CREATE', 'UPDATE', 'DELETE'], to: 'superAdmin'},]) as projection on employee.Employees;
                                
//     entity Departments @(restrict: [{grant: ['READ', 'CREATE', 'UPDATE'], to: 'Department Lead', where: 'name = $user.departmentName'}, 
//                                     {grant: ['READ', 'CREATE', 'UPDATE', 'DELETE'], to: ['Admin', 'superAdmin']}]) as projection on employee.Departments;
// }