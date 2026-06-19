# PATH A — Free Plan (Manual Job Input)

This path is for users without Claude Pro/Max or Cowork. The user finds jobs
themselves; this skill does everything except hit the submit button.

---

## How PATH A Works

```
User pastes JD(s)
     ↓
Score each against resume
     ↓
Filter: 70%+ proceed, below 70 → flag
     ↓
For each qualifying role:
  → Rewrite summary
  → Reorder top 3 bullets
  → Write 3-sentence cover note
  → Write full cover letter
  → Show preview
     ↓
User copies materials and applies on Indeed / LinkedIn
     ↓
Update tracker with status + job link
```

---

## Step A1: Collect Job Descriptions

Ask the user how they want to provide jobs:

> "You can paste job descriptions one at a time, or paste up to 5 at once
> (separate each with '---'). I'll score each against your resume, customize
> your materials, and prepare everything you need to apply.
>
> Paste the first job description when ready — include the job URL if you have
> it, so I can add it to your tracker."

Accept:
- Full JD text (preferred — gives the most keywords to score against)
- Job title + company + URL (minimum — will work with less context but scoring
  will be less precise; flag this to the user)
- Indeed or LinkedIn job URL (ask the user to also paste the full JD text,
  since direct URL fetching may not be available in Free plan)

---

## Step A2: Score and Filter

Run the Match Scoring Engine from SKILL.md for each JD.

Display the score before generating materials:

```
JOB [N]: [Role] @ [Company]
Match Score: [X]/100
Verdict: [Strong match / Good match / Stretch role / Weak match]

Proceeding with customization... ✅
```

If score is below 70:
```
JOB [N]: [Role] @ [Company]
Match Score: [X]/100 — Below threshold

Gap analysis:
• [Dimension that scored lowest] — [what's missing]
• [Second lowest] — [what's missing]

Do you still want me to prepare materials for this role? (Yes / Skip)
```

Wait for user response before proceeding on sub-70 roles.

---

## Step A3: Generate Materials Per Role

For each qualifying role, produce everything in one block:

```
════════════════════════════════════════════
ROLE [N]: [JOB TITLE] @ [COMPANY]
════════════════════════════════════════════
Match Score: [X]/100
Job URL: [URL or 'Not provided']

── CUSTOMIZED RESUME MATERIALS ──────────────

SUMMARY (paste this into your resume for this application):
[Rewritten 3-sentence summary per SKILL.md customization rules]

BULLETS TO MOVE TO TOP OF [MOST RECENT ROLE]:
• [Most relevant bullet — already from your resume]
• [Second most relevant]
• [Third most relevant]

WHAT CHANGED:
• [Specific swap or reorder with reason]
• [Second change]

── COVER NOTE (3 sentences — for Easy Apply forms) ───────

[3-sentence cover note per SKILL.md rules]

── FULL COVER LETTER (for email / formal submissions) ────

[Role] @ [Company]

[Paragraph 1 — their problem, 1 sentence]

[Paragraph 2 — your proof, 2-3 sentences with metrics]

[Paragraph 3 — address the gap, 2-3 sentences]

[Paragraph 4 — why them, 1 sentence]

Word count: [N]/250

── HOW TO APPLY ──────────────────────────────────────────

Apply here: [Job URL]
Platform: [Indeed / LinkedIn / Company site — infer from URL]

Steps:
1. Open your optimized resume .docx file (from Resume-Optimizer-Pro)
2. Replace the Summary section with the rewritten version above
3. In your most recent role, move the 3 bullets listed above to the top
4. Save as a new file: [Your Name] - [Company Name] - Resume.docx
5. Open the job URL above
6. Upload this saved file when the application asks for your resume
7. Use the Cover Note in any "cover letter" or "message" field
8. Use the Full Cover Letter if the application requests a separate document
9. Come back and tell me when it's submitted — I'll update your tracker.

════════════════════════════════════════════
```

---

## Step A4: Confirmation and Tracker Update

After the user tells you they've applied, update the tracker entry:

- Set `status` to `"Applied Manually"`
- Set `date_applied` to today's date
- Note any changes the user made to the materials

If the user says they're saving it for later:
- Set `status` to `"Draft"`
- Keep the job URL for follow-up

---

## Step A5: Batch Processing

If the user provides multiple JDs at once:

1. Score all of them first — show all scores before generating any materials
2. Ask: "I've scored all [N] roles. Here's the ranking — want me to process
   all qualifying ones, or just specific roles?"
3. Process in order of match score (highest first)
4. Generate materials for each in sequence, one full block per role
5. After all are done, generate the tracker CSV

This prevents context bloat and lets the user prioritize their time on the
best matches first.

---

## PATH A Limitations (Be Honest With the User)

Tell the user these upfront if they ask about automation:

- Manual application submission — you cannot click Apply on their behalf
- Cannot browse Indeed/LinkedIn directly to find new jobs
- Match scoring is based only on the JD text they provide — the more complete
  the JD, the better the score
- To unlock automated job search + submission: upgrade to Claude Pro/Max and
  use Cowork mode (PATH B handles this)
