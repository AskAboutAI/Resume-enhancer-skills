---
name: resume-optimizer-pro
description: >
  Run this skill whenever a user wants to optimize their resume for a specific job.
  Triggers on: "optimize my resume", "tailor my resume for this job", "ATS check",
  "rewrite my resume", "match score", "keywords missing from my resume", "help me
  apply for this role", "is my resume good enough for this job", "resume audit",
  "will my resume pass ATS", "fix my resume", "resume review", or any time the user
  uploads or pastes both a resume AND a job description together. Also triggers when
  the user says things like "I keep getting ghosted after applying" or "not getting
  interviews". Run even if the user only says "can you look at my resume" while
  providing a job description — they almost certainly want the full optimization.
  Do NOT run for general resume writing advice without a specific job description.
---

# Resume-Optimizer-Pro

A three-step sequential pipeline that turns a raw resume into an ATS-passing,
hiring-manager-stopping document tailored to a specific job. The steps are
inseparable — each one builds on the previous. Run all three in order, every time.

---

## Step 0: Input Collection

Before running any step, make sure you have both inputs. If either is missing, ask:

- **Resume**: Accept as uploaded PDF, .docx, or pasted plain text.
  - For **PDF or .docx uploads**: read `/mnt/skills/public/file-reading/SKILL.md`
    first to extract text correctly before proceeding. Do not attempt to read
    binary files directly — the file-reading skill has the right method per type.
  - For **plain text pastes**: use as-is, no extraction needed.
- **Job Description**: Full JD text, or a URL the user can paste from. If only a URL
  is given, ask them to paste the full JD text — you need the actual keywords, not a
  summary.

Once you have both, confirm: *"Got both your resume and the JD. Running the full
3-step audit now..."* Then proceed immediately without waiting for further input.

---

## Step 1: The Recruiter Audit

**Persona:** You are a senior recruiter at the exact company in the job description.
You have seen 10,000 resumes. You are pressed for time, slightly cynical, and looking
for reasons to move on. You owe this candidate brutal honesty, not encouragement.

Produce this audit output, structured exactly:

```
═══════════════════════════════════════
RESUME AUDIT — [JOB TITLE] @ [COMPANY]
═══════════════════════════════════════

MATCH SCORE: [X]/100
[One sentence explaining what's dragging the score down most]

TOP 5 MISSING ATS KEYWORDS
These are the exact terms the ATS will scan for that your resume currently lacks:
1. [keyword] — [where it should appear / why it matters for this role]
2. [keyword] — [where it should appear / why it matters]
3. [keyword] — [where it should appear / why it matters]
4. [keyword] — [where it should appear / why it matters]
5. [keyword] — [where it should appear / why it matters]

3 RED FLAGS (hiring manager spots these in under 10 seconds)
1. [Red flag] — [why this is a problem and what a recruiter assumes from it]
2. [Red flag] — [why this is a problem]
3. [Red flag] — [why this is a problem]

SECTION BREAKDOWN
✅ Strong: [section name] — [specific reason it works]
✅ Strong: [section name] — [specific reason it works]
⚠️  Weak: [section name] — [specific reason it fails]
⚠️  Weak: [section name] — [specific reason it fails]

IDEAL CANDIDATE COMPARISON
A strong candidate for this role would have: [3-4 specific things — skills, metrics,
experience types, or credentials — that your resume is missing or underselling].
Your resume [closes this gap / falls short] because [honest assessment].
```

Do not soften the audit. A score above 75 should be rare unless the resume is
genuinely well-matched. Missing keywords, vague bullets, and lack of numbers are
the three most common score killers — call them out directly.

---

## Step 2: The Experience Rewrite

Immediately after the audit, rewrite the experience section. Do not ask the user if
they want you to proceed — they do. The audit is useless without the fix.

**Rewrite every bullet following all 7 rules simultaneously:**

**Rule 1 — Keyword integration:** Weave the 5 missing keywords identified in Step 1
into the bullets naturally. They must read like a normal part of the sentence. If a
keyword genuinely cannot fit without sounding forced, flag it separately at the end
as: *[KEYWORD NOTE: "[keyword]" couldn't be integrated naturally — consider adding
it to your Skills section instead.]*

**Rule 2 — Red flag removal:** Every red flag from Step 1 must be fixed or removed
in this rewrite. Show what changed after the section.

**Rule 3 — Google XYZ formula:** Every bullet must follow:
*"Accomplished [X] as measured by [Y] by doing [Z]"*
This is the format top companies use to evaluate candidates. X is the outcome, Y is
the proof/metric, Z is how you did it.

Example transformation:
- Before: *"Managed social media accounts for the brand"*
- After: *"Grew Instagram engagement rate from 1.2% to 4.7% (measured by monthly
  analytics reports) by shifting from broadcast posts to community-first content
  strategy with daily story interactions"*

**Rule 4 — Action verbs only:** Every bullet starts with a strong past-tense action
verb. Never start with "Responsible for", "Helped with", "Assisted in", "Worked on",
or "Supported". Replace these with verbs that own the outcome: Led, Built, Drove,
Launched, Reduced, Increased, Negotiated, Designed, Automated, Trained, etc.

**Rule 5 — Numbers first:** Add specific numbers wherever the resume provides data.
If no numbers exist, insert realistic placeholders marked clearly:

Format: `[FILL IN: e.g., 40% / $2M / 12 team members]`

Never invent specific numbers. Only suggest a realistic range so the user can fill in
their actual figure. At the end of the section, list all [FILL IN] placeholders with
context: *"These are the numbers you need to find before submitting — check your
analytics, CRM, or ask your manager."*

**Rule 6 — Brevity:** 1-2 lines per bullet. No paragraph-style descriptions. If a
bullet runs longer, split it or cut the weakest half.

**Rule 7 — Impact order:** Within each job, order bullets by business impact, not by
what you did first chronologically. The most impressive, quantified result goes first.

**Output format:**

```
═══════════════════════════════════════
REWRITTEN EXPERIENCE SECTION
═══════════════════════════════════════

[JOB TITLE] | [COMPANY] | [DATES]
• [Rewritten bullet — XYZ formula, action verb, keyword woven in]
• [Rewritten bullet]
• [Rewritten bullet]

[NEXT ROLE]
• [Rewritten bullets...]

───────────────────────────────────────
RED FLAGS FIXED
• [Original red flag] → [What was changed and why]

[FILL IN] PLACEHOLDERS
1. "[exact bullet text]" — you need: [what metric to look up]
2. "[exact bullet text]" — you need: [what metric to look up]
```

---

## Step 3: The ATS + Hiring Manager Stress Test

Still in the same context — take the rewritten resume from Step 2 and stress-test
it from two angles simultaneously.

### Perspective 1: ATS Filter

You are scanning this resume as automated software. You have no judgment, no context,
no empathy. You match keywords and flag formatting.

Produce:

```
ATS VERDICT: PASS ✅ / FAIL ❌ / BORDERLINE ⚠️

KEYWORD COVERAGE
Present (ATS will find these):
✅ [keyword] — found in [section]
✅ [keyword] — found in [section]

Still Missing:
❌ [keyword] — not found anywhere in the document
❌ [keyword] — not found

FORMATTING RISKS
[List any ATS-unfriendly elements: tables, text boxes, columns, headers/footers
with important content, special characters, images, logos, non-standard fonts.
If the resume came in as a text paste and you cannot verify formatting, flag this
and advise the user to use a single-column, plain-text-friendly template.]
```

### Perspective 2: Hiring Manager

You are on resume 147 of 200 today. You have coffee going cold. You need 3 candidates
for interviews by Thursday. You are looking for the one line that makes you stop
scrolling — or the one thing that makes you put it in the no pile.

Produce:

```
HIRING MANAGER VERDICT: YES PILE / MAYBE PILE / NO PILE

SCROLL TEST
Skip zones (sections you'd skim or skip entirely):
• [Section] — [why: too dense / too vague / no metrics / wrong order]

Stop moments (what made you pause — good or bad):
• [Good stop] — [what caught the eye and why]
• [Bad stop] — [what gave pause and why]

SECTIONS REWRITTEN FOR SCROLL-STOPPING
[Rewrite any section that tested as a skip zone. Apply the same XYZ + action verb
rules. Show before and after.]
```

### Final Resume Assembly

After both perspectives, output the complete final resume — not just the experience
section. Include all sections (Summary/Objective if present, Experience, Skills,
Education, any other sections). Apply all fixes from Steps 1–3.

```
═══════════════════════════════════════
FINAL OPTIMIZED RESUME
═══════════════════════════════════════

[Full resume, clean, complete, ready to copy or export]
```

Then summarize the full [FILL IN] placeholder list at the very end:

```
───────────────────────────────────────
YOUR [FILL IN] CHECKLIST
Before submitting, find and replace these:
□ [Placeholder 1] — where to find it: [source]
□ [Placeholder 2] — where to find it: [source]
[etc.]
```

### Re-Score After Optimization

After assembling the final resume, re-apply the same Step 1 scoring criteria
against the same JD and produce an updated score. This is not a guess — go
through each criterion again: keyword presence, red flag count, bullet quality,
section strength. Show the delta explicitly:

```
OPTIMIZATION DELTA
──────────────────
Match Score:        [original]/100  →  [new]/100
Keywords covered:   [X]/5 missing   →  [Y]/5 missing
Red flags:          [N] found       →  [0] remaining
Bullet quality:     [before state]  →  [after state]
```

A well-executed run should move the score by at least 15-25 points. If the
delta is under 10 points, something in Steps 2-3 was not applied fully — review
before generating the .docx.

---

## Step 4: Generate the .docx File

After completing all three steps, create a professional .docx resume using the docx
npm package. Follow the DOCX skill at `/mnt/skills/public/docx/SKILL.md` for all
technical implementation details.

### Resume .docx Formatting Rules

These rules exist because recruiters and ATS systems penalize poor formatting.
Follow them exactly:

**Page setup:**
- US Letter size (8.5 × 11 inches) — never A4
- 1-inch margins on all sides
- Font: Calibri or Arial, 11pt body text
- Single column layout only — no tables, no text boxes, no columns
- No headers/footers for the resume content (name + contact goes in the body)

**Name and contact block (top of page):**
- Name: 16pt, bold
- Contact line: email | phone | LinkedIn | City — all on one line, 10pt
- Optional: thin horizontal rule beneath (use paragraph border, not table)

**Section headings:**
- ALL CAPS, 11pt, bold, with a bottom border line (paragraph border, not a separate
  element)
- e.g., EXPERIENCE, EDUCATION, SKILLS

**Experience entries:**
- Job title: bold, 11pt
- Company | Dates: right-aligned on same line using tab stop
- Bullets: use proper LevelFormat.BULLET numbering config (never unicode • characters)
- 6pt spacing after each job block

**Skills section:**
- Comma-separated inline text, not bullets
- Grouped by category if more than 8 skills: e.g., *Tools: X, Y, Z | Platforms: A, B*

**[FILL IN] placeholders:**
- Render in the .docx as: `[FILL IN: e.g., 40%]` in bold red text
  (color: "CC0000") so they are impossible to miss before submitting

**ATS compliance in the .docx:**
- No images, no logos, no icons
- No tables (including for contact info layout)
- No text boxes
- No special characters in section headers
- Hyperlinks are fine but not required

### Script to generate the .docx

The script already exists at:
`/mnt/skills/user/resume-optimizer-pro/scripts/generate_resume.js`

Do NOT rewrite it. Just call it with the correct JSON input.

**Before calling the script, build a `resume_data.json` file** by extracting
the final optimized resume content from Step 3 into this exact schema:

```json
{
  "candidate": {
    "name": "Full Name",
    "email": "email@example.com",
    "phone": "+XX XXXXX XXXXX",
    "linkedin": "linkedin.com/in/handle",
    "location": "City, Country (e.g., Open to Remote)"
  },
  "summary": "2-3 sentence optimized summary. Omit this key entirely if no summary exists.",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "dates": "Mon YYYY – Mon YYYY",
      "bullets": [
        "First bullet — XYZ formula, most impactful result first",
        "Second bullet with [FILL IN: e.g., 40%] placeholder if metric unknown"
      ]
    }
  ],
  "skills": {
    "Category Name": ["Skill A", "Skill B", "Skill C"],
    "Another Category": ["Tool X", "Tool Y"]
  },
  "education": [
    {
      "degree": "Degree Name",
      "school": "Institution Name",
      "year": "YYYY"
    }
  ],
  "certifications": [
    "Certification Name (Year)"
  ]
}
```

**Schema rules:**
- `candidate.name`, `candidate.email` and `experience` are required. All other
  keys are optional — omit entirely if not present in the resume (do not set null).
- `experience` array must maintain impact order (most impressive role first is
  fine, but within each role bullets must be impact-ordered per Rule 7).
- `skills` must be an object with string-array values, never a flat array.
- `certifications` is a flat string array, not objects.
- All bullet strings must already be the final rewritten versions from Step 2/3,
  including any `[FILL IN: e.g., ...]` placeholders in that exact format.

Write this JSON to `/tmp/resume_data.json`, then run:

```bash
node /mnt/skills/user/resume-optimizer-pro/scripts/generate_resume.js \
  --input /tmp/resume_data.json \
  --output /mnt/user-data/outputs/[firstname-lastname]-optimized-resume.docx
```

Then validate:
```bash
python /mnt/skills/public/docx/scripts/office/validate.py \
  /mnt/user-data/outputs/[firstname-lastname]-optimized-resume.docx
```

If validation fails, check the JSON for schema violations first (wrong types,
missing required fields, null values) before touching the script or XML.

---

## Output Delivery

Once the .docx is generated and validated, present it to the user. Then produce
the full output block below in the same response — no extra turns, no extra messages.

```
✅ YOUR OPTIMIZED RESUME IS READY

ATS Status:    [PASS / BORDERLINE / FAIL] — [one-line reason]
HM Verdict:    [YES / MAYBE / NO PILE] — [one-line reason]
Match Score:   [X]/100 → [Y]/100

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PLACEHOLDER FILL SHEET — [N] items
Open your .docx and use Find & Replace (Ctrl+H / Cmd+H).
Each placeholder below is in bold red — impossible to miss.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For each [FILL IN] found during Steps 2 and 3, produce one row:

#  Placeholder text (exact)        What to find          Where to look
─  ─────────────────────────────   ──────────────────    ────────────────────────────
1  [FILL IN: e.g., 40%]           This exact phrase     Google Analytics / CRM report
   Bullet: "Reduced load time by [FILL IN: e.g., 40%]..."
   Realistic range: 20% to 60% depending on the optimisation

2  [FILL IN: e.g., $2M]           This exact phrase     Your sales CRM or manager
   Bullet: "Managed pipeline worth [FILL IN: e.g., $2M]..."
   Realistic range: depends on your team's total book

[Continue for every placeholder — one row per item, never skip one]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOW TO FILL THEM IN 3 STEPS
1. Open the .docx → press Ctrl+H (Windows) or Cmd+H (Mac)
2. In "Find": paste the exact placeholder text from column 2 above
3. In "Replace": type your real number → click Replace All
   Repeat for each row. Takes under 5 minutes.

If you genuinely don't know a number: leave the placeholder,
submit the application, and update the resume after you verify.
A strong resume with one red placeholder is better than a delayed one.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEP
Once placeholders are filled, use Skill 2 (Application-Accelerator)
to customize and submit across LinkedIn and Indeed.
```

**Produce the Placeholder Fill Sheet even if there are zero placeholders** — just
show "No placeholders — your resume is ready to submit as-is." Do not skip the
block. Users expect to see it.

Every row in the fill sheet must include:
- The exact placeholder text to search for in Find & Replace
- The specific bullet it appears in (so the user can find it by context too)
- A realistic range so the user can sanity-check their real number
- The most likely source to find the real number (analytics tool, CRM, manager)

Do not write "check your records" as the source. Name the actual system:
Google Analytics, Meta Ads Manager, HubSpot, Notion, Slack, ask your manager,
check your offer letter — whatever is most likely given the role and metric.


---

## Quality Standards

Every run of this skill should produce output that:

1. **Passes ATS** for the specific job description provided — not generic ATS rules,
   but the keywords this exact JD will scan for
2. **Contains zero vague bullets** — every bullet has an outcome + a number (or a
   clearly marked [FILL IN] placeholder)
3. **Has zero red flags** from the original audit left unfixed
4. **Reads naturally** — keyword integration should be invisible; the resume should
   sound like a human wrote it about real work, not like someone stuffed keywords in
5. **Is a real .docx file the user can open, edit, and submit** — not just text in chat

If any of these conditions are not met after the three steps, revise before generating
the .docx.
