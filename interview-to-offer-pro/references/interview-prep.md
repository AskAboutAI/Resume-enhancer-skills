# Interview Prep Reference

Covers: company research brief, predicted questions with STAR answers, questions
to ask the interviewer, and the mock interview flow. Run all sections in order
before the mock interview begins.

---

## Phase 1: Company Research Brief

Run tool calls first (see SKILL.md Tool Usage), then write a 1-page brief
in this exact format. Every field must be filled from real sources — no
invented details. If a source returns nothing useful, say so explicitly.

```
COMPANY RESEARCH BRIEF
[COMPANY] — [ROLE] — Interview: [DATE]
Generated: [today's date]
Sources: Indeed, web search, [company].com
══════════════════════════════════════════

WHAT THEY DO + HOW THEY MAKE MONEY
[2-3 sentences. Business model in plain language: who pays them, for what,
how they deliver it. Not a mission statement — the actual commercial engine.]

BIGGEST CURRENT CHALLENGE OR OPPORTUNITY
[1-2 sentences from recent news, earnings, or product launches. Cite the
source and date. This becomes the opening line of your cover letter and
the context for your "why this company" answer.]

MAIN COMPETITORS + HOW THEY DIFFERENTIATE
[3 competitors max. One sentence each on what makes this company different.
Useful for the "why us, not them" question.]

Competitor 1: [Name] — [How this company differs]
Competitor 2: [Name] — [How this company differs]
Competitor 3: [Name] — [How this company differs]

CULTURE AND VALUES
[What employees actually say, not what the careers page claims. Draw from
Indeed ratings and reviews. Flag any red flags honestly — low management
scores, work-life balance issues — so the user goes in with eyes open.]

Overall Indeed rating: [X/5]
Top positives from reviews: [2 points]
Watch-outs from reviews: [1-2 honest flags]
Stated company values: [from careers page — 3 max]
```

---

## Phase 2: Predicted Questions

Predict 10 questions they are likely to ask. Mix across three types:

- **Behavioral** (4 questions): Past experience. "Tell me about a time when..."
- **Technical/Role-specific** (3 questions): Skills and domain knowledge.
- **Situational** (3 questions): Hypotheticals. "What would you do if..."

For each question, produce this block:

```
QUESTION [N] — [Behavioral / Technical / Situational]
[The interview question, written exactly as an interviewer would ask it]

WHY THEY'LL ASK IT:
[1 sentence — what this question is really trying to assess. This is the
subtext behind the words. Knowing this changes how you answer it.]

STAR ANSWER (60-90 seconds when spoken aloud):
Situation: [Set the scene — one sentence. When, where, what was at stake.]
Task:       [What was YOUR specific responsibility in this situation.]
Action:     [What YOU did — first person, active verbs, specific steps.]
Result:     [Quantified outcome. Numbers wherever possible. Impact on the
            business, not just on you.]

Full answer draft:
[Write the answer as flowing speech, not as bullet points. It should sound
like a human telling a story, not reading a list. Use the resume's specific
examples, metrics, and role names. 120-180 words.]

TRAP TO AVOID:
[The one thing candidates consistently get wrong on this question — vague
claims, taking credit for team work, going negative about a past employer,
burying the result at the end, answering a different question. One sentence,
specific.]
```

Anchor every STAR answer to a real story from the user's resume. Do not
invent examples. If the resume doesn't have a matching story, flag it:
"No direct resume example for this — here's how to adapt your [closest role]
experience to answer it."

---

## Phase 3: Questions to Ask the Interviewer

Generate 5 questions the user should ask. Apply this filter before including
any question: would a generic candidate also ask this? If yes, cut it.

Every question must pass the "This person gets it" test — it should make the
interviewer think the candidate understands their business, not just their job.

Good signals a question is right:
- It references something specific from the company brief (challenge, recent news,
  a competitor move, something from the JD)
- It reveals strategic thinking, not just curiosity about the role
- The interviewer couldn't have expected it from a candidate who didn't research

Questions to never include:
- "What does a typical day look like?"
- "What are the growth opportunities here?"
- "Can you tell me more about the team culture?"
- Anything answerable from the company website

Format:
```
QUESTIONS TO ASK THEM

1. [Question — references specific company challenge or initiative]
   Why this works: [one sentence on what it signals to the interviewer]

2. [Question]
   Why this works: [one sentence]

3. [Question]
   Why this works: [one sentence]

4. [Question]
   Why this works: [one sentence]

5. [Question]
   Why this works: [one sentence]
```

---

## Phase 4: Mock Interview

Run this ONLY after the user has reviewed Phases 1-3 and confirms they are
ready. Do not start the mock interview unprompted.

**Select 5 questions from the 10 predicted in Phase 2 using this criteria:**
- 2 behavioral questions (pick the 2 most challenging — the ones where
  the user's resume has the least obvious match or where candidates
  typically stumble)
- 2 technical/role-specific questions (the most likely to be asked based
  on what the JD emphasises most heavily)
- 1 situational question (the one that would require the most on-the-spot
  thinking)

Do not tell the user which 5 you selected or in what order before starting.
The goal is to simulate real interview conditions.

Say:
> "Ready when you are. I'll ask you 5 questions from the predicted list, one
> at a time. Answer each one out loud or type your answer here. After each one,
> I'll tell you exactly what was strong and what to tighten before the real
> thing. Take your time on each answer."

**The mock interview is conversational. The rules are:**
- Ask ONE question. Stop. Wait for the user's full answer.
- Do not ask the next question until the user has answered and you have given
  feedback on their answer.
- Do not give all questions at once. Do not number them upfront.
- The user may be speaking their answer aloud and typing a summary — accept
  shorter typed answers as representative.

**After each answer, give feedback in this format:**

```
FEEDBACK — Question [N]/5

STRONG:
[What they nailed — be specific. "You opened with a clear situation" is useful.
"Good answer" is not. Reference their actual words.]

TIGHTEN:
[What to fix before the real interview. One or two specific things only.
"Your result was vague — 'improved performance' doesn't tell the interviewer
anything. What specifically improved? By how much?" Give the fix, not just
the diagnosis.]

REVISED CLOSE (if needed):
[If their result or closing line was weak, rewrite just that part so they
can hear what stronger sounds like.]
```

After question 5, deliver a session summary:

```
MOCK INTERVIEW COMPLETE

Overall readiness: [Strong / Ready with tweaks / Needs more prep]

Strongest answer: Question [N] — [why]
Weakest answer:   Question [N] — [what to revisit tonight]

Before the interview:
□ [1 specific thing to rehearse]
□ [1 number or metric to look up and memorize]
□ [1 question to ask them — your strongest one from Phase 3]

Good luck. You're more ready than you think.
```

**After the session summary, compile and save the transcript.**

Build `/tmp/mock_transcript.json` with every Q&A and feedback block:

```json
{
  "candidate": "[name]",
  "role": "[role]",
  "company": "[company]",
  "date": "[today]",
  "questions": [
    {
      "number": 1,
      "question": "[exact question asked]",
      "candidate_answer": "[what the user said]",
      "feedback_strong": "[what was strong]",
      "feedback_tighten": "[what to fix]",
      "revised_close": "[rewritten close if provided, else null]"
    }
  ],
  "session_summary": {
    "readiness": "Strong / Ready with tweaks / Needs more prep",
    "strongest_question": 0,
    "weakest_question": 0,
    "action_items": ["...", "...", "..."]
  }
}
```

Then generate the transcript doc:

```bash
node /mnt/skills/user/interview-to-offer-pro/scripts/generate_docs.js \
  --mode transcript \
  --data /tmp/mock_transcript.json \
  --output /mnt/user-data/outputs/[company]-mock-interview-transcript.docx
```

Then offer: "Want me to run the follow-up email templates so you have them
ready for after the interview?" — read `references/follow-up-emails.md` if yes.
