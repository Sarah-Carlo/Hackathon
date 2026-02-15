'use client'

import { Plane, Clock, Briefcase, FileCheck, Home, Utensils, Bus, HeartPulse } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { CountryCostData } from '@/lib/university-data'

interface VisaCostSectionProps {
  costData: CountryCostData[]
}

const countryFlags: Record<string, string> = {
  US: 'US',
  CA: 'CA',
  GB: 'GB',
  AU: 'AU',
  DE: 'DE',
  SG: 'SG',
  NL: 'NL',
}

function ExpenseBar({ label, amount, total, icon: Icon }: {
  label: string
  amount: number
  total: number
  icon: React.ComponentType<{ className?: string }>
}) {
  const pct = Math.round((amount / total) * 100)
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
        <Icon className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-semibold text-foreground">${amount.toLocaleString()}/mo</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary/60 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function VisaCostSection({ costData }: VisaCostSectionProps) {
  if (costData.length === 0) return null

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Visa & Cost of Living
          </h3>
          <p className="text-sm text-muted-foreground">
            Monthly expenses and visa info for countries in your results
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Plane className="h-5 w-5 text-primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {costData.map((data) => {
          const expenseTotal = data.avgRent + data.avgFood + data.avgTransport + data.healthInsurance

          return (
            <Card key={data.country} className="border-border/60 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" role="img" aria-label={data.country}>
                      {countryFlags[data.flagEmoji] || data.flagEmoji}
                    </span>
                    <CardTitle className="text-base font-semibold text-foreground">
                      {data.country}
                    </CardTitle>
                  </div>
                  <span className="text-lg font-bold text-primary">
                    ${data.totalMonthlyLiving.toLocaleString()}
                    <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 p-4 pt-2">
                {/* Expense breakdown */}
                <div className="flex flex-col gap-2.5">
                  <ExpenseBar label="Rent" amount={data.avgRent} total={expenseTotal} icon={Home} />
                  <ExpenseBar label="Food" amount={data.avgFood} total={expenseTotal} icon={Utensils} />
                  <ExpenseBar label="Transport" amount={data.avgTransport} total={expenseTotal} icon={Bus} />
                  <ExpenseBar label="Insurance" amount={data.healthInsurance} total={expenseTotal} icon={HeartPulse} />
                </div>

                <Separator />

                {/* Visa info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <FileCheck className="h-3 w-3" />
                      Visa Fee
                    </span>
                    <span className="font-semibold text-foreground">${data.visaFee}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Processing
                    </span>
                    <span className="font-semibold text-foreground">{data.visaProcessingWeeks} weeks</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Briefcase className="h-3 w-3" />
                      Work Hours
                    </span>
                    <span className="font-semibold text-foreground">{data.workPermitHours} hrs/week</span>
                  </div>
                </div>

                {/* Post-study visa */}
                <div className="rounded-md bg-accent/10 p-2.5">
                  <p className="text-[10px] font-medium text-accent">
                    Post-Study Work: {data.postStudyWorkVisa}
                  </p>
                </div>

                {/* 2-year estimate */}
                <div className="flex items-center justify-between rounded-md bg-muted/50 p-2.5">
                  <span className="text-xs text-muted-foreground">2-Year Living Estimate</span>
                  <span className="text-sm font-bold text-foreground">
                    ${(data.totalMonthlyLiving * 24).toLocaleString()}
                  </span>
                </div>

                <p className="text-[10px] text-muted-foreground">{data.currencyNote}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
