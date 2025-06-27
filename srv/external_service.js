const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
  const { sfEmpEmployment, sfEmpEmploymentTermination, sfCandidate } = this.entities;

  // Connect to each external service by its name
  const empEmploymentSrv = await cds.connect.to('EmpEmployment');
  const empTerminationSrv = await cds.connect.to('EmpEmploymentTermination');
  const candidateSrv = await cds.connect.to('Candidate');

  this.on('READ', sfEmpEmployment, async (req) => {
    return empEmploymentSrv.tx(req).run(req.query);
  });

  this.on('READ', sfEmpEmploymentTermination, async (req) => {
    return empTerminationSrv.tx(req).run(req.query);
  });

  this.on('READ', sfCandidate, async (req) => {
    return candidateSrv.tx(req).run(req.query);
  });

  this.on('postCandidate', async (req) => {
    const candidateData = req.data;
    try {
      const response = await candidateSrv.tx(req).post('/Candidate', candidateData);
      return { candidateId: response.candidateId };
    } catch (error) {
      req.error(500, `Failed to create candidate: ${error.message}`);
    }
  });
});