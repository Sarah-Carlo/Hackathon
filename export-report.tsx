'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Recommendation, StudentProfile, Scholarship, CountryCostData } from '@/lib/university-data'

interface ExportReportProps {
  profile: StudentProfile
  recommendations: Recommendation[]
  scholarships: (Scholarship & { eligibility: 'eligible' | 'partial' | 'ineligible' })[]
  costData: CountryCostData[]
}

function generateReportHTML(
  profile: StudentProfile,
  recommendations: Recommendation[],
  scholarships: ExportReportProps['scholarships'],
  costData: CountryCostData[]
): string {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const uniRows = recommendations
    .map(
      (rec, i) => `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${rec.university.name}</strong></td>
        <td>${rec.university.country}</td>
        <td>#${rec.university.ranking}</td>
        <td>${rec.admissionProbability}%</td>
        <td>${rec.matchScore}%</td>
        <td>${rec.roiScore}%</td>
        <td>$${rec.university.tuitionPerYear.toLocaleString()}</td>
        <td>$${rec.estimatedTotalCost.toLocaleString()}</td>
        <td>${rec.estimatedRoi}%</td>
      </tr>`
    )
    .join('')

  const scholarshipRows = scholarships
    .filter((s) => s.eligibility === 'eligible')
    .map(
      (s) => `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td>${s.country}</td>
        <td>${s.type}</td>
        <td>${s.amountLabel}</td>
        <td>${s.deadline}</td>
      </tr>`
    )
    .join('')

  const costRows = costData
    .map(
      (c) => `
      <tr>
        <td><strong>${c.country}</strong></td>
        <td>$${c.visaFee}</td>
        <td>$${c.totalMonthlyLiving.toLocaleString()}/mo</td>
        <td>$${(c.totalMonthlyLiving * 24).toLocaleString()}</td>
        <td>${c.workPermitHours} hrs/week</td>
        <td>${c.postStudyWorkVisa}</td>
      </tr>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>UniMatch Report - ${date}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      color: #1a1a1a;
      line-height: 1.6;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
    }
    h1 { font-size: 28px; margin-bottom: 4px; color: #1a73e8; }
    h2 { font-size: 20px; margin: 30px 0 12px; color: #222; border-bottom: 2px solid #1a73e8; padding-bottom: 6px; }
    h3 { font-size: 16px; margin: 20px 0 8px; color: #333; }
    .subtitle { font-size: 14px; color: #666; margin-bottom: 30px; }
    .profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; margin-bottom: 20px; }
    .profile-item { font-size: 14px; }
    .profile-item span { font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0 20px; font-size: 13px; }
    th, td { padding: 8px 10px; border: 1px solid #ddd; text-align: left; }
    th { background: #f5f7fa; font-weight: 600; color: #333; }
    tr:nth-child(even) { background: #fafbfc; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 12px; color: #888; text-align: center; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; }
    .badge-eligible { background: #e6f9f0; color: #16a34a; }
    @media print {
      body { padding: 20px; }
      h2 { page-break-before: auto; }
      table { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>UniMatch Report</h1>
  <p class="subtitle">Generated on ${date} | Smart University Recommendations</p>

  <h2>Your Profile</h2>
  <div class="profile-grid">
    <p class="profile-item">CGPA: <span>${profile.cgpa} / 4.0</span></p>
    <p class="profile-item">IELTS: <span>${profile.ielts} / 9.0</span></p>
    <p class="profile-item">Budget: <span>$${profile.budget.toLocaleString()}</span></p>
    <p class="profile-item">Country: <span>${profile.country === 'any' ? 'Any Country' : profile.country}</span></p>
    <p class="profile-item" style="grid-column: span 2">Career Goals: <span>${profile.careerGoals}</span></p>
  </div>

  <h2>University Recommendations</h2>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>University</th>
        <th>Country</th>
        <th>Rank</th>
        <th>Admission %</th>
        <th>Match</th>
        <th>ROI Score</th>
        <th>Tuition/yr</th>
        <th>Total Cost</th>
        <th>5yr ROI</th>
      </tr>
    </thead>
    <tbody>${uniRows}</tbody>
  </table>

  ${
    scholarshipRows
      ? `<h2>Eligible Scholarships</h2>
  <table>
    <thead>
      <tr>
        <th>Scholarship</th>
        <th>Country</th>
        <th>Type</th>
        <th>Amount</th>
        <th>Deadline</th>
      </tr>
    </thead>
    <tbody>${scholarshipRows}</tbody>
  </table>`
      : ''
  }

  ${
    costRows
      ? `<h2>Cost of Living by Country</h2>
  <table>
    <thead>
      <tr>
        <th>Country</th>
        <th>Visa Fee</th>
        <th>Monthly Living</th>
        <th>2-Year Estimate</th>
        <th>Work Permit</th>
        <th>Post-Study Visa</th>
      </tr>
    </thead>
    <tbody>${costRows}</tbody>
  </table>`
      : ''
  }

  <div class="footer">
    <p>UniMatch | This report provides estimates based on publicly available data. Always verify with official university sources.</p>
  </div>

  <script>window.onload = function() { window.print(); }</script>
</body>
</html>`
}

export function ExportReport({
  profile,
  recommendations,
  scholarships,
  costData,
}: ExportReportProps) {
  function handleExport() {
    const html = generateReportHTML(profile, recommendations, scholarships, costData)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const win = window.open(url, '_blank')
    if (win) {
      win.onafterprint = () => URL.revokeObjectURL(url)
    }
  }

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      size="sm"
      className="gap-1.5 text-xs"
    >
      <Download className="h-3.5 w-3.5" />
      Download Report
    </Button>
  )
}
