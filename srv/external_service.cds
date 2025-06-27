using { EmpEmployment} from './external/EmpEmployment';
using { EmpEmploymentTermination } from './external/EmpEmploymentTermination';
using { Candidate} from './external/Candidate';

service sfEmployeeService {
  entity sfEmpEmployment as projection on EmpEmployment.EmpEmployment{
    personIdExternal,
    userId,
    assignmentClass,
    assignmentIdExternal,
    createdBy,
    createdDateTime,
    createdOn,
    customDate3,
    customString1,
    customString10,
    employmentId,
    endDate,
    hiringNotCompleted,
    // includeAllRecords,
    isContingentWorker,
    isECRecord,
    // jobNumber,
    lastDateWorked,
    lastModifiedBy,
    lastModifiedDateTime,
    lastModifiedOn,
    okToRehire,
    originalStartDate,
    regretTermination,
    seniorityDate,
    serviceDate,
    startDate
  };
  entity sfEmpEmploymentTermination as projection on EmpEmploymentTermination.EmpEmploymentTermination {
    personIdExternal,
    userId,
    createdBy,
    createdDateTime,
    createdOn,
    endDate,
    lastDateWorked,
    lastModifiedBy,
    lastModifiedDateTime,
    lastModifiedOn,
    okToRehire,
    regretTermination,
  };
  entity sfCandidate as projection on Candidate.Candidate {
    candidateId,
    firstName,
    lastName,
    primaryEmail,
    contactEmail,
    cellPhone,
    country,
    city,
    address,
    zip,
    currentTitle
  };

  // Action to create candidate in SuccessFactors
    action postCandidate(
        firstName: String,
        lastName: String,
        primaryEmail: String,
        contactEmail: String,
        cellPhone: String,
        country: String,
        city: String,
        address: String,
        zip: String,
        currentTitle: String
    ) returns String;
}