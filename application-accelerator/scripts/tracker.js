/**
 * Application-Accelerator: Tracker Generator
 * 
 * Generates a CSV application tracker from session data.
 * No external dependencies — uses Node.js built-ins only.
 * 
 * Usage:
 *   node tracker.js --data /tmp/tracker_data.json --output /mnt/user-data/outputs/application-tracker.csv
 * 
 * Input schema: array of job entries (see SKILL.md Application Tracker section)
 */

const fs = require('fs');

// ─── CSV helpers ──────────────────────────────────────────────────────────────

function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  // Wrap in quotes if contains comma, newline, or double-quote
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function buildRow(fields) {
  return fields.map(escapeCSV).join(',');
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function scoreLabel(score) {
  if (score >= 90) return 'Strong Match';
  if (score >= 70) return 'Good Match';
  if (score >= 50) return 'Stretch';
  return 'Weak Match';
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const dataFlag = args.indexOf('--data');
  const outputFlag = args.indexOf('--output');

  if (dataFlag === -1 || outputFlag === -1) {
    console.error('Usage: node tracker.js --data tracker_data.json --output output.csv');
    process.exit(1);
  }

  const dataFile = args[dataFlag + 1];
  const outputFile = args[outputFlag + 1];

  let entries;
  try {
    entries = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } catch (e) {
    console.error(`Failed to read tracker data: ${e.message}`);
    process.exit(1);
  }

  if (!Array.isArray(entries) || entries.length === 0) {
    console.error('No entries found in tracker data.');
    process.exit(1);
  }

  // ── Header ──
  const header = buildRow([
    '#',
    'Company',
    'Role',
    'Match Score',
    'Score Label',
    'Status',
    'Job URL',
    'Platform',
    'Date Posted',
    'Date Applied',
    'Customizations Made',
    'Cover Note Written',
    'Cover Letter Written',
    'Notes'
  ]);

  // ── Rows ──
  const rows = entries.map(entry => buildRow([
    entry.number ?? '',
    entry.company ?? '',
    entry.role ?? '',
    entry.match_score ?? '',
    scoreLabel(entry.match_score ?? 0),
    entry.status ?? 'Draft',
    entry.job_url ?? '',
    inferPlatform(entry.job_url ?? ''),
    entry.date_posted ?? '',
    entry.date_applied ?? '',
    entry.customizations ?? '',
    entry.cover_note_written ? 'Yes' : 'No',
    entry.cover_letter_written ? 'Yes' : 'No',
    entry.notes ?? ''
  ]));

  // ── Summary footer ──
  const submitted = entries.filter(e =>
    e.status === 'Submitted' || e.status === 'Applied Manually'
  ).length;
  const avgScore = entries.length > 0
    ? Math.round(entries.reduce((s, e) => s + (e.match_score ?? 0), 0) / entries.length)
    : 0;
  const topMatch = entries.reduce((best, e) =>
    (e.match_score ?? 0) > (best.match_score ?? 0) ? e : best
  , entries[0]);

  const summaryRows = [
    '',
    buildRow(['SUMMARY', '', '', '', '', '', '', '', '', '', '', '', '', '']),
    buildRow(['Total roles processed', entries.length, '', '', '', '', '', '', '', '', '', '', '', '']),
    buildRow(['Applications submitted', submitted, '', '', '', '', '', '', '', '', '', '', '', '']),
    buildRow(['Average match score', avgScore + '/100', '', '', '', '', '', '', '', '', '', '', '', '']),
    buildRow([
      'Top match',
      `${topMatch?.role ?? ''} @ ${topMatch?.company ?? ''}`,
      `${topMatch?.match_score ?? ''}/100`,
      '', '', '', '', '', '', '', '', '', '', ''
    ]),
  ];

  // ── Write CSV ──
  const csv = [header, ...rows, ...summaryRows].join('\n');

  try {
    fs.writeFileSync(outputFile, csv, 'utf8');
    console.log(`✅ Tracker generated: ${outputFile}`);
    console.log(`   ${entries.length} roles | ${submitted} submitted | Avg score: ${avgScore}/100`);
    if (topMatch) {
      console.log(`   Top match: ${topMatch.role} @ ${topMatch.company} (${topMatch.match_score}/100)`);
    }
  } catch (e) {
    console.error(`Failed to write CSV: ${e.message}`);
    process.exit(1);
  }
}

function inferPlatform(url) {
  if (!url) return 'Unknown';
  if (url.includes('linkedin.com')) return 'LinkedIn';
  if (url.includes('indeed.com')) return 'Indeed';
  if (url.includes('naukri.com')) return 'Naukri';
  if (url.includes('glassdoor.com')) return 'Glassdoor';
  return 'Company Site';
}

main();
