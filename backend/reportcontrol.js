import fs from "fs";
import xml2js from "xml2js";
import Report from "./report.js";

export const uploadreport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const xmlData = fs.readFileSync(req.file.path, "utf-8");
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xmlData);

    const root = result?.INProfileResponse || {};

    const header = root?.CreditProfileHeader || {};
    const currentApp = root?.Current_Application?.Current_Application_Details || {};
    const applicant = currentApp?.Current_Applicant_Details || {};
    const address = currentApp?.Current_Applicant_Address_Details || {};
    const caisSummary = root?.CAIS_Account?.CAIS_Summary || {};
    const creditDetails = root?.CAIS_Account?.CAIS_Account_DETAILS || [];
    const totalCaps = root?.TotalCAPS_Summary || {};
    const creditCaps = root?.CAPS?.CAPS_Summary || {};
    const nonCreditCaps = root?.NonCreditCAPS?.NonCreditCAPS_Summary || {};
    const score = root?.SCORE || {};

    const summary = caisSummary?.Credit_Account || {};
    const outstanding = caisSummary?.Total_Outstanding_Balance || {};

    const creditAccounts = Array.isArray(creditDetails)
      ? creditDetails
      : [creditDetails];

    const parsedAccounts = creditAccounts.map((acc) => ({
      subscriberName: acc?.Subscriber_Name?.trim(),
      accountNumber: acc?.Account_Number,
      portfolioType: acc?.Portfolio_Type,
      accountType: acc?.Account_Type,
      openDate: acc?.Open_Date,
      creditLimitAmount: Number(acc?.Credit_Limit_Amount || 0),
      highestCreditOrLoanAmount: Number(acc?.Highest_Credit_or_Original_Loan_Amount || 0),
      accountStatus: acc?.Account_Status,
      currentBalance: Number(acc?.Current_Balance || 0),
      amountPastDue: Number(acc?.Amount_Past_Due || 0),
      dateReported: acc?.Date_Reported,
      dateClosed: acc?.Date_Closed,
      suitFiledWilfulDefault: acc?.SuitFiled_WilfulDefault,
      writtenOffStatus: acc?.Written_off_Settled_Status,
      currencyCode: acc?.CurrencyCode,
      accountHolderType: acc?.AccountHoldertypeCode,
      holderDetails: {
        surname: acc?.CAIS_Holder_Details?.Surname_Non_Normalized,
        firstName: acc?.CAIS_Holder_Details?.First_Name_Non_Normalized,
        genderCode: acc?.CAIS_Holder_Details?.Gender_Code,
        pan: acc?.CAIS_Holder_Details?.Income_TAX_PAN,
        dateOfBirth: acc?.CAIS_Holder_Details?.Date_of_birth,
      },
      holderAddress: {
        line1: acc?.CAIS_Holder_Address_Details?.First_Line_Of_Address_non_normalized,
        line2: acc?.CAIS_Holder_Address_Details?.Second_Line_Of_Address_non_normalized,
        line3: acc?.CAIS_Holder_Address_Details?.Third_Line_Of_Address_non_normalized,
        city: acc?.CAIS_Holder_Address_Details?.City_non_normalized,
        state: acc?.CAIS_Holder_Address_Details?.State_non_normalized,
        zipCode: acc?.CAIS_Holder_Address_Details?.ZIP_Postal_Code_non_normalized,
        countryCode: acc?.CAIS_Holder_Address_Details?.CountryCode_non_normalized,
      },
    }));

    const newReport = new Report({
      enquiryUsername: header?.Enquiry_Username,
      reportDate: header?.ReportDate,
      reportTime: header?.ReportTime,
      version: header?.Version,
      reportNumber: header?.ReportNumber,
      subscriberName: header?.Subscriber_Name,
      applicant: {
        firstName: applicant?.First_Name,
        lastName: applicant?.Last_Name,
        mobile: applicant?.MobilePhoneNumber,
        dob: applicant?.Date_Of_Birth_Applicant,
        pan: parsedAccounts[0]?.holderDetails?.pan || "",
        income: Number(currentApp?.Current_Other_Details?.Income || 0),
        city: address?.City,
        state: address?.State,
      },
      caisSummary: {
        totalAccounts: Number(summary?.CreditAccountTotal || 0),
        activeAccounts: Number(summary?.CreditAccountActive || 0),
        defaultAccounts: Number(summary?.CreditAccountDefault || 0),
        closedAccounts: Number(summary?.CreditAccountClosed || 0),
        suitFiledCurrentBalance: Number(summary?.CADSuitFiledCurrentBalance || 0),
        outstandingBalanceSecured: Number(outstanding?.Outstanding_Balance_Secured || 0),
        outstandingBalanceSecuredPercent: Number(outstanding?.Outstanding_Balance_Secured_Percentage || 0),
        outstandingBalanceUnsecured: Number(outstanding?.Outstanding_Balance_UnSecured || 0),
        outstandingBalanceUnsecuredPercent: Number(outstanding?.Outstanding_Balance_UnSecured_Percentage || 0),
        outstandingBalanceAll: Number(outstanding?.Outstanding_Balance_All || 0),
      },
      creditAccounts: parsedAccounts,
      totalCAPSSummary: {
        last7Days: Number(totalCaps?.TotalCAPSLast7Days || 0),
        last30Days: Number(totalCaps?.TotalCAPSLast30Days || 0),
        last90Days: Number(totalCaps?.TotalCAPSLast90Days || 0),
        last180Days: Number(totalCaps?.TotalCAPSLast180Days || 0),
      },
      creditCAPS: {
        last7Days: Number(creditCaps?.CAPSLast7Days || 0),
        last30Days: Number(creditCaps?.CAPSLast30Days || 0),
        last90Days: Number(creditCaps?.CAPSLast90Days || 0),
        last180Days: Number(creditCaps?.CAPSLast180Days || 0),
      },
      nonCreditCAPS: {
        last7Days: Number(nonCreditCaps?.NonCreditCAPSLast7Days || 0),
        last30Days: Number(nonCreditCaps?.NonCreditCAPSLast30Days || 0),
        last90Days: Number(nonCreditCaps?.NonCreditCAPSLast90Days || 0),
        last180Days: Number(nonCreditCaps?.NonCreditCAPSLast180Days || 0),
      },
      score: {
        bureauScore: Number(score?.BureauScore || 0),
        confidenceLevel: score?.BureauScoreConfidLevel,
      },
    });

    await newReport.save();
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: "✅ XML uploaded & saved successfully",
      data: newReport,
    });
  } catch (error) {
    console.error("❌ Error processing report:", error.message);
    res.status(500).json({
      message: "Server error while processing report",
      error: error.message,
    });
  }
};

export const getreports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error("❌ Error fetching reports:", error.message);
    res.status(500).json({ message: "Server error while fetching reports" });
  }
};
