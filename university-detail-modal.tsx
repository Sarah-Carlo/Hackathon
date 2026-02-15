'use client'

import {
  MapPin,
  Trophy,
  TrendingUp,
  Calendar,
  FileText,
  Sparkles,
  GraduationCap,
  Briefcase,
  DollarSign,
  CheckCircle2,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import type { Recommendation } from '@/lib/university-data'

interface UniversityDetailModalProps {
  recommendation: Recommendation | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function StatBlock({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold text-foreground">{value}</span>
      </div>
    </div>
  )
}

export function UniversityDetailModal({
  recommendation,
  open,
  onOpenChange,
}: UniversityDetailModalProps) {
  if (!recommendation) return null

  const { university, admissionProbability, roiScore, matchScore, estimatedTotalCost, estimatedRoi } =
    recommendation

  const livingCostEstimate = estimatedTotalCost - university.tuitionPerYear * 2

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
              {university.logoInitials}
            </div>
            <div>
              <DialogTitle className="font-heading text-lg leading-tight">
                {university.name}
              </DialogTitle>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {university.country}
                <span className="text-border">|</span>
                <Trophy className="h-3 w-3" />
                {'#'}{university.ranking} World Ranking
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Score Summary */}
        <div className="mt-2 grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center rounded-lg border border-border/60 p-3">
            <span className="text-2xl font-bold text-primary">{admissionProbability}%</span>
            <span className="text-[10px] text-muted-foreground">Admission</span>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-border/60 p-3">
            <span className="text-2xl font-bold text-accent">{roiScore}%</span>
            <span className="text-[10px] text-muted-foreground">ROI Score</span>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-border/60 p-3">
            <span className="text-2xl font-bold text-chart-3">{matchScore}%</span>
            <span className="text-[10px] text-muted-foreground">Match</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="programs" className="text-xs">Programs</TabsTrigger>
            <TabsTrigger value="requirements" className="text-xs">Requirements</TabsTrigger>
            <TabsTrigger value="costs" className="text-xs">Costs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4 flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {university.description}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <StatBlock label="Acceptance Rate" value={`${university.acceptanceRate}%`} icon={GraduationCap} />
              <StatBlock label="Employment Rate" value={`${university.employmentRate}%`} icon={Briefcase} />
              <StatBlock label="Avg. Salary After Grad" value={`$${university.avgSalaryAfterGrad.toLocaleString()}`} icon={DollarSign} />
              <StatBlock label="5-Year ROI" value={`${estimatedRoi}%`} icon={TrendingUp} />
            </div>
            <Separator />
            <div>
              <h4 className="mb-2 text-sm font-semibold text-foreground">Campus Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {university.campusHighlights.map((h) => (
                  <Badge key={h} variant="secondary" className="text-xs">
                    <Sparkles className="mr-1 h-3 w-3" />
                    {h}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Programs Tab */}
          <TabsContent value="programs" className="mt-4 flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Available program areas at {university.name}:
            </p>
            <div className="flex flex-wrap gap-2">
              {university.programs.map((p) => (
                <Badge key={p} variant="outline" className="capitalize">
                  {p}
                </Badge>
              ))}
            </div>
            <Separator />
            <div>
              <h4 className="mb-2 text-sm font-semibold text-foreground">Career Alignment</h4>
              <div className="flex items-center gap-3">
                <Progress value={matchScore} className="h-2 flex-1" />
                <span className="text-sm font-semibold text-foreground">{matchScore}%</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Based on how well this university&apos;s programs match your stated career goals.
              </p>
            </div>
          </TabsContent>

          {/* Requirements Tab */}
          <TabsContent value="requirements" className="mt-4 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <StatBlock label="Min. CGPA" value={`${university.minCgpa} / 4.0`} icon={GraduationCap} />
              <StatBlock label="Min. IELTS" value={`${university.minIelts} / 9.0`} icon={FileText} />
              <StatBlock label="Application Deadline" value={university.applicationDeadline} icon={Calendar} />
              <StatBlock label="Acceptance Rate" value={`${university.acceptanceRate}%`} icon={TrendingUp} />
            </div>
            <Separator />
            <div>
              <h4 className="mb-2 text-sm font-semibold text-foreground">Required Documents</h4>
              <ul className="flex flex-col gap-2">
                {university.documentsRequired.map((doc) => (
                  <li key={doc} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* Costs Tab */}
          <TabsContent value="costs" className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-3 rounded-lg border border-border/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tuition per Year</span>
                <span className="font-semibold text-foreground">${university.tuitionPerYear.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tuition (2 Years)</span>
                <span className="font-semibold text-foreground">
                  ${(university.tuitionPerYear * 2).toLocaleString()}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Est. Living Costs (2 Years)</span>
                <span className="font-semibold text-foreground">${livingCostEstimate.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">Total Estimated Cost</span>
                <span className="text-lg font-bold text-primary">${estimatedTotalCost.toLocaleString()}</span>
              </div>
            </div>
            <div className="rounded-lg bg-accent/10 p-3">
              <p className="text-xs leading-relaxed text-accent">
                With a projected 5-year ROI of {estimatedRoi}%, your investment could yield an estimated
                ${Math.round(estimatedTotalCost * (estimatedRoi / 100)).toLocaleString()} in net returns
                over 5 years post-graduation.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
