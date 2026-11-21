export const sections = [
  { id: "brief", label: "Brief" },
  { id: "corrections", label: "Corrections" },
  { id: "governance", label: "Governance" },
  { id: "standards", label: "Standards" },
  { id: "money", label: "Endowment" },
  { id: "studio", label: "Studio" },
  { id: "ninety", label: "90 days" },
] as const;

export const decisions = [
  {
    kicker: "Program",
    title: "Noncredit community arts",
    body: "A 120-hour pilot. College credit, if any, is awarded later by a receiving college, not by Rainbow.",
  },
  {
    kicker: "Accreditation",
    title: "ACCPAS only if it stays this school",
    body: "NASM is a different institution: a larger professional postsecondary program, not a second stamp on the pilot.",
  },
  {
    kicker: "Money",
    title: "$1 million is a working goal",
    body: "Collected permanent gifts over five years. About $40,000 a year at an illustrative 4% payout. It does not fund the launch.",
  },
  {
    kicker: "Gate",
    title: "Wisconsin, in writing, first",
    body: "No marketing and no enrollment until DSPS says the program is approved or exempt. Counsel checks the signed bylaws before any charter is adopted.",
  },
] as const;

export const corrections = [
  {
    earlier: "ACCPAS accreditation makes Rainbow eligible for NASM.",
    now: "Do not treat ACCPAS as a bridge. Moving from community arts to postsecondary study changes the state and accreditor analysis.",
  },
  {
    earlier: "Launch a 30-semester-hour professional certificate and convert clock hours into credit.",
    now: "Keep the pilot noncredit. Do not turn pilot hours into invented academic credits.",
  },
  {
    earlier: "Raise $2.5 to $5 million, and count gear toward the corpus.",
    now: "The working goal is $1 million in collected permanent cash. Pledges, bequest intentions, and in-kind gear stay outside that number.",
  },
  {
    earlier: "Illinois IBHE, or Iowa endowment law because the EIN starts with 42.",
    now: "Ask Wisconsin DSPS for a written determination. Do not infer the governing endowment statute from the EIN prefix. Counsel confirms it.",
  },
  {
    earlier: "Name Chicago house artists as if the seats were already accepted.",
    now: "Seats are roles. Announce a name only after a first-year assignment exists and the person has agreed.",
  },
  {
    earlier: "A Dolby Atmos room in year one, described as certified.",
    now: "Teach immersive work on headphones and borrow a calibrated room. Dolby’s studio directory is not a certification.",
  },
  {
    earlier: "An advisory board of 11 or 15, sometimes voting with directors.",
    now: "Nine voting advisors. The director liaison does not vote. Advisors cannot hire, spend, contract, or grade.",
  },
  {
    earlier: "Tenure, or “Ivy League” as something the Lab can claim in public.",
    now: "“Ivy League” is an internal quality bar only. Use Distinguished Practitioner or Artist-in-Residence. Tenure only if a funded system is adopted later.",
  },
] as const;

export const seats = [
  "Two Chicago house or Great Lakes DJ culture stewards",
  "One producer with verified major credits who can actually do the work",
  "One university music-technology or electronic-composition professor",
  "One conservatory dean or former accreditation lead",
  "One label, publishing, or artist-development executive",
  "One touring DJ, venue programmer, or live-sound leader",
  "One community-arts or accessibility educator",
  "One learner representative — Racine-area until there are alumni",
] as const;

export const cannot = [
  "Sign, hire, spend, or accept gifts",
  "Negotiate binding terms",
  "Speak to regulators or accreditors for the Lab",
  "Approve institutional policy",
  "Decide admissions or grades",
  "See identifiable student files",
] as const;

export const yearCycle = [
  { q: "Q1", work: "Review syllabi, outcomes, and assessment evidence." },
  { q: "Q2", work: "Publish an internal industry and technology scan." },
  { q: "Q3", work: "Review de-identified capstone samples and a standards gap analysis." },
  { q: "Q4", work: "Send a prioritized quality report: actions, owners, costs, and measures." },
] as const;

export const routes = [
  {
    name: "ACCPAS",
    fit: "Community or precollegiate arts",
    when: "The right first conversation if Rainbow remains a community-arts school. A completion certificate is allowed. A degree or other postsecondary credential is not.",
    gate: "Confirm in writing who the applicant is, how the operating-history rule applies, and which primary-accreditor rules apply. An independent school needs at least three consecutive years, regular offerings, sufficient enrollment, and the legal requirements that apply.",
  },
  {
    name: "NASM",
    fit: "Professional postsecondary, non-degree",
    when: "Only if the Board later authorizes a much larger professional program. Not a short DJ course and not a vendor badge.",
    gate: "Current rules look for a program of at least 30 undergraduate semester hours or equivalent, completers, at least three students progressing, and at least 15 students in residence in eligible curricula. Budget the audit. Do not invent those hours out of the pilot.",
  },
  {
    name: "College credit",
    fit: "A separate agreement",
    when: "A college may evaluate prior learning, or teach its own credit-bearing course. Rainbow does not award the credit in either case.",
    gate: "Get the college’s written approval and check it with Wisconsin before marketing it. Gateway publishes a prior-learning process. UW–Parkside is an exploratory conversation, not a partnership.",
  },
] as const;

export const readiness = [
  {
    year: "Year 1",
    title: "Establish the record",
    body: "Confirm state status. Publish a controlled catalog. Run the 120-hour certificate. Keep sample work, scores, policy versions, and what changed after each cohort.",
  },
  {
    year: "Year 2",
    title: "Prove it can be repeated",
    body: "Run scheduled cohorts. Commission an external curriculum and accessibility review. Test whether scorers agree. Start college mapping. Ask ACCPAS or NASM for a scope conversation, not a public “candidate” label.",
  },
  {
    year: "Year 3",
    title: "The Board chooses",
    body: "Finish a gap analysis and a mock visit. Stay on the community route unless demand, money, state authority, faculty, a broader music curriculum, and the NASM enrollment evidence are actually in hand.",
  },
  {
    year: "Years 4–5",
    title: "External review only when eligible",
    body: "Apply on the accreditor’s clock. A visit is not accreditation. A new professional program’s first graduates can push an independent NASM decision past year 5. Say only what a letter has confirmed.",
  },
] as const;

export const courses = [
  { name: "DJ Performance and Musicianship", hours: 36 },
  { name: "Electronic Production and Critical Listening", hours: 36 },
  { name: "House Lineage, Rights and Artist Practice", hours: 24 },
  { name: "Capstone Studio", hours: 24 },
] as const;

export const rubric = [
  {
    id: "performance",
    name: "Performance technique",
    weight: 25,
    level3:
      "Phrasing, beat alignment, transitions, and gain staging serve the set. The student recovers from a cue or routing problem without stopping.",
  },
  {
    id: "musicianship",
    name: "Musicianship and programming",
    weight: 20,
    level3:
      "Track choices and sequence show deliberate energy, musical continuity, and stylistic understanding.",
  },
  {
    id: "production",
    name: "Production and listening",
    weight: 25,
    level3:
      "The original work has a coherent arrangement and a controlled balance. The session is organized, and the export matches the intended mix.",
  },
  {
    id: "rights",
    name: "Context, credits, and rights",
    weight: 15,
    level3:
      "The work sits in a credible lineage, contributors and sources are credited, and the student can say what may be shared.",
  },
  {
    id: "practice",
    name: "Professional practice and safety",
    weight: 15,
    level3:
      "Setup and teardown are complete, level and hearing rules are followed, backups exist, and the handoff is clear.",
  },
] as const;

export const campaign = [
  { year: "1", fresh: 50000, total: 50000, priority: "Quiet phase. Interview at least 15 prospects. Adopt gift and investment policies. Secure seed gifts." },
  { year: "2", fresh: 100000, total: 150000, priority: "Founding major donors and one challenge gift. Counsel-reviewed bequest language. A legacy society." },
  { year: "3", fresh: 200000, total: 350000, priority: "Multi-year major gifts and paid-in matches. Ask AlphaTheta and Ableton separately for current-use support, not corpus." },
  { year: "4", fresh: 275000, total: 625000, priority: "Named funds only above a Board minimum tied to a real payout. Broaden the donor base. Watch concentration." },
  { year: "5", fresh: 375000, total: 1000000, priority: "Close lead gifts. Publish a stewardship report. Spend only what the Board has approved." },
] as const;

export const pools = [
  {
    name: "Operations and reserves",
    body: "Unrestricted gifts, earned revenue, operating grants, and current-use scholarships, each under its own terms. Aim for six months of core expenses before a major permanent lease or a larger fixed payroll.",
  },
  {
    name: "Capital and replacements",
    body: "Equipment gifts and cash for a defined fit-out, repairs, replacement, licenses, and access. Donated desks, turntables, and licenses are not endowment principal.",
  },
  {
    name: "Permanent endowment",
    body: "One pooled Access Endowment for donor-restricted perpetual gifts, broadly for need-based access and related student support. A Board-designated quasi-endowment is a different thing and must not be marketed as the same.",
  },
] as const;

export const prudentFactors = [
  "Duration and preservation of the fund",
  "The purposes of the institution and the fund",
  "General economic conditions",
  "Inflation or deflation",
  "Expected total return",
  "Other resources of the institution",
  "The investment policy",
] as const;

export const rooms = [
  {
    name: "Club reference booth",
    count: "One",
    spec: "Two CDJ-3000 players, or matched CDJ-3000X units after a compatibility test. One DJM-A9. Two Technics SL-1200MK7 turntables. Wired Pro DJ Link, closed-back headphones, booth monitors, a capture path, USB media, and timecode vinyl. Teach standalone rekordbox export and Serato DJ Pro.",
    gate: "Test the exact firmware and accounts, offline USB fallback, set recording, and whether a learner can reach the booth. Institutional licenses only. A personal license does not cover a shared lab.",
  },
  {
    name: "Practice booths",
    count: "Three",
    spec: "Dual-deck controllers with a real mixer section, three school computers, six closed-back headphones, cue split so two learners can work, and one spare controller. Teach by ear. Every capstone set still happens in the reference booth.",
    gate: "Both learners can cue. Routing is reliable. Headphones can be wiped. The station resets the same way between classes.",
  },
  {
    name: "Stereo production",
    count: "Six seats",
    spec: "School-owned machines at a 16 GB RAM and 512 GB SSD baseline. Institutional Ableton Live Suite where the license exists. A small interface, a MIDI controller, and closed-back headphones at each seat. One Push 3 and a calibrated nearfield pair at the instructor station.",
    gate: "One file template, versioned storage, backups, cleared samples, and a class image tested before it is deployed.",
  },
  {
    name: "Immersive audio",
    count: "Partner first",
    spec: "Binaural monitoring on wired headphones. Book time in a calibrated 7.1.4 room for final checks. A dedicated suite comes later, and only with a utilization case plus capital and maintenance that do not touch scholarships or reserves.",
    gate: "A qualified designer commissions any future room. Do not claim Dolby certification.",
  },
] as const;

export const faculty = [
  { role: "Academic Director", note: "Catalog, faculty files, complaints, quality review, and any later self-study." },
  { role: "Lead performance instructor", note: "The reference booth, juries, and the performance half of the capstone." },
  { role: "Lead production instructor", note: "Sessions, listening, and the production half of the capstone." },
  { role: "Lab technician", note: "The room actually resets. Firmware, images, spares, and hearing-safety routines." },
  { role: "Contract specialists", note: "History and rights. Not a substitute for the instructor of record." },
] as const;

export const actions = [
  {
    id: "bylaws",
    phase: "Days 1–30",
    owner: "Chair, secretary, counsel",
    title: "Verify signed Articles IX and XI",
    detail:
      "The draft followed leadership’s description because the signed copy was not in hand. Nothing in the charter is adopted against an unread instrument.",
  },
  {
    id: "charter",
    phase: "Days 1–30",
    owner: "Corporate Board",
    title: "Adopt the advisory charter and the reserved-powers list",
    detail:
      "If counsel finds Article IX covers only director committees, create the advisors by a separate resolution and do not delegate corporate powers.",
  },
  {
    id: "lead",
    phase: "Days 1–30",
    owner: "Corporate Board",
    title: "Name an Academic Director or an interim lead",
    detail: "Someone has to own the catalog, the rubric, and the faculty file before a cohort is promised.",
  },
  {
    id: "wisconsin",
    phase: "Days 1–30",
    owner: "Counsel and the academic lead",
    title: "Ask Wisconsin DSPS for a written determination",
    detail:
      "Send the real audience, calendar, curriculum, tuition, delivery mode, career claims, credential language, and any college arrangement. Public-charity status does not settle approval.",
  },
  {
    id: "catalog",
    phase: "Days 31–60",
    owner: "Academic Director and treasurer",
    title: "Lock the pilot catalog, certificate face, rubric, and records policy",
    detail:
      "Include a course-mapping sample for Gateway and UW–Parkside, a first-year operating and capital budget, and draft gift, investment, and spending policies.",
  },
  {
    id: "enroll",
    phase: "Days 61–90",
    owner: "Corporate Board",
    title: "Authorize enrollment only if the cohort can actually be delivered",
    detail:
      "That means written regulatory status, launch funding, faculty, the reference booth, and the student-protections package. The endowment quiet phase is a separate vote, after counsel and the CPA.",
  },
] as const;

export type ActionStatus = "open" | "ready" | "adopted" | "deferred";

export const statusMeta: { id: ActionStatus; label: string }[] = [
  { id: "open", label: "Open" },
  { id: "ready", label: "In the packet" },
  { id: "adopted", label: "Adopted" },
  { id: "deferred", label: "Deferred" },
];
