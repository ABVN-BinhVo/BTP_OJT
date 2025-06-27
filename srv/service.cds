// using { employee.management as empl } from '../db/schema';

// // service EmployeeService {
// //     entity Employees as projection on empl.Employees;
// //     entity Departments as projection on empl.Departments;
// // }

// service EmployeeService {
//     // Only expose Employees entity - Department is not directly exposed
//     entity Employees as projection on empl.Employees;
// }

// service AdminService {
//     // Expose both Employees and Departments entities
//     entity Employees as projection on empl.Employees;
//     entity Departments as projection on empl.Departments;
// }

// // using { employee.management as empl } from '../db/schema';

// // // Employee Service - For employees to view their own data
// // service EmployeeService @(requires: 'authenticated-user') {
// //     // Only expose Employees entity - Department is not directly exposed
// //     @(restrict: [
// //         { 
// //             grant: ['READ', 'UPDATE'],
// //             to: 'Employee',
// //             where: 'email = $user.email'
// //         },
// //         {
// //             grant: ['READ', 'CREATE', 'UPDATE'],
// //             to: 'DepartmentLead',
// //             where: 'department.name = $user.department'
// //         },
// //         {
// //             grant: '*',
// //             to: 'Admin',
// //             where: 'companyCode = $user.companyCode or $user.companyCode = "*"'
// //         }
// //     ])
// //     entity Employees as projection on empl.Employees;
// // }

// // // Admin Service - For department leads and admins
// // service AdminService @(requires: ['DepartmentLead', 'Admin']) {
// //     // Expose both Employees and Departments entities
// //     @(restrict: [
// //         {
// //             grant: ['READ', 'CREATE', 'UPDATE'],
// //             to: 'DepartmentLead',
// //             where: 'department.name = $user.department'
// //         },
// //         {
// //             grant: '*',
// //             to: 'Admin',
// //             where: 'companyCode = $user.companyCode or $user.companyCode = "*"'
// //         }
// //     ])
// //     entity Employees as projection on empl.Employees;
    
// //     @(restrict: [
// //         {
// //             grant: 'READ',
// //             to: ['DepartmentLead', 'Admin']
// //         }
// //     ])
// //     entity Departments as projection on empl.Departments;
// // }

// using { employee.management as em } from '../db/schema';

// service EmployeeService {
//     entity Employees as projection on em.Employees;
//     entity Departments as projection on em.Departments;
// }
