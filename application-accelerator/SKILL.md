---
name: application-accelerator
description: >
  Run this skill whenever a user wants to apply to jobs after optimizing their resume.
  Triggers on: "apply to jobs", "find jobs for me", "search LinkedIn for jobs",
  "search Indeed for jobs", "customize my resume for this role", "write a cover
  letter", "write a cover note", "help me apply", "find matching jobs", "job search",
  "submit applications", "I want to apply to 10 jobs", "find jobs that match my
  resume", "application tracker", or any time the user has an optimized resume and
  wants to start applying. Also triggers when the user pastes a job description and
  says something like "should I apply to this?" or "can you customize my resume for
  this role?". Always run AFTER Resume-Optimizer-Pro has been used — this skill
  picks up where that skill left off. Do NOT run this skill before a resume has been
  optimized — if no optimized resume exists, prompt the user to run
  Resume-Optimizer-Pro first.
---

# Application-Accelerator

Takes the resume optimized by Resume-Optimizer-Pro and turns it into submitted
applications. Routes to two paths based on the user's Claude plan. Both paths
produce the same outputs: a customized resume variant, a 3-sentence cover note,
a full cover letter, and an updated tracker entry for every role.

---

## Step 0: Collect Inputs

Before routing to a path, collect three things:

**1. Optimized resume**
If the user just ran Resume-Optimizer-Pro in this session, the resume is already in
context — use it directly. If not:
- If they paste it as text: use as-is
- If they upload a file: read `/mnt/skills/public/file-reading/SKILL.md` to extract
  it correctly before proceeding

**2. Target job criteria**
Ask if not provided:
> "What job title are you targeting, and where? (e.g., 'AI Content Strategist,
> remote' or 'Marketing Manager, Lucknow'). Any date range for postings
> (last 7 / 14 / 30 days)?"

**3. Plan detection**
Ask directly — do not guess:
> "Are you on Claude Pro or Max with Cowork access? (This determines whether I
> can search and apply automatically, or whether we work from job descriptions
> you paste in.)"

- **Yes → Pro/Max with Cowork** → Read `references/path-b.md` and follow PATH B
- **No → Free plan** → Read `references/path-a.md` and follow PATH A

---

## Match Scoring Engine

Used by BOTH paths. Score every job description against the resume on 5 dimensions.
Be honest — inflate nothing. A 70+ score means proceed; below 70 means flag and ask
the user if they still want to apply.

```
MATCH SCORE BREAKDOWN — [ROLE] @ [COMPANY]
──────────────────────────────────────────
Skill overlap        /30  [# of required skills from JD found in resume]
Experience alignment /20  [years + seniority level match]
Domain relevance     /20  [same or adjacent industry/vertical]
Role title fit       /15  [how close past titles are to this target]
Keyword density      /15  [JD-specific ATS keywords present in resume]
──────────────────────────────────────────
TOTAL                /100

Verdict:
90–100 → Strong match. Minimal customization needed.
70–89  → Good match. Customize summary + 2-3 bullets.
50–69  → Stretch role. Heavy customization + address gap in cover letter.
<50    → Weak match. Flag to user before proceeding.
```

Run this score for every job before customizing. Never skip scoring — it is the
basis for what to customize and what to say in the cover letter's third paragraph.

---

## Resume Customization Rules

Apply these for every role, regardless of path. Customize only the SUMMARY and
top 3 bullet points per role. Do not rebuild the entire resume per job — that
creates inconsistency. The rest stays from the optimized resume.

**Summary rewrite (3 sentences max):**
1. Open with the exact job title from the JD — not the user's current title
2. Surface the 2 most relevant skills from the match score's skill overlap
3. Close with a result that maps directly to the company's stated need in the JD

**Bullet customization:**
- Identify which 3 bullets from the original resume are most relevant to THIS JD
- Move them to the top of the most recent role
- If a bullet uses a generic term the JD uses with a specific term, swap it:
  e.g., resume says "content pipeline" → JD says "editorial workflow" → swap
- Do not fabricate new bullets. Reorder and refocus, never invent.

**What to show the user:**
```
CUSTOMIZED FOR: [Role] @ [Company]
Match Score: [X]/100

SUMMARY (rewritten):
[New 3-sentence summary]

BULLETS MOVED TO TOP:
• [Most relevant bullet]
• [Second most relevant]
• [Third most relevant]

WHAT CHANGED:
• [Specific change 1 and why]
• [Specific change 2 and why]
```

---

## Cover Material Generation

Generate BOTH for every role. The user picks which to use:

### Cover Note (3 sentences — for Easy Apply / Quick Apply forms)

Rules:
1. Sentence 1: Show you understand their biggest current problem (mine from JD)
2. Sentence 2: One specific, quantified proof point from the resume that maps to it
3. Sentence 3: One specific reason you want THIS company — not just any company

Tone: Direct, no preamble, no "I am writing to apply for..." opener. Start with
the problem, not yourself.

Example:
> "Scaling content production without losing quality is the core challenge for
> a team at your stage — I've solved this before by building AI-assisted pipelines
> that cut production time by 60% without compromising output standards. At Haizion
> Club, I took content output from 4 to 22 pieces per week while the team stayed
> the same size. Your focus on [specific company initiative from JD] is exactly
> the problem I want to work on next."

### Full Cover Letter (under 250 words — for formal applications or email)

Follow these 4 rules exactly in order. Do not merge paragraphs or reorder:

**Paragraph 1 — Their problem:**
One sentence only. Show you understand their biggest current challenge. Source it
from the JD's language — they told you what they're struggling with. Do not open
with "I am writing to apply" or "I am excited about this opportunity."

**Paragraph 2 — Your proof:**
2-3 specific examples from the resume that map directly to what they need.
Use metrics. Use the XYZ formula: accomplished [X] measured by [Y] by doing [Z].
No vague claims. No "I am passionate about." Every sentence earns its place.

**Paragraph 3 — Address the gap:**
Find the one obvious gap between the resume and the JD (from the match score's
lowest-scoring dimension) and reframe it. Do not hide it — address it directly
and explain why it is not a blocker. This is the paragraph most candidates skip
and the one that most impresses hiring managers.

**Paragraph 4 — Why them specifically:**
One sentence. A specific reason for THIS company — a product, a mission, a recent
news item, something in the JD that is unique to them. Not "I admire your culture."

Tone: Confident, direct, no fluff, no buzzwords. Must not read like AI wrote it.
Maximum 250 words. Count before outputting.

---

## Application Tracker

Maintain a running tracker for every role processed in this session. After all
roles are handled, generate the tracker as a CSV file using:

```bash
node /mnt/skills/user/application-accelerator/scripts/tracker.js \
  --data /tmp/tracker_data.json \
  --output /mnt/user-data/outputs/application-tracker.csv
```

Build `/tmp/tracker_data.json` with this schema — one entry per role:

```json
[
  {
    "number": 1,
    "company": "Company Name",
    "role": "Job Title",
    "job_url": "https://...",
    "date_posted": "YYYY-MM-DD or 'Unknown'",
    "match_score": 84,
    "status": "Draft | Submitted | Applied Manually | Pending Review",
    "customizations": "Summary rewritten + 3 bullets reordered",
    "cover_note_written": true,
    "cover_letter_written": true,
    "date_applied": "YYYY-MM-DD or blank",
    "notes": "Any role-specific notes"
  }
]
```

---

## Output Delivery

After processing all roles, present:
1. The CSV tracker file
2. A session summary in chat:

```
APPLICATION SESSION SUMMARY
────────────────────────────────────────
Jobs reviewed:       [N]
Qualified (70%+):    [N]
Applications sent:   [N] (PATH B) / Ready to submit: [N] (PATH A)
Average match score: [X]/100

TOP MATCH THIS SESSION:
[Role] @ [Company] — [score]/100

NEXT STEPS:
□ Fill in any [FILL IN] placeholders in resume variants before submitting
□ Follow up on submitted applications in 3 days (Skill 3 handles this)
□ Run interview prep when you land a callback (Skill 3: Interview-to-Offer-Pro)
```

---

## Reference Files

Detailed step-by-step flows live in the reference files. Read the correct one
after plan detection in Step 0:

- **PATH A (Free):** `references/path-a.md`
- **PATH B (Pro + Cowork):** `references/path-b.md`
