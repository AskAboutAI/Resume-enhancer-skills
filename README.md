# Resume Enhancer Skills for Claude AI

**Three AI skills that take you from raw resume to signed offer.**  
Built by [AskAboutAI](https://www.instagram.com/askaboutai/) Follow for more AI workflow drops.

---

## What This Is

Most people use Claude to "improve" their resume. That means pasting it in, getting generic feedback, and ending up with something that still gets filtered by ATS before a human ever reads it.

These three skills are different. They run a structured, sequential workflow modelled on how senior recruiters, hiring managers, and salary negotiators actually operate. Each skill is a focused tool with a specific job:

| Skill | What It Does | When to Use It |
|-------|-------------|----------------|
| **Resume-Optimizer-Pro** | Audits your resume against a job description, rewrites experience using the Google XYZ formula, stress-tests from ATS and hiring manager perspectives, outputs an optimized .docx | Before every application |
| **Application-Accelerator** | Finds matching jobs on LinkedIn and Indeed, scores them against your resume, customizes your materials per role, generates cover letters, tracks applications | After your resume is optimized |
| **Interview-to-Offer-Pro** | Company research brief, predicts interview questions with STAR answers, runs a mock interview, generates follow-up emails, builds a salary negotiation playbook | When you get an interview or offer |

---

## The Complete Workflow

Run these steps in order. Each skill feeds the next.

```
1.  Resume audit          → match score, missing keywords, red flags
2.  Experience rewrite    → XYZ formula bullets, action verbs, metrics
3.  ATS + HM stress test  → keyword coverage, formatting risks, scroll test
4.  Job search            → LinkedIn + Indeed, 70%+ match filter, top 10
5.  Cover materials       → 3-sentence note + 250-word letter per role
6.  Apply                 → auto-submit (Pro) or manual (Free)
7.  LinkedIn refresh      → headline, about, bullets, skills, featured
8.  Interview prep        → company research, 10 questions, mock interview
9.  Follow-up emails      → post-application, post-interview, nudge
10. Salary negotiation    → market analysis, counter email, phone script
```

---

## Installation

### Option A — Claude.ai Web (Recommended for most users)

Works on both Free and Pro plans.

1. Go to [claude.ai](https://claude.ai) and sign in
2. Click **Settings** (bottom left) → **Skills**
3. Click **Install from file**
4. Download the `.skill` files from the [`/skills`](./skills/) folder in this repo:
   - [`resume-optimizer-pro.skill`](./skills/resume-optimizer-pro.skill)
   - [`application-accelerator.skill`](./skills/application-accelerator.skill)
   - [`interview-to-offer-pro.skill`](./skills/interview-to-offer-pro.skill)
5. Install each one. They appear in your Skills list immediately.

**To download a .skill file from GitHub:**  
Click the file → click the **Download raw file** button (top right of the file view).

---

### Option B — Claude Desktop App

1. Download Claude Desktop from [claude.ai/download](https://claude.ai/download)
2. Open the app → click your profile icon → **Settings** → **Skills**
3. Click **Install from file**
4. Download and install each `.skill` file from the [`/skills`](./skills/) folder
5. Skills are now available in every Desktop conversation

---

### Option C — Claude Code (CLI)

If you are using Claude Code in your terminal:

```bash
# Install Claude Code if not already installed
npm install -g @anthropic-ai/claude-code

# Clone this repo
git clone https://github.com/AskAboutAI/Resume-enhancer-skills.git
cd Resume-enhancer-skills

# Point Claude Code at a skill directory
claude --skill ./resume-optimizer-pro "Optimize my resume for this job"
```

For persistent skill loading, add the skill paths to your Claude Code config:

```json
// ~/.claude/config.json
{
  "skills": [
    "/path/to/Resume-enhancer-skills/resume-optimizer-pro",
    "/path/to/Resume-enhancer-skills/application-accelerator",
    "/path/to/Resume-enhancer-skills/interview-to-offer-pro"
  ]
}
```

---

## Free vs Pro Plan Differences

| Feature | Free Plan | Pro / Max Plan |
|---------|-----------|---------------|
| Resume audit + rewrite | ✅ Full | ✅ Full |
| ATS + hiring manager test | ✅ Full | ✅ Full |
| Optimized .docx output | ✅ Full | ✅ Full |
| Manual job application materials | ✅ Full | ✅ Full |
| Indeed job search via MCP | ✅ Yes | ✅ Yes |
| LinkedIn auto-search + apply | ❌ Manual only | ✅ Automated (Cowork) |
| Company research (deep) | ✅ Full | ✅ Full |
| Interview prep + mock interview | ✅ Full | ✅ Full |
| Negotiation playbook | ✅ Full | ✅ Full |

**Free plan users:** Application-Accelerator runs in PATH A — you paste job descriptions, the skill generates your customized materials, and you apply manually through the job site. Everything except automated submission works on Free.

**Pro/Max users:** Application-Accelerator runs PATH B — it searches LinkedIn and Indeed automatically, scores matches, generates materials, and submits applications via Cowork while you review each one before it goes out.

---

## How to Use Each Skill

### Skill 1: Resume-Optimizer-Pro

**Trigger phrases:**
- "Optimize my resume for this job"
- "Audit my resume"
- "Will this resume pass ATS?"
- "Rewrite my resume for [Company]"

**What to have ready:**
- Your current resume (PDF, .docx, or paste as text)
- The full job description (paste the text, not just the URL)

**What you get:**
- Match score out of 100 with gap analysis
- Top 5 missing ATS keywords with placement guidance
- 3 red flags a hiring manager would spot instantly
- Full experience section rewrite using the Google XYZ formula
- ATS verdict (pass/fail) with formatting risk report
- Hiring manager verdict (yes/maybe/no pile) with scroll test
- Optimized .docx ready to submit
- Placeholder fill sheet for any metrics you need to verify

**Example prompt:**
```
Here's my resume: [paste resume]

Here's the job description: [paste JD]

Optimize my resume for this role.
```

---

### Skill 2: Application-Accelerator

**Trigger phrases:**
- "Find jobs matching my resume"
- "Apply to 10 jobs for me"
- "Customize my resume for this role"
- "Write a cover letter for this job"
- "Help me apply to jobs"

**What to have ready:**
- Your optimized resume from Skill 1 (or paste your current resume)
- Target job title and location
- Whether you are on Free or Pro plan

**What you get:**
- Indeed job search with match scoring
- LinkedIn job search (Pro plan, auto-applied with your approval)
- Customized resume summary + top 3 bullets per role
- 3-sentence cover note (for Easy Apply forms)
- Full 250-word cover letter (for email/formal applications)
- Application tracker CSV with job URLs, match scores, and status

**Example prompt (Free plan):**
```
Here's my optimized resume: [paste]

I'm looking for AI Content Strategist roles, remote, posted in the last 14 days.
Find me matching jobs and prepare my application materials.
I'm on Free plan so I'll apply manually.
```

**Example prompt (Pro plan):**
```
Here's my optimized resume: [paste]

Search LinkedIn and Indeed for Content Marketing Manager roles in New York,
posted in the last 7 days. Score them against my resume and apply to the top 10.
Show me each application before submitting.
I'm on Claude Pro with Cowork.
```

---

### Skill 3: Interview-to-Offer-Pro

This skill has three independent modes. Use whichever fits where you are in the process.

#### Mode A — Interview Prep

**Trigger phrases:**
- "I have an interview at [Company] on [Date]"
- "Help me prep for my interview"
- "Run a mock interview"
- "What questions will they ask"

**What to have ready:** Role, company, interview date. Resume and JD help but are optional.

**What you get:**
- 1-page company research brief (business model, challenge, competitors, culture)
- 10 predicted questions (4 behavioral, 3 technical, 3 situational)
- STAR answer for each question using your resume examples
- The one trap to avoid per question
- 5 questions to ask the interviewer that signal real research
- A 5-question mock interview with feedback after each answer
- Mock interview transcript as a .docx

#### Mode B — Offer Negotiation

**Trigger phrases:**
- "I got an offer for [Role] at [Company]"
- "Is this offer good?"
- "Help me negotiate my salary"
- "Write my counter-offer email"

**What to have ready:** Role, company, location, base salary, bonus, equity, benefits.

**What you get:**
- Market salary analysis (Indeed + Glassdoor data)
- Position vs market (below / at / above) with specific percentage
- A recommended counter-offer number with reasoning
- Exact email script to send (under 150 words, ready to copy-paste)
- Full phone call script for 4 scenarios: opening, stating counter, handling pushback, negotiating non-salary items
- Walk-away analysis: accept at, push hard at, walk away at
- What to say if you decline

#### Mode C — LinkedIn Optimization

**Trigger phrases:**
- "Rewrite my LinkedIn profile"
- "Optimize my LinkedIn headline"
- "Help me attract recruiters on LinkedIn"

**What to have ready:** Target role, current headline (or "none"), resume for XYZ bullet rewrites.

**What you get:**
- 3 headline versions (each under 220 characters, keyword-optimized)
- About section rewrite (hook first sentence, 3 paragraphs, specific CTA)
- Experience bullet rewrites using XYZ formula + one learning line per role
- Top 5 skills ranked by recruiter search volume
- Featured section: 2-3 specific suggestions with how-to instructions

---

## Using This Repo as a Skill Guide

If you paste this repo URL into Claude, Claude can fetch this README and understand the full workflow. Use it like this:

```
Read this repo and help me run the full job search workflow:
https://github.com/AskAboutAI/Resume-enhancer-skills

Here is my resume: [paste]
Here is the job description: [paste]
```

Claude will fetch the README, understand the 3-skill sequence, and guide you through it even without the skills installed. Installing the `.skill` files gives you the full structured experience with document generation.

---

## Additional Recommendations

### Sequencing

Run the skills in order. Skill 1 produces the optimized resume that Skill 2 uses as the base. If you skip Skill 1 and go straight to applications, your customizations will have nothing solid to build from.

### Resume variants per role

Do not submit the same resume to every job. Application-Accelerator customizes the summary and top 3 bullets per role — let it. Recruiters and ATS systems both respond better to role-specific framing.

### The 70% match threshold

Application-Accelerator filters jobs at 70% match minimum. Do not override this unless you have a strong referral or insider connection. Below 70%, your time is better spent on higher-match roles.

### The 24-hour rule on follow-up emails

Send your post-interview thank you within 24 hours of the interview. Same day is better. After 48 hours it loses most of its impact. Interview-to-Offer-Pro generates this email — have it ready before the interview so you only need to fill in one specific moment from the conversation.

### Never give a number first in salary negotiation

If an employer asks for your salary expectations before making an offer, use this line:  
*"I'd like to learn more about the full scope of the role before discussing numbers. What is the budgeted range for this position?"*  

The negotiation playbook in Skill 3 covers this in full, but internalize this rule before you get on any call.

### LinkedIn before applications

Run the LinkedIn Optimizer (Skill 3, Mode C) before you start applying. Recruiters at the companies you apply to will look you up. Your profile should already match what your optimized resume says.

### The nudge email timing

Interview-to-Offer-Pro generates a nudge email for 7 days after the interview with no response. Do not send it earlier. At 7 days it reads as professional follow-through. At 3 days it reads as anxious.

### Placeholder fill-in before submitting

Every `[FILL IN: e.g., 40%]` placeholder in your resume is marked in bold red in the .docx. Do not submit with red placeholders. The skill outputs a fill sheet in chat with Find & Replace instructions for each one.

---

## Troubleshooting

**Skill not triggering?**  
Try a more direct phrase: "Run Resume-Optimizer-Pro on my resume" instead of "fix my resume."

**ATS verdict is FAIL after rewriting?**  
The skill will flag which keywords are still missing. Add them to your Skills section or Summary — they do not all need to be in bullets.

**Match score under 60 after optimization?**  
Check: (1) did you paste the full JD, not just the title? (2) does your actual experience map to this role? A score under 60 after full optimization usually means this is the wrong role, not a fixable resume problem.

**Application-Accelerator can't find jobs?**  
On Free plan, paste the full JD text instead of just the URL. The skill needs the JD keywords to score your match. On Pro with Cowork, confirm you are logged into LinkedIn and Indeed in Chrome before starting.

**Mock interview not starting?**  
The skill waits for you to confirm you have reviewed the company brief and predicted questions before starting the mock. Say "ready" or "start the mock interview."

**Counter-offer email too long?**  
The script should be under 150 words. If it ran over, tell Claude: "Rewrite the counter email under 150 words, keep the specific counter number."

---

## Files in This Repo

```
Resume-enhancer-skills/
├── README.md                              ← You are here
│
├── skills/                                ← Download these to install
│   ├── resume-optimizer-pro.skill
│   ├── application-accelerator.skill
│   └── interview-to-offer-pro.skill
│
├── resume-optimizer-pro/                  ← Source files
│   ├── SKILL.md
│   └── scripts/
│       └── generate_resume.js
│
├── application-accelerator/
│   ├── SKILL.md
│   ├── references/
│   │   ├── path-a.md                     ← Free plan flow
│   │   └── path-b.md                     ← Pro plan flow
│   └── scripts/
│       └── tracker.js
│
└── interview-to-offer-pro/
    ├── SKILL.md
    ├── references/
    │   ├── interview-prep.md
    │   ├── negotiation.md
    │   ├── follow-up-emails.md
    │   └── linkedin-optimizer.md
    └── scripts/
        └── generate_docs.js
```

---

## About

Built by [AskAboutAI](https://www.instagram.com/askaboutai/).  
Follow on Instagram for more AI workflow systems, prompt engineering, and automation drops.

These skills are free to use, modify, and share. If you build on them, a mention goes a long way.

**Issues or suggestions?** Open a GitHub issue or send a DM on [Instagram](https://www.instagram.com/askaboutai/).
