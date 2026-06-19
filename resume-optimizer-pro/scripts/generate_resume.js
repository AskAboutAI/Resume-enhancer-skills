/**
 * Resume-Optimizer-Pro: .docx Generator
 * 
 * Accepts structured resume data via stdin as JSON and outputs a professional,
 * ATS-compliant .docx file.
 * 
 * Usage:
 *   node generate_resume.js --input resume_data.json --output candidate-name-optimized-resume.docx
 * 
 * Input JSON format: see RESUME_DATA_SCHEMA comment below
 */

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  LevelFormat,
  BorderStyle,
  TabStopType,
  TabStopPosition,
  WidthType,
} = require('docx');
const fs = require('fs');
const path = require('path');

/**
 * RESUME_DATA_SCHEMA
 * 
 * {
 *   "candidate": {
 *     "name": "Raj Sharma",
 *     "email": "raj@email.com",
 *     "phone": "+91 98765 43210",
 *     "linkedin": "linkedin.com/in/rajsharma",
 *     "location": "Lucknow, India (Open to Remote)"
 *   },
 *   "summary": "Optional 2-3 sentence professional summary...",
 *   "experience": [
 *     {
 *       "title": "AI Content Strategist",
 *       "company": "Haizion Club",
 *       "dates": "Jan 2024 – Present",
 *       "bullets": [
 *         "Drove 40% increase in content pipeline efficiency by building AI-powered...",
 *         "Reduced [FILL IN: e.g., 60%] of manual content ops by automating..."
 *       ]
 *     }
 *   ],
 *   "skills": {
 *     "AI & Automation": ["Claude API", "Prompt Engineering", "Make.com", "n8n"],
 *     "Content": ["Short-form Video", "SEO", "LinkedIn Growth"],
 *     "Tools": ["Apify", "Notion", "Canva", "CapCut"]
 *   },
 *   "education": [
 *     {
 *       "degree": "Bachelor of Commerce",
 *       "school": "University of Lucknow",
 *       "year": "2018"
 *     }
 *   ],
 *   "certifications": ["Google Analytics (2023)", "Meta Blueprint (2022)"]
 * }
 */

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseBullet(text) {
  // Detect [FILL IN: ...] placeholders and render them bold + red
  const parts = [];
  const regex = /(\[FILL IN:[^\]]*\])/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(new TextRun({ text: text.slice(lastIndex, match.index), font: 'Calibri', size: 22 }));
    }
    parts.push(new TextRun({
      text: match[1],
      font: 'Calibri',
      size: 22,
      bold: true,
      color: 'CC0000', // red — impossible to miss before submitting
    }));
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(new TextRun({ text: text.slice(lastIndex), font: 'Calibri', size: 22 }));
  }

  return parts;
}

function sectionHeading(text) {
  return new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), font: 'Calibri', size: 22, bold: true })],
    spacing: { before: 240, after: 80 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: '2B579A', space: 4 }
    }
  });
}

function experienceHeader(title, company, dates) {
  // Job title left, dates right — using tab stop at right margin
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: title, font: 'Calibri', size: 22, bold: true }),
      new TextRun({ text: '\t', font: 'Calibri', size: 22 }),
      new TextRun({ text: dates, font: 'Calibri', size: 20, italics: true, color: '555555' }),
    ],
    spacing: { before: 160, after: 40 }
  });
}

function companyName(company) {
  return new Paragraph({
    children: [new TextRun({ text: company, font: 'Calibri', size: 20, color: '444444', italics: true })],
    spacing: { before: 0, after: 60 }
  });
}

// ─── Document builder ─────────────────────────────────────────────────────────

function buildResume(data) {
  const children = [];

  // ── Name ──
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: data.candidate.name, font: 'Calibri', size: 36, bold: true })],
    spacing: { before: 0, after: 80 }
  }));

  // ── Contact line ──
  const contactParts = [
    data.candidate.email,
    data.candidate.phone,
    data.candidate.linkedin,
    data.candidate.location,
  ].filter(Boolean).join('  |  ');

  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: contactParts, font: 'Calibri', size: 18, color: '444444' })],
    spacing: { before: 0, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC', space: 8 } }
  }));

  // ── Summary (optional) ──
  if (data.summary) {
    children.push(sectionHeading('Professional Summary'));
    children.push(new Paragraph({
      children: [new TextRun({ text: data.summary, font: 'Calibri', size: 22 })],
      spacing: { before: 80, after: 160 }
    }));
  }

  // ── Experience ──
  if (data.experience && data.experience.length > 0) {
    children.push(sectionHeading('Experience'));

    data.experience.forEach((job, idx) => {
      children.push(experienceHeader(job.title, job.company, job.dates));
      children.push(companyName(job.company));

      job.bullets.forEach(bullet => {
        children.push(new Paragraph({
          numbering: { reference: 'resume-bullets', level: 0 },
          children: parseBullet(bullet),
          spacing: { before: 40, after: 40 }
        }));
      });

      // Space between jobs (but not after last)
      if (idx < data.experience.length - 1) {
        children.push(new Paragraph({ children: [], spacing: { before: 120, after: 0 } }));
      }
    });
  }

  // ── Skills ──
  if (data.skills && Object.keys(data.skills).length > 0) {
    children.push(sectionHeading('Skills'));

    const skillsText = Object.entries(data.skills)
      .map(([category, items]) => `${category}: ${items.join(', ')}`)
      .join('   |   ');

    children.push(new Paragraph({
      children: [new TextRun({ text: skillsText, font: 'Calibri', size: 22 })],
      spacing: { before: 80, after: 160 }
    }));
  }

  // ── Education ──
  if (data.education && data.education.length > 0) {
    children.push(sectionHeading('Education'));

    data.education.forEach(edu => {
      children.push(new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
          new TextRun({ text: edu.degree, font: 'Calibri', size: 22, bold: true }),
          new TextRun({ text: '\t', font: 'Calibri', size: 22 }),
          new TextRun({ text: edu.year || '', font: 'Calibri', size: 20, italics: true, color: '555555' }),
        ],
        spacing: { before: 80, after: 40 }
      }));
      children.push(new Paragraph({
        children: [new TextRun({ text: edu.school, font: 'Calibri', size: 20, italics: true, color: '444444' })],
        spacing: { before: 0, after: 100 }
      }));
    });
  }

  // ── Certifications (optional) ──
  if (data.certifications && data.certifications.length > 0) {
    children.push(sectionHeading('Certifications'));
    data.certifications.forEach(cert => {
      children.push(new Paragraph({
        numbering: { reference: 'resume-bullets', level: 0 },
        children: [new TextRun({ text: cert, font: 'Calibri', size: 22 })],
        spacing: { before: 40, after: 40 }
      }));
    });
  }

  // ── Build Document ──
  const doc = new Document({
    numbering: {
      config: [
        {
          reference: 'resume-bullets',
          levels: [{
            level: 0,
            format: LevelFormat.BULLET,
            text: '•',
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 360, hanging: 180 }
              }
            }
          }]
        }
      ]
    },
    styles: {
      default: {
        document: {
          run: { font: 'Calibri', size: 22, color: '1A1A1A' }
        }
      }
    },
    sections: [{
      properties: {
        page: {
          size: {
            width: 12240,   // 8.5 inches (US Letter)
            height: 15840   // 11 inches (US Letter)
          },
          margin: {
            top: 1080,    // 0.75 inch — gives more content space
            right: 1080,
            bottom: 1080,
            left: 1080
          }
        }
      },
      children
    }]
  });

  return doc;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const inputFlag = args.indexOf('--input');
  const outputFlag = args.indexOf('--output');

  if (inputFlag === -1 || outputFlag === -1) {
    console.error('Usage: node generate_resume.js --input resume_data.json --output output.docx');
    process.exit(1);
  }

  const inputFile = args[inputFlag + 1];
  const outputFile = args[outputFlag + 1];

  let data;
  try {
    data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  } catch (e) {
    console.error(`Failed to read input JSON: ${e.message}`);
    process.exit(1);
  }

  const doc = buildResume(data);

  try {
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputFile, buffer);
    console.log(`✅ Resume generated: ${outputFile}`);
    console.log(`   Candidate: ${data.candidate.name}`);
    console.log(`   Sections: ${[
      data.summary ? 'Summary' : null,
      data.experience?.length ? `Experience (${data.experience.length} roles)` : null,
      data.skills ? 'Skills' : null,
      data.education?.length ? 'Education' : null,
      data.certifications?.length ? 'Certifications' : null
    ].filter(Boolean).join(', ')}`);
  } catch (e) {
    console.error(`Failed to generate .docx: ${e.message}`);
    process.exit(1);
  }
}

main();
