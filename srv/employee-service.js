// srv/employee-service.js
const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { Employees, Roles } = this.entities;
    
    // Calculate salary before CREATE or UPDATE
    this.before(['CREATE', 'UPDATE'], Employees, async (req) => {
        // Only process if we have role and hireDate
        if (!req.data.role_ID || !req.data.hireDate) return;
        
        // Get the base salary from the role
        const role = await SELECT.one.from(Roles).where({ ID: req.data.role_ID });
        if (!role) return;
        
        // Calculate years of service
        const hireDate = new Date(req.data.hireDate);
        const currentDate = new Date();
        const yearsOfService = Math.floor(
            (currentDate - hireDate) / (1000 * 60 * 60 * 24 * 365)
        );
        
        // Calculate salary: base salary + bonus for years of service
        const bonusPerYear = 1000;
        req.data.salary = parseFloat(role.baseSalary) + (yearsOfService * bonusPerYear);
    });
    
    // Always recalculate salary when reading employees
    this.after('READ', Employees, (employees) => {
        if (!Array.isArray(employees)) employees = [employees];
        
        employees.forEach(employee => {
            if (employee.role && employee.hireDate) {
                const hireDate = new Date(employee.hireDate);
                const currentDate = new Date();
                const yearsOfService = Math.floor(
                    (currentDate - hireDate) / (1000 * 60 * 60 * 24 * 365)
                );
                
                const bonusPerYear = 1000;
                employee.salary = parseFloat(employee.role.baseSalary) + (yearsOfService * bonusPerYear);
            }
        });
        
        return employees;
    });
});