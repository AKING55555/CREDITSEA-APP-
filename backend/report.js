import mongoose from "mongoose";

//  Individual Credit Account Details
const CreditAccountSchema = new mongoose.Schema({
  subscriberName: String,               
  accountNumber: String,                
  portfolioType: String,                
  accountType: String,                
  openDate: String,                    
  creditLimitAmount: Number,           
  highestCreditOrLoanAmount: Number,    // <Highest_Credit_or_Original_Loan_Amount>
  accountStatus: String,                
  currentBalance: Number,               
  amountPastDue: Number,               
  dateReported: String,                
  dateClosed: String,                  
  suitFiledWilfulDefault: String,       
  writtenOffStatus: String,             
  currencyCode: String,              
  accountHolderType: String,         

  holderDetails: {
    surname: String,
    firstName: String,
    genderCode: String,
    pan: String,
    dateOfBirth: String
  },

  holderAddress: {
    line1: String,
    line2: String,
    line3: String,
    city: String,
    state: String,
    zipCode: String,
    countryCode: String
  },

  accountHistory: [
    {
      year: String,
      month: String,
      daysPastDue: Number,
      assetClassification: String
    }
  ]
});

//  Summary of All Credit Accounts
const CAISSummarySchema = new mongoose.Schema({
  totalAccounts: Number,                
  activeAccounts: Number,                
  defaultAccounts: Number,               
  closedAccounts: Number,                
  suitFiledCurrentBalance: Number,      
  outstandingBalanceSecured: Number,    
  outstandingBalanceSecuredPercent: Number,
  outstandingBalanceUnsecured: Number,
  outstandingBalanceUnsecuredPercent: Number,
  outstandingBalanceAll: Number
});

// 📈 Sub-schema: Enquiry Summary
const CAPSsummarySchema = new mongoose.Schema({
  last7Days: Number,
  last30Days: Number,
  last90Days: Number,
  last180Days: Number
});

// 🧩 Main Report Schema
const ReportSchema = new mongoose.Schema({
  enquiryUsername: String,         
  reportDate: String,             
  reportTime: String,             
  version: String,                
  reportNumber: String,            
  subscriberName: String,         
  
  applicant: {
    firstName: String,
    lastName: String,
    mobile: String,
    dob: String,
    pan: String,
    income: Number,
    city: String,
    state: String
  },

  caisSummary: CAISSummarySchema,   // from <CAIS_Summary>
  creditAccounts: [CreditAccountSchema], // from <CAIS_Account_DETAILS>

  totalCAPSSummary: CAPSsummarySchema,   // from <TotalCAPS_Summary>
  creditCAPS: CAPSsummarySchema,         // from <CAPS_Summary>
  nonCreditCAPS: CAPSsummarySchema,      // from <NonCreditCAPS_Summary>

  score: {
    bureauScore: Number,             // <BureauScore>
    confidenceLevel: String          // <BureauScoreConfidLevel>
  }
});

export default mongoose.model("Report", ReportSchema);