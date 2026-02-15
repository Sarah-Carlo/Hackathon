'use client'

import { useState, useRef, useCallback } from 'react'
import { GraduationCap, GitCompareArrows } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StudentForm } from '@/components/student-form'
import { UniversityCard } from '@/components/university-card'
import { AdmissionChart } from '@/components/admission-chart'
import { RoiRankingTable } from '@/components/roi-ranking-table'
import { StatsOverview } from '@/components/stats-overview'
import { UniversityDetailModal } from '@/components/university-detail-modal'
import { CompareUniversities } from '@/components/compare-universities'
import { ScholarshipFinder } from '@/components/scholarship-finder'
import { VisaCostSection } from '@/components/visa-cost-section'
import { ExportReport } from '@/components/export-report'
import {
  analyzeProfile,
  findScholarships,
  getCostOfLiving,
  type StudentProfile,
  type Recommendation,
  type Scholarship,
  type CountryCostData,
} from '@/lib/university-data'

type ScholarshipResult = Scholarship & { eligibility: 'eligible' | 'partial' | 'ineligible' }

export default function Page() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [scholarships, setScholarships] = useState<ScholarshipResult[]>([])
  const [costData, setCostData] = useState<CountryCostData[]>([])
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Detail modal state
  const [detailRec, setDetailRec] = useState<Recommendation | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  // Compare state
  const [compareList, setCompareList] = useState<Recommendation[]>([])
  const [compareOpen, setCompareOpen] = useState(false)

  function handleAnalyze(profile: StudentProfile) {
    setIsLoading(true)
    setStudentProfile(profile)

    setTimeout(() => {
      const results = analyzeProfile(profile)
      setRecommendations(results)

      const scholarshipResults = findScholarships(profile, results)
      setScholarships(scholarshipResults)

      const countries = [...new Set(results.map((r) => r.university.country))]
      setCostData(getCostOfLiving(countries))

      setHasAnalyzed(true)
      setIsLoading(false)
      setCompareList([])

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }, 1200)
  }

  const handleViewDetails = useCallback((rec: Recommendation) => {
    setDetailRec(rec)
    setDetailOpen(true)
  }, [])

  const handleToggleCompare = useCallback((rec: Recommendation) => {
    setCompareList((prev) => {
      const exists = prev.find((r) => r.university.name === rec.university.name)
      if (exists) return prev.filter((r) => r.university.name !== rec.university.name)
      if (prev.length >= 3) return prev
      return [...prev, rec]
    })
  }, [])

  const handleRemoveFromCompare = useCallback((name: string) => {
    setCompareList((prev) => prev.filter((r) => r.university.name !== name))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-heading text-lg font-bold leading-tight text-foreground">
                UniMatch
              </h1>
              <p className="hidden text-[10px] text-muted-foreground sm:block">
                Smart University Recommendations
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-1">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              Beta
            </span>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Hero Section */}
        {!hasAnalyzed && (
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              <span className="text-balance">Find Your Perfect University</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-base text-muted-foreground">
              Enter your academic profile and career goals. We will analyze thousands of data
              points to recommend the best universities for you.
            </p>
          </div>
        )}

        {/* Form */}
        <section className="mb-10">
          <StudentForm onAnalyze={handleAnalyze} isLoading={isLoading} />
        </section>

        {/* Results */}
        {hasAnalyzed && recommendations.length > 0 && (
          <div ref={resultsRef} className="flex flex-col gap-8">
            {/* Section Title + Export */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Your Recommendations
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Based on your profile, here are the top university matches.
                </p>
              </div>
              {studentProfile && (
                <ExportReport
                  profile={studentProfile}
                  recommendations={recommendations}
                  scholarships={scholarships}
                  costData={costData}
                />
              )}
            </div>

            {/* Stats Overview */}
            <StatsOverview recommendations={recommendations} />

            {/* University Cards Grid */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Top University Picks
                </h3>
                <p className="text-xs text-muted-foreground">
                  Select up to 3 to compare
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((rec, index) => (
                  <UniversityCard
                    key={rec.university.name}
                    recommendation={rec}
                    rank={index + 1}
                    onViewDetails={handleViewDetails}
                    isSelectedForCompare={compareList.some(
                      (c) => c.university.name === rec.university.name
                    )}
                    onToggleCompare={handleToggleCompare}
                  />
                ))}
              </div>
            </section>

            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AdmissionChart recommendations={recommendations} />
              <RoiRankingTable recommendations={recommendations} />
            </div>

            {/* Scholarship Finder */}
            <ScholarshipFinder scholarships={scholarships} />

            {/* Visa & Cost of Living */}
            <VisaCostSection costData={costData} />
          </div>
        )}

        {/* Empty State */}
        {hasAnalyzed && recommendations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <GraduationCap className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
              No matches found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Try adjusting your country preference to &quot;Any Country&quot; or updating your
              budget to see more results.
            </p>
          </div>
        )}
      </main>

      {/* Floating Compare Button */}
      {compareList.length >= 2 && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <Button
            onClick={() => setCompareOpen(true)}
            className="gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105"
          >
            <GitCompareArrows className="h-4 w-4" />
            Compare ({compareList.length})
          </Button>
        </div>
      )}

      {/* Detail Modal */}
      <UniversityDetailModal
        recommendation={detailRec}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      {/* Compare Dialog */}
      <CompareUniversities
        recommendations={compareList}
        open={compareOpen}
        onOpenChange={setCompareOpen}
        onRemove={handleRemoveFromCompare}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-border/60 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-muted-foreground lg:px-8">
          <p>
            UniMatch provides estimates based on publicly available data.
            Always verify with official university sources.
          </p>
        </div>
      </footer>
    </div>
  )
}
