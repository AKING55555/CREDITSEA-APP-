import React, { useEffect, useState } from 'react';
import './App.css';

const CreditReport = ({ data }) => {
  if (!data) return <p>Loading report...</p>;

  return (
    <div className="credit-report">
      <header className="report-header">
        <h1>Bureau Disclosure Report</h1>
        <p>Report Number: {data.reportNumber}</p>
        <p>Report Date: {data.reportDate} | Time: {data.reportTime}</p>
        <p>Version: {data.version}</p>
        <p>Subscriber: {data.subscriberName}</p>
      </header>

      <section className="applicant-info">
        <h2>Applicant Details</h2>
        <div className="info-grid">
          <div><strong>First Name:</strong> {data.applicant?.firstName}</div>
          <div><strong>Last Name:</strong> {data.applicant?.lastName}</div>
          <div><strong>Mobile:</strong> {data.applicant?.mobile}</div>
          <div><strong>DOB:</strong> {data.applicant?.dob}</div>
          <div><strong>PAN:</strong> {data.applicant?.pan}</div>
          <div><strong>Income:</strong> {data.applicant?.income}</div>
          <div><strong>City:</strong> {data.applicant?.city}</div>
          <div><strong>State:</strong> {data.applicant?.state}</div>
        </div>
      </section>

      <section className="cais-summary">
        <h2>CAIS Summary</h2>
        <div className="summary-grid">
          <div><strong>Total Accounts:</strong> {data.caisSummary?.totalAccounts}</div>
          <div><strong>Active Accounts:</strong> {data.caisSummary?.activeAccounts}</div>
          <div><strong>Default Accounts:</strong> {data.caisSummary?.defaultAccounts}</div>
          <div><strong>Closed Accounts:</strong> {data.caisSummary?.closedAccounts}</div>
          <div><strong>Suit Filed Current Balance:</strong> {data.caisSummary?.suitFiledCurrentBalance}</div>
          <div><strong>Outstanding Balance Secured:</strong> {data.caisSummary?.outstandingBalanceSecured} ({data.caisSummary?.outstandingBalanceSecuredPercent}%)</div>
          <div><strong>Outstanding Balance Unsecured:</strong> {data.caisSummary?.outstandingBalanceUnsecured} ({data.caisSummary?.outstandingBalanceUnsecuredPercent}%)</div>
          <div><strong>Outstanding Balance All:</strong> {data.caisSummary?.outstandingBalanceAll}</div>
        </div>
      </section>

      <section className="credit-accounts">
        <h2>Credit Accounts</h2>
        <div className="accounts-list">
          {data.creditAccounts?.map((account, index) => (
            <div key={account._id || index} className="account-card">
              <h3>Account {index + 1}: {account.subscriberName}</h3>
              <div className="account-details">
                <div><strong>Account Number:</strong> {account.accountNumber}</div>
                <div><strong>Portfolio Type:</strong> {account.portfolioType}</div>
                <div><strong>Account Type:</strong> {account.accountType}</div>
                <div><strong>Open Date:</strong> {account.openDate}</div>
                <div><strong>Credit Limit:</strong> {account.creditLimitAmount}</div>
                <div><strong>Highest Credit/Loan:</strong> {account.highestCreditOrLoanAmount}</div>
                <div><strong>Status:</strong> {account.accountStatus}</div>
                <div><strong>Current Balance:</strong> {account.currentBalance}</div>
                <div><strong>Amount Past Due:</strong> {account.amountPastDue}</div>
                <div><strong>Date Reported:</strong> {account.dateReported}</div>
                <div><strong>Date Closed:</strong> {account.dateClosed || 'N/A'}</div>
                <div><strong>Suit Filed/Wilful Default:</strong> {account.suitFiledWilfulDefault || 'N/A'}</div>
                <div><strong>Written Off Status:</strong> {account.writtenOffStatus || 'N/A'}</div>
                <div><strong>Currency:</strong> {account.currencyCode}</div>
                <div><strong>Holder Type:</strong> {account.accountHolderType}</div>
              </div>
              <div className="holder-details">
                <h4>Holder Details</h4>
                <div><strong>Surname:</strong> {account.holderDetails?.surname}</div>
                <div><strong>First Name:</strong> {account.holderDetails?.firstName}</div>
                <div><strong>Gender:</strong> {account.holderDetails?.genderCode}</div>
                <div><strong>PAN:</strong> {account.holderDetails?.pan}</div>
                <div><strong>DOB:</strong> {account.holderDetails?.dateOfBirth}</div>
              </div>
              <div className="holder-address">
                <h4>Holder Address</h4>
                <div>{account.holderAddress?.line1}</div>
                <div>{account.holderAddress?.line2}</div>
                <div>{account.holderAddress?.line3}</div>
                <div>{account.holderAddress?.city}, {account.holderAddress?.state} {account.holderAddress?.zipCode}</div>
                <div>{account.holderAddress?.countryCode}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="caps-summaries">
        <h2>CAPS Summaries</h2>
        <div className="caps-grid">
          <div className="caps-section">
            <h3>Total CAPS</h3>
            <div>Last 7 Days: {data.totalCAPSSummary?.last7Days}</div>
            <div>Last 30 Days: {data.totalCAPSSummary?.last30Days}</div>
            <div>Last 90 Days: {data.totalCAPSSummary?.last90Days}</div>
            <div>Last 180 Days: {data.totalCAPSSummary?.last180Days}</div>
          </div>
          <div className="caps-section">
            <h3>Credit CAPS</h3>
            <div>Last 7 Days: {data.creditCAPS?.last7Days}</div>
            <div>Last 30 Days: {data.creditCAPS?.last30Days}</div>
            <div>Last 90 Days: {data.creditCAPS?.last90Days}</div>
            <div>Last 180 Days: {data.creditCAPS?.last180Days}</div>
          </div>
          <div className="caps-section">
            <h3>Non-Credit CAPS</h3>
            <div>Last 7 Days: {data.nonCreditCAPS?.last7Days}</div>
            <div>Last 30 Days: {data.nonCreditCAPS?.last30Days}</div>
            <div>Last 90 Days: {data.nonCreditCAPS?.last90Days}</div>
            <div>Last 180 Days: {data.nonCreditCAPS?.last180Days}</div>
          </div>
        </div>
      </section>

      <section className="score">
        <h2>Bureau Score</h2>
        <div><strong>Score:</strong> {data.score?.bureauScore}</div>
        <div><strong>Confidence Level:</strong> {data.score?.confidenceLevel}</div>
      </section>
    </div>
  );
};

const App = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch('https://creditsea-app-9e2d.onrender.com/api/reports');  //http://localhost:5000/api/reports <<use this for computer run
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();

        // Assuming backend returns an array of reports
        if (Array.isArray(data) && data.length > 0) {
          setReport(data[data.length - 1]); // Show the latest report
        } else {
          setError('No reports found in database');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchReport();
  }, []);

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!report) return <p>Loading...</p>;

  return <CreditReport data={report} />;
};

export default App;