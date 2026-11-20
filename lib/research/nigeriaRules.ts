/**
 * Nigeria rules tracker: dataset.
 *
 * Source of truth for /tracker. Every entry traces to a section of a primary document
 * where one was read; entries that rest on press or law-firm reports are labelled as such.
 * Verification notes and open questions: research/nigeria-rules-verification.md
 *
 * Not legal advice. Re-check the primary document before relying on any entry.
 */

export type Regulator = "CBN" | "SEC" | "CBN + SEC";
export type Status = "in-force" | "draft" | "unconfirmed";
export type Verification = "primary" | "partial" | "reported";
export type Activity = "issue" | "hold" | "offer" | "transfer";

export type Source = { label: string; url: string };

export type Rule = {
  id: string;
  regulator: Regulator;
  instrument: string;
  title: string;
  ref: string;
  summary: string;
  status: Status;
  verification: Verification;
  activities: Activity[];
  sources: Source[];
};

export const AS_OF = "2026-11-20";
export const AS_OF_LABEL = "20 November 2026";

const CBN_PDF: Source = {
  label: "CBN Regulations (PDF)",
  url: "https://www.cbn.gov.ng/Out/2026/CCD/REGULATIONS%20FOR%20THE%20OPERATIONS%20OF%20NON-SECURITY%20VIRTUAL%20ASSETS%20IN%20NIGERIA.pdf",
};
const SEC_PDF: Source = {
  label: "SEC rules text (PDF)",
  url: "https://sec.gov.ng/documents/1503/Proposed_Rules_on_Digital_and_Virtual_Asset_Operations_Custody_and_Markets.pdf",
};
const ALUKO: Source = {
  label: "Aluko & Oyebode note (PDF)",
  url: "https://aluko-oyebode.com/wp-content/uploads/2026/09/Nigeria-Digital-Asset-Regulatory-Reset.pdf",
};
const BUSINESSDAY: Source = {
  label: "BusinessDay, 6 Nov 2026",
  url: "https://businessday.ng/business-economy/article/explainer-what-cbns-new-crypto-rules-mean-for-your-wallet-p2p-trades-and-stablecoins/",
};
const FINMAG: Source = {
  label: "Finance Magnates, 6 Nov 2026",
  url: "https://www.financemagnates.com/cryptocurrency/regulation/nigeria-erects-strict-stablecoin-wall-demanding-11m-local-subsidiaries-for-us-dollar-tokens/",
};

const CBN_INSTRUMENT = "CBN Regulations for the Operations of Non-Security Virtual Assets in Nigeria";
const SEC_INSTRUMENT = "SEC Rules on Digital and Virtual Assets Operations, Custody and Markets";

export const RULES: Rule[] = [
  // ---------- CBN: in force ----------
  {
    id: "cbn-effective",
    regulator: "CBN",
    instrument: CBN_INSTRUMENT,
    title: "Regulations take effect",
    ref: "Circular PSP/DIR/PUB/CIR/001/004, s4.0",
    summary:
      "A circular from the Payments System Policy Department, dated 5 November 2026, issues the Regulations and says they take effect the same day. They cover stablecoins, Deposit Money Tokens, virtual asset service providers, payment services, custody, transfer, remittance, clearing and settlement.",
    status: "in-force",
    verification: "primary",
    activities: ["issue", "hold", "transfer"],
    sources: [CBN_PDF],
  },
  {
    id: "cbn-classes",
    regulator: "CBN",
    instrument: CBN_INSTRUMENT,
    title: "Stablecoin classes",
    ref: "s3.2, s3.8, s3.9",
    summary:
      "Stablecoins offered in Nigeria are Class 1 (naira-referenced), Class 2 (foreign-currency-referenced), Prohibited Tokens or Other Services Authorisation. A Class 1 stablecoin must reference the naira one to one, be fully backed in naira Eligible Reserve Assets and be issued by a Class 1 Licensed Issuer. A Class 2 stablecoin must be issued by a Class 2 Licensed Issuer.",
    status: "in-force",
    verification: "primary",
    activities: ["issue", "transfer"],
    sources: [CBN_PDF],
  },
  {
    id: "cbn-capital",
    regulator: "CBN",
    instrument: CBN_INSTRUMENT,
    title: "Minimum paid-up capital",
    ref: "s15.1, s15.2, s16.1",
    summary:
      "Class 1 issuer: ₦10bn. Class 2 issuer: ₦15bn. Other non-security virtual asset services: ₦1bn, additional to any capital set by the SEC. The Bank may require higher amounts.",
    status: "in-force",
    verification: "primary",
    activities: ["issue", "hold", "transfer"],
    sources: [CBN_PDF],
  },
  {
    id: "cbn-offshore",
    regulator: "CBN",
    instrument: CBN_INSTRUMENT,
    title: "No offshore issuer exemption",
    ref: "s15.3",
    summary:
      "Both issuer classes must meet the capital deposit and supplementary requirements in section 17. There is no offshore issuer exemption from incorporation, licensing or capital.",
    status: "in-force",
    verification: "primary",
    activities: ["issue"],
    sources: [CBN_PDF],
  },
  {
    id: "cbn-sec-split",
    regulator: "CBN + SEC",
    instrument: CBN_INSTRUMENT,
    title: "Split between the CBN and the SEC",
    ref: "s4.1, s4.2, s4.4",
    summary:
      "The CBN regulates non-security virtual assets and the payment, settlement, remittance, foreign-exchange and custody services around them. The SEC regulates security virtual assets and capital-market activity. Where a security transaction settles in naira, foreign currency or a regulated token, the settlement leg falls under the CBN and the security stays with the SEC.",
    status: "in-force",
    verification: "primary",
    activities: ["issue", "hold", "offer", "transfer"],
    sources: [CBN_PDF],
  },
  {
    id: "cbn-listing",
    regulator: "CBN + SEC",
    instrument: CBN_INSTRUMENT,
    title: "Listing does not authorise payment use",
    ref: "s4.9, s4.10",
    summary:
      "Holding or custody of virtual assets solely for trading, brokerage or investment stays with the SEC. It becomes a CBN-regulated payment activity if it also holds or transfers an approved payment instrument for payments, merchant acceptance, remittance or stored value. Listing or trading a stablecoin on an SEC-regulated platform does not by itself authorise payment use.",
    status: "in-force",
    verification: "primary",
    activities: ["hold", "transfer"],
    sources: [CBN_PDF],
  },
  // ---------- CBN: not fully confirmed ----------
  {
    id: "cbn-eo",
    regulator: "CBN + SEC",
    instrument: CBN_INSTRUMENT,
    title: "Executive Order on Virtual Assets Coordination, 2026",
    ref: "s4.8, s3.11(d)",
    summary:
      "The Regulations refer to a Presidential Executive Order on Virtual Assets Coordination, 2026, to a Harmonised Implementation Framework adopted under it, and to a Council that resolves classification disagreements between the Bank and the SEC. The Order itself and the Council's makeup have not been read yet.",
    status: "unconfirmed",
    verification: "partial",
    activities: ["issue", "hold", "offer", "transfer"],
    sources: [CBN_PDF],
  },
  {
    id: "cbn-transition",
    regulator: "CBN",
    instrument: CBN_INSTRUMENT,
    title: "Transition window for existing operators",
    ref: "Not yet located in the Regulations",
    summary:
      "Two outlets report that existing operators have 180 days to apply. Finance Magnates adds registration within 30 days and supervisory reporting within 60 days. Not yet checked against the Regulations.",
    status: "unconfirmed",
    verification: "reported",
    activities: ["issue", "hold", "transfer"],
    sources: [BUSINESSDAY, FINMAG],
  },
  // ---------- SEC: draft ----------
  {
    id: "sec-status",
    regulator: "SEC",
    instrument: SEC_INSTRUMENT,
    title: "Draft status and what it replaces",
    ref: "Justification, p84",
    summary:
      "A law-firm note says the rules remain subject to formal adoption and do not yet have the force of law, and the file name says 'Proposed'. The text carries no date, commencement date or consultation notice, and the SEC's own page for the rules returned a 404. If adopted, they replace the SEC's 2022 rules and all earlier SEC rules, guidelines and circulars on digital and virtual assets.",
    status: "draft",
    verification: "partial",
    activities: ["issue", "hold", "offer", "transfer"],
    sources: [SEC_PDF, ALUKO],
  },
  {
    id: "sec-tiers",
    regulator: "SEC",
    instrument: SEC_INSTRUMENT,
    title: "Stablecoin tiers and reserves",
    ref: "p46; Schedule II, p82",
    summary:
      "Tier 1, naira-backed: at least 100% reserves. Tier 2, foreign-currency-backed: at least 120%. Tier 3, commodity-backed: at least 100%. Tier 4, crypto-backed: over-collateralised at least 150%. Certain stablecoins are prohibited unless the Commission approves them.",
    status: "draft",
    verification: "primary",
    activities: ["issue"],
    sources: [SEC_PDF],
  },
  {
    id: "sec-capital",
    regulator: "SEC",
    instrument: SEC_INSTRUMENT,
    title: "Minimum capital",
    ref: "Schedule I, p78",
    summary:
      "Exchange (DAX) ₦2bn. Custodian (DAC) ₦2bn. Platform operator (DAPO) ₦500m. Offering platform (DAOP) ₦500m. Real-world asset tokenisation platform (RATOP) ₦500m. Virtual asset service provider (VASP) ₦200m.",
    status: "draft",
    verification: "primary",
    activities: ["issue", "hold", "offer", "transfer"],
    sources: [SEC_PDF],
  },
  {
    id: "sec-ratop-scope",
    regulator: "SEC",
    instrument: SEC_INSTRUMENT,
    title: "Tokenisation platforms: scope and eligible assets",
    ref: "Part 14, rules 14(1), 14(2), 14(5)",
    summary:
      "Applies to anyone who facilitates tokenising real-world assets, including issuance, offering and lifecycle management. Eligible assets, subject to SEC approval, include equities, bonds, loans, receivables and money market instruments. Registration alone does not authorise holding the underlying asset.",
    status: "draft",
    verification: "primary",
    activities: ["issue", "offer"],
    sources: [SEC_PDF],
  },
  {
    id: "sec-ratop-legal",
    regulator: "SEC",
    instrument: SEC_INSTRUMENT,
    title: "Legal opinion and holder rights",
    ref: "14(4)",
    summary:
      "Each tokenisation project needs an independent legal opinion from an SEC-registered solicitor on title, encumbrances and enforceability of holder rights, updated annually or on a material change. Holder rights must be protected in an issuer insolvency, platform failure or custodian default.",
    status: "draft",
    verification: "primary",
    activities: ["issue", "hold"],
    sources: [SEC_PDF],
  },
  {
    id: "sec-ratop-liquidity",
    regulator: "SEC",
    instrument: SEC_INSTRUMENT,
    title: "Liquidity classification",
    ref: "14(6)",
    summary:
      "Each tokenised asset must be classified liquid, less liquid or illiquid, and the basis and exit limits disclosed before subscription. A token is not liquid merely because it is tokenised or transferable on a ledger. The SEC may override the classification.",
    status: "draft",
    verification: "primary",
    activities: ["offer", "transfer"],
    sources: [SEC_PDF],
  },
  {
    id: "sec-ratop-secondary",
    regulator: "SEC",
    instrument: SEC_INSTRUMENT,
    title: "Secondary trading of tokenised assets",
    ref: "14(7)(b), 14(7)(d)",
    summary:
      "Where the underlying asset is liquid with an established market, such as treasury bills, money market instruments or listed securities, a platform may facilitate restricted transfer or secondary trading only where the SEC authorises it, on its conditions. Illiquid assets cannot be traded openly or continuously on the platform without separate authorisation.",
    status: "draft",
    verification: "primary",
    activities: ["transfer"],
    sources: [SEC_PDF],
  },
  // ---------- SEC: not confirmed ----------
  {
    id: "sec-capital-guidelines",
    regulator: "SEC",
    instrument: "SEC Guidelines on Revised Minimum Capital for Regulated Entities",
    title: "Separate capital guidelines, 18 March 2026",
    ref: "Reported by Aluko & Oyebode; document not seen",
    summary:
      "A law-firm note reports separate SEC guidelines that set capital at ₦1bn for offering and tokenisation platforms, ₦500m for intermediaries and ₦300m for ancillary providers, which differs from the draft's Schedule I. The guidelines themselves have not been read.",
    status: "unconfirmed",
    verification: "reported",
    activities: ["issue", "offer"],
    sources: [ALUKO],
  },
];

export const UNRESOLVED: string[] = [
  "SEC status: find a dated SEC notice with a consultation deadline, or confirm adoption.",
  "SEC capital guidelines of 18 March 2026: read the document and reconcile it with Schedule I.",
  "Executive Order and Council: read the Order, confirm who sits on the Council and what it decides.",
  "CBN transition period: confirm the 180-day window and the registration and reporting deadlines in the Regulations.",
  "Two search-only claims are left out until verified: the expected first public digital securities offering in September 2026, and a VASP application window in August 2026.",
];
