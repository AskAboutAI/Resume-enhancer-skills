/**
 * Interview-to-Offer-Pro: Document Generator
 *
 * Generates either an interview prep document or a negotiation playbook as .docx.
 *
 * Usage:
 *   node generate_docs.js --mode prep --data /tmp/interview_data.json \
 *     --output /mnt/user-data/outputs/company-interview-prep.docx
 *
 *   node generate_docs.js --mode negotiation --data /tmp/negotiation_data.json \
 *     --output /mnt/user-data/outputs/company-negotiation-playbook.docx
 *
 * ─── INPUT SCHEMAS ────────────────────────────────────────────────────────────
 *
 * PREP MODE (--mode prep):
 * {
 *   "candidate": { "name": "Raj Sharma" },
 *   "role": "AI Content Strategist",
 *   "company": "Haizion Club",
 *   "interview_date": "2026-06-25",
 *   "company_brief": {
 *     "what_they_do": "...",
 *     "biggest_challenge": "...",
 *     "competitors": [
 *       { "name": "Competitor A", "differentiation": "..." }
 *     ],
 *     "culture": "...",
 *     "indeed_rating": "4.1/5",
 *     "positives": ["...", "..."],
 *     "watch_outs": ["..."]
 *   },
 *   "questions": [
 *     {
 *       "number": 1,
 *       "type": "Behavioral",
 *       "question": "Tell me about a time you led a content strategy from scratch.",
 *       "why_asked": "They want to assess initiative and ownership.",
 *       "star_answer": "Situation: ...\nTask: ...\nAction: ...\nResult: ...",
 *       "full_answer": "...",
 *       "trap": "Don't say 'we' — own your contribution specifically."
 *     }
 *   ],
 *   "questions_to_ask": [
 *     { "question": "...", "why_it_works": "..." }
 *   ]
 * }
 *
 * NEGOTIATION MODE (--mode negotiation):
 * {
 *   "candidate": { "name": "Raj Sharma" },
 *   "role": "AI Content Strategist",
 *   "company": "Haizion Club",
 *   "location": "Remote",
 *   "offer": {
 *     "base": "₹18,00,000",
 *     "bonus": "10%",
 *     "equity": "None",
 *     "benefits": "Health, 15 days PTO"
 *   },
 *   "market_analysis": {
 *     "market_position": "Below market by ~15%",
 *     "sources": ["Indeed: ₹18-22L", "Glassdoor: ₹20-24L"],
 *     "counter_number": "₹21,00,000",
 *     "accept_at": "₹19,50,000",
 *     "walk_away_at": "₹17,00,000"
 *   },
 *   "email_script": "...",
 *   "phone_script": {
 *     "opening": "...",
 *     "stating_counter": "...",
 *     "handling_pushback": "...",
 *     "non_salary_items": ["Signing bonus: ...", "Extra PTO: ..."]
 *   },
 *   "walk_away_analysis": "..."
 * }
 */

const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  BorderStyle, TabStopType, TabStopPosition, HeadingLevel
} = require('docx');
const fs = require('fs');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sectionHeading(text) {
  return new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), font: 'Calibri', size: 22, bold: true })],
    spacing: { before: 280, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '2B579A', space: 4 } }
  });
}

function subheading(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'Calibri', size: 22, bold: true })],
    spacing: { before: 200, after: 60 }
  });
}

function body(text, options = {}) {
  return new Paragraph({
    children: [new TextRun({
      text,
      font: 'Calibri',
      size: 20,
      italics: options.italic || false,
      color: options.color || '1A1A1A'
    })],
    spacing: { before: 40, after: 60 }
  });
}

function label(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'Calibri', size: 20, bold: true, color: '2B579A' })],
    spacing: { before: 120, after: 40 }
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'doc-bullets', level: 0 },
    children: [new TextRun({ text, font: 'Calibri', size: 20 })],
    spacing: { before: 40, after: 40 }
  });
}

function divider() {
  return new Paragraph({
    children: [],
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: 'DDDDDD', space: 6 } },
    spacing: { before: 160, after: 160 }
  });
}

function docTitle(name, role, company, date, mode) {
  const modeLabel = mode === 'prep' ? 'Interview Prep' : 'Negotiation Playbook';
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: modeLabel.toUpperCase(), font: 'Calibri', size: 32, bold: true, color: '2B579A' })],
      spacing: { before: 0, after: 80 }
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `${role} at ${company}`, font: 'Calibri', size: 24, bold: true })],
      spacing: { before: 0, after: 60 }
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({
        text: mode === 'prep' ? `Interview: ${date}  |  Prepared for: ${name}` : `Candidate: ${name}  |  Location: ${company}`,
        font: 'Calibri', size: 18, color: '666666'
      })],
      spacing: { before: 0, after: 200 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC', space: 8 } }
    })
  ];
}

// ─── PREP document builder ────────────────────────────────────────────────────

function buildPrepDoc(data) {
  const children = [];

  children.push(...docTitle(
    data.candidate.name, data.role, data.company,
    data.interview_date, 'prep'
  ));

  // Company Brief
  children.push(sectionHeading('Company Research Brief'));
  const brief = data.company_brief;

  children.push(label('What They Do + How They Make Money'));
  children.push(body(brief.what_they_do));

  children.push(label('Biggest Current Challenge or Opportunity'));
  children.push(body(brief.biggest_challenge));

  if (brief.competitors?.length) {
    children.push(label('Competitors + Differentiation'));
    brief.competitors.forEach(c => {
      children.push(bullet(`${c.name}: ${c.differentiation}`));
    });
  }

  children.push(label('Culture and Values'));
  children.push(body(brief.culture));
  if (brief.indeed_rating) {
    children.push(body(`Indeed Rating: ${brief.indeed_rating}`, { color: '2B579A' }));
  }
  if (brief.positives?.length) {
    brief.positives.forEach(p => children.push(bullet(`Positive: ${p}`)));
  }
  if (brief.watch_outs?.length) {
    brief.watch_outs.forEach(w => children.push(bullet(`Watch out: ${w}`)));
  }

  children.push(divider());

  // Predicted Questions
  children.push(sectionHeading('Predicted Interview Questions'));
  (data.questions || []).forEach((q, i) => {
    children.push(subheading(`Q${q.number}. ${q.question} [${q.type}]`));
    children.push(label('Why They Will Ask It'));
    children.push(body(q.why_asked));

    children.push(label('STAR Answer'));
    q.star_answer.split('\n').forEach(line => {
      if (line.trim()) children.push(body(line.trim()));
    });

    if (q.full_answer) {
      children.push(label('Full Answer (spoken aloud — 60-90 seconds)'));
      children.push(body(q.full_answer, { italic: true }));
    }

    children.push(label('Trap to Avoid'));
    children.push(body(q.trap, { color: 'CC0000' }));

    if (i < (data.questions.length - 1)) children.push(divider());
  });

  // Questions to Ask
  if (data.questions_to_ask?.length) {
    children.push(divider());
    children.push(sectionHeading('5 Questions to Ask the Interviewer'));
    data.questions_to_ask.forEach((q, i) => {
      children.push(label(`${i + 1}. ${q.question}`));
      children.push(body(`Why it works: ${q.why_it_works}`, { italic: true, color: '444444' }));
    });
  }

  return children;
}

// ─── NEGOTIATION document builder ─────────────────────────────────────────────

function buildNegotiationDoc(data) {
  const children = [];

  children.push(...docTitle(
    data.candidate.name, data.role, data.company,
    data.location, 'negotiation'
  ));

  // The Offer
  children.push(sectionHeading('The Offer'));
  const offer = data.offer;
  [
    ['Base Salary', offer.base],
    ['Bonus', offer.bonus || 'Not disclosed'],
    ['Equity', offer.equity || 'None'],
    ['Benefits', offer.benefits || 'Not specified']
  ].forEach(([k, v]) => {
    children.push(new Paragraph({
      tabStops: [{ type: TabStopType.LEFT, position: 2000 }],
      children: [
        new TextRun({ text: k + ':', font: 'Calibri', size: 20, bold: true }),
        new TextRun({ text: '\t' + v, font: 'Calibri', size: 20 })
      ],
      spacing: { before: 60, after: 60 }
    }));
  });

  children.push(divider());

  // Market Analysis
  children.push(sectionHeading('Market Analysis'));
  const market = data.market_analysis;
  children.push(body(`Market position: ${market.market_position}`, { bold: true }));
  if (market.sources?.length) {
    children.push(label('Data Sources'));
    market.sources.forEach(s => children.push(bullet(s)));
  }
  children.push(label('Recommended Counter-Offer'));
  children.push(body(market.counter_number, { color: '2B579A' }));
  children.push(label('Accept At'));
  children.push(body(market.accept_at));
  children.push(label('Walk Away At'));
  children.push(body(market.walk_away_at, { color: 'CC0000' }));

  children.push(divider());

  // Email Script
  children.push(sectionHeading('Counter-Offer Email Script'));
  children.push(body(data.email_script, { italic: true }));

  children.push(divider());

  // Phone Script
  children.push(sectionHeading('Phone Call Script'));
  const phone = data.phone_script;
  if (phone.opening) {
    children.push(label('Opening'));
    children.push(body(phone.opening, { italic: true }));
  }
  if (phone.stating_counter) {
    children.push(label('Stating Your Counter'));
    children.push(body(phone.stating_counter, { italic: true }));
  }
  if (phone.handling_pushback) {
    children.push(label('Handling "This Is the Best We Can Do"'));
    children.push(body(phone.handling_pushback, { italic: true }));
  }
  if (phone.non_salary_items?.length) {
    children.push(label('Non-Salary Negotiation Items'));
    phone.non_salary_items.forEach(item => children.push(bullet(item)));
  }

  children.push(divider());

  // Walk-Away Analysis
  children.push(sectionHeading('Walk-Away Analysis'));
  children.push(body(data.walk_away_analysis));

  return children;
}

// ─── TRANSCRIPT document builder ─────────────────────────────────────────────

function buildTranscriptDoc(data) {
  const children = [];

  // Title block
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'MOCK INTERVIEW TRANSCRIPT', font: 'Calibri', size: 32, bold: true, color: '2B579A' })],
    spacing: { before: 0, after: 80 }
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: `${data.role} at ${data.company}`, font: 'Calibri', size: 24, bold: true })],
    spacing: { before: 0, after: 60 }
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: `Candidate: ${data.candidate.name}  |  Date: ${data.date}`, font: 'Calibri', size: 18, color: '666666' })],
    spacing: { before: 0, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC', space: 8 } }
  }));

  // Each Q&A block
  (data.questions || []).forEach((q, i) => {
    children.push(sectionHeading(`Question ${q.number} of ${data.questions.length}`));

    children.push(label('Question Asked'));
    children.push(body(q.question));

    children.push(label('Your Answer'));
    children.push(body(q.candidate_answer || '[No answer recorded]', { italic: true }));

    children.push(label('Feedback: Strong'));
    children.push(body(q.feedback_strong || '', { color: '2E7D32' }));

    children.push(label('Feedback: Tighten'));
    children.push(body(q.feedback_tighten || '', { color: 'CC0000' }));

    if (q.revised_close) {
      children.push(label('Revised Close'));
      children.push(body(q.revised_close, { italic: true, color: '1565C0' }));
    }

    if (i < data.questions.length - 1) children.push(divider());
  });

  // Session Summary
  if (data.session_summary) {
    children.push(divider());
    children.push(sectionHeading('Session Summary'));
    const s = data.session_summary;
    children.push(label('Overall Readiness'));
    children.push(body(s.readiness || ''));
    if (s.strongest_question) {
      children.push(label('Strongest Answer'));
      children.push(body(`Question ${s.strongest_question}`));
    }
    if (s.weakest_question) {
      children.push(label('Weakest Answer'));
      children.push(body(`Question ${s.weakest_question}`));
    }
    if (s.action_items?.length) {
      children.push(label('Before the Interview'));
      s.action_items.forEach(item => children.push(bullet(item)));
    }
  }

  return children;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const modeFlag = args.indexOf('--mode');
  const dataFlag = args.indexOf('--data');
  const outputFlag = args.indexOf('--output');

  if (modeFlag === -1 || dataFlag === -1 || outputFlag === -1) {
    console.error('Usage: node generate_docs.js --mode [prep|negotiation|transcript] --data input.json --output output.docx');
    process.exit(1);
  }

  const mode = args[modeFlag + 1];
  const dataFile = args[dataFlag + 1];
  const outputFile = args[outputFlag + 1];

  if (!['prep', 'negotiation', 'transcript'].includes(mode)) {
    console.error('--mode must be "prep", "negotiation", or "transcript"');
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } catch (e) {
    console.error(`Failed to read input: ${e.message}`);
    process.exit(1);
  }

  const children =
    mode === 'prep'         ? buildPrepDoc(data) :
    mode === 'negotiation'  ? buildNegotiationDoc(data) :
                              buildTranscriptDoc(data);

  const doc = new Document({
    numbering: {
      config: [{
        reference: 'doc-bullets',
        levels: [{
          level: 0,
          format: 'bullet',
          text: '\u2022',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 180 } } }
        }]
      }]
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
        }
      },
      children
    }]
  });

  try {
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputFile, buffer);
    const modeLabels = { prep: 'Interview Prep Doc', negotiation: 'Negotiation Playbook', transcript: 'Mock Interview Transcript' };
    console.log(`✅ ${modeLabels[mode]} generated: ${outputFile}`);
    console.log(`   ${data.role} at ${data.company}`);
  } catch (e) {
    console.error(`Failed to generate .docx: ${e.message}`);
    process.exit(1);
  }
}

main();
