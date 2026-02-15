export interface StudentProfile {
  cgpa: number
  ielts: number
  budget: number
  country: string
  careerGoals: string
}

export interface University {
  name: string
  country: string
  ranking: number
  tuitionPerYear: number
  acceptanceRate: number
  avgCgpa: number
  avgIelts: number
  programs: string[]
  employmentRate: number
  avgSalaryAfterGrad: number
  logoInitials: string
  description: string
  applicationDeadline: string
  minCgpa: number
  minIelts: number
  documentsRequired: string[]
  campusHighlights: string[]
}

export interface Scholarship {
  name: string
  provider: string
  country: string
  amount: number
  amountLabel: string
  type: 'Merit' | 'Need-based' | 'Country-specific' | 'Research'
  minCgpa: number
  minIelts: number
  deadline: string
  description: string
}

export interface CountryCostData {
  country: string
  flagEmoji: string
  visaFee: number
  healthInsurance: number
  avgRent: number
  avgFood: number
  avgTransport: number
  totalMonthlyLiving: number
  visaProcessingWeeks: string
  workPermitHours: number
  postStudyWorkVisa: string
  currencyNote: string
}

export interface Recommendation {
  university: University
  admissionProbability: number
  roiScore: number
  matchScore: number
  estimatedTotalCost: number
  estimatedRoi: number
}

const universities: University[] = [
  {
    name: 'Massachusetts Institute of Technology',
    country: 'USA',
    ranking: 1,
    tuitionPerYear: 57986,
    acceptanceRate: 4,
    avgCgpa: 9.5,
    avgIelts: 7.5,
    programs: ['engineering', 'technology', 'science', 'research', 'ai', 'data science'],
    employmentRate: 97,
    avgSalaryAfterGrad: 115000,
    logoInitials: 'MIT',
    description: 'A world-leading research university known for pioneering breakthroughs in engineering, computing, and the sciences.',
    applicationDeadline: 'December 15',
    minCgpa: 8.5,
    minIelts: 7.0,
    documentsRequired: ['Transcripts', 'Statement of Purpose', '3 Recommendation Letters', 'GRE Scores', 'Resume/CV'],
    campusHighlights: ['MIT Media Lab', 'Infinite Corridor', '$25B+ Endowment', 'Startup culture'],
  },
  {
    name: 'Stanford University',
    country: 'USA',
    ranking: 3,
    tuitionPerYear: 56169,
    acceptanceRate: 4,
    avgCgpa: 9.5,
    avgIelts: 7.5,
    programs: ['engineering', 'business', 'technology', 'ai', 'entrepreneurship'],
    employmentRate: 96,
    avgSalaryAfterGrad: 120000,
    logoInitials: 'SU',
    description: 'Located in Silicon Valley, Stanford is a global hub for innovation, entrepreneurship, and cutting-edge research.',
    applicationDeadline: 'December 1',
    minCgpa: 8.5,
    minIelts: 7.0,
    documentsRequired: ['Transcripts', 'Statement of Purpose', '3 Recommendation Letters', 'GRE Scores', 'Resume/CV'],
    campusHighlights: ['Silicon Valley location', 'Stanford Research Park', 'D.school', '$37B+ Endowment'],
  },
  {
    name: 'University of Toronto',
    country: 'Canada',
    ranking: 18,
    tuitionPerYear: 42000,
    acceptanceRate: 43,
    avgCgpa: 3.6,
    avgIelts: 6.5,
    programs: ['engineering', 'science', 'business', 'health', 'ai', 'data science'],
    employmentRate: 92,
    avgSalaryAfterGrad: 75000,
    logoInitials: 'UT',
    description: 'Canada\'s top-ranked university with world-class research output and a vibrant multicultural campus in downtown Toronto.',
    applicationDeadline: 'January 15',
    minCgpa: 3.0,
    minIelts: 6.5,
    documentsRequired: ['Transcripts', 'Statement of Purpose', '2 Recommendation Letters', 'Resume/CV', 'English Proficiency'],
    campusHighlights: ['Vector Institute for AI', 'Downtown Toronto', 'Co-op programs', '700+ student clubs'],
  },
  {
    name: 'University of British Columbia',
    country: 'Canada',
    ranking: 34,
    tuitionPerYear: 38000,
    acceptanceRate: 52,
    avgCgpa: 3.4,
    avgIelts: 6.5,
    programs: ['science', 'engineering', 'forestry', 'business', 'health'],
    employmentRate: 90,
    avgSalaryAfterGrad: 70000,
    logoInitials: 'UBC',
    description: 'Set against the mountains and ocean of Vancouver, UBC is a research powerhouse with strong co-op and sustainability programs.',
    applicationDeadline: 'January 31',
    minCgpa: 2.8,
    minIelts: 6.5,
    documentsRequired: ['Transcripts', 'Statement of Purpose', '2 Recommendation Letters', 'Resume/CV', 'English Proficiency'],
    campusHighlights: ['Vancouver campus', 'Sustainability focus', 'Co-op programs', 'TRIUMF particle physics lab'],
  },
  {
    name: 'University of Oxford',
    country: 'UK',
    ranking: 4,
    tuitionPerYear: 39000,
    acceptanceRate: 17,
    avgCgpa: 3.8,
    avgIelts: 7.0,
    programs: ['humanities', 'science', 'business', 'law', 'medicine', 'research'],
    employmentRate: 95,
    avgSalaryAfterGrad: 85000,
    logoInitials: 'OX',
    description: 'The oldest university in the English-speaking world, Oxford offers unparalleled academic tradition and tutorial-based learning.',
    applicationDeadline: 'January 20',
    minCgpa: 3.5,
    minIelts: 7.0,
    documentsRequired: ['Transcripts', 'Personal Statement', '3 Academic References', 'Writing Sample', 'CV'],
    campusHighlights: ['Bodleian Library', 'College system', '900+ years of history', 'Oxford Union'],
  },
  {
    name: 'Imperial College London',
    country: 'UK',
    ranking: 6,
    tuitionPerYear: 36000,
    acceptanceRate: 14,
    avgCgpa: 3.7,
    avgIelts: 7.0,
    programs: ['engineering', 'science', 'medicine', 'business', 'technology'],
    employmentRate: 94,
    avgSalaryAfterGrad: 82000,
    logoInitials: 'ICL',
    description: 'A STEM-focused institution in the heart of London, consistently ranked among the top engineering and science schools globally.',
    applicationDeadline: 'January 15',
    minCgpa: 3.3,
    minIelts: 6.5,
    documentsRequired: ['Transcripts', 'Personal Statement', '2 Academic References', 'CV', 'English Proficiency'],
    campusHighlights: ['South Kensington campus', 'Imperial Incubator', 'London location', 'Industry partnerships'],
  },
  {
    name: 'University of Melbourne',
    country: 'Australia',
    ranking: 14,
    tuitionPerYear: 35000,
    acceptanceRate: 70,
    avgCgpa: 3.3,
    avgIelts: 6.5,
    programs: ['science', 'engineering', 'business', 'arts', 'health'],
    employmentRate: 88,
    avgSalaryAfterGrad: 65000,
    logoInitials: 'UM',
    description: 'Australia\'s leading university, known for its Melbourne Model curriculum and world-class research in biomedicine and engineering.',
    applicationDeadline: 'October 31',
    minCgpa: 3.0,
    minIelts: 6.5,
    documentsRequired: ['Transcripts', 'Personal Statement', 'Resume/CV', 'English Proficiency', 'Academic References'],
    campusHighlights: ['Melbourne Model', 'Parkville campus', 'Strong research output', 'Vibrant student life'],
  },
  {
    name: 'University of Sydney',
    country: 'Australia',
    ranking: 19,
    tuitionPerYear: 33000,
    acceptanceRate: 68,
    avgCgpa: 3.2,
    avgIelts: 6.5,
    programs: ['arts', 'business', 'engineering', 'health', 'law', 'science'],
    employmentRate: 87,
    avgSalaryAfterGrad: 62000,
    logoInitials: 'USyd',
    description: 'Australia\'s first university, offering a broad curriculum in a stunning historic campus with a strong global alumni network.',
    applicationDeadline: 'January 15',
    minCgpa: 2.8,
    minIelts: 6.5,
    documentsRequired: ['Transcripts', 'Personal Statement', 'Resume/CV', 'English Proficiency'],
    campusHighlights: ['Historic Quadrangle', 'Industry placements', 'Camperdown/Darlington campus', '400+ student societies'],
  },
  {
    name: 'Technical University of Munich',
    country: 'Germany',
    ranking: 30,
    tuitionPerYear: 3000,
    acceptanceRate: 8,
    avgCgpa: 3.5,
    avgIelts: 6.5,
    programs: ['engineering', 'technology', 'science', 'ai', 'automotive'],
    employmentRate: 93,
    avgSalaryAfterGrad: 68000,
    logoInitials: 'TUM',
    description: 'Germany\'s top technical university, offering nearly tuition-free education with deep ties to the automotive and engineering industries.',
    applicationDeadline: 'May 31',
    minCgpa: 3.0,
    minIelts: 6.5,
    documentsRequired: ['Transcripts', 'Motivation Letter', 'Resume/CV', 'VPD Certificate', 'Language Certificate'],
    campusHighlights: ['Near-zero tuition', 'BMW/Siemens partnerships', 'Munich location', 'TUM Venture Labs'],
  },
  {
    name: 'ETH Zurich',
    country: 'Germany',
    ranking: 7,
    tuitionPerYear: 1500,
    acceptanceRate: 27,
    avgCgpa: 3.7,
    avgIelts: 7.0,
    programs: ['engineering', 'science', 'technology', 'architecture', 'research'],
    employmentRate: 95,
    avgSalaryAfterGrad: 90000,
    logoInitials: 'ETH',
    description: 'One of the world\'s top science and technology universities, with 22 Nobel laureates and minimal tuition fees.',
    applicationDeadline: 'December 15',
    minCgpa: 3.3,
    minIelts: 7.0,
    documentsRequired: ['Transcripts', 'Motivation Letter', 'Resume/CV', 'GRE Scores (recommended)', 'Language Certificate'],
    campusHighlights: ['22 Nobel laureates', 'Zurich location', 'Ultra-low tuition', 'Einstein\'s alma mater'],
  },
  {
    name: 'National University of Singapore',
    country: 'Singapore',
    ranking: 8,
    tuitionPerYear: 29000,
    acceptanceRate: 18,
    avgCgpa: 3.6,
    avgIelts: 6.5,
    programs: ['business', 'engineering', 'science', 'computing', 'law'],
    employmentRate: 94,
    avgSalaryAfterGrad: 72000,
    logoInitials: 'NUS',
    description: 'Asia\'s leading global university, known for computing, business, and law with strong industry partnerships across Southeast Asia.',
    applicationDeadline: 'January 31',
    minCgpa: 3.2,
    minIelts: 6.5,
    documentsRequired: ['Transcripts', 'Statement of Purpose', '2 Recommendation Letters', 'Resume/CV', 'TOEFL/IELTS'],
    campusHighlights: ['Asia\'s #1 university', 'Kent Ridge campus', 'NUS Enterprise', 'Block71 startup hub'],
  },
  {
    name: 'University of Amsterdam',
    country: 'Netherlands',
    ranking: 53,
    tuitionPerYear: 15000,
    acceptanceRate: 60,
    avgCgpa: 3.2,
    avgIelts: 6.5,
    programs: ['social sciences', 'humanities', 'science', 'business', 'ai'],
    employmentRate: 85,
    avgSalaryAfterGrad: 55000,
    logoInitials: 'UvA',
    description: 'A leading European research university in the heart of Amsterdam, known for social sciences, AI research, and an international student body.',
    applicationDeadline: 'April 1',
    minCgpa: 2.8,
    minIelts: 6.5,
    documentsRequired: ['Transcripts', 'Motivation Letter', 'Resume/CV', 'English Proficiency', 'Diploma Supplement'],
    campusHighlights: ['Amsterdam city center', 'ELLIS AI institute', 'Highly international', 'Affordable tuition'],
  },
]

// ===== SCHOLARSHIP DATA =====
const scholarships: Scholarship[] = [
  {
    name: 'Fulbright Foreign Student Program',
    provider: 'U.S. Department of State',
    country: 'USA',
    amount: 50000,
    amountLabel: 'Up to $50,000/year',
    type: 'Merit',
    minCgpa: 3.5,
    minIelts: 7.0,
    deadline: 'October 15',
    description: 'Covers tuition, living, and travel for outstanding international graduate students studying in the USA.',
  },
  {
    name: 'Chevening Scholarship',
    provider: 'UK Government',
    country: 'UK',
    amount: 45000,
    amountLabel: 'Full tuition + stipend',
    type: 'Merit',
    minCgpa: 3.3,
    minIelts: 6.5,
    deadline: 'November 1',
    description: 'Fully funded scholarship for future leaders to pursue a one-year master\'s in the UK.',
  },
  {
    name: 'DAAD Scholarship',
    provider: 'German Academic Exchange Service',
    country: 'Germany',
    amount: 15000,
    amountLabel: '~$1,200/month stipend',
    type: 'Merit',
    minCgpa: 3.0,
    minIelts: 6.0,
    deadline: 'November 15',
    description: 'Monthly stipend plus insurance for international students pursuing degrees in Germany.',
  },
  {
    name: 'Commonwealth Scholarship',
    provider: 'Commonwealth Secretariat',
    country: 'UK',
    amount: 40000,
    amountLabel: 'Full tuition + stipend',
    type: 'Need-based',
    minCgpa: 3.0,
    minIelts: 6.5,
    deadline: 'December 20',
    description: 'For students from Commonwealth countries to study in the UK, covering all expenses.',
  },
  {
    name: 'Australia Awards',
    provider: 'Australian Government',
    country: 'Australia',
    amount: 35000,
    amountLabel: 'Full tuition + living',
    type: 'Country-specific',
    minCgpa: 2.8,
    minIelts: 6.5,
    deadline: 'April 30',
    description: 'Covers tuition, return airfare, establishment allowance, and living expenses.',
  },
  {
    name: 'Vanier Canada Graduate Scholarship',
    provider: 'Government of Canada',
    country: 'Canada',
    amount: 50000,
    amountLabel: '$50,000/year for 3 years',
    type: 'Research',
    minCgpa: 3.5,
    minIelts: 7.0,
    deadline: 'November 1',
    description: 'For doctoral students demonstrating leadership and high research potential.',
  },
  {
    name: 'Singapore International Graduate Award',
    provider: 'A*STAR Singapore',
    country: 'Singapore',
    amount: 30000,
    amountLabel: 'Full tuition + stipend',
    type: 'Research',
    minCgpa: 3.2,
    minIelts: 6.5,
    deadline: 'January 1',
    description: 'Covers tuition and monthly stipend for PhD students in science and engineering at NUS or NTU.',
  },
  {
    name: 'Holland Scholarship',
    provider: 'Dutch Ministry of Education',
    country: 'Netherlands',
    amount: 5000,
    amountLabel: 'One-time grant of EUR 5,000',
    type: 'Merit',
    minCgpa: 3.0,
    minIelts: 6.5,
    deadline: 'February 1',
    description: 'A one-time grant for non-EU/EEA students starting their first year at a Dutch university.',
  },
  {
    name: 'Gates Cambridge Scholarship',
    provider: 'Bill & Melinda Gates Foundation',
    country: 'UK',
    amount: 55000,
    amountLabel: 'Full cost of study',
    type: 'Merit',
    minCgpa: 3.7,
    minIelts: 7.5,
    deadline: 'December 3',
    description: 'Highly competitive scholarship for outstanding applicants to pursue postgraduate study at Cambridge.',
  },
  {
    name: 'Lester B. Pearson International Scholarship',
    provider: 'University of Toronto',
    country: 'Canada',
    amount: 45000,
    amountLabel: 'Full tuition + living for 4 years',
    type: 'Merit',
    minCgpa: 3.6,
    minIelts: 7.0,
    deadline: 'November 30',
    description: 'Covers tuition, books, incidentals, and residence for exceptional international undergrads.',
  },
  {
    name: 'Melbourne Graduate Research Scholarship',
    provider: 'University of Melbourne',
    country: 'Australia',
    amount: 32000,
    amountLabel: 'Tuition waiver + $32K stipend',
    type: 'Research',
    minCgpa: 3.3,
    minIelts: 6.5,
    deadline: 'October 31',
    description: 'Covers tuition and provides a living allowance for international research students.',
  },
  {
    name: 'Deutschlandstipendium',
    provider: 'German Federal Government',
    country: 'Germany',
    amount: 3600,
    amountLabel: 'EUR 300/month',
    type: 'Merit',
    minCgpa: 2.8,
    minIelts: 6.0,
    deadline: 'Rolling',
    description: 'A monthly stipend for high-achieving students at participating German universities.',
  },
]

// ===== COST OF LIVING DATA =====
const countryCosts: CountryCostData[] = [
  {
    country: 'USA',
    flagEmoji: 'US',
    visaFee: 510,
    healthInsurance: 250,
    avgRent: 1400,
    avgFood: 500,
    avgTransport: 120,
    totalMonthlyLiving: 2270,
    visaProcessingWeeks: '3-5',
    workPermitHours: 20,
    postStudyWorkVisa: 'OPT: 1-3 years',
    currencyNote: 'All amounts in USD',
  },
  {
    country: 'Canada',
    flagEmoji: 'CA',
    visaFee: 235,
    healthInsurance: 80,
    avgRent: 1100,
    avgFood: 400,
    avgTransport: 100,
    totalMonthlyLiving: 1680,
    visaProcessingWeeks: '4-8',
    workPermitHours: 20,
    postStudyWorkVisa: 'PGWP: up to 3 years',
    currencyNote: 'Amounts in CAD (approx USD shown)',
  },
  {
    country: 'UK',
    flagEmoji: 'GB',
    visaFee: 490,
    healthInsurance: 0,
    avgRent: 1200,
    avgFood: 350,
    avgTransport: 90,
    totalMonthlyLiving: 1640,
    visaProcessingWeeks: '3-8',
    workPermitHours: 20,
    postStudyWorkVisa: 'Graduate Route: 2 years',
    currencyNote: 'NHS surcharge included in visa; amounts in GBP equiv.',
  },
  {
    country: 'Australia',
    flagEmoji: 'AU',
    visaFee: 450,
    healthInsurance: 55,
    avgRent: 1050,
    avgFood: 400,
    avgTransport: 100,
    totalMonthlyLiving: 1605,
    visaProcessingWeeks: '4-7',
    workPermitHours: 48,
    postStudyWorkVisa: 'Temp Grad Visa: 2-4 years',
    currencyNote: 'Amounts in AUD (approx USD shown)',
  },
  {
    country: 'Germany',
    flagEmoji: 'DE',
    visaFee: 75,
    healthInsurance: 120,
    avgRent: 700,
    avgFood: 300,
    avgTransport: 50,
    totalMonthlyLiving: 1170,
    visaProcessingWeeks: '4-12',
    workPermitHours: 20,
    postStudyWorkVisa: '18-month job-seeker visa',
    currencyNote: 'Semester ticket often included; amounts in EUR equiv.',
  },
  {
    country: 'Singapore',
    flagEmoji: 'SG',
    visaFee: 60,
    healthInsurance: 50,
    avgRent: 900,
    avgFood: 400,
    avgTransport: 80,
    totalMonthlyLiving: 1430,
    visaProcessingWeeks: '2-4',
    workPermitHours: 16,
    postStudyWorkVisa: 'LTVP: 1 year',
    currencyNote: 'Amounts in SGD (approx USD shown)',
  },
  {
    country: 'Netherlands',
    flagEmoji: 'NL',
    visaFee: 210,
    healthInsurance: 130,
    avgRent: 800,
    avgFood: 320,
    avgTransport: 50,
    totalMonthlyLiving: 1300,
    visaProcessingWeeks: '4-8',
    workPermitHours: 16,
    postStudyWorkVisa: 'Orientation Year: 1 year',
    currencyNote: 'Amounts in EUR equiv.',
  },
]

export function findScholarships(
  profile: StudentProfile,
  recommendations: Recommendation[]
): (Scholarship & { eligibility: 'eligible' | 'partial' | 'ineligible' })[] {
  const recCountries = [...new Set(recommendations.map((r) => r.university.country))]

  return scholarships
    .filter((s) => {
      if (profile.country && profile.country !== 'any') {
        return s.country.toLowerCase() === profile.country.toLowerCase()
      }
      return recCountries.some((c) => c.toLowerCase() === s.country.toLowerCase())
    })
    .map((s) => {
      const cgpaOk = profile.cgpa >= s.minCgpa
      const ieltsOk = profile.ielts >= s.minIelts
      const eligibility = cgpaOk && ieltsOk ? 'eligible' : cgpaOk || ieltsOk ? 'partial' : 'ineligible'
      return { ...s, eligibility }
    })
    .sort((a, b) => {
      const order = { eligible: 0, partial: 1, ineligible: 2 }
      if (order[a.eligibility] !== order[b.eligibility]) return order[a.eligibility] - order[b.eligibility]
      return b.amount - a.amount
    })
}

export function getCostOfLiving(countries: string[]): CountryCostData[] {
  const unique = [...new Set(countries.map((c) => c.toLowerCase()))]
  return countryCosts.filter((c) => unique.includes(c.country.toLowerCase()))
}

function getCareerKeywords(careerGoals: string): string[] {
  const text = careerGoals.toLowerCase()
  const keywords: string[] = []

  if (text.includes('engineer') || text.includes('software') || text.includes('develop'))
    keywords.push('engineering', 'technology')
  if (text.includes('business') || text.includes('manag') || text.includes('mba'))
    keywords.push('business')
  if (text.includes('data') || text.includes('analyt') || text.includes('machine learning'))
    keywords.push('data science', 'ai', 'science')
  if (text.includes('ai') || text.includes('artificial'))
    keywords.push('ai', 'technology', 'computing')
  if (text.includes('doctor') || text.includes('medic') || text.includes('health'))
    keywords.push('medicine', 'health')
  if (text.includes('research') || text.includes('phd'))
    keywords.push('research', 'science')
  if (text.includes('law') || text.includes('legal'))
    keywords.push('law')
  if (text.includes('entrepr') || text.includes('startup'))
    keywords.push('entrepreneurship', 'business')
  if (text.includes('financ') || text.includes('bank') || text.includes('invest'))
    keywords.push('business', 'finance')
  if (text.includes('design') || text.includes('architect'))
    keywords.push('architecture', 'arts')

  if (keywords.length === 0) keywords.push('science', 'engineering')
  return [...new Set(keywords)]
}

function calculateAdmissionProbability(student: StudentProfile, uni: University): number {
  const cgpaRatio = student.cgpa / uni.avgCgpa
  const ieltsRatio = student.ielts / uni.avgIelts

  let probability = 0

  // CGPA weight: 40%
  if (cgpaRatio >= 1.05) probability += 40
  else if (cgpaRatio >= 0.95) probability += 35
  else if (cgpaRatio >= 0.85) probability += 25
  else if (cgpaRatio >= 0.75) probability += 15
  else probability += 5

  // IELTS weight: 25%
  if (ieltsRatio >= 1.05) probability += 25
  else if (ieltsRatio >= 0.95) probability += 22
  else if (ieltsRatio >= 0.85) probability += 15
  else probability += 5

  // Acceptance rate factor: 35%
  if (uni.acceptanceRate >= 60) probability += 35
  else if (uni.acceptanceRate >= 40) probability += 28
  else if (uni.acceptanceRate >= 20) probability += 18
  else if (uni.acceptanceRate >= 10) probability += 10
  else probability += 5

  return Math.min(Math.max(probability, 5), 95)
}

export function analyzeProfile(student: StudentProfile): Recommendation[] {
  const careerKeywords = getCareerKeywords(student.careerGoals)

  const filteredUnis = universities.filter((uni) => {
    if (student.country && student.country !== 'any') {
      return uni.country.toLowerCase() === student.country.toLowerCase()
    }
    return true
  })

  const recommendations = filteredUnis.map((uni) => {
    const admissionProbability = calculateAdmissionProbability(student, uni)

    // Career match
    const matchingPrograms = uni.programs.filter((p) => careerKeywords.includes(p))
    const careerMatch = Math.min((matchingPrograms.length / careerKeywords.length) * 100, 100)

    // Budget feasibility
    const totalCost = uni.tuitionPerYear * 2 + 15000 * 2 // 2 years tuition + living
    const budgetFeasibility = student.budget >= totalCost ? 100 : (student.budget / totalCost) * 100

    // ROI calculation
    const estimatedRoi =
      ((uni.avgSalaryAfterGrad * 5 - totalCost) / totalCost) * 100

    const roiScore = Math.min(
      (uni.employmentRate / 100) * 40 +
        Math.min(estimatedRoi / 10, 30) +
        (budgetFeasibility / 100) * 30,
      100
    )

    // Overall match
    const matchScore =
      admissionProbability * 0.3 +
      careerMatch * 0.25 +
      budgetFeasibility * 0.25 +
      roiScore * 0.2

    return {
      university: uni,
      admissionProbability: Math.round(admissionProbability),
      roiScore: Math.round(roiScore),
      matchScore: Math.round(matchScore),
      estimatedTotalCost: totalCost,
      estimatedRoi: Math.round(estimatedRoi),
    }
  })

  return recommendations.sort((a, b) => b.matchScore - a.matchScore).slice(0, 6)
}
