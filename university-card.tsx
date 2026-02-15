'use client'

import { MapPin, Trophy, TrendingUp, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import type { Recommendation } from '@/lib/university-data'

interface UniversityCardProps {
  recommendation: Recommendation
  rank: number
  onViewDetails?: (recommendation: Recommendation) => void
  isSelectedForCompare?: boolean
  onToggleCompare?: (recommendation: Recommendation) => void
}

function ProbabilityRing({ value }: { value: number }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  let colorClass = 'text-destructive'
  if (value >= 70) colorClass = 'text-accent'
  else if (value >= 40) colorClass = 'text-chart-3'

  return (
    <div className="relative flex h-[72px] w-[72px] items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="5"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`transition-all duration-1000 ease-out ${colorClass}`}
        />
      </svg>
      <span className="absolute text-sm font-semibold text-foreground">
        {value}%
      </span>
    </div>
  )
}

export function UniversityCard({
  recommendation,
  rank,
  onViewDetails,
  isSelectedForCompare,
  onToggleCompare,
}: UniversityCardProps) {
  const { university, admissionProbability, roiScore, matchScore, estimatedTotalCost, estimatedRoi } =
    recommendation

  const rankColors: Record<number, string> = {
    1: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
    2: 'bg-muted text-muted-foreground border-border',
    3: 'bg-chart-3/5 text-chart-3 border-chart-3/10',
  }

  return (
    <Card className="group relative border-border/60 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
      {/* Compare Checkbox */}
      {onToggleCompare && (
        <div className="absolute right-3 top-3 z-10">
          <Checkbox
            checked={isSelectedForCompare}
            onCheckedChange={() => onToggleCompare(recommendation)}
            aria-label={`Select ${university.name} for comparison`}
            className="h-4 w-4 border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
        </div>
      )}
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {university.logoInitials}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-base font-semibold leading-tight text-foreground">
                  {university.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {university.country}
                  <span className="text-border">|</span>
                  <Trophy className="h-3 w-3" />
                  {'#'}{university.ranking} World
                </div>
              </div>
            </div>
            {rank <= 3 && (
              <Badge
                variant="outline"
                className={`shrink-0 text-[10px] font-semibold ${rankColors[rank] || ''}`}
              >
                {'#'}{rank} Pick
              </Badge>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1">
              <ProbabilityRing value={admissionProbability} />
              <span className="text-[10px] font-medium text-muted-foreground">
                Admission
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ProbabilityRing value={roiScore} />
              <span className="text-[10px] font-medium text-muted-foreground">
                ROI Score
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ProbabilityRing value={matchScore} />
              <span className="text-[10px] font-medium text-muted-foreground">
                Match
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2 rounded-lg bg-muted/50 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Tuition/Year</span>
              <span className="font-semibold text-foreground">
                ${university.tuitionPerYear.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Est. Total Cost</span>
              <span className="font-semibold text-foreground">
                ${estimatedTotalCost.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Employment Rate</span>
              <span className="font-semibold text-foreground">
                {university.employmentRate}%
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Est. ROI (5yr)</span>
              <span className="flex items-center gap-1 font-semibold text-accent">
                <TrendingUp className="h-3 w-3" />
                {estimatedRoi}%
              </span>
            </div>
          </div>

          {/* View Details */}
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(recommendation)}
              className="flex w-full items-center justify-center gap-1.5 rounded-md bg-primary/5 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
            >
              <Eye className="h-3.5 w-3.5" />
              View Details
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
