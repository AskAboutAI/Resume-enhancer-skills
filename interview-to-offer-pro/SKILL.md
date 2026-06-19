---
name: interview-to-offer-pro
description: >
  Run this skill when the user has an interview scheduled, receives a job offer,
  wants to negotiate salary, or wants to optimize their LinkedIn profile. Triggers
  on: "I have an interview", "interview prep", "help me prepare for my interview",
  "mock interview", "I got an offer", "I received an offer", "help me negotiate",
  "salary negotiation", "counter offer", "is this offer good", "rewrite my LinkedIn",
  "optimize my LinkedIn profile", "LinkedIn headline", "follow-up email after
  interview", "should I send a thank you", "they haven't responded", "nudge email",
  "what do I say after the interview". Also triggers when the user mentions a specific
  company and interview date in the same message, or pastes an offer letter. This
  skill is the third in the job search sequence — it runs AFTER Resume-Optimizer-Pro
  and Application-Accelerator, but it can also run standalone whenever an interview
  or offer arrives.
---

# Interview-to-Offer-Pro

Covers everything from interview prep through signed offer. Three distinct modes
triggered by where the user is in the process. Read the matching reference file
after detecting the mode — do not load all references at once.

---

## Mode Detection

Identify which mode applies from the user's message. When ambiguous, ask:

```
MODE A — INTERVIEW PREP
Trigger: User mentions an upcoming interview, a specific date, a company name
         and role together, or asks to prep / practice / do a mock interview.
         Follow-up emails after the interview are part of this mode.
Read:    references/interview-prep.md
         references/follow-up-emails.md (when interview is over or emails requested)

MODE B — OFFER NEGOTIATION
Trigger: User mentions receiving an offer, shares a compensation package,
         asks whether an offer is fair, or wants a counter-offer strategy.
Read:    references/negotiation.md

MODE C — LINKEDIN OPTIMIZATION
Trigger: User wants to rewrite or improve their LinkedIn profile, headline,
         about section, or experience bullets for recruiter visibility.
Read:    references/linkedin-optimizer.md
```

A single session can move through modes in sequence — prep before the interview,
follow-up emails after, negotiation when the offer arrives. Keep context across
modes within the same session; the user should never have to repeat themselves.

---

## Step 0: Input Collection

Collect the minimum required inputs before reading any reference file.

**For MODE A (Interview Prep):**
If not already provided, ask:
> "What role are you interviewing for, at which company, and when is the
> interview? Also paste your resume and the job description if you haven't
> already — I'll use both to predict the exact questions they'll ask."

Required: role name, company name, interview date
Helpful: job description, resume (already in context from Skill 1 if run in sequence)

**For MODE B (Offer Negotiation):**
If not already provided, ask:
> "Paste the full offer details — base salary, bonus, equity, benefits, and
> the role title and location. I'll pull market data and build your negotiation
> strategy."

Required: role, company, location, base salary
Helpful: bonus structure, equity, benefits, start date flexibility

**For MODE C (LinkedIn Optimization):**
If not already provided, ask:
> "What role are you targeting on LinkedIn? Paste your current headline and
> about section if you have them — I'll rewrite both and optimize all five
> key profile sections."

Required: target role, current LinkedIn headline (or "none")
Helpful: resume (for XYZ bullet rewriting), industries being targeted

---

## Shared Writing Rules

Apply these to ALL output from this skill — research briefs, scripts, emails,
LinkedIn copy, interview answers. No exceptions.

**Punctuation:**
- NO em dashes (—). Replace with a comma, period, or rewrite the sentence.
- NO en dashes (–). Same rule.
- NO ellipsis (...) as a stylistic device. Use a period or restructure.
- These are AI-tell punctuation marks. Their presence in any output signals
  to a hiring manager or recruiter that the content is AI-generated.

**Tone:**
- Confident, not desperate. Direct, not formal.
- No buzzwords: "passionate", "driven", "synergy", "leverage" (as a verb),
  "circle back", "touch base", "bandwidth" (as capacity), "move the needle".
- No filler openers: "Great question", "Absolutely", "Certainly", "Of course".
- Every sentence must earn its place. If it doesn't add information or
  forward momentum, cut it.

**Length discipline:**
- Follow-up emails: hard word limits (see references/follow-up-emails.md)
- STAR interview answers: 60 to 90 seconds when spoken aloud (roughly
  120 to 180 words written)
- LinkedIn headline: under 220 characters per version
- Cover note: 3 sentences only

---

## Tool Usage

Use these tools in the order listed — do not skip research steps:

**Company research (MODE A and B):**
1. `Indeed:get_company_data` — culture ratings, CEO info, salary benchmarks,
   employee reviews. Required parameters:
   - `metadata: true, ratings: true, salaries: true`
   - `language`: use `"en"` unless the user is targeting a non-English market
   - `location.country`: use the 2-letter ISO code for the company's country.
     India = `"IN"`, US = `"US"`, UK = `"GB"`, Canada = `"CA"`.
     If the role is remote with no stated HQ country, use the country where
     the user is located. Ask if genuinely unclear.
2. `web_search` — recent news, earnings reports, product launches, competitor
   moves, funding announcements. Search: "[Company] news 2025" and
   "[Company] [role] interview questions".
3. `web_fetch` — their About page and Careers page for stated values and
   current initiatives.

**Salary market data (MODE B):**
1. `Indeed:get_company_data` with `salaries: true`, the specific job title,
   `language: "en"`, and `location.country` set to the country of the role.
2. `web_search` — "[Role] salary [Location] 2025 Glassdoor" and
   "[Role] compensation [Company] Levels.fyi".

**LinkedIn research (MODE C):**
1. `web_search` — "[Target Role] LinkedIn headline examples" to see what
   top performers in the space are using, then differentiate from those.

---

## Output Files

After completing the relevant mode, generate a .docx output:

**MODE A:** Interview prep document
**MODE B:** Negotiation playbook

Run the script at:
`/mnt/skills/user/interview-to-offer-pro/scripts/generate_docs.js`

```bash
node /mnt/skills/user/interview-to-offer-pro/scripts/generate_docs.js \
  --mode [prep|negotiation|transcript] \
  --data /tmp/interview_data.json \
  --output /mnt/user-data/outputs/[company]-[mode]-doc.docx
```

Before building the JSON input file, read the schema comment block at the
top of `generate_docs.js` (lines 1-80). It defines the exact field names,
types, and optional vs required fields for each mode. Building the JSON
without reading the schema will produce malformed input and a failed run.

---

## Reference Files

```
references/interview-prep.md    — company brief, questions, mock interview flow
references/follow-up-emails.md  — 3 email templates with word limits
references/negotiation.md       — market analysis, email/phone scripts, walk-away
references/linkedin-optimizer.md — 5 profile sections with rules
```

Load only what the current mode requires. If the session transitions
(e.g., interview prep done, now user wants follow-up email), read the
next reference file without losing context from earlier in the session.
