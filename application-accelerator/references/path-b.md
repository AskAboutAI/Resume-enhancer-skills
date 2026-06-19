# PATH B — Pro Plan (Automated: Indeed MCP + Cowork LinkedIn)

This path automates job discovery and application. The user reviews and approves
each application before submission — that pause is non-negotiable regardless of
how many roles are being processed.

---

## How PATH B Works

```
Collect: job title + location + date range + resume
     ↓
Search: Indeed via MCP + LinkedIn via Cowork
     ↓
Score all results against resume
     ↓
Filter: 70%+ match → qualify
     ↓
Rank: pick top 10 by match score
     ↓
For each of the top 10:
  → Read full JD
  → Rescore (full text may change score from preview)
  → Customize resume summary + bullets
  → Write 3-sentence cover note
  → Write full cover letter
  → PAUSE — show user the full package
  → Wait for explicit approval: "Submit" / "Skip" / "Edit"
  → Submit if approved
     ↓
After all 10: generate tracker CSV + session summary
```

---

## Step B1: Collect Search Parameters

Ask for the following if not already in context:

```
Job title(s): [e.g., "AI Content Strategist" or "Content Manager, Marketing Manager"]
Location:     [e.g., "Remote" or "Lucknow" or "Mumbai"]
Date range:   [Last 7 / 14 / 30 days]
Seniority:    [Any / Mid / Senior — optional filter]
```

Accept multiple job titles — run separate searches and pool results before
ranking by match score.

---

## Step B2: Search Indeed via MCP

**Before searching, optionally pull the user's Indeed resume profile:**
```
Tool: Indeed:get_resume
Parameters: (none)
```
If a resume exists on the user's Indeed profile, use it to supplement or
cross-reference the optimized resume from Step 0. Do not replace the
optimized resume with it — just note any additional skills or roles present.

**Run the job search:**
```
Tool: Indeed:search_jobs
Parameters:
  search:       "[Job Title]"          ← exact title or keyword string
  location:     "[City]" or "remote"   ← user's location preference
  country_code: "[XX]"                 ← ISO 3166 two-letter code
                                         IN for India, US for US roles,
                                         ask user if targeting a specific country
  job_type:     "fulltime"             ← optional, omit if user wants all types
```

**Important: Indeed MCP has no date filter.**
The API does not support filtering by posting date. Work around it:
- Request results and note the `date_posted` field on each listing
- After getting results, manually filter out any listings posted more than
  [N] days ago based on the user's requested date range
- Tell the user: "Indeed's API doesn't support date filtering directly — I've
  pulled results and filtered by date from the listing metadata."

**Extract job_id for deep reads:**
Each result in `Indeed:search_jobs` returns a job ID field. Save these IDs —
they are required to call `Indeed:get_job_details` in Step B4. Do not
use URLs for detail lookups; only job_id works with the MCP.

For each result, extract:
- job_id (required for Step B4)
- Job title
- Company name
- Location
- Date posted
- Brief description snippet (for preliminary scoring)

Run a **preliminary score** (0-100) against the resume from the snippet alone.
Flag anything below 50 as unlikely — do not pursue it further unless the user
asks.

Display results before proceeding:

```
INDEED SEARCH RESULTS — "[Job Title]" in [Location]
Country: [XX] | Filtered: Posted within last [N] days
────────────────────────────────────────────────────
Found [N] listings after date filter. Preliminary scores:

#  Company              Role                      Score  Date
1  [Company]            [Title]                   87     [Date]
2  [Company]            [Title]                   81     [Date]
3  [Company]            [Title]                   76     [Date]
...
[Below 70 are listed but marked ⚠️ and deprioritized]
...

Top 10 qualifying roles identified. Proceeding to full JD read and
deep scoring. This will take a moment...
```

---

## Step B3: Search LinkedIn via Cowork

**First, verify LinkedIn login status:**
1. Navigate to `linkedin.com` via Cowork
2. Check if the user is logged in (look for profile avatar / "Me" in nav)
3. If NOT logged in: stop and tell the user:
   > "You need to be logged into LinkedIn in your Chrome browser before I can
   > search. Please log in and then say 'continue' — I'll pick up from here."
   Wait for confirmation before proceeding.
4. If logged in: continue

**LinkedIn job search sequence:**
1. Navigate to `linkedin.com/jobs`
2. Search: `[Job Title]` in `[Location]`
3. Filter: Date posted → Last [N] days
4. Filter: Easy Apply (required for automated submission)
5. Collect first 20-30 results
6. For each, note: title, company, date, URL, brief description
7. Run preliminary match score from snippet

Combine LinkedIn + Indeed results into one ranked list. Deduplicate if the same
role appears on both platforms (prefer LinkedIn for auto-submission, Indeed for
URL reference in tracker).

---

## Step B4: Deep Score Top 10

Take the top 10 results by preliminary score. For each:

1. Fetch the full job description using the job_id saved in Step B2:
   ```
   Tool: Indeed:get_job_details
   Parameters:
     job_id: "[id from search results]"
   ```
2. Run the full Match Scoring Engine from SKILL.md against the complete JD text
3. Update the score — the full JD may score differently from the snippet
4. Re-rank the list if scores have shifted significantly

If a role drops below 70 on full scoring, replace it with the next best result.
Keep going until you have 10 roles all scoring 70+. If fewer than 10 qualify,
tell the user: "Only [N] roles cleared 70% — processing those and flagging the
rest for your review."

---

## Step B5: Generate + Review Package (One Role at a Time)

For each role, before generating cover materials, fetch company intelligence:

```
Tool: Indeed:get_company_data
Parameters:
  companyName:        "[Company Name]"
  language:           "en"
  location:           { country: "[XX]", usState: null, usStateCode: null, usCity: null }
  knowledgeCategories: { metadata: true, ratings: true, salaries: false }
  jobTitle:           "[Role Title]"
```

Use the returned data — culture notes, CEO info, employee ratings, company
description — to make cover letter Paragraph 4 genuinely specific rather than
generic. A hiring manager can tell the difference between "I admire your culture"
and "Your [specific value/initiative] mentioned in the job posting aligns with
[specific thing from resume]."

Then PAUSE and show the user the full package before submitting.
This is mandatory. Do not batch submissions without review.

Show:

```
════════════════════════════════════════════
APPLICATION [N of 10]: [JOB TITLE] @ [COMPANY]
════════════════════════════════════════════
Platform:    [LinkedIn Easy Apply / Indeed]
Job URL:     [URL]
Date posted: [Date]
Match Score: [X]/100

── CUSTOMIZED RESUME MATERIALS ──────────────

SUMMARY (for this application):
[Rewritten summary]

BULLETS MOVED TO TOP:
• [Bullet 1]
• [Bullet 2]
• [Bullet 3]

── COVER NOTE (3 sentences — will be submitted in the form) ──

[3-sentence cover note]

── FULL COVER LETTER (if the form requests one) ──────────────

[Full cover letter, 4 paragraphs, under 250 words]

────────────────────────────────────────────
Your call:
  → Type "Submit" to apply now
  → Type "Edit [what to change]" to modify before submitting
  → Type "Skip" to move to the next role
════════════════════════════════════════════
```

Wait for the user's response before taking any action. Do not auto-submit.

---

## Step B6: Submit on Approval

When the user says "Submit":

**For LinkedIn Easy Apply:**
1. Navigate to the job URL via Cowork
2. Click "Easy Apply"
3. Fill in the required fields:
   - Use the customized resume summary
   - Paste the 3-sentence cover note in any "cover letter" or "message" field
   - Use the full cover letter if a long-form field is available
4. Review the form before final submission — flag anything that requires the
   user's input (salary expectations, availability date, work authorization)
5. If everything is clean: click Submit
6. Confirm submission: capture confirmation message or application ID

**For Indeed Easy Apply:**
1. Navigate to the Indeed job URL via Cowork
2. Click "Apply now"
3. Fill fields as above
4. Same review-before-submit protocol
5. Capture confirmation

**For roles that require external application (company website):**
Do not attempt to navigate external career portals — too many custom forms,
file upload requirements, and login walls. Instead:
- Set status to "Pending Review — external site"
- Give the user the direct URL
- Provide all materials ready to paste

---

## Step B7: After Each Submission

After every successful submission, immediately update the tracker entry:
- Status → "Submitted"
- Date applied → today
- Confirmation note if captured

Then move to the next role without waiting. The user can interrupt at any time.

---

## Step B8: Session Close

After all 10 roles are processed, produce the session summary per SKILL.md
Output Delivery section, then generate and present the tracker CSV.

If the user wants to continue beyond 10 roles in the same session:
"We've processed 10 roles. Want to continue with the next batch? I'll search
for more jobs matching your criteria."

---

## PATH B Error Handling

**If Indeed MCP returns no results:**
- Try broader search terms (remove seniority filter, expand location to region)
- Tell the user what was tried
- Fall back to LinkedIn only

**If Cowork cannot automate a specific application:**
- Flag the role: "Easy Apply isn't available for this role — I'll prepare your
  materials so you can apply directly."
- Provide the job URL and all cover materials
- Set tracker status to "Pending Manual"

**If the user edits materials mid-flow:**
- Accept the edit, apply it to the current role's tracker entry
- Do not re-customize other roles based on one edit unless the user asks

**If a submission fails (error message, session timeout, CAPTCHA):**
- Stop immediately
- Tell the user what happened and what stage the submission reached
- Do not retry automatically — CAPTCHAs signal bot detection; tell the user
  to complete that application manually
- Set tracker status to "Failed — manual completion needed"
