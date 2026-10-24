import type { Register, SessionCost, SessionContextUsage, SessionRateLimit } from 'claude-code'

const LABELS: Record<string, string> = {
  five_hour: '5時間',
  seven_day: '週',
  spend_limit: '上限',
}

type Figures = {
  context: SessionContextUsage
  rateLimits: SessionRateLimit[]
  cost?: SessionCost
}

function resetIn(resetsAt: string | undefined, now: number): string {
  if (resetsAt === undefined) return ''
  const minutes = Math.max(0, Math.round((Date.parse(resetsAt) - now) / 60000))
  if (minutes >= 1440) return `(あと${Math.round(minutes / 1440)}日)`
  if (minutes >= 60) return `(あと${Math.floor(minutes / 60)}h${minutes % 60}m)`
  return `(あと${minutes}m)`
}

function format(u: Figures, now: number): string | undefined {
  const parts = u.rateLimits.map(
    r => `${LABELS[r.kind] ?? r.kind} ${r.percentUsed}%${resetIn(r.resetsAt, now)}`,
  )
  if (u.cost !== undefined) parts.push(`$${u.cost.usd.toFixed(2)}`)
  if (u.context.percent !== undefined) parts.push(`ctx ${u.context.percent}%`)

  return parts.length === 0 ? undefined : `使用量: ${parts.join(' · ')}`
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const started = await next(e)
    $.ui.status(format(await $.session.usage(), await $.clock.now()))

    return started
  })

  on('session.measure', async ($, e, next) => {
    $.ui.status(format(e, await $.clock.now()))

    return next(e)
  })
}
