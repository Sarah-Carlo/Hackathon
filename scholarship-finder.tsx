'use client'

import { Award, CheckCircle2, AlertCircle, XCircle, Calendar, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Scholarship } from '@/lib/university-data'

type ScholarshipWithEligibility = Scholarship & {
  eligibility: 'eligible' | 'partial' | 'ineligible'
}

interface ScholarshipFinderProps {
  scholarships: ScholarshipWithEligibility[]
}

const typeColors: Record<string, string> = {
  Merit: 'bg-primary/10 text-primary border-primary/20',
  'Need-based': 'bg-accent/10 text-accent border-accent/20',
  'Country-specific': 'bg-chart-3/10 text-chart-3 border-chart-3/20',
  Research: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
}

const eligibilityConfig = {
  eligible: {
    label: 'You Qualify',
    icon: CheckCircle2,
    className: 'bg-accent/10 text-accent border-accent/20',
  },
  partial: {
    label: 'Partial Match',
    icon: AlertCircle,
    className: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
  },
  ineligible: {
    label: 'Not Eligible',
    icon: XCircle,
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
}

export function ScholarshipFinder({ scholarships }: ScholarshipFinderProps) {
  if (scholarships.length === 0) return null

  const eligibleCount = scholarships.filter((s) => s.eligibility === 'eligible').length
  const totalAmount = scholarships
    .filter((s) => s.eligibility === 'eligible')
    .reduce((sum, s) => sum + s.amount, 0)

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Scholarship Opportunities
          </h3>
          <p className="text-sm text-muted-foreground">
            {eligibleCount} scholarship{eligibleCount !== 1 ? 's' : ''} you qualify for
            {totalAmount > 0 && (
              <span className="font-medium text-accent">
                {' '}-- up to ${totalAmount.toLocaleString()} available
              </span>
            )}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Award className="h-5 w-5 text-primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((scholarship) => {
          const config = eligibilityConfig[scholarship.eligibility]
          const EligIcon = config.icon

          return (
            <Card
              key={scholarship.name}
              className={`border-border/60 shadow-sm transition-all hover:shadow-md ${
                scholarship.eligibility === 'eligible' ? 'hover:border-accent/30' : ''
              }`}
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm font-semibold leading-tight text-foreground">
                    {scholarship.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={`shrink-0 text-[10px] ${config.className}`}
                  >
                    <EligIcon className="mr-1 h-3 w-3" />
                    {config.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 p-4 pt-0">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {scholarship.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${typeColors[scholarship.type] || ''}`}
                  >
                    {scholarship.type}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    {scholarship.country}
                  </Badge>
                </div>

                <div className="flex flex-col gap-1.5 rounded-md bg-muted/50 p-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      Amount
                    </span>
                    <span className="font-semibold text-foreground">
                      {scholarship.amountLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Deadline
                    </span>
                    <span className="font-semibold text-foreground">
                      {scholarship.deadline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>
                    Min CGPA: <span className="font-medium text-foreground">{scholarship.minCgpa}</span>
                  </span>
                  <span>
                    Min IELTS: <span className="font-medium text-foreground">{scholarship.minIelts}</span>
                  </span>
                  <span>
                    By: <span className="font-medium text-foreground">{scholarship.provider}</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
