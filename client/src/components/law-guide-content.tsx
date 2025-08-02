import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, BookOpen, AlertCircle, CheckCircle, Info } from "lucide-react";

interface LawGuideContentProps {
  guideId: string;
  onBack: () => void;
}

const lawGuideData = {
  "hindu-marriage-act": {
    title: "Hindu Marriage Act, 1955 - Complete Guide",
    description: "Comprehensive guide covering marriage, divorce, maintenance, and custody provisions under Hindu law",
    readTime: "25 min read",
    lastUpdated: "January 2024",
    sections: [
      {
        title: "1. Introduction to Hindu Marriage Act, 1955",
        content: `The Hindu Marriage Act, 1955 is a landmark legislation that codified and unified Hindu marriage laws in India. It applies to Hindus, Buddhists, Sikhs, and Jains throughout India.

Key Objectives:
• Codify Hindu marriage customs and practices
• Provide legal framework for marriage, divorce, and maintenance
• Ensure gender equality in marriage rights
• Establish uniform laws across India

The Act replaced various regional customs with a unified legal framework while respecting religious traditions.`
      },
      {
        title: "2. Conditions for Valid Hindu Marriage",
        content: `Under Section 5, a Hindu marriage is valid only if these conditions are fulfilled:

Essential Conditions:
• Neither party has a living spouse at the time of marriage
• Neither party is incapable of giving valid consent due to unsoundness of mind
• Neither party suffers from mental disorder making them incapable of procreation
• Neither party suffers from communicable disease in virulent form

Age Requirements (Section 5(iii)):
• Bridegroom: Minimum 21 years
• Bride: Minimum 18 years

Prohibited Relationships (Section 3):
• Sapinda relationship (within 3 degrees through mother, 5 degrees through father)
• Within degrees of prohibited relationship as defined by custom

Marriage ceremonies must be performed according to customary rites and ceremonies of either party.`
      },
      {
        title: "3. Grounds for Divorce",
        content: `Section 13 provides comprehensive grounds for divorce:

Grounds Available to Both Parties:
• Adultery by the other party
• Cruelty (physical or mental)
• Desertion for continuous period of 2 years
• Conversion to another religion
• Mental disorder making cohabitation unreasonable
• Communicable disease in virulent form
• Renunciation of world by entering religious order

Additional Grounds for Wife (Section 13(2)):
• Husband has another wife living at the time of marriage
• Husband guilty of rape, sodomy, or bestiality after marriage
• Non-resumption of cohabitation after decree of judicial separation
• Husband not heard of as alive for 7+ years

Special Provisions:
• No divorce petition within 1 year of marriage (Section 14)
• Court may dismiss petition if it works undue hardship`
      },
      {
        title: "4. Mutual Consent Divorce",
        content: `Section 13B provides for divorce by mutual consent:

Procedure:
1. Joint petition by both parties
2. State they have been living separately for 1+ years
3. Unable to live together
4. Mutually agree to dissolution

Two-Motion Process:
• First Motion: Court records statements, grants 6-month period
• Second Motion: After 6-18 months, final hearing for decree

Requirements:
• Mutual consent throughout proceedings
• Settlement of maintenance, custody, property
• Court satisfaction about genuineness of consent

Advantages:
• Faster process (6-18 months)
• Less adversarial
• Privacy maintained
• Cost-effective`
      },
      {
        title: "5. Maintenance Provisions",
        content: `The Act provides comprehensive maintenance provisions:

Wife's Right to Maintenance (Section 24):
• Pendente lite (during proceedings)
• Permanent alimony after divorce
• Based on income, property, and reasonable needs

Factors Considered:
• Income and earning capacity of both parties
• Property owned by parties
• Standard of living
• Age and health of parties
• Conduct of parties

Children's Maintenance (Section 26):
• Father primarily responsible
• Court may order periodic payments
• Custody and maintenance interlinked

Enforcement:
• Contempt proceedings for non-payment
• Attachment of property/salary
• Recovery as public demand`
      },
      {
        title: "6. Child Custody Laws",
        content: `Child custody under Hindu Marriage Act follows welfare principle:

Types of Custody:
• Physical custody (residence with parent)
• Legal custody (decision-making authority)
• Joint custody (shared responsibilities)

Factors Considered:
• Best interest and welfare of child
• Age of child (tender years doctrine)
• Financial capability of parents
• Moral character and conduct
• Child's preference (if mature enough)

Age-Based Guidelines:
• Children under 5: Usually with mother
• Above 5: Court considers various factors
• Teenage children: Court may consider preference

Visitation Rights:
• Non-custodial parent entitled to visitation
• Court may specify timings and conditions
• Can be modified based on circumstances`
      }
    ]
  },
  "companies-act": {
    title: "Companies Act, 2013 - Business Registration Guide",
    description: "Complete guide for business registration and corporate compliance under Indian law",
    readTime: "35 min read",
    lastUpdated: "December 2023",
    sections: [
      {
        title: "1. Overview of Companies Act, 2013",
        content: `The Companies Act, 2013 replaced the Companies Act, 1956, bringing significant reforms to Indian corporate law.

Key Features:
• Enhanced corporate governance norms
• Stricter compliance requirements
• Greater transparency and disclosure
• Protection of minority shareholders
• Corporate Social Responsibility (CSR) mandate

Types of Companies:
• Private Limited Company
• Public Limited Company
• One Person Company (OPC)
• Section 8 Company (NPO)
• Producer Company
• Small Company`
      },
      {
        title: "2. Private Limited Company Registration",
        content: `Most popular business structure for startups and SMEs:

Eligibility Requirements:
• Minimum 2 directors, maximum 15
• Minimum 2 shareholders, maximum 200
• Minimum paid-up capital: No minimum (earlier ₹1 lakh)
• Directors must have Director Identification Number (DIN)

Pre-requisites:
• Digital Signature Certificate (DSC) for all directors
• Director Identification Number (DIN)
• Name reservation through RUN service
• Registered office address proof

Incorporation Process:
1. Obtain DSC and DIN
2. Name reservation (RUN)
3. File SPICe+ form with ROC
4. Submit required documents
5. Certificate of Incorporation issued

Required Documents:
• Memorandum of Association (MOA)
• Articles of Association (AOA)
• Consent of directors (DIR-2)
• Registered office proof
• Identity and address proofs`
      },
      {
        title: "3. One Person Company (OPC)",
        content: `Special provision for single-person business entities:

Key Features:
• Only 1 director and 1 shareholder (same person)
• Separate legal entity with limited liability
• Must nominate another person as nominee
• Easier compliance compared to private limited

Restrictions:
• Paid-up capital cannot exceed ₹50 lakhs
• Annual turnover cannot exceed ₹2 crores
• Cannot carry out Non-Banking Financial Investment activities
• Cannot convert to Section 8 company

Compliance Requirements:
• Annual filing of financial statements
• Board meeting at least once in each half of calendar year
• Annual return filing
• Income tax return filing

Benefits:
• Limited liability protection
• Perpetual succession
• Easy to raise funds
• Professional credibility`
      },
      {
        title: "4. Annual Compliance Requirements",
        content: `All companies must comply with annual filing requirements:

Annual Return (Form MGT-7):
• Due date: Within 60 days of AGM
• Contains company's financial position
• Details of members, directors, charges

Financial Statements:
• Balance Sheet and Profit & Loss Account
• Cash Flow Statement (if applicable)
• Board's Report
• Auditor's Report

Annual General Meeting (AGM):
• Must be held within 6 months of financial year end
• Not later than 15 months from previous AGM
• Special notice for certain resolutions

Board Meetings:
• Minimum 4 meetings per year
• Gap between meetings not more than 120 days
• Quorum: 1/3rd of directors or 2, whichever is higher

Books of Accounts:
• Maintain proper books of accounts
• Preserve for 8 years
• Open for inspection by directors`
      },
      {
        title: "5. Director Duties and Liabilities",
        content: `Directors have fiduciary duties under the Act:

Duties of Directors (Section 166):
• Act in good faith for company's benefit
• Exercise independent judgment
• Avoid conflicts of interest
• Not achieve undue gains
• Not assign office to another person

Liability for Contraventions:
• Personal liability for company's defaults
• Penalty up to ₹5 lakhs
• Imprisonment up to 6 months for certain offenses
• Disqualification from holding directorship

Due Diligence Defense:
• Exercised due care and diligence
• Had reasonable belief that acts were in company's interest
• No personal gain from transactions

Indemnification:
• Company can indemnify directors
• Insurance coverage permitted
• Limitations on indemnification scope`
      },
      {
        title: "6. Corporate Social Responsibility (CSR)",
        content: `Mandatory CSR for qualifying companies:

Applicability Criteria (Section 135):
• Net worth ≥ ₹500 crores, OR
• Turnover ≥ ₹1000 crores, OR
• Net profit ≥ ₹5 crores

CSR Requirements:
• Constitute CSR Committee (min 3 directors)
• Spend 2% of average net profits of 3 preceding years
• Activities as per Schedule VII
• Annual reporting on CSR activities

Permitted CSR Activities:
• Eradicating hunger, poverty, malnutrition
• Promoting education and healthcare
• Environmental sustainability
• Rural development projects
• Armed forces veterans' welfare

Compliance:
• Board's responsibility to ensure spending
• Penalty for non-compliance: ₹50,000 to ₹25 lakhs
• Explanation required if amount not spent`
      }
    ]
  },
  "labour-laws": {
    title: "Indian Labour Laws - Employment Rights Guide",
    description: "Essential guide for employers and employees on labour law compliance in India",
    readTime: "30 min read",
    lastUpdated: "November 2023",
    sections: [
      {
        title: "1. Overview of Indian Labour Laws",
        content: `India has comprehensive labour legislation protecting worker rights:

Major Central Acts:
• Industrial Disputes Act, 1947
• Minimum Wages Act, 1948
• Payment of Wages Act, 1936
• Employees' Provident Funds Act, 1952
• Employees' State Insurance Act, 1948
• Contract Labour Act, 1970
• Factories Act, 1948
• Shops and Establishments Acts (State-wise)

New Labour Codes (2019-2020):
• Code on Wages, 2019
• Industrial Relations Code, 2020
• Social Security Code, 2020
• Occupational Safety Code, 2020

Coverage:
• Organized and unorganized sectors
• All types of employment relationships
• Both permanent and contractual workers`
      },
      {
        title: "2. Minimum Wages and Payment of Wages",
        content: `Fundamental rights regarding wage payment:

Minimum Wages Act, 1948:
• Government fixes minimum wages by industry/region
• Regular revision (not exceeding 5 years)
• Overtime rates: Double the ordinary rate
• Covers both time-based and piece-rate workers

Payment of Wages Act, 1936:
• Applies to employees earning up to ₹24,000/month
• Wages must be paid by 7th of following month
• Payment in legal tender (cash/bank transfer)
• Authorized deductions only

Prohibited Deductions:
• Fines without inquiry
• Damage to property without proof
• Accommodation charges above prescribed limits
• Services not requested by employee

Wage Components:
• Basic pay (minimum 50% of total compensation)
• Dearness allowance
• House rent allowance
• Conveyance allowance
• Medical allowance`
      },
      {
        title: "3. Provident Fund and ESI Benefits",
        content: `Mandatory social security benefits:

Employees' Provident Fund (EPF):
• Applicable to establishments with 20+ employees
• Employee contributes 12% of basic + DA
• Employer contributes 12% (3.67% to EPF, 8.33% to EPS)
• Withdrawal allowed for specific purposes
• Pension benefits through EPS

Employees' State Insurance (ESI):
• Applicable to establishments with 10+ employees
• Employee contributes 0.75% of wages
• Employer contributes 3.25% of wages
• Medical benefits for employee and family
• Cash benefits for sickness, maternity, disability

Benefits Coverage:
• Medical treatment at ESI hospitals/dispensaries
• Sickness benefit: 70% of wages for 91 days
• Maternity benefit: 100% wages for 26 weeks
• Disability benefit: 90% of wages
• Dependent benefit in case of death`
      },
      {
        title: "4. Industrial Disputes and Termination",
        content: `Framework for handling workplace disputes:

Industrial Disputes Act, 1947:
• Defines industrial disputes and resolution mechanisms
• Prohibition of strikes and lockouts in public utilities
• Notice requirements for termination and closure
• Compensation for retrenchment and lay-off

Termination Procedures:
• Notice: 30 days or pay in lieu
• Retrenchment compensation: 15 days wages for each year
• Prior permission required (establishments with 100+ workers)
• Last come, first go principle for retrenchment

Grounds for Dismissal:
• Misconduct
• Continued absence without leave
• Disobedience of lawful orders
• Damage to company property
• Violation of service conditions

Disciplinary Procedure:
• Charge sheet for alleged misconduct
• Opportunity to explain
• Inquiry by impartial officer
• Decision based on evidence
• Right of appeal`
      },
      {
        title: "5. Working Hours and Leave Entitlements",
        content: `Regulations on working time and leave:

Factories Act, 1948:
• Maximum 9 hours per day, 48 hours per week
• Overtime rates: Double the ordinary rate
• Weekly holiday mandatory
• Interval for rest: 30 minutes after 5 hours

Shops and Establishments Acts:
• State-specific regulations
• Generally 9-10 hours per day
• Overtime compensation required
• Night shift restrictions for women (being relaxed)

Leave Entitlements:
• Earned leave: 1 day for every 20 days worked
• Casual leave: As per company policy
• Sick leave: Medical certificate required
• Maternity leave: 26 weeks (paid)
• Paternity leave: As per state laws

Special Provisions:
• Women cannot work night shifts (with exceptions)
• Young persons (14-18 years) limited working hours
• Prohibition of child labour below 14 years
• Equal pay for equal work`
      },
      {
        title: "6. Sexual Harassment Prevention",
        content: `Legal framework for workplace safety:

Sexual Harassment Act, 2013:
• Applies to all workplaces
• Defines sexual harassment broadly
• Mandatory Internal Complaints Committee (ICC)
• External complaints mechanism available

ICC Requirements:
• Presiding officer (senior woman employee)
• Two employees committed to women's rights
• One external member from NGO/social work
• Minimum 4 members required

Complaint Procedure:
• Written complaint within 3 months
• Inquiry to be completed in 90 days
• Interim relief during inquiry
• Final report with recommendations

Employer Duties:
• Provide safe working environment
• Display ICC details prominently
• Organize awareness programs
• Annual report to district officer

Penalties:
• Up to ₹50,000 fine for non-compliance
• Cancellation of license/registration
• Debarment from government contracts
• Criminal liability for repeat offenses`
      }
    ]
  },
  "property-registration": {
    title: "Property Registration in India - Complete Guide",
    description: "Step-by-step guide for property registration under Registration Act, 1908",
    readTime: "20 min read",
    lastUpdated: "December 2023",
    sections: [
      {
        title: "1. Overview of Property Registration",
        content: `Property registration in India is mandatory under the Registration Act, 1908 for most property transactions.

Legal Significance:
• Establishes legal title and ownership
• Provides protection against fraudulent claims
• Creates public record of transaction
• Essential for obtaining loans against property

Types of Property Documents:
• Sale Deed (for purchased property)
• Gift Deed (for gifted property)
• Partition Deed (for inherited property)
• Lease Deed (for rental agreements above 11 months)
• Power of Attorney
• Will and Testament

Registration Mandatory For:
• Immovable property valued above ₹100
• Lease agreements exceeding 1 year
• Non-agricultural land transactions
• Gifts of immovable property`
      },
      {
        title: "2. Required Documents",
        content: `Complete documentation is essential for smooth registration:

Seller's Documents:
• Original title documents
• Previous sale deed/title deed
• Property tax receipts (last 5 years)
• Non-agricultural (NA) order (if applicable)
• Layout approval from local authority
• Completion certificate (for apartments)

Buyer's Documents:
• Identity proof (Aadhaar, PAN, Passport)
• Address proof
• PAN card (mandatory for transactions above ₹5 lakhs)
• Income proof (salary slips, ITR)
• No-objection certificate from bank (if loan involved)

Property-Related Documents:
• Survey settlement record
• Property card/7/12 extract
• Layout plan approved by local authority
• Building plan sanction
• Occupancy certificate
• Environmental clearance (if applicable)`
      },
      {
        title: "3. Stamp Duty Calculation",
        content: `Stamp duty is a state tax on property transactions:

Stamp Duty Rates (varies by state):
• Maharashtra: 5-7% of property value
• Karnataka: 5-6% of property value
• Delhi: 6% of property value
• Gujarat: 4.9% of property value
• Tamil Nadu: 7% of property value

Calculation Basis:
• Higher of actual transaction value or ready reckoner rate
• Ready reckoner rates updated annually by state government
• Circle rate/guidance value as minimum base

Additional Charges:
• Registration fee: 1% of property value (usually)
• Municipal taxes and fees
• Legal verification charges
• Documentation charges

Concessions Available:
• Women buyers: 1-2% reduction in many states
• First-time buyers: Discounts in some states
• Affordable housing: Reduced rates under PMAY`
      },
      {
        title: "4. Registration Process",
        content: `Step-by-step registration procedure:

Pre-Registration Steps:
• Verify property documents thoroughly
• Calculate stamp duty and registration fees
• Prepare sale deed on non-judicial stamp paper
• Arrange for witnesses (minimum 2)

Registration Day Process:
• Visit sub-registrar office with all parties
• Present documents for verification
• Pay stamp duty and registration fees
• Biometric verification of all parties
• Sign documents in presence of registrar
• Thumb impressions of all parties

Post-Registration:
• Collect registered documents
• Update property records
• Transfer property tax accounts
• Update electricity and water connections
• Register with society/housing board

Timeline:
• Document preparation: 7-15 days
• Registration appointment: 1-30 days (varies by location)
• Registration process: 2-4 hours
• Registered document collection: Same day or next day`
      },
      {
        title: "5. Legal Compliance",
        content: `Ensure complete legal compliance:

Mandatory Compliances:
• RERA registration (for new projects)
• Environment clearance (for large projects)
• Fire safety clearance
• Lift clearance (for high-rise buildings)
• Structural stability certificate

Tax Implications:
• Income tax on capital gains
• TDS deduction if transaction value exceeds ₹50 lakhs
• GST on under-construction properties
• Property tax transfer to new owner

Due Diligence Checklist:
• Verify seller's ownership rights
• Check for any pending litigation
• Ensure no mortgage or encumbrance
• Verify building approvals and permits
• Check property tax payment status
• Confirm utility connections legality

Common Pitfalls to Avoid:
• Buying property without clear title
• Inadequate document verification
• Non-payment of stamp duty
• Registration in wrong jurisdiction
• Ignoring building law violations`
      }
    ]
  },
  "consumer-protection": {
    title: "Consumer Protection Act, 2019 - Rights and Remedies",
    description: "Understanding consumer protection under Consumer Protection Act, 2019",
    readTime: "18 min read",
    lastUpdated: "January 2024",
    sections: [
      {
        title: "1. Overview of Consumer Protection Act, 2019",
        content: `The Consumer Protection Act, 2019 replaced the earlier 1986 Act, providing enhanced consumer rights and remedies.

Key Features:
• Expanded definition of consumer
• Includes e-commerce transactions
• Product liability provisions
• Mediation as alternative dispute resolution
• Central Consumer Protection Authority (CCPA)

Who is a Consumer:
• Person who buys goods or services
• Includes online purchases
• Beneficiary of services (not just buyer)
• Excludes goods bought for commercial purposes

Consumer Rights:
• Right to safety
• Right to be informed
• Right to choose
• Right to be heard
• Right to seek redressal
• Right to consumer education`
      },
      {
        title: "2. Consumer Forums and Jurisdiction",
        content: `Three-tier consumer forum structure:

District Consumer Disputes Redressal Commission:
• Pecuniary jurisdiction: Up to ₹1 crore
• Territorial jurisdiction: District level
• Composition: President + 2 members
• Appeal to State Commission

State Consumer Disputes Redressal Commission:
• Pecuniary jurisdiction: ₹1 crore to ₹10 crores
• Original and appellate jurisdiction
• Composition: President + 4 members
• Appeal to National Commission

National Consumer Disputes Redressal Commission:
• Pecuniary jurisdiction: Above ₹10 crores
• Original and appellate jurisdiction
• Composition: President + 8 members
• Final appellate authority

Online Dispute Resolution:
• E-Daakhil portal for online filing
• Video conferencing for hearings
• Digital case management
• Faster resolution process`
      },
      {
        title: "3. Filing Consumer Complaints",
        content: `Procedure for filing consumer complaints:

Who Can File:
• Consumer himself/herself
• Registered consumer association
• Central/State Government
• One or more consumers with same interest
• Legal heir of deceased consumer

Complaint Filing Process:
• Identify appropriate forum based on value
• Prepare complaint with required documents
• Pay prescribed fee (if applicable)
• Submit complaint within limitation period
• Attend hearings as scheduled

Required Documents:
• Written complaint with facts
• Supporting evidence (bills, receipts, correspondence)
• Medical reports (if applicable)
• Proof of payment
• Copy of agreement/contract

Limitation Period:
• 2 years from date when cause of action arose
• Can be condoned for sufficient cause
• Continuing cause of action: 2 years from last incident`
      },
      {
        title: "4. Remedies and Orders",
        content: `Consumer forums can pass various orders:

Remedial Orders:
• Removal of defects in goods/services
• Replacement of defective goods
• Refund of amount paid
• Compensation for loss or injury
• Removal of deficiency in services
• Withdrawal of hazardous goods

Punitive Orders:
• Adequate costs to parties
• Punitive damages up to ₹1 lakh
• Corrective advertisement at opposite party's cost
• Recall of goods from market
• Cease manufacture of hazardous goods

Compliance and Enforcement:
• Non-compliance attracts imprisonment up to 3 years
• Fine up to ₹50,000 or both
• Attachment and sale of property
• Closure of business
• Cancellation of license

Implementation Timeline:
• Orders to be complied within specified period
• Default attracts additional compensation
• Execution through civil court if required`
      },
      {
        title: "5. Product Liability and E-commerce",
        content: `New provisions for product liability and online transactions:

Product Liability (Chapter VI):
• Manufacturer liable for defective products
• Product seller also liable in certain cases
• Service provider liable for deficient services
• Compensation for harm caused by defective products

E-commerce Protections:
• Platform liability for marketplace model
• Mandatory disclosure of seller information
• Grievance redressal mechanism
• Fake/misleading reviews prohibition
• Country of origin information mandatory

Central Consumer Protection Authority (CCPA):
• Investigate consumer law violations
• Initiate class action suits
• Order recall of unsafe goods
• Impose penalties on violators
• Issue safety notices to public

Mediation:
• Alternative dispute resolution mechanism
• Voluntary process for parties
• Faster and cost-effective resolution
• Mediated settlement binding on parties
• Reduces burden on consumer forums`
      }
    ]
  },
  "criminal-procedure": {
    title: "Criminal Procedure Code (CrPC) - Essentials",
    description: "Key provisions of CrPC for understanding criminal proceedings",
    readTime: "40 min read",
    lastUpdated: "October 2023",
    sections: [
      {
        title: "1. Introduction to Criminal Procedure Code",
        content: `The Code of Criminal Procedure, 1973 (CrPC) governs the procedure for criminal trials in India.

Scope and Application:
• Procedural law for criminal cases
• Applies to all criminal courts
• Covers investigation, trial, and appeal
• Ensures fair trial and due process

Key Objectives:
• Speedy and fair trial
• Protection of accused rights
• Victim protection and compensation
• Efficient investigation process
• Appeal and revision provisions

Types of Offences:
• Cognizable and non-cognizable
• Bailable and non-bailable
• Compoundable and non-compoundable
• Triable by different courts`
      },
      {
        title: "2. FIR and Investigation Process",
        content: `First Information Report (FIR) is the starting point of criminal investigation:

FIR Filing (Section 154):
• Information about cognizable offence
• Oral or written complaint
• Must be reduced to writing
• Copy given to informant free of cost
• Police bound to register if cognizable offence

Investigation Process:
• Scene of crime examination
• Collection of evidence
• Recording of statements (Section 161)
• Arrest of accused (if required)
• Medical examination (if necessary)
• Forwarding case diary to court

Rights During Investigation:
• Right to be informed of grounds of arrest
• Right to bail (in bailable offences)
• Right to medical examination
• Right to legal aid
• Protection from torture and custodial violence

Investigation Timeline:
• Investigation should be completed expeditiously
• Charge sheet to be filed within 60/90 days
• Extension possible with court permission
• Default bail if charge sheet not filed in time`
      },
      {
        title: "3. Arrest and Bail Provisions",
        content: `Arrest procedures and bail provisions under CrPC:

Arrest Procedures (Section 41):
• Police can arrest without warrant for cognizable offences
• Must inform grounds of arrest
• Right to inform family/friends
• Medical examination if requested
• Produced before magistrate within 24 hours

Types of Bail:
• Regular bail (post-arrest)
• Anticipatory bail (pre-arrest, Section 438)
• Default bail (delayed charge sheet)
• Interim bail (temporary relief)

Bail Considerations:
• Nature and gravity of offence
• Character and antecedents of accused
• Reasonable apprehension of witness tampering
• Flight risk assessment
• Health and age of accused

Bail Conditions:
• Executing bond with sureties
• Surrender passport
• Not to leave jurisdiction
• Not to contact witnesses
• Regular reporting to police station
• Cooperation in investigation`
      },
      {
        title: "4. Trial Process and Court Procedures",
        content: `Criminal trial process from charge to judgment:

Types of Trials:
• Summons case (less serious offences)
• Warrant case (serious offences)
• Sessions trial (heinous crimes)
• Summary trial (petty offences)

Trial Stages:
• Taking cognizance of offence
• Issue of process (summons/warrant)
• Framing of charges
• Recording of prosecution evidence
• Statement of accused (Section 313)
• Defence evidence
• Arguments and judgment

Evidence Rules:
• Prosecution must prove case beyond reasonable doubt
• Burden of proof on prosecution
• Accused presumed innocent
• Right to remain silent
• Cross-examination rights

Court Hierarchy:
• Magistrate courts (1st class, 2nd class, JMFC)
• Sessions court (serious offences)
• High Court (appeals and revision)
• Supreme Court (final appeal)`
      },
      {
        title: "5. Appeals and Revision",
        content: `Post-trial remedies available to parties:

Right of Appeal:
• Accused: Against conviction and sentence
• State: Against acquittal or inadequate sentence
• Private complainant: In certain cases
• Victim: Through public prosecutor

Appeal Hierarchy:
• From Magistrate to Sessions Judge
• From Sessions Judge to High Court
• From High Court to Supreme Court
• Special leave petition to Supreme Court

Revision Powers:
• High Court can revise subordinate court orders
• Supreme Court revision in exceptional cases
• Suo motu powers of higher courts
• Correction of jurisdictional errors

Limitation Periods:
• Appeal within 30 days of order
• Revision within prescribed time limits
• Condonation of delay possible
• Special circumstances consideration

Suspension of Sentence:
• During pendency of appeal
• Court discretion based on merits
• Bail during appeal consideration
• Interim orders for urgent matters`
      }
    ]
  }
};

export default function LawGuideContent({ guideId, onBack }: LawGuideContentProps) {
  const [activeSection, setActiveSection] = useState(0);
  const guide = lawGuideData[guideId as keyof typeof lawGuideData];

  if (!guide) {
    return (
      <div className="text-center py-16">
        <p className="text-legal-gray">Guide not found</p>
        <Button onClick={onBack} className="mt-4">
          Back to Guides
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mb-4 border-legal-blue text-legal-blue hover:bg-legal-blue hover:text-white"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Legal Guides
          </Button>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h1 className="text-3xl font-bold text-legal-navy mb-4">{guide.title}</h1>
            <p className="text-legal-gray mb-4">{guide.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-legal-gray">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                {guide.readTime}
              </div>
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-1" />
                Updated: {guide.lastUpdated}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  {guide.sections.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSection(index)}
                      className={`w-full text-left p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        activeSection === index ? 'bg-legal-blue text-white' : 'text-legal-gray'
                      }`}
                    >
                      <div className="text-sm font-medium">{section.title}</div>
                    </button>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl text-legal-navy">
                  {guide.sections[activeSection].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  {guide.sections[activeSection].content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.includes('•')) {
                      const [title, ...listItems] = paragraph.split('\n');
                      return (
                        <div key={index} className="mb-6">
                          {title && <h4 className="font-semibold text-legal-navy mb-3">{title}</h4>}
                          <ul className="list-none space-y-2">
                            {listItems.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-legal-gray">{item.replace('• ', '')}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    } else {
                      return (
                        <p key={index} className="text-legal-gray mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    }
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                disabled={activeSection === 0}
                className="border-legal-blue text-legal-blue hover:bg-legal-blue hover:text-white"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous Section
              </Button>
              
              <Badge variant="outline" className="px-4 py-2">
                {activeSection + 1} of {guide.sections.length}
              </Badge>
              
              <Button
                variant="outline"
                onClick={() => setActiveSection(Math.min(guide.sections.length - 1, activeSection + 1))}
                disabled={activeSection === guide.sections.length - 1}
                className="border-legal-blue text-legal-blue hover:bg-legal-blue hover:text-white"
              >
                Next Section
                <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Legal Disclaimer</h4>
                <p className="text-yellow-700 text-sm">
                  This guide provides general legal information based on Indian law and does not constitute legal advice. 
                  Laws and regulations may change, and specific circumstances may require different approaches. 
                  Please consult a licensed advocate registered with the Bar Council of India for specific legal counsel 
                  regarding your particular situation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}