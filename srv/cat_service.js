const cds = require('@sap/cds');

module.exports = class CatService extends cds.ApplicationService {
  init() {
    this.before(['READ', 'DELETE', 'CREATE', 'UPDATE'], 'Employees', (req) => {
      // Get company code and department name from user attributes
      const companyCode = req.user?.attr?.companyCode?.[0];
      const departmentName = req.user?.attr?.departmentName?.[0];

      // Check roles
      const isDeptLead = Object.keys(req.user?.roles || {}).includes('Department Lead');
      const isSuperAdmin = Object.keys(req.user?.roles || {}).includes('superAdmin');
      const isEmployee = Object.keys(req.user?.roles || {}).includes('Employee');

      // If not super admin/employee and company code blank -> Error (check company code for admin)
      if (!companyCode && !isSuperAdmin && !isEmployee) {
        return req.reject(403, 'Missing companyCode attribute.');
      }

      // Read and delete employee by company code (only admin)
      if (['READ', 'DELETE'].includes(req.event) && !isSuperAdmin && !isEmployee) {
        req.query.where('companyCode =', companyCode);
      }

      // Create/update event, perform by list of employees
      if (['CREATE', 'UPDATE'].includes(req.event)) {
        const entries = Array.isArray(req.data) ? req.data : [req.data];
        for (const entry of entries) {
          entry.companyCode ??= companyCode;
          entry.departmentName ??= departmentName;
          // If different company code -> display error
          if (!isSuperAdmin && !isEmployee && entry.companyCode !== companyCode) {
            return req.reject(403, `Not allowed to modify data for companyCode: ${entry.companyCode}`);
          }
        }
      }
    });
    return super.init();
  }
};