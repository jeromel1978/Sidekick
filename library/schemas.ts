const Schema = {
  HUB: {
    Household: /* GraphQL */ `
        {
            ID:string,
            Address: {
            Line1: string,
            Line2: string,
            City: string,
            Province: string,
            Country: string,
            PostalCode: string
            }
          ,
        }
        `,
    Person: /* GraphQL */ `
      {
        ID: number
        FirstName: string
        MiddleName: string
        LastName: string
        DoB: date
        DoD: date
        Prefix: string
        Suffix: string
        Gender: string
      }
    `,
  },
  ACPI: {
    Person: /* GraphQL */ `
      {
        ID: number
        FirstName: string
        MiddleName: string
        LastName: string
        DoB: date
        DoD: date
        Prefix: string
        Suffix: string
        Gender: string
      }
    `,
  },
  Conquest: {
    client: /* GraphQL */ `
        {
    firstName: string,
    lastName: string,
    birthDate: date,
    maritalStatus: string,
    gender: string,
    province: string,
    deathAge: number,
    retirementDate: "Age {RetirementAge}",
}
        `,
  },
  PreciseFP: {
    Person: /* GraphQL */ `
        {
      "_id": string,
      "_group": string,
      "FullName": string,
      "FName": string,
      "MName": string,
      "LName": string,
      "Gender": string,
      "DoB": date,
      "Age": number,
      "Marital": string,
      "Citizenship": string,
      "eMail": string,
      "Phone": 
      {
        country:number,
        area:number,
        phone:number
      },
      "HomePhone": 
      {
        country:number,
        area:number,
        phone:number
      },
      "WorkPhone": 
      {
        country:number,
        area:number,
        phone:number
      },
      "Address": 
      {
        Line1:string,
        Line2:string,
        City:string,
        Prov:string,
        Country:string,
        PostalCode:string,
      },
      "DriversLicenseNumber": string,
      "DriversLicenseIssueDate": date,
      "DriversLicenseExpireDate": date,
      "DriversLicenseJurisdiction": string,
      "Client_AboutMe": string,
      "Client_Employer": string,
      "Client_Occupation": string,
      "CEM_YearsAtJob": number,
      "EmploymentAddress": null,
      "EmploymentSalary": number,
      "EmploymentCommissions": number,
      "IncomeEmploymentTotal": number,
      "IncomeSelfEmployment": number,
      "IncomePensionsAndAnnuities": number,
      "IncomeSocialSecurity": number,
      "IncomeCashDividends": number,
      "IncomeInterest": number,
      "IncomeOther": number,
      "IncomeTotal": number,
      "HasOutstandingStockOptions": number,
      "PlannedRetirementAge": number,
      "FirstName": string,
      "MiddleName": string,
      "LastName": string,
      "Birthdate": date,
      "IsDependent": boolean,
      "ChildEmail": string,
      "ChildMobilePhone": 
      {
        country:number,
        area:number,
        phone:number
      },
      "Email": string,
      "ClientID": string,
      "NName": string,
    }
    `,
  },
};
export default Schema;
