const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
const fullDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

/** '2023-01' → 'Jan 2023'; null → 'Present' */
export function formatYearMonth(value: string | null): string {
  if (!value) return 'Present'
  const [y, m] = value.split('-').map(Number)
  return monthYear.format(new Date(Date.UTC(y!, m! - 1, 1)))
}

/** '2021-11-29' → 'November 29, 2021' */
export function formatDate(value: string): string {
  return fullDate.format(new Date(`${value}T00:00:00Z`))
}
