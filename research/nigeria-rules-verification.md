# Nigeria rules: verification note

Checked on 2026-11-20 against the primary documents. This is the seed for the Nigeria rules tracker. Nothing here is legal advice.

Page references are the **printed** page numbers in each document.

## Sources read

| Source | What it is | How it was read |
|---|---|---|
| CBN circular PSP/DIR/PUB/CIR/001/004 + *Regulations for the Operations of Non-Security Virtual Assets in Nigeria* | Primary. Issued by the CBN Payments System Policy Department | PDF read directly (circular, contents, Sections 3, 4, 15, 16, 17) |
| SEC Nigeria *Rules on Digital and Virtual Assets Operations, Custody and Markets* (file name contains "Proposed") | Primary text of the SEC draft | PDF text extracted and searched |
| Aluko & Oyebode flash note, *Nigeria's Digital Asset Regulatory Reset* | Secondary (law firm) | First five pages read |
| BusinessDay, 6 Nov 2026 | Secondary (news) | Read via fetch |
| Finance Magnates, 6 Nov 2026 | Secondary (news) | Read via fetch |

Not read: the SEC's own "proposed rules" web page (the URL returned 404), the TechCabal article (HTTP 403), the Presidential Executive Order itself, the CBN text on the transition period and the Council.

## CBN regulations

| Item | Finding | Status |
|---|---|---|
| Date and commencement | Circular dated **5 November 2026**; "shall take effect from November 5, 2026" (circular, section 4.0). Signed by the Director, Payments System Policy Department | **Confirmed (primary)** |
| Legal basis | CBN Act 2007; Banks and Other Financial Institutions Act 2020 | **Confirmed (primary)** |
| Stablecoin classes | Class 1 = naira-referenced; Class 2 = foreign-currency-referenced; plus Prohibited Tokens and Other Services (s3.2). Class 1 must reference the naira one to one and be fully backed in naira Eligible Reserve Assets (s3.8). Interest and yield prohibited (s13.3 cited in s3.8) | **Confirmed (primary)** |
| Capital | Class 1 issuer ₦10bn (s15.1); Class 2 issuer ₦15bn (s15.2); other non-security virtual asset services ₦1bn (s16.1), additional to any SEC capital. No offshore issuer exemption (s15.3) | **Confirmed (primary)** |
| Split with the SEC | CBN regulates non-security virtual assets and payment, settlement, remittance, FX and custody services around them; SEC regulates security virtual assets (s4.1, s4.2). Settlement leg of a security transaction in naira or a stablecoin falls under the CBN (s4.4). Listing or custody by an SEC-regulated person does not by itself authorise payment use (s4.9, s4.10) | **Confirmed (primary)** |
| Executive Order | s4.8 refers to a "Presidential Executive Order on Virtual Assets Coordination, 2026" and a "Harmonised Implementation Framework". s3.11(d) refers to "the Council" | **Order's existence confirmed by the CBN text. Order itself and the Council's makeup not read** |
| 180-day window for existing operators | Reported by BusinessDay and Finance Magnates | **Reported by two outlets, not checked in the CBN text** |

News-report discrepancies, resolved:
- BusinessDay says the CBN acted "on Friday" yet effective 5 November. The circular is dated 5 November 2026; the reports are dated Friday 6 November. No real conflict.
- Finance Magnates gave ₦15bn and $11M but omitted Class 1. The ₦10bn Class 1 figure in BusinessDay is correct per s15.1.

## SEC draft rules

| Item | Finding | Status |
|---|---|---|
| Status | Law-firm note: "remain subject to formal adoption by the SEC. They do not yet have the force of law." The file name says "Proposed". The PDF text has no date, no commencement date and no consultation notice. The SEC page that would confirm status returned 404 | **Draft per two secondary signals. Not confirmed by an SEC notice** |
| Earlier claim "dated 20 August 2026" | No date appears in the document text | **Dropped, unverified** |
| Replaces | "shall supersede the Rules on Issuance, Offering Platform, and Custody issued in 2022 and all prior Commission's Rules, Guidelines or Circulars" on digital assets (p84, Justification) | **Confirmed (primary text)** |
| Stablecoin tiers | Tier 1 naira-backed, 100%; Tier 2 foreign-currency-backed, 120%; Tier 3 commodity-backed, 100%; Tier 4 crypto-backed, over-collateralised at least 150% (p46; Schedule II table, p82) | **Confirmed (primary text)** |
| Minimum capital (Schedule I) | DAX ₦2bn; DAC ₦2bn; DAPO ₦500m; DAOP ₦500m; RATOP ₦500m; VASP ₦200m (p78) | **Confirmed (primary text)** |
| Tokenisation (Part 14, RATOP) | Covers anyone facilitating tokenisation of real-world assets (14(1)). Eligible assets, subject to SEC approval, include "equities, bonds, loans, receivables or money market instruments" (14(5)(a)(iv)). Independent legal opinion per project, updated annually (14(4)). Each token must be classified liquid, less liquid or illiquid; a token is not liquid merely because it is tokenised (14(6)). Secondary trading of tokenised T-bills, money market instruments and listed securities only where the SEC authorises it, on its conditions (14(7)(b)) | **Confirmed (primary text)** |
| Link to the CBN | The text defers to CBN approvals where an activity is CBN-regulated (for example p50, foreign-issued stablecoins) | **Confirmed (primary text)** |

## Unresolved, check before publishing

1. **SEC status.** Find an SEC notice with a date and a consultation deadline, or confirm adoption.
2. **SEC capital guidelines.** The law firm says separate "Guidelines on Revised Minimum Capital" dated 18 March 2026 set DAOP and RATOP at ₦1bn, DAIs at ₦500m and AVASPs at ₦300m, differing from Schedule I. Not seen in a primary document.
3. **Executive Order and Council.** Read the Order; confirm who sits on the Council and what it decides.
4. **CBN transition.** Confirm the 180-day period and the registration and reporting deadlines in the regulation text.
5. **Two search-only claims dropped for now.** "First public digital securities offering expected September 2026" and "VASP track window 12 to 31 August 2026" came from an unverified search summary.

## What this means for the tracker

- Every entry needs an instrument, a section reference, a status (draft, in force, superseded), an "as of" date and a primary link.
- Two regulators, one activity: the tracker should map issue, hold, offer and transfer to the CBN, the SEC or both.
- The RATOP rules in 14(5) to 14(7) bear directly on tokenised equities, bonds and money market instruments, and so on report 05 and the NAV monitor.
