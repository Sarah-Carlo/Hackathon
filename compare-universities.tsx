'use client'

import { X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Recommendation } from '@/lib/university-data'

interface CompareUniversitiesProps {
  recommendations: Recommendation[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onRemove: (name: string) => void
}

interface MetricRow {
  label: string
  getValue: (r: Recommendation) => string | number
  getNumeric: (r: Recommendation) => number
  higherIsBetter: boolean
  format?: 'currency' | 'percent' | 'number' | 'text'
}

const metrics: MetricRow[] = [
  {
    label: 'World Ranking',
    getValue: (r) => `#${r.university.ranking}`,
    getNumeric: (r) => r.university.ranking,
    higherIsBetter: false,
    format: 'text',
  },
  {
    label: 'Admission Probability',
    getValue: (r) => `${r.admissionProbability}%`,
    getNumeric: (r) => r.admissionProbability,
    higherIsBetter: true,
    format: 'percent',
  },
  {
    label: 'Match Score',
    getValue: (r) => `${r.matchScore}%`,
    getNumeric: (r) => r.matchScore,
    higherIsBetter: true,
    format: 'percent',
  },
  {
    label: 'ROI Score',
    getValue: (r) => `${r.roiScore}%`,
    getNumeric: (r) => r.roiScore,
    higherIsBetter: true,
    format: 'percent',
  },
  {
    label: 'Tuition / Year',
    getValue: (r) => `$${r.university.tuitionPerYear.toLocaleString()}`,
    getNumeric: (r) => r.university.tuitionPerYear,
    higherIsBetter: false,
    format: 'currency',
  },
  {
    label: 'Est. Total Cost',
    getValue: (r) => `$${r.estimatedTotalCost.toLocaleString()}`,
    getNumeric: (r) => r.estimatedTotalCost,
    higherIsBetter: false,
    format: 'currency',
  },
  {
    label: '5-Year ROI',
    getValue: (r) => `${r.estimatedRoi}%`,
    getNumeric: (r) => r.estimatedRoi,
    higherIsBetter: true,
    format: 'percent',
  },
  {
    label: 'Employment Rate',
    getValue: (r) => `${r.university.employmentRate}%`,
    getNumeric: (r) => r.university.employmentRate,
    higherIsBetter: true,
    format: 'percent',
  },
  {
    label: 'Avg. Salary',
    getValue: (r) => `$${r.university.avgSalaryAfterGrad.toLocaleString()}`,
    getNumeric: (r) => r.university.avgSalaryAfterGrad,
    higherIsBetter: true,
    format: 'currency',
  },
  {
    label: 'Acceptance Rate',
    getValue: (r) => `${r.university.acceptanceRate}%`,
    getNumeric: (r) => r.university.acceptanceRate,
    higherIsBetter: true,
    format: 'percent',
  },
]

function getBestIndex(recs: Recommendation[], metric: MetricRow): number {
  if (recs.length === 0) return -1
  let bestIdx = 0
  for (let i = 1; i < recs.length; i++) {
    const current = metric.getNumeric(recs[i])
    const best = metric.getNumeric(recs[bestIdx])
    if (metric.higherIsBetter ? current > best : current < best) {
      bestIdx = i
    }
  }
  return bestIdx
}

export function CompareUniversities({
  recommendations,
  open,
  onOpenChange,
  onRemove,
}: CompareUniversitiesProps) {
  const cols = recommendations.length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-heading">Compare Universities</DialogTitle>
        </DialogHeader>

        {recommendations.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No universities selected for comparison.
          </p>
        ) : (
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse">
              {/* University Headers */}
              <thead>
                <tr>
                  <th className="w-36 p-2 text-left text-xs font-medium text-muted-foreground" />
                  {recommendations.map((rec) => (
                    <th key={rec.university.name} className="p-2 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                          {rec.university.logoInitials}
                        </div>
                        <span className="text-xs font-semibold text-foreground leading-tight">
                          {rec.university.name}
                        </span>
                        <Badge variant="secondary" className="text-[10px]">
                          {rec.university.country}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => onRemove(rec.university.name)}
                          aria-label={`Remove ${rec.university.name} from comparison`}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric) => {
                  const bestIdx = getBestIndex(recommendations, metric)
                  return (
                    <tr key={metric.label} className="border-t border-border/40">
                      <td className="p-3 text-xs font-medium text-muted-foreground">
                        {metric.label}
                      </td>
                      {recommendations.map((rec, i) => (
                        <td
                          key={rec.university.name}
                          className={`p-3 text-center text-sm font-semibold ${
                            i === bestIdx && cols > 1
                              ? 'text-accent'
                              : 'text-foreground'
                          }`}
                        >
                          <span className="flex items-center justify-center gap-1">
                            {metric.getValue(rec)}
                            {i === bestIdx && cols > 1 && (
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                            )}
                          </span>
                        </td>
                      ))}
                    </tr>
                  )
                })}

                {/* Programs Row */}
                <tr className="border-t border-border/40">
                  <td className="p-3 text-xs font-medium text-muted-foreground">Programs</td>
                  {recommendations.map((rec) => (
                    <td key={rec.university.name} className="p-3 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {rec.university.programs.slice(0, 4).map((p) => (
                          <Badge key={p} variant="outline" className="text-[10px] capitalize">
                            {p}
                          </Badge>
                        ))}
                        {rec.university.programs.length > 4 && (
                          <Badge variant="outline" className="text-[10px]">
                            +{rec.university.programs.length - 4}
                          </Badge>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          Green dot indicates best value per metric.
        </p>
      </DialogContent>
    </Dialog>
  )
}
