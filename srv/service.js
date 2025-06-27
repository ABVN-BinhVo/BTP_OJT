const cds = require('@sap/cds');

module.exports = async function() {
    const { Employees } = this.entities;
    
    // Check if employee exists in the database for Employee role
    this.before('*', 'EmployeeService.Employees', async (req) => {
        if (req.user.is('Employee')) {
            const email = req.user.attr.email;
            const employee = await SELECT.from(Employees).where({ email: email });
            
            if (!employee.length) {
                return req.reject(403, `User ${email} not found in the system`);
            }
        }
    });
    
    // Validate Admin user has companyCode attribute
    this.before('*', ['AdminService.Employees', 'EmployeeService.Employees'], async (req) => {
        if (req.user.is('Admin')) {
            const companyCode = req.user.attr.companyCode;
            
            if (!companyCode) {
                return req.reject(403, 'Admin user must have a companyCode attribute');
            }
        }
    });

    // Validation before CREATE and UPDATE
    this.before(['CREATE', 'UPDATE'], Employees, async (req) => {
        const { firstName, lastName, dateOfBirth, hireDate, email } = req.data;

        // Date of birth >= hire date
        if (dateOfBirth && hireDate && dateOfBirth >= hireDate) {
            req.error("Not allow Date of birth >= Hire date");
        }

        // First/Last name contains numeric
        const hasNumber = str => /\d/.test(str);
        if ((firstName && hasNumber(firstName)) || (lastName && hasNumber(lastName))) {
            req.error("First Name/Last Name not allow");
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            req.error("Email is not valid");
        }
    });

    // After READ: If hired > 3 years ago, salary +30%
    this.after('READ', Employees, (results) => {
        const now = new Date();
        const add30Percent = emp => {
            if (emp.hireDate) {
                const hireDate = new Date(emp.hireDate);
                const diffYears = (now - hireDate) / (1000 * 60 * 60 * 24 * 365.25);
                if (diffYears > 3 && emp.salary) {
                    emp.salary = Number(emp.salary) * 1.3;
                }
            }
        };
        if (Array.isArray(results)) results.forEach(add30Percent);
        else add30Percent(results);
    });
};