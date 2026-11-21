import { useEffect, useMemo, useState } from "react";
import {
  actions,
  campaign,
  cannot,
  corrections,
  courses,
  decisions,
  faculty,
  pools,
  prudentFactors,
  readiness,
  rooms,
  routes,
  rubric,
  seats,
  sections,
  statusMeta,
  yearCycle,
  type ActionStatus,
} from "@/data/brief";
import { loadLedger, saveLedger, type LedgerState } from "@/lib/board-ledger";

const TOTAL_HOURS = courses.reduce((sum, course) => sum + course.hours, 0);

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function points(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}

function scoreOf(ratings: Record<string, number>) {
  return rubric.reduce((sum, item) => sum + (item.weight * (ratings[item.id] ?? 0)) / 4, 0);
}

function passes(ratings: Record<string, number>, score: number) {
  const low = rubric.some((item) => (ratings[item.id] ?? 0) < 2);
  const rights = (ratings.rights ?? 0) >= 3;
  const practice = (ratings.practice ?? 0) >= 3;
  return score >= 75 && !low && rights && practice;
}

export function BoardBrief() {
  const [active, setActive] = useState<string>(sections[0].id);
  const [ledger, setLedger] = useState<LedgerState | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>(() =>
    Object.fromEntries(rubric.map((item) => [item.id, 3])),
  );
  const [gifts, setGifts] = useState(1_000_000);
  const [rate, setRate] = useState(4);

  useEffect(() => {
    setLedger(loadLedger());
  }, []);

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const score = scoreOf(ratings);
  const cleared = passes(ratings, score);
  const payout = Math.round((gifts * rate) / 100);
  const scholarshipBase = rate > 0 ? Math.round(25000 / (rate / 100)) : null;
  const adopted = useMemo(() => {
    if (!ledger) return 0;
    return actions.filter((action) => ledger[action.id]?.status === "adopted").length;
  }, [ledger]);

  function update(id: string, patch: Partial<{ status: ActionStatus; note: string }>) {
    setLedger((current) => {
      const base = current ?? loadLedger();
      const next = { ...base, [id]: { ...base[id], ...patch } };
      saveLedger(next);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#brief"
        className="sr-only focus:not-sr-only focus:absolute focus:z-30 focus:m-3 focus:bg-sheet focus:px-3 focus:py-2"
      >
        Skip to the brief
      </a>

      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-widest text-muted uppercase">
            <span>Ras Tafari Inc.</span>
            <span aria-hidden="true" className="text-line">
              /
            </span>
            <span>Board discussion draft</span>
            <span aria-hidden="true" className="text-line">
              /
            </span>
            <span>November 2026</span>
          </div>
          <div className="max-w-3xl">
            <p className="font-display text-lg text-accent">Rainbow DJ Lab</p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
              One brief the Board can vote from.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Five internal drafts argued past each other. This one keeps the November path:
              a serious noncredit school, advisors without corporate power, and an endowment
              that is not asked to open the doors.
            </p>
          </div>
          <div className="h-1 w-16 bg-accent" aria-hidden="true" />
        </div>
      </header>

      <nav
        aria-label="Brief sections"
        className="no-print sticky top-0 z-20 border-b border-line bg-paper"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {sections.map((section) => {
            const on = active === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={on ? "true" : undefined}
                className={
                  "shrink-0 rounded-full px-3 py-2 text-sm font-semibold " +
                  (on ? "bg-ink text-accent-ink" : "text-muted hover:bg-wash hover:text-ink")
                }
              >
                {section.label}
              </a>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10 sm:px-6 sm:py-14">
        <section id="brief" className="scroll-mt-24">
          <SectionLabel index="01" title="The recommendation" />
          <p className="mt-4 max-w-3xl text-lg">
            Launch Rainbow DJ Lab as a selective, accessible, conservatory-style program in DJ
            performance and electronic music, rooted in the Black and queer lineages of Chicago
            house and the wider Great Lakes community. Reputation comes from student work, paid
            master practitioners, independent assessment, and durable scholarships.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {decisions.map((item) => (
              <article key={item.kicker} className="rounded-lg border border-line bg-sheet p-5">
                <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                  {item.kicker}
                </p>
                <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                <p className="mt-2 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-muted">
            “Ivy League” stays an internal standard for how carefully the work is taught and
            judged. It is not an affiliation, and it is not accreditation.
          </p>
        </section>

        <section id="corrections" className="scroll-mt-24">
          <SectionLabel index="02" title="What earlier drafts got wrong" />
          <p className="mt-4 max-w-3xl text-muted">
            The looser drafts are useful as ambition. They are not safe to put in a Board
            packet. Each row is a claim this brief will not carry.
          </p>
          <ol className="mt-6 flex flex-col gap-3">
            {corrections.map((item) => (
              <li key={item.now} className="rounded-lg border border-line bg-sheet p-5">
                <p className="text-xs font-semibold tracking-widest text-muted uppercase">
                  Earlier draft
                </p>
                <p className="mt-1">{item.earlier}</p>
                <p className="mt-4 text-xs font-semibold tracking-widest text-accent uppercase">
                  This brief
                </p>
                <p className="mt-1">{item.now}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="governance" className="scroll-mt-24">
          <SectionLabel index="03" title="Advisors who cannot bind the corporation" />
          <p className="mt-4 max-w-3xl">
            Charter a nine-member Academic & Industry Advisory Board. It reviews curriculum
            and student work and reports to the corporate Board. The corporate Board keeps
            policy, budgets, contracts, and accreditation.
          </p>
          <p className="mt-3 max-w-3xl text-muted">
            If counsel finds Article IX applies only to director committees, establish the
            advisors by a separate resolution. A Wisconsin committee that actually exercises
            Board authority needs at least three directors on it. Outside experts do not fill
            those seats.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            <div className="rounded-lg border border-line bg-sheet p-5 lg:col-span-3">
              <h3 className="font-display text-2xl">Nine voting seats</h3>
              <ol className="mt-4 flex flex-col gap-3">
                {seats.map((seat, index) => (
                  <li key={seat} className="flex gap-3">
                    <span className="w-6 shrink-0 font-display text-accent tabular-nums">
                      {index + 1}
                    </span>
                    <span>{seat}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-muted">
                The Academic Director and one corporate director attend as nonvoting liaisons.
                Staggered two-year terms, two consecutive full terms at most. The learner seat
                is one year and renewable. Quarterly meetings. A majority of filled voting
                seats is a quorum. Recommendations are not corporate action.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-2">
              <div className="rounded-lg border border-line bg-ink p-5 text-accent-ink">
                <h3 className="font-display text-2xl">They cannot</h3>
                <ul className="mt-4 flex flex-col gap-2 text-sm">
                  {cannot.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-line bg-sheet p-5">
                <h3 className="font-display text-xl">No sponsor seat</h3>
                <p className="mt-2 text-sm text-muted">
                  No sponsor gets a reserved chair or a veto over curriculum, purchasing, or
                  assessment. A gear executive who advises does not sit in on a recommendation
                  that touches that company’s products.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {yearCycle.map((item) => (
              <article key={item.q} className="rounded-lg border border-line bg-sheet p-4">
                <p className="font-display text-xl text-accent">{item.q}</p>
                <p className="mt-2 text-sm">{item.work}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-sm text-muted">
            The corporate Board records each recommendation as accepted, deferred, or declined.
            Founding anchors, before any public list: one Chicago house steward, one academic
            quality lead, and one Racine community educator, each with a named first-year job.
          </p>
          <aside className="mt-6 rounded-lg border border-accent bg-sheet p-5">
            <h3 className="font-display text-xl">The governing board may have to grow</h3>
            <p className="mt-2 max-w-3xl">
              The corporate Board is three directors. For a freestanding applicant under the
              ACCPAS or NASM rules this draft relies on, plan on at least five, with the chair
              and a majority of the other voting members free of the financial interests those
              handbooks specify, and a chief executive who is not the chair. Advisory seats do
              not count. ACCPAS also looks for a paid full-time chief executive and an
              independent audit within 180 days of year-end. Recruit independent directors
              only after the accreditor confirms the scope.
            </p>
          </aside>
        </section>

        <section id="standards" className="scroll-mt-24">
          <SectionLabel index="04" title="Standards before a seal" />
          <p className="mt-4 max-w-3xl">
            Choose the commission for the school you intend to operate. Do not write a NASM
            self-study for a community program, and do not call a visit accreditation.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {routes.map((route) => (
              <article key={route.name} className="flex flex-col rounded-lg border border-line bg-sheet p-5">
                <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                  {route.fit}
                </p>
                <h3 className="mt-2 font-display text-2xl">{route.name}</h3>
                <p className="mt-3">{route.when}</p>
                <p className="mt-3 text-sm text-muted">{route.gate}</p>
              </article>
            ))}
          </div>

          <ol className="mt-8 flex flex-col gap-0 border-l border-line">
            {readiness.map((item) => (
              <li key={item.year} className="py-4 pl-5">
                <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                  {item.year}
                </p>
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-1 max-w-3xl text-muted">{item.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <h3 className="font-display text-2xl">120 instructional hours</h3>
            <p className="mt-2 max-w-3xl text-muted">
              Log contact hours and independent practice separately. The certificate is DJ
              Performance & Electronic Music Foundations, issued by Ras Tafari Inc.
            </p>
            <ul className="mt-5 flex flex-col gap-4">
              {courses.map((course) => (
                <li key={course.name}>
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="font-semibold">{course.name}</span>
                    <span className="shrink-0 tabular-nums text-muted">{course.hours} h</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-wash">
                    <div
                      className="h-2 rounded-full bg-accent"
                      style={{ width: `${(course.hours / TOTAL_HOURS) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="mt-8 border-l-2 border-accent pl-4">
            <p className="max-w-3xl">
              “Rainbow DJ Lab Certificate of Completion: DJ Performance & Electronic Music
              Foundations. Issued by Ras Tafari Inc. Noncredit; no college credit awarded by
              Rainbow DJ Lab. Any award of academic credit is determined by the receiving
              institution.”
            </p>
            <p className="mt-2 text-sm text-muted">
              Put that on the face, with the learner’s name, the date, a unique ID, a
              signature, and a private way to verify it. A companion record holds course
              codes, syllabus versions, hours, and ratings.
            </p>
          </blockquote>

          <RubricPanel
            ratings={ratings}
            score={score}
            cleared={cleared}
            onRate={(id, value) => setRatings((current) => ({ ...current, [id]: value }))}
          />
        </section>

        <section id="money" className="scroll-mt-24">
          <SectionLabel index="05" title="Three pools, and a goal that is not a forecast" />
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {pools.map((pool) => (
              <article key={pool.name} className="rounded-lg border border-line bg-sheet p-5">
                <h3 className="font-display text-xl">{pool.name}</h3>
                <p className="mt-2 text-sm text-muted">{pool.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-sheet">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="px-4 py-3 text-left font-display text-xl">
                Five-year permanent-gift campaign
              </caption>
              <thead className="text-xs tracking-widest text-muted uppercase">
                <tr className="border-y border-line">
                  <th className="px-4 py-2 font-semibold">Year</th>
                  <th className="px-4 py-2 font-semibold">Collected</th>
                  <th className="px-4 py-2 font-semibold">Cumulative</th>
                  <th className="px-4 py-2 font-semibold">Priority</th>
                </tr>
              </thead>
              <tbody>
                {campaign.map((row) => (
                  <tr key={row.year} className="border-b border-line align-top">
                    <td className="px-4 py-3 font-display tabular-nums">{row.year}</td>
                    <td className="px-4 py-3 tabular-nums">{money(row.fresh)}</td>
                    <td className="px-4 py-3 tabular-nums">{money(row.total)}</td>
                    <td className="px-4 py-3 text-muted">{row.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 max-w-3xl text-sm text-muted">
            Revocable legacy intentions, unpaid pledges, in-kind gifts, and current-use
            sponsorships are outside the cash target. Fund development costs and the pilot
            from somewhere else unless a reviewed gift instrument says otherwise.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-line bg-sheet p-5">
              <h3 className="font-display text-2xl">Illustration, not a payout</h3>
              <p className="mt-2 text-sm text-muted">
                The arithmetic below does not authorize a distribution. Spending waits for a
                trailing 12-quarter history, donor terms, and a Board minute.
              </p>
              <label className="mt-5 block text-sm font-semibold" htmlFor="gifts">
                Collected permanent gifts
                <span className="mt-1 block font-display text-3xl tabular-nums">{money(gifts)}</span>
              </label>
              <input
                id="gifts"
                type="range"
                min={0}
                max={1000000}
                step={25000}
                value={gifts}
                onChange={(event) => setGifts(Number(event.target.value))}
              />
              <label className="mt-4 block text-sm font-semibold" htmlFor="rate">
                Illustrative payout rate
                <span className="mt-1 block font-display text-3xl tabular-nums">{rate}%</span>
              </label>
              <input
                id="rate"
                type="range"
                min={0}
                max={5}
                step={0.25}
                value={rate}
                onChange={(event) => setRate(Number(event.target.value))}
              />
              <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4">
                <div>
                  <dt className="text-xs tracking-widest text-muted uppercase">Annual support</dt>
                  <dd className="font-display text-2xl tabular-nums">{money(payout)}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-widest text-muted uppercase">Corpus for $25,000</dt>
                  <dd className="font-display text-2xl tabular-nums">
                    {scholarshipBase === null ? "—" : money(scholarshipBase)}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-lg border border-line bg-sheet p-5">
              <h3 className="font-display text-2xl">Spending rule to propose</h3>
              <p className="mt-2">
                Up to 4% of the trailing 12 quarter-end market values, once a fund has that
                history and the distribution would mean something. Default to no spending
                before then, and no spending from an underwater fund, unless the Board
                approves it after a written prudence review and a check of the gift terms.
              </p>
              <p className="mt-3 text-sm text-muted">
                That ceiling is not a legal safe harbor. Minute these seven considerations
                under Wisconsin’s prudent-management statute, and have counsel confirm that
                Wisconsin is the statute that applies:
              </p>
              <ul className="mt-3 flex flex-col gap-1 text-sm">
                {prudentFactors.map((factor) => (
                  <li key={factor}>{factor}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-line bg-sheet p-5">
            <h3 className="font-display text-xl">Do not merge Finance into the endowment</h3>
            <p className="mt-2 max-w-3xl">
              With three directors, either the full Board acts on endowment matters with an
              advisory working group, or counsel confirms that Finance can be rechartered as
              Finance, Endowment & Investment, still made of those directors. Spin out a
              separate Endowment & Investment Committee only when the Board is larger, and
              keep audit oversight somewhere else. Investment advisors do not get a vote or a
              pen. Article XI signatory tiers stay. Authorization, execution, and monthly
              reconciliation stay in different hands.
            </p>
          </div>
        </section>

        <section id="studio" className="scroll-mt-24">
          <SectionLabel index="06" title="Teach first. Buy the room the work requires." />
          <p className="mt-4 max-w-3xl">
            Design the pilot for 12 learners: three two-person practice booths and six
            production seats, rotations so every learner gets supervised time, and bookable
            practice outside class. Pilot one reference booth and one production station
            before a full build. These are Rainbow’s specifications, not an accreditor’s
            brand list.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {rooms.map((room) => (
              <article key={room.name} className="rounded-lg border border-line bg-sheet p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl">{room.name}</h3>
                  <p className="text-sm font-semibold text-accent">{room.count}</p>
                </div>
                <p className="mt-3">{room.spec}</p>
                <p className="mt-3 text-sm text-muted">{room.gate}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-sm text-muted">
            Step-free routes, adjustable surfaces, loaner gear, controlled cables, safe
            egress, level logs, limiters, hearing protection, and trained staff. Use NIOSH
            as an occupational reference, not as a single classroom volume limit. Ask local
            professionals to review code, access, and sound exposure.
          </p>

          <div className="mt-8 overflow-hidden rounded-lg border border-line bg-sheet">
            {faculty.map((person) => (
              <article
                key={person.role}
                className="grid gap-1 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-3 sm:items-baseline sm:gap-6"
              >
                <h3 className="font-display text-lg">{person.role}</h3>
                <p className="text-sm text-muted sm:col-span-2">{person.note}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-line bg-sheet p-5">
            <h3 className="font-display text-xl">Hire for teaching, then keep the file</h3>
            <p className="mt-2 max-w-3xl">
              Score mastery 30, a paid teaching audition 30, assessment calibration 20,
              inclusive and culturally grounded practice 10, and reliability and safety 10.
              Require 75 out of 100, and at least 70% of the points in teaching and in
              assessment on their own — 21 and 14. Fame does not replace the audition.
              Guest artists are not the instructors of record unless they have been
              calibrated on the rubric. Do not call the appointment tenure.
            </p>
          </div>
        </section>

        <section id="ninety" className="scroll-mt-24">
          <SectionLabel index="07" title="The first 90 days" />
          <p className="mt-4 max-w-3xl">
            Six actions, in order. Mark them on this device only — nothing here is sent to
            the corporation. {adopted} of {actions.length} marked adopted.
          </p>
          <ol className="mt-6 flex flex-col gap-4">
            {actions.map((action, index) => {
              const row = ledger?.[action.id] ?? { status: "open" as const, note: "" };
              return (
                <li key={action.id} className="rounded-lg border border-line bg-sheet p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                      {action.phase}
                      <span className="text-muted"> · {action.owner}</span>
                    </p>
                    <span className="font-display text-muted tabular-nums">0{index + 1}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl">{action.title}</h3>
                  <p className="mt-2 max-w-3xl text-muted">{action.detail}</p>
                  <div
                    className="no-print mt-4 flex flex-wrap gap-2"
                    role="group"
                    aria-label={`Status for ${action.title}`}
                  >
                    {statusMeta.map((status) => {
                      const on = row.status === status.id;
                      return (
                        <button
                          key={status.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => update(action.id, { status: status.id })}
                          className={
                            "min-h-11 rounded-full px-3 text-sm font-semibold " +
                            (on
                              ? "bg-ink text-accent-ink"
                              : "border border-line bg-paper text-ink hover:bg-wash")
                          }
                        >
                          {status.label}
                        </button>
                      );
                    })}
                  </div>
                  <label className="no-print mt-3 block text-sm" htmlFor={`note-${action.id}`}>
                    <span className="font-semibold">Note for the packet</span>
                    <textarea
                      id={`note-${action.id}`}
                      value={row.note}
                      maxLength={280}
                      rows={2}
                      onChange={(event) => update(action.id, { note: event.target.value })}
                      className="mt-1 w-full resize-y rounded-lg border border-line bg-paper px-3 py-2 text-ink"
                    />
                  </label>
                </li>
              );
            })}
          </ol>
          <div className="no-print mt-4">
            <button
              type="button"
              className="min-h-11 text-sm font-semibold text-accent underline"
              onClick={() => {
                const clearedLedger = Object.fromEntries(
                  actions.map((action) => [action.id, { status: "open" as const, note: "" }]),
                );
                saveLedger(clearedLedger);
                setLedger(clearedLedger);
              }}
            >
              Clear marks on this device
            </button>
          </div>
        </section>

        <footer className="border-t border-line pt-6 text-sm text-muted">
          <p className="max-w-3xl">
            Synthesized from the November 2026 board discussion draft for Ras Tafari Inc.
            leadership. Sources named there include the ACCPAS and NASM handbooks, Wis. Stat.
            §§ 181.0825 and 112.11, and Wisconsin DSPS Educational Approval Program materials.
            Counsel should read the signed bylaws before the Board adopts a charter or
            delegates anything. Year-one success is consistent assessed work, reliable access
            to instruction and equipment, and financial controls that survive an independent
            review.
          </p>
        </footer>
      </main>
    </div>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div>
      <p className="font-display text-sm text-accent tabular-nums">{index}</p>
      <h2 className="mt-1 font-display text-3xl sm:text-4xl">{title}</h2>
    </div>
  );
}

function RubricPanel({
  ratings,
  score,
  cleared,
  onRate,
}: {
  ratings: Record<string, number>;
  score: number;
  cleared: boolean;
  onRate: (id: string, value: number) => void;
}) {
  return (
    <div className="mt-10 rounded-lg border border-line bg-sheet p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl">Capstone bar</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Weighted score is each weight times the rating, divided by four, then added.
            All 3s is exactly 75. Try a weak rights score and the result fails even when
            the total still looks high.
          </p>
        </div>
        <p className="font-display text-4xl tabular-nums">
          {points(score)}
          <span className="text-lg text-muted"> / 100</span>
        </p>
      </div>
      <p
        className={
          "mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold " +
          (cleared ? "bg-ink text-accent-ink" : "bg-wash text-ink")
        }
      >
        {cleared ? "Meets the written bar" : "Does not meet the written bar"}
      </p>
      <ul className="mt-5 flex flex-col gap-5">
        {rubric.map((item) => (
          <li key={item.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold">
                {item.name}
                <span className="ml-2 text-sm font-normal text-muted">{item.weight}%</span>
              </p>
              <p className="text-sm tabular-nums text-muted">Level {ratings[item.id]}</p>
            </div>
            <p className="mt-1 text-sm text-muted">{item.level3}</p>
            <input
              className="mt-2"
              aria-label={`${item.name} level`}
              type="range"
              min={0}
              max={4}
              step={1}
              value={ratings[item.id]}
              onChange={(event) => onRate(item.id, Number(event.target.value))}
            />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">
        4 independent and adaptable, 3 proficient, 2 inconsistent or prompted, 1
        insufficient or unsafe, 0 missing. Also required: nothing below 2, and at least 3
        in both rights and professional practice. A critical safety incident, or a
        prohibited use of material, blocks completion until it is remediated. Two
        calibrated assessors score the work. A pass/fail split, or a gap of more than one
        level, goes to a third.
      </p>
    </div>
  );
}
