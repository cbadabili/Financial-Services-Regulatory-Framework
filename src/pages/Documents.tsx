import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Filter, Download, Eye, Calendar, Tag, Upload, FileText, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

const documents = [
  {
    id: 1,
    title: "Banking Act Amendment 2025",
    type: "Amendment",
    regulator: "Bank of Botswana (BoB)",
    date: "2025-01-10",
    status: "Active",
    category: "Banking Regulation",
    tags: ["Capital Requirements", "Risk Management"],
    size: "2.4 MB",
    views: 234,
    content: "The minimum capital adequacy ratio for commercial banks shall be fifteen percent (15%) of risk-weighted assets, of which at least ten percent (10%) shall be Tier 1 capital...",
    fullContent: `
      # Banking Act Amendment 2025
      ## Bank of Botswana (BoB)
      
      **Effective Date: January 10, 2025**
      **Document Reference: BoB/BA/2025/01**
      
      ### PART I: INTRODUCTION
      
      This amendment to the Banking Act introduces updated capital adequacy requirements for all commercial banks operating in Botswana. The amendments aim to strengthen the banking sector's resilience against financial shocks and align with international Basel III standards.
      
      ### PART II: CAPITAL REQUIREMENTS
      
      1. The minimum capital adequacy ratio for commercial banks shall be fifteen percent (15%) of risk-weighted assets, of which at least ten percent (10%) shall be Tier 1 capital.
      
      2. Systemically important banks, as designated by the Bank of Botswana, shall maintain an additional capital buffer of two percent (2%) above the minimum requirement.
      
      3. All banks must implement a capital conservation buffer of 2.5% of risk-weighted assets, to be comprised entirely of Common Equity Tier 1 capital.
      
      ### PART III: RISK MANAGEMENT FRAMEWORK
      
      1. Banks shall establish comprehensive risk management frameworks that address credit risk, market risk, operational risk, and liquidity risk.
      
      2. Quarterly stress tests must be conducted under various economic scenarios to ensure capital adequacy under adverse conditions.
      
      3. Risk management committees must meet at least monthly and report directly to the board of directors.
      
      ### PART IV: IMPLEMENTATION TIMELINE
      
      1. Banks must achieve compliance with the new capital adequacy requirements within 12 months of the effective date of this amendment.
      
      2. Quarterly progress reports must be submitted to the Bank of Botswana during the implementation period.
      
      ### PART V: PENALTIES FOR NON-COMPLIANCE
      
      1. Failure to meet the minimum capital requirements may result in restrictions on dividend payments, branch expansion, and new product offerings.
      
      2. Persistent non-compliance may lead to more severe regulatory actions, including mandatory capital raising, forced mergers, or revocation of banking license.
      
      ### CONTACT INFORMATION
      
      For inquiries regarding this amendment, please contact:
      
      Banking Supervision Department
      Bank of Botswana
      Private Bag 154
      Gaborone, Botswana
      Email: supervision@bob.bw
      Tel: +267 3606000
    `
  },
  {
    id: 2,
    title: "AML/CFT Guidelines for Banks",
    type: "Guideline",
    regulator: "Financial Intelligence Agency (FIA)",
    date: "2024-12-15",
    status: "Active",
    category: "Anti-Money Laundering",
    tags: ["AML", "CFT", "Due Diligence"],
    size: "1.8 MB",
    views: 456,
    content: "Financial institutions must implement enhanced due diligence measures for high-risk customers, including politically exposed persons (PEPs) and customers from high-risk jurisdictions...",
    fullContent: `
      # Anti-Money Laundering and Countering Financing of Terrorism Guidelines
      ## Financial Intelligence Agency (FIA) of Botswana
      
      **Issue Date: December 15, 2024**
      **Reference: FIA/AML/2024/03**
      
      ### 1. PURPOSE AND SCOPE
      
      These guidelines provide direction to financial institutions on implementing effective Anti-Money Laundering (AML) and Countering Financing of Terrorism (CFT) measures in accordance with the Financial Intelligence Act and international standards set by the Financial Action Task Force (FATF).
      
      ### 2. CUSTOMER DUE DILIGENCE REQUIREMENTS
      
      #### 2.1 Standard Due Diligence
      
      All financial institutions must:
      
      a) Verify the identity of customers using reliable, independent source documents
      b) Identify beneficial owners for legal entities
      c) Understand the purpose and intended nature of business relationships
      d) Conduct ongoing monitoring of business relationships and transactions
      
      #### 2.2 Enhanced Due Diligence
      
      Financial institutions must implement enhanced due diligence measures for high-risk customers, including:
      
      a) Politically Exposed Persons (PEPs)
      b) Customers from high-risk jurisdictions
      c) Correspondent banking relationships
      d) Complex ownership structures
      e) High-value transactions
      
      Enhanced measures must include senior management approval, source of wealth verification, and increased transaction monitoring.
      
      ### 3. TRANSACTION MONITORING AND REPORTING
      
      #### 3.1 Suspicious Transaction Reporting
      
      Financial institutions must report suspicious transactions to the FIA within 24 hours of forming suspicion. Reports must include:
      
      a) Customer identification details
      b) Transaction details
      c) Grounds for suspicion
      d) Supporting documentation
      
      #### 3.2 Cash Transaction Reporting
      
      All cash transactions exceeding BWP 10,000 must be reported to the FIA within 3 working days.
      
      ### 4. RECORD KEEPING
      
      Financial institutions must maintain all customer and transaction records for a minimum of 7 years after the termination of the business relationship or completion of the transaction.
      
      ### 5. COMPLIANCE PROGRAM
      
      Each financial institution must establish an AML/CFT compliance program that includes:
      
      a) Appointment of a compliance officer at management level
      b) Regular staff training
      c) Independent audit function
      d) Customer and transaction screening systems
      e) Risk assessment procedures
      
      ### 6. IMPLEMENTATION AND ENFORCEMENT
      
      These guidelines take immediate effect. Non-compliance may result in administrative penalties, restrictions on business activities, or criminal prosecution.
      
      ### CONTACT INFORMATION
      
      Financial Intelligence Agency
      Plot 50676, First Floor
      Fairgrounds Office Park
      Private Bag 0190
      Gaborone, Botswana
      Email: compliance@fia.gov.bw
      Tel: +267 3998400
    `
  },
  {
    id: 3,
    title: "Quarterly Risk Assessment Framework",
    type: "Framework",
    regulator: "Non-Bank Financial Institutions Regulatory Authority (NBFIRA)",
    date: "2024-11-30",
    status: "Active",
    category: "Risk Management",
    tags: ["Risk Assessment", "Quarterly Reporting"],
    size: "3.1 MB",
    views: 189,
    content: "Non-bank financial institutions must conduct quarterly risk assessments covering credit risk, operational risk, market risk, and liquidity risk with specific emphasis on emerging digital risks...",
    fullContent: `
      # Quarterly Risk Assessment Framework
      ## Non-Bank Financial Institutions Regulatory Authority (NBFIRA)
      
      **Publication Date: November 30, 2024**
      **Reference: NBFIRA/RF/2024/11**
      
      ### EXECUTIVE SUMMARY
      
      This framework establishes standardized procedures for quarterly risk assessments to be conducted by all non-bank financial institutions (NBFIs) operating under NBFIRA's regulatory purview. The framework aims to strengthen risk management practices, enhance financial stability, and protect consumers.
      
      ### 1. APPLICABILITY
      
      This framework applies to:
      - Insurance companies
      - Pension funds
      - Asset managers
      - Microlenders
      - Stock brokers and dealers
      - Collective investment undertakings
      - Financial advisory services
      
      ### 2. RISK ASSESSMENT REQUIREMENTS
      
      #### 2.1 Core Risk Categories
      
      Non-bank financial institutions must conduct quarterly risk assessments covering:
      
      a) **Credit Risk**: Assessment of counterparty default probabilities, concentration risk, and credit quality trends.
      
      b) **Operational Risk**: Evaluation of process failures, human errors, system failures, and external events that could disrupt operations.
      
      c) **Market Risk**: Analysis of exposure to interest rate fluctuations, currency movements, equity price changes, and commodity price volatility.
      
      d) **Liquidity Risk**: Assessment of the institution's ability to meet short-term obligations without incurring unacceptable losses.
      
      e) **Digital Risk**: Specific emphasis on cybersecurity threats, digital transformation challenges, and technology dependencies.
      
      #### 2.2 Emerging Risk Areas
      
      Institutions must also assess:
      
      a) Climate-related financial risks
      b) Geopolitical risks affecting financial markets
      c) Regulatory compliance risks
      d) Reputational risks
      
      ### 3. ASSESSMENT METHODOLOGY
      
      #### 3.1 Risk Identification
      
      Institutions must maintain a comprehensive risk register that is updated quarterly.
      
      #### 3.2 Risk Measurement
      
      Each identified risk must be assessed using:
      
      a) Impact rating (1-5 scale)
      b) Probability rating (1-5 scale)
      c) Risk score (impact × probability)
      
      #### 3.3 Risk Mitigation
      
      For risks with scores above the institution's risk appetite threshold:
      
      a) Develop specific mitigation strategies
      b) Assign responsible officers
      c) Set implementation timelines
      d) Define success metrics
      
      ### 4. REPORTING REQUIREMENTS
      
      #### 4.1 Quarterly Risk Reports
      
      Institutions must submit quarterly risk assessment reports to NBFIRA within 30 days of each quarter-end, containing:
      
      a) Executive summary
      b) Risk heat map
      c) Top 10 risks with mitigation plans
      d) Emerging risk trends
      e) Risk appetite statement compliance
      f) Key risk indicators
      
      #### 4.2 Board Approval
      
      All quarterly risk reports must be reviewed and approved by the institution's board or risk committee before submission.
      
      ### 5. IMPLEMENTATION TIMELINE
      
      - First quarter 2025: Initial implementation
      - Second quarter 2025: Full compliance expected
      
      ### 6. ENFORCEMENT
      
      Non-compliance with this framework may result in:
      
      a) Written warnings
      b) Compliance directives
      c) Financial penalties
      d) Enhanced supervision
      e) License restrictions
      
      ### CONTACT INFORMATION
      
      Risk Supervision Department
      NBFIRA House
      Plot 54351, CBD
      Private Bag 00314
      Gaborone, Botswana
      Email: risk@nbfira.org.bw
      Tel: +267 3102595
    `
  },
  {
    id: 4,
    title: "ESG Reporting Standards",
    type: "Standard",
    regulator: "Botswana Stock Exchange (BSE)",
    date: "2024-10-20",
    status: "Draft",
    category: "ESG Compliance",
    tags: ["ESG", "Environmental", "Social", "Governance"],
    size: "4.2 MB",
    views: 78,
    content: "Listed companies must disclose environmental impact metrics, social responsibility initiatives, and governance structures in accordance with the BSE ESG Reporting Guidelines...",
    fullContent: `
      # Environmental, Social, and Governance (ESG) Reporting Standards
      ## Botswana Stock Exchange (BSE)
      
      **Draft Version: October 20, 2024**
      **Reference: BSE/ESG/2024/01**
      
      ### PREAMBLE
      
      The Botswana Stock Exchange (BSE) recognizes the growing importance of Environmental, Social, and Governance (ESG) factors in investment decision-making and corporate sustainability. These standards establish a comprehensive framework for ESG reporting by listed companies to enhance transparency, comparability, and accountability.
      
      ### PART A: GENERAL PROVISIONS
      
      #### 1. Purpose
      
      These standards aim to:
      
      a) Promote sustainable business practices
      b) Enhance transparency in ESG performance
      c) Facilitate informed investment decisions
      d) Align with international sustainability reporting frameworks
      
      #### 2. Applicability
      
      These standards apply to all companies listed on the Botswana Stock Exchange. Companies are required to comply on a "comply or explain" basis.
      
      ### PART B: ENVIRONMENTAL REPORTING REQUIREMENTS
      
      Listed companies must disclose:
      
      #### 1. Climate Change
      
      a) Greenhouse gas emissions (Scope 1, 2, and where possible, Scope 3)
      b) Climate-related risks and opportunities
      c) Emission reduction targets and strategies
      d) Energy consumption and efficiency measures
      
      #### 2. Natural Resource Management
      
      a) Water usage, recycling, and discharge
      b) Land use and biodiversity impact
      c) Waste management and circular economy initiatives
      
      ### PART C: SOCIAL REPORTING REQUIREMENTS
      
      Listed companies must disclose:
      
      #### 1. Human Capital
      
      a) Employee diversity and inclusion metrics
      b) Occupational health and safety performance
      c) Training and development programs
      d) Labor practices and human rights policies
      
      #### 2. Community Impact
      
      a) Community engagement initiatives
      b) Local economic impact
      c) Indigenous peoples' rights (where applicable)
      d) Corporate social responsibility programs
      
      ### PART D: GOVERNANCE REPORTING REQUIREMENTS
      
      Listed companies must disclose:
      
      #### 1. Board Structure and Oversight
      
      a) Board composition, diversity, and independence
      b) Committee structures and responsibilities
      c) ESG oversight mechanisms
      d) Executive compensation linked to ESG performance
      
      #### 2. Ethics and Compliance
      
      a) Code of conduct and ethics policies
      b) Anti-corruption and anti-bribery measures
      c) Whistleblower protection mechanisms
      d) Tax transparency
      
      ### PART E: REPORTING FORMAT AND FREQUENCY
      
      #### 1. Format
      
      Companies may choose one of the following reporting formats:
      
      a) Standalone ESG report
      b) Integrated annual report with ESG section
      c) Online ESG disclosure portal
      
      #### 2. Frequency
      
      ESG reports must be published annually, coinciding with the company's financial reporting cycle.
      
      ### PART F: IMPLEMENTATION TIMELINE
      
      - First reporting cycle: Financial year beginning on or after January 1, 2025
      - Full compliance expected by December 31, 2026
      
      ### CONTACT INFORMATION
      
      Listings and Trading Department
      Botswana Stock Exchange
      Plot 70667, Fairscape Precinct
      Private Bag 00417
      Gaborone, Botswana
      Email: listings@bse.co.bw
      Tel: +267 3674400
    `
  },
  {
    id: 5,
    title: "Stress Testing Requirements",
    type: "Requirement",
    regulator: "Bank of Botswana (BoB)",
    date: "2024-09-12",
    status: "Active",
    category: "Stress Testing",
    tags: ["Stress Testing", "Capital Planning"],
    size: "2.9 MB",
    views: 312,
    content: "Banks must conduct annual stress tests under various economic scenarios including severe recession, currency depreciation, and liquidity crises to ensure capital adequacy under adverse conditions...",
    fullContent: `
      # Stress Testing Requirements for Banking Institutions
      ## Bank of Botswana (BoB)
      
      **Effective Date: September 12, 2024**
      **Reference: BoB/STR/2024/09**
      
      ### I. INTRODUCTION
      
      This directive establishes comprehensive stress testing requirements for all banking institutions licensed to operate in Botswana. These requirements aim to enhance financial stability by ensuring banks maintain adequate capital and liquidity under adverse economic conditions.
      
      ### II. LEGAL BASIS
      
      These requirements are issued pursuant to Section 24(1)(c) of the Banking Act, which empowers the Bank of Botswana to issue directives to ensure the safety and soundness of the banking system.
      
      ### III. SCOPE OF APPLICATION
      
      These requirements apply to:
      
      1. All commercial banks licensed under the Banking Act
      2. Systemically important financial institutions as designated by the Bank of Botswana
      
      ### IV. STRESS TESTING PROGRAM REQUIREMENTS
      
      #### A. Governance
      
      1. Banks must establish a stress testing committee comprising senior management representatives from risk, finance, treasury, and business units.
      
      2. The board of directors must approve the stress testing framework and review results at least annually.
      
      3. Clear roles and responsibilities must be defined for all parties involved in the stress testing process.
      
      #### B. Methodology
      
      Banks must conduct stress tests using:
      
      1. **Sensitivity Analysis**: Testing the impact of movements in individual risk factors.
      
      2. **Scenario Analysis**: Testing the impact of plausible but severe macroeconomic and financial market scenarios.
      
      3. **Reverse Stress Testing**: Identifying scenarios that could cause business failure.
      
      #### C. Mandatory Scenarios
      
      At minimum, banks must test the following scenarios:
      
      1. **Severe Domestic Recession**: GDP decline of at least 5%, unemployment increase of 7 percentage points, property price decline of 30%.
      
      2. **Currency Depreciation**: Pula depreciation of 25% against major trading currencies.
      
      3. **Liquidity Crisis**: Deposit outflows of 15% within 30 days, 50% reduction in wholesale funding availability.
      
      4. **Combined Scenario**: Combination of economic downturn, currency depreciation, and liquidity pressures.
      
      5. **Bank-Specific Scenario**: Based on the bank's unique risk profile and business model.
      
      #### D. Risk Coverage
      
      Stress tests must cover:
      
      1. Credit risk (including concentration risk)
      2. Market risk
      3. Interest rate risk in the banking book
      4. Liquidity risk
      5. Operational risk
      6. Strategic and reputational risks
      
      ### V. FREQUENCY AND REPORTING
      
      1. **Annual Comprehensive Stress Test**: Banks must conduct a comprehensive stress test annually, with results submitted to the Bank of Botswana by March 31 each year.
      
      2. **Quarterly Sensitivity Tests**: Banks must conduct sensitivity tests quarterly for key risk factors.
      
      3. **Ad-hoc Stress Tests**: The Bank of Botswana may require additional stress tests during periods of market turbulence or bank-specific concerns.
      
      ### VI. CAPITAL AND LIQUIDITY PLANNING
      
      1. Stress test results must be integrated into banks' capital and liquidity planning processes.
      
      2. Banks must maintain capital buffers sufficient to withstand the severe stress scenarios.
      
      3. Contingency funding plans must address liquidity shortfalls identified in stress tests.
      
      ### VII. REMEDIAL ACTIONS
      
      If stress test results indicate capital inadequacy under stress scenarios, banks must:
      
      1. Submit a capital remediation plan within 30 days
      2. Implement measures to strengthen capital position
      3. Consider dividend restrictions until capital adequacy is restored
      
      ### VIII. IMPLEMENTATION TIMELINE
      
      - September 2024: Framework adoption
      - December 2024: First test run
      - March 2025: First official submission
      
      ### CONTACT INFORMATION
      
      Banking Supervision Department
      Bank of Botswana
      Private Bag 154
      Gaborone, Botswana
      Email: supervision@bob.bw
      Tel: +267 3606000
    `
  },
  {
    id: 6,
    title: "Company Registration Guidelines for FinTechs",
    type: "Guideline",
    regulator: "Companies and Intellectual Property Authority (CIPA)",
    date: "2024-08-15",
    status: "Active",
    category: "Business Registration",
    tags: ["FinTech", "Registration", "Intellectual Property"],
    size: "1.7 MB",
    views: 245,
    content: "FinTech companies must provide detailed beneficial ownership information, business model documentation, and intellectual property declarations during the registration process...",
    fullContent: `
      # Company Registration Guidelines for FinTech Entities
      ## Companies and Intellectual Property Authority (CIPA)
      
      **Issue Date: August 15, 2024**
      **Reference: CIPA/FT/2024/08**
      
      ### SECTION 1: INTRODUCTION
      
      These guidelines provide specific requirements for the registration of Financial Technology (FinTech) companies in Botswana. They supplement the general company registration requirements under the Companies Act and address the unique characteristics and regulatory considerations applicable to FinTech entities.
      
      ### SECTION 2: DEFINITIONS
      
      For the purposes of these guidelines:
      
      a) "FinTech" refers to businesses that use technology to provide financial services or to facilitate financial transactions.
      
      b) "Beneficial owner" means a natural person who ultimately owns or controls a legal entity through direct or indirect ownership of shares, voting rights, or other means.
      
      c) "Regulatory sandbox" refers to a framework that allows FinTech startups and other innovators to conduct live experiments in a controlled environment under a regulator's supervision.
      
      ### SECTION 3: REGISTRATION REQUIREMENTS
      
      #### 3.1 Standard Documentation
      
      In addition to standard company registration requirements, FinTech companies must submit:
      
      a) Detailed business plan specifying:
         - Technology infrastructure
         - Financial services to be offered
         - Target market
         - Risk management framework
         - Compliance strategy
      
      b) Technical documentation of platforms or applications
      
      c) Cybersecurity and data protection policies
      
      d) Disaster recovery and business continuity plans
      
      #### 3.2 Beneficial Ownership Information
      
      FinTech companies must provide:
      
      a) Complete identification details of all beneficial owners holding 5% or more ownership
      
      b) Corporate structure diagram showing ownership chains and percentages
      
      c) Declaration of politically exposed persons (PEPs) among shareholders or beneficial owners
      
      d) Source of funds documentation for major capital contributions
      
      #### 3.3 Intellectual Property Declarations
      
      Applicants must submit:
      
      a) Inventory of all intellectual property assets
      
      b) Evidence of ownership or right to use key technologies
      
      c) Patent applications or registrations (if applicable)
      
      d) Trademark registrations or applications
      
      e) Software licensing agreements
      
      ### SECTION 4: REGULATORY COORDINATION
      
      #### 4.1 Multi-Regulatory Approach
      
      CIPA will coordinate with relevant financial regulators based on the FinTech's activities:
      
      a) Bank of Botswana - for payment systems, digital currencies, or banking services
      
      b) Non-Bank Financial Institutions Regulatory Authority - for investment platforms, digital lending, or insurance technologies
      
      c) Botswana Communications Regulatory Authority - for telecommunications aspects
      
      d) Financial Intelligence Agency - for AML/CFT compliance
      
      #### 4.2 Regulatory Sandbox Participation
      
      Eligible FinTech startups may apply for the Regulatory Sandbox Program through CIPA, which will facilitate referrals to appropriate regulatory authorities.
      
      ### SECTION 5: ONGOING COMPLIANCE
      
      Registered FinTech companies must:
      
      a) Submit annual technology audit reports
      
      b) Update beneficial ownership information within 14 days of any change
      
      c) Renew intellectual property declarations annually
      
      d) Report material changes to business model or technology infrastructure
      
      ### SECTION 6: FEES AND TIMELINES
      
      a) Standard company registration fees apply
      
      b) Additional FinTech assessment fee: BWP 5,000
      
      c) Processing time: 10 working days from complete submission
      
      ### SECTION 7: IMPLEMENTATION
      
      These guidelines take immediate effect for new registrations. Existing FinTech companies must comply within 90 days.
      
      ### CONTACT INFORMATION
      
      FinTech Registration Unit
      Companies and Intellectual Property Authority
      Plot 54351, CBD
      Private Bag 00699
      Gaborone, Botswana
      Email: fintech@cipa.co.bw
      Tel: +267 3673700
    `
  },
  {
    id: 7,
    title: "Tax Reporting Framework for Financial Services",
    type: "Framework",
    regulator: "Botswana Unified Revenue Service (BURS)",
    date: "2024-07-22",
    status: "Active",
    category: "Tax Compliance",
    tags: ["Tax", "Reporting", "VAT"],
    size: "2.3 MB",
    views: 178,
    content: "Financial institutions must file quarterly VAT returns and annual Corporate Income Tax (CIT) returns with special considerations for financial services with mixed taxable and exempt supplies...",
    fullContent: `
      # Tax Reporting Framework for Financial Services Sector
      ## Botswana Unified Revenue Service (BURS)
      
      **Effective Date: July 22, 2024**
      **Reference: BURS/FS/2024/07**
      
      ### PART I: INTRODUCTION
      
      This framework establishes specialized tax reporting requirements for entities operating in the financial services sector in Botswana. It addresses the unique tax considerations applicable to financial institutions and provides guidance on compliance with tax obligations under the Income Tax Act and Value Added Tax Act.
      
      ### PART II: SCOPE OF APPLICATION
      
      This framework applies to:
      
      1. Commercial banks
      2. Insurance companies
      3. Asset management firms
      4. Pension funds
      5. Microfinance institutions
      6. Investment banks
      7. Financial technology (FinTech) companies
      8. Securities brokers and dealers
      9. Foreign exchange bureaus
      10. Any other entities providing financial services as defined in the VAT Act
      
      ### PART III: CORPORATE INCOME TAX REPORTING
      
      #### A. Filing Requirements
      
      1. **Annual Returns**: Financial institutions must file annual Corporate Income Tax (CIT) returns by the last day of the fourth month following the end of the tax year.
      
      2. **Provisional Tax**: Quarterly provisional tax payments are required based on estimated annual taxable income.
      
      3. **Special Returns**: Financial institutions with annual turnover exceeding BWP 50 million must submit enhanced financial statements with detailed breakdowns of income streams.
      
      #### B. Deduction Considerations
      
      1. **Specific Provisions**: Guidelines for tax treatment of loan loss provisions, unearned premium reserves, and outstanding claims reserves.
      
      2. **Capital Allowances**: Accelerated depreciation rates for technology infrastructure and digital platforms.
      
      3. **Research and Development**: Enhanced deductions for qualifying FinTech innovation activities.
      
      ### PART IV: VALUE ADDED TAX (VAT) REPORTING
      
      #### A. Mixed Supplies Treatment
      
      Financial institutions must:
      
      1. Clearly distinguish between exempt financial services and taxable services.
      
      2. Apply partial input tax recovery methods for mixed supplies.
      
      3. Document the apportionment methodology used for input tax claims.
      
      #### B. Filing Requirements
      
      1. **Quarterly VAT Returns**: Due by the 25th day following the end of each quarter.
      
      2. **Annual Adjustment**: Reconciliation of provisional input tax recovery ratios with final calculations.
      
      3. **Digital Services**: Special reporting for electronically supplied financial services.
      
      #### C. Documentation Requirements
      
      1. Maintain transaction-level records of exempt and taxable supplies.
      
      2. Document input tax apportionment calculations.
      
      3. Retain customer verification records for zero-rated international services.
      
      ### PART V: WITHHOLDING TAX OBLIGATIONS
      
      Financial institutions must withhold and remit taxes on:
      
      1. Interest payments to non-residents (15%)
      
      2. Management and technical service fees (15%)
      
      3. Dividends (7.5% for residents, 10% for non-residents)
      
      4. Commissions paid to non-employees (10%)
      
      ### PART VI: INTERNATIONAL TAX CONSIDERATIONS
      
      #### A. Transfer Pricing
      
      Financial institutions engaging in cross-border related party transactions must:
      
      1. Maintain contemporaneous transfer pricing documentation
      
      2. Apply arm's length principles to all intra-group transactions
      
      3. Submit annual transfer pricing declarations for transactions exceeding BWP 5 million
      
      #### B. Exchange of Information
      
      Financial institutions must comply with:
      
      1. Foreign Account Tax Compliance Act (FATCA) reporting
      
      2. Common Reporting Standard (CRS) requirements
      
      3. Country-by-Country reporting for multinational groups
      
      ### PART VII: DIGITAL ECONOMY TAXATION
      
      1. **Digital Platforms**: Special registration and reporting requirements for digital financial platforms.
      
      2. **Cryptocurrency Transactions**: Reporting obligations for virtual asset service providers.
      
      3. **Electronic Money Issuers**: Tax treatment of e-money and mobile money services.
      
      ### PART VIII: PENALTIES AND ENFORCEMENT
      
      1. Late filing penalties: 1% of tax due per month (maximum 24%)
      
      2. Late payment penalties: 1.5% per month compound interest
      
      3. Understatement penalties: 10% to 200% based on behavior
      
      ### CONTACT INFORMATION
      
      Large Taxpayers Unit - Financial Services Division
      Botswana Unified Revenue Service
      Plot 53976, Kudumatse Road
      Private Bag 0013
      Gaborone, Botswana
      Email: financialservices@burs.org.bw
      Tel: +267 3639500
    `
  },
  {
    id: 8,
    title: "Consumer Protection Standards for Digital Financial Services",
    type: "Standard",
    regulator: "Competition and Consumer Authority (CCA)",
    date: "2024-06-18",
    status: "Active",
    category: "Consumer Protection",
    tags: ["Consumer Rights", "Digital Services", "Fair Treatment"],
    size: "3.5 MB",
    views: 203,
    content: "Digital financial service providers must ensure clear terms and conditions, transparent fee structures, and accessible complaint resolution mechanisms for all services offered to consumers...",
    fullContent: `
      # Consumer Protection Standards for Digital Financial Services
      ## Competition and Consumer Authority (CCA)
      
      **Publication Date: June 18, 2024**
      **Reference: CCA/DFS/2024/06**
      
      ### FOREWORD
      
      As digital financial services continue to transform Botswana's financial landscape, ensuring consumer protection becomes increasingly important. These standards establish minimum requirements for fair treatment of consumers using digital financial services, promoting transparency, responsible business conduct, and effective redress mechanisms.
      
      ### CHAPTER 1: GENERAL PROVISIONS
      
      #### 1.1 Purpose and Objectives
      
      These standards aim to:
      
      a) Protect consumers of digital financial services
      b) Promote fair and equitable treatment
      c) Ensure transparency and disclosure
      d) Establish effective complaint handling mechanisms
      e) Prevent unfair business practices
      
      #### 1.2 Scope of Application
      
      These standards apply to all entities providing digital financial services in Botswana, including:
      
      a) Mobile money providers
      b) Digital banks
      c) Payment service providers
      d) Digital lending platforms
      e) Online insurance services
      f) Digital investment platforms
      g) Cryptocurrency exchanges and services
      
      ### CHAPTER 2: DISCLOSURE AND TRANSPARENCY
      
      #### 2.1 Pre-contractual Information
      
      Service providers must disclose:
      
      a) Complete fee structure, including all charges and commissions
      b) Interest rates and calculation methods for credit products
      c) Exchange rates and margins for currency transactions
      d) Terms and conditions in clear, simple language
      e) Cooling-off periods where applicable
      
      #### 2.2 Format Requirements
      
      a) Information must be provided in both English and Setswana
      b) Font size must be at least 10 points
      c) Key terms must be highlighted or bolded
      d) Digital interfaces must ensure information is easily accessible
      e) Terms and conditions must be downloadable for future reference
      
      #### 2.3 Transaction Information
      
      For each transaction, providers must provide:
      
      a) Transaction confirmation with unique reference number
      b) Breakdown of all fees and charges
      c) Exchange rates applied (if applicable)
      d) Date and time of transaction
      e) Contact information for transaction queries
      
      ### CHAPTER 3: FAIR TREATMENT
      
      #### 3.1 Responsible Product Design
      
      Digital financial products must:
      
      a) Meet identified consumer needs
      b) Be tested for usability before launch
      c) Include safeguards against consumer harm
      d) Consider accessibility for persons with disabilities
      e) Provide clear exit mechanisms
      
      #### 3.2 Responsible Marketing
      
      Marketing communications must:
      
      a) Be accurate and not misleading
      b) Clearly distinguish promotional offers from standard services
      c) Not target vulnerable consumers inappropriately
      d) Include all material conditions for promotional offers
      e) Be clearly identifiable as marketing
      
      #### 3.3 Fair Pricing
      
      Service providers must:
      
      a) Ensure pricing is reasonable and proportionate to the service
      b) Not impose hidden charges
      c) Provide advance notice of price changes
      d) Allow termination without penalty when prices increase
      e) Not discriminate unfairly between consumer segments
      
      ### CHAPTER 4: DATA PROTECTION AND PRIVACY
      
      #### 4.1 Consent Requirements
      
      Service providers must:
      
      a) Obtain explicit consent for data collection and use
      b) Allow consumers to withdraw consent easily
      c) Provide granular consent options for different data uses
      d) Renew consent periodically for ongoing data collection
      e) Document all consent obtained
      
      #### 4.2 Data Security
      
      Service providers must:
      
      a) Implement robust security measures to protect consumer data
      b) Conduct regular security audits and tests
      c) Notify consumers promptly of security breaches
      d) Limit data retention to necessary periods
      e) Ensure secure data disposal
      
      ### CHAPTER 5: COMPLAINT RESOLUTION
      
      #### 5.1 Internal Complaint Handling
      
      Service providers must:
      
      a) Establish accessible complaint channels (including toll-free numbers)
      b) Acknowledge complaints within 24 hours
      c) Resolve complaints within 7 working days
      d) Provide written explanations for decisions
      e) Maintain complaint records for at least 7 years
      
      #### 5.2 Escalation Procedures
      
      When complaints are not resolved satisfactorily:
      
      a) Consumers must be informed of escalation options
      b) Contact information for the CCA must be provided
      c) No fees may be charged for complaint escalation
      d) Service providers must cooperate with external mediators
      e) Decisions by the Financial Dispute Resolution Service are binding
      
      ### CHAPTER 6: IMPLEMENTATION AND ENFORCEMENT
      
      #### 6.1 Compliance Timeline
      
      a) Existing providers: Full compliance within 6 months
      b) New market entrants: Immediate compliance
      
      #### 6.2 Penalties for Non-compliance
      
      a) Written warnings for minor violations
      b) Compliance orders with specific remedial actions
      c) Administrative penalties up to 10% of annual turnover
      d) Consumer compensation orders
      e) Publication of non-compliance notices
      
      ### CONTACT INFORMATION
      
      Consumer Protection Division
      Competition and Consumer Authority
      Plot 4706, Luthuli Road
      Private Bag 00101
      Gaborone, Botswana
      Email: consumerprotection@cca.co.bw
      Tel: +267 3934278
      Consumer Helpline: 0800 600 216
    `
  },
  {
    id: 9,
    title: "Cybersecurity Standards for Financial Institutions",
    type: "Standard",
    regulator: "Botswana Communications Regulatory Authority (BOCRA)",
    date: "2024-05-10",
    status: "Active",
    category: "Cybersecurity",
    tags: ["Cybersecurity", "Data Protection", "Digital Security"],
    size: "4.8 MB",
    views: 289,
    content: "All financial institutions offering digital services must implement the minimum cybersecurity standards outlined in the National Cybersecurity Framework, including regular penetration testing...",
    fullContent: `
      # Cybersecurity Standards for Financial Institutions
      ## Botswana Communications Regulatory Authority (BOCRA)
      
      **Effective Date: May 10, 2024**
      **Reference: BOCRA/CS/2024/05**

      ### SECTION I: INTRODUCTION

      These standards establish minimum cybersecurity requirements for financial institutions operating in Botswana. They aim to enhance the security and resilience of the financial sector against cyber threats, protect customer data, and maintain confidence in the financial system.
      
      ### SECTION II: LEGAL FOUNDATION
      
      These standards are issued pursuant to:
      
      1. Communications Regulatory Authority Act, 2012
      2. Electronic Communications and Transactions Act, 2014
      3. Data Protection Act, 2018
      4. National Cybersecurity Strategy, 2023-2028
      
      ### SECTION III: APPLICABILITY
      
      These standards apply to:
      
      1. Commercial banks
      2. Microfinance institutions
      3. Insurance companies
      4. Payment service providers
      5. Mobile money operators
      6. Digital lending platforms
      7. Online investment services
      8. Cryptocurrency exchanges
      9. Any other financial institution offering digital services
      
      ### SECTION IV: GOVERNANCE REQUIREMENTS
      
      #### A. Board and Senior Management Responsibilities
      
      1. The board of directors must:
         a) Approve cybersecurity strategy and policy
         b) Ensure adequate resource allocation
         c) Review cybersecurity posture quarterly
         d) Appoint a qualified Chief Information Security Officer (CISO)
      
      2. Senior management must:
         a) Implement board-approved cybersecurity policies
         b) Establish clear accountability for cybersecurity
         c) Ensure regular reporting on cybersecurity status
         d) Integrate cybersecurity into business decisions
      
      #### B. Cybersecurity Function
      
      1. Institutions must establish an independent cybersecurity function
      2. The CISO must report directly to the CEO or board
      3. Segregation of duties between IT operations and security
      4. Adequate staffing with certified security professionals
      
      ### SECTION V: RISK MANAGEMENT
      
      #### A. Risk Assessment
      
      1. Annual comprehensive cybersecurity risk assessment
      2. Quarterly reviews of emerging threats
      3. Assessment of third-party and supply chain risks
      4. Documentation of risk assessment methodology and results
      
      #### B. Risk Treatment
      
      1. Risk treatment plans for all identified high and medium risks
      2. Clear timelines for risk mitigation
      3. Residual risk acceptance by appropriate authority
      4. Regular tracking of risk treatment progress
      
      ### SECTION VI: TECHNICAL CONTROLS
      
      #### A. Access Control
      
      1. Implementation of least privilege principle
      2. Multi-factor authentication for all privileged access
      3. Multi-factor authentication for customer accounts
      4. Regular access rights review and certification
      5. Privileged access management solution
      
      #### B. Data Protection
      
      1. Encryption of sensitive data in transit and at rest
      2. Data loss prevention controls
      3. Secure data disposal procedures
      4. Data classification and handling procedures
      5. Database activity monitoring
      
      #### C. Network Security
      
      1. Network segmentation with security zones
      2. Next-generation firewalls with application control
      3. Intrusion detection/prevention systems
      4. Regular network vulnerability scanning
      5. Secure remote access solutions
      
      #### D. Endpoint Security
      
      1. Advanced endpoint protection solutions
      2. Application whitelisting for critical systems
      3. Mobile device management
      4. Endpoint encryption
      5. Regular patch management
      
      ### SECTION VII: SECURITY OPERATIONS
      
      #### A. Monitoring and Detection
      
      1. 24/7 security monitoring capability
      2. Security information and event management (SIEM) solution
      3. User and entity behavior analytics
      4. Threat intelligence integration
      5. Automated alert correlation and prioritization
      
      #### B. Incident Response
      
      1. Documented incident response plan
      2. Establishment of computer security incident response team
      3. Regular incident response testing
      4. Post-incident analysis and lessons learned
      5. Mandatory reporting of significant incidents to BOCRA within 24 hours
      
      ### SECTION VIII: TESTING AND ASSURANCE
      
      1. Annual penetration testing by independent providers
      2. Quarterly vulnerability assessments
      3. Regular red team exercises for institutions with assets exceeding BWP 1 billion
      4. Code security reviews for in-house applications
      5. Security testing before system deployment
      
      ### SECTION IX: THIRD-PARTY SECURITY
      
      1. Security requirements in third-party contracts
      2. Pre-engagement security assessments
      3. Ongoing monitoring of third-party security
      4. Right to audit provisions
      5. Incident notification requirements
      
      ### SECTION X: AWARENESS AND TRAINING
      
      1. Annual cybersecurity awareness training for all staff
      2. Specialized training for IT and security personnel
      3. Regular phishing simulations
      4. Board and executive cybersecurity education
      5. Customer awareness programs
      
      ### SECTION XI: COMPLIANCE AND REPORTING
      
      1. Annual compliance self-assessment
      2. Submission of compliance reports to BOCRA by March 31 each year
      3. Independent cybersecurity audits every two years
      4. Notification of material changes to security infrastructure
      5. Regulatory examinations as determined by BOCRA
      
      ### SECTION XII: IMPLEMENTATION TIMELINE
      
      1. Large institutions (assets > BWP 10 billion): 6 months
      2. Medium institutions (assets BWP 1-10 billion): 12 months
      3. Small institutions (assets < BWP 1 billion): 18 months
      
      ### CONTACT INFORMATION
      
      Cybersecurity Department
      Botswana Communications Regulatory Authority
      Plot 206/207, Independence Avenue
      Private Bag 00495
      Gaborone, Botswana
      Email: cybersecurity@bocra.org.bw
      Tel: +267 3957755
      Incident Reporting: incidents@bocra.org.bw
    `
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "secondary";
    case "Draft": return "outline";
    case "Archived": return "destructive";
    default: return "secondary";
  }
};

const getRegulatorColor = (regulator: string) => {
  if (regulator.includes("BoB")) return "blue";
  if (regulator.includes("NBFIRA")) return "green";
  if (regulator.includes("BSE")) return "orange";
  if (regulator.includes("FIA")) return "purple";
  if (regulator.includes("CIPA")) return "cyan";
  if (regulator.includes("BURS")) return "red";
  if (regulator.includes("CCA")) return "yellow";
  if (regulator.includes("BOCRA")) return "indigo";
  return "primary";
};

// Enhanced download function with better reliability and error handling
const handleDownload = (document: typeof documents[0]) => {
  // timeout helper so user isn't left waiting forever
  const withTimeout = <T,>(promise: Promise<T>, ms = 7000) =>
    Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), ms)
      ),
    ]);

  const run = async () => {
    // Decide file extension & mime type
    const inferredExt =
      document.title.toLowerCase().endsWith(".pdf")
        ? "pdf"
        : document.title.toLowerCase().endsWith(".md")
        ? "md"
        : "txt";
    const mimeMap: Record<string, string> = {
      pdf: "application/pdf",
      md: "text/markdown;charset=utf-8",
      txt: "text/plain;charset=utf-8",
    };

    // Compose content – for PDF we still export txt fallback
    const fileContent =
      inferredExt === "pdf"
        ? [
            "This is a placeholder text export generated from the portal.",
            "",
            document.fullContent || document.content,
          ].join("\n\n")
        : [
            `# ${document.title}`,
            `## ${document.regulator}`,
            `Date: ${document.date}`,
            `Category: ${document.category}`,
            `Type: ${document.type}`,
            `Status: ${document.status}`,
            `Tags: ${document.tags.join(", ")}`,
            "\n" + "-".repeat(80) + "\n",
            document.fullContent || document.content,
          ].join("\n\n");

    let blob: Blob;
    try {
      blob = new Blob([fileContent], { type: mimeMap[inferredExt] });
    } catch (err) {
      console.error("Blob creation failed:", err);
      throw new Error("Unable to create document blob");
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${document.title.replace(/[^a-zA-Z0-9]/g, "_")}.${inferredExt}`;

    document.body.appendChild(a);
    try {
      a.click();
    } catch (err) {
      console.error("Link click failed:", err);
      throw new Error("Browser prevented automatic download");
    } finally {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  withTimeout(run())
    .then(() =>
      toast({
        title: "Download started",
        description: `${document.title} is downloading...`,
      })
    )
    .catch((err: unknown) => {
      console.error("Download error:", err);
      toast({
        title: "Download failed",
        description:
          err instanceof Error ? err.message : "Unexpected error occurred",
        variant: "destructive",
      });
    });
};

export default function Documents() {
  /* ------------------------------------------------------------------ */
  /* Local state so new uploads appear instantly                         */
  /* ------------------------------------------------------------------ */
  const [docs, setDocs] = useState<typeof documents>(documents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegulator, setSelectedRegulator] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewDocument, setViewDocument] = useState<typeof documents[0] | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  /* Form fields for new document */
  const [newTitle, setNewTitle] = useState("");
  const [newRegulator, setNewRegulator] = useState("Bank of Botswana (BoB)");
  const [newCategory, setNewCategory] = useState("Banking Regulation");
  const [newFile, setNewFile] = useState<File | null>(null);
  const { hasPermission, isAuthenticated } = useAuth();

  // Filter documents based on search and filters
  const filteredDocuments = docs.filter((doc) => {
    const matchesSearch = searchTerm === "" || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRegulator = selectedRegulator === "all" || 
      doc.regulator.toLowerCase().includes(selectedRegulator.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      doc.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesRegulator && matchesCategory;
  });

  // Check if user has admin permission before allowing upload
  const handleUpload = () => {
    if (hasPermission('admin_access')) {
      setShowUploadModal(true);
    } else {
      toast({
        title: "Permission denied",
        description: "Only administrators can upload documents.",
        variant: "destructive"
      });
    }
  };

  const handleSaveNewDoc = () => {
    if (!newTitle || !newFile) {
      toast({ title: "Missing fields", description: "Please provide title and file." });
      return;
    }
    
    // Create sample full content for the uploaded document
    const sampleFullContent = `
      # ${newTitle}
      ## ${newRegulator}
      
      **Upload Date: ${new Date().toISOString().slice(0, 10)}**
      **Reference: ${newRegulator.split(' ')[0]}/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}**
      
      ### SECTION 1: INTRODUCTION
      
      This document provides regulatory guidance for financial institutions operating in Botswana. It outlines key requirements, compliance procedures, and implementation timelines.
      
      ### SECTION 2: SCOPE AND APPLICABILITY
      
      These regulations apply to all financial institutions operating under the jurisdiction of ${newRegulator}.
      
      ### SECTION 3: KEY REQUIREMENTS
      
      1. Financial institutions must maintain adequate capital reserves
      2. Regular reporting is required on a quarterly basis
      3. Risk management frameworks must be implemented and documented
      4. Customer data protection measures must meet minimum security standards
      
      ### SECTION 4: COMPLIANCE TIMELINE
      
      - Initial assessment: Within 30 days
      - Implementation plan: Within 60 days
      - Full compliance: Within 6 months
      
      ### SECTION 5: REPORTING REQUIREMENTS
      
      Detailed reporting templates are provided in the appendices. Reports must be submitted through the regulatory portal by the 15th of each month.
      
      ### CONTACT INFORMATION
      
      Compliance Department
      ${newRegulator}
      Email: compliance@${newRegulator.split(' ')[0].toLowerCase()}.org.bw
      Tel: +267 3XX XXXX
    `;
    
    const newDoc = {
      id: Date.now(),
      title: newTitle,
      type: newFile.name.split('.').pop()?.toUpperCase() === 'PDF' ? 'Policy Document' : 'Guidance',
      regulator: newRegulator,
      date: new Date().toISOString().slice(0, 10),
      status: "Active",
      category: newCategory,
      tags: [newCategory, "New Regulation", "2025 Framework"],
      size: `${(newFile.size / 1024 / 1024).toFixed(1)} MB`,
      views: 0,
      content: "This document provides regulatory guidance for financial institutions operating in Botswana. It outlines key requirements, compliance procedures, and implementation timelines.",
      fullContent: sampleFullContent
    };
    
    setDocs([newDoc, ...docs]);

    // reset form & close
    setNewTitle("");
    setNewCategory("Banking Regulation");
    setNewRegulator("Bank of Botswana (BoB)");
    setNewFile(null);
    setShowUploadModal(false);

    toast({ 
      title: "Document uploaded successfully", 
      description: `${newTitle} has been added to the document library.` 
    });
  };

  const handleView = (document: typeof documents[0]) => {
    setViewDocument(document);
    setShowDocumentModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Knowledge Center
        </h1>
        <p className="text-muted-foreground">
          Explore a unified hub of regulatory documents, policies, guidance, and knowledge-base articles from all Botswana financial authorities.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents, policies, regulations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedRegulator} onValueChange={setSelectedRegulator}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Regulators" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regulators</SelectItem>
                <SelectItem value="bob">Bank of Botswana (BoB)</SelectItem>
                <SelectItem value="nbfira">NBFIRA</SelectItem>
                <SelectItem value="bse">Botswana Stock Exchange (BSE)</SelectItem>
                <SelectItem value="fia">Financial Intelligence Agency (FIA)</SelectItem>
                <SelectItem value="cipa">Companies and IP Authority (CIPA)</SelectItem>
                <SelectItem value="burs">Unified Revenue Service (BURS)</SelectItem>
                <SelectItem value="cca">Competition & Consumer Authority (CCA)</SelectItem>
                <SelectItem value="bocra">Communications Regulatory Authority (BOCRA)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="banking">Banking Regulation</SelectItem>
                <SelectItem value="aml">Anti-Money Laundering</SelectItem>
                <SelectItem value="risk">Risk Management</SelectItem>
                <SelectItem value="esg">ESG Compliance</SelectItem>
                <SelectItem value="business">Business Registration</SelectItem>
                <SelectItem value="tax">Tax Compliance</SelectItem>
                <SelectItem value="consumer">Consumer Protection</SelectItem>
                <SelectItem value="cyber">Cybersecurity</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            
            {isAuthenticated && hasPermission('admin_access') && (
              <Button onClick={handleUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-medium transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {document.title}
                      </h3>
                      <Badge variant={getStatusColor(document.status)}>
                        {document.status}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span className="font-medium text-primary">
                        {document.regulator}
                      </span>
                      <span>•</span>
                      <span>{document.type}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(document.date).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{document.size}</span>
                      <span>•</span>
                      <span>{document.views} views</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {document.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleView(document)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(document)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="shadow-soft">
            <CardContent className="p-6 flex flex-col items-center justify-center py-10">
              <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No documents found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                No documents match your current search criteria. Try adjusting your filters or search term.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* -------- Upload Modal -------- */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload New Document</DialogTitle>
            <DialogDescription>
              Provide basic metadata then choose a file to add it to the library.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <Input
              placeholder="Document title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <Select value={newRegulator} onValueChange={setNewRegulator}>
              <SelectTrigger>
                <SelectValue placeholder="Select regulator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bank of Botswana (BoB)">BoB</SelectItem>
                <SelectItem value="Non-Bank Financial Institutions Regulatory Authority (NBFIRA)">
                  NBFIRA
                </SelectItem>
                <SelectItem value="Botswana Stock Exchange (BSE)">BSE</SelectItem>
                <SelectItem value="Financial Intelligence Agency (FIA)">FIA</SelectItem>
                <SelectItem value="Companies and Intellectual Property Authority (CIPA)">
                  CIPA
                </SelectItem>
                <SelectItem value="Botswana Unified Revenue Service (BURS)">
                  BURS
                </SelectItem>
                <SelectItem value="Competition and Consumer Authority (CCA)">
                  CCA
                </SelectItem>
                <SelectItem value="Botswana Communications Regulatory Authority (BOCRA)">
                  BOCRA
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Banking Regulation">Banking Regulation</SelectItem>
                <SelectItem value="Anti-Money Laundering">Anti-Money Laundering</SelectItem>
                <SelectItem value="Risk Management">Risk Management</SelectItem>
                <SelectItem value="ESG Compliance">ESG Compliance</SelectItem>
                <SelectItem value="Business Registration">Business Registration</SelectItem>
                <SelectItem value="Tax Compliance">Tax Compliance</SelectItem>
                <SelectItem value="Consumer Protection">Consumer Protection</SelectItem>
                <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xlsx"
              onChange={(e) => setNewFile(e.target.files?.[0] || null)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewDoc}>Save &amp; Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document View Modal */}
      <Dialog open={showDocumentModal} onOpenChange={setShowDocumentModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {viewDocument?.title}
            </DialogTitle>
            <DialogDescription>
              {viewDocument?.regulator} • {viewDocument?.category} • {viewDocument?.type}
            </DialogDescription>
          </DialogHeader>
          
          <div className="border rounded-md p-4 max-h-96 overflow-y-auto">
            <div className="prose max-w-none">
              <p>{viewDocument?.content}</p>
              <p>This document outlines key regulatory requirements that financial institutions must adhere to. The full document contains comprehensive guidelines, implementation timelines, and compliance requirements.</p>
              <p>For the complete document, please download using the button below.</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDocumentModal(false)}>
              Close
            </Button>
            <Button onClick={() => viewDocument && handleDownload(viewDocument)}>
              <Download className="h-4 w-4 mr-2" />
              Download Full Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
