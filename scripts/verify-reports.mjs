import { createClient } from '@sanity/client'
const client = createClient({
  projectId: 'v41axjo7', dataset: 'production', apiVersion: '2026-04-26',
  token: 'skOPvrY3YnsXXDhkGZzTqTO87uShwaomkoezxFC0hkDK3kKGqFvZm5u8vb2Og6xSTrWDPlhisw7euN2oKOJsjjFjacBX2GAJCHnOeOBOSC0OKMWwPTlRXxosd6nUS0CdUxbOufXB7WEZDUzzlhnehM1QYDgxHtni1PgMiHiryk4BWihAHlxE',
  useCdn: false
})
const counts = await client.fetch(`{
  "total": count(*[_type == "report"]),
  "quarterly": count(*[_type == "report" && reportType == "quarterly"]),
  "governance": count(*[_type == "report" && reportType == "governance"]),
  "staffTraining": count(*[_type == "report" && reportType == "staff-training"]),
  "baseRate": count(*[_type == "report" && reportType == "base-rate"]),
  "topFive": *[_type == "report"] | order(publishDate desc)[0..4]{ title, publishDate }
}`)
console.log("Total reports:", counts.total)
console.log("Quarterly:", counts.quarterly)
console.log("Governance:", counts.governance)
console.log("Staff Training:", counts.staffTraining)
console.log("Base Rate:", counts.baseRate)
console.log("\nTop 5 newest (will show first on site):")
counts.topFive.forEach(r => console.log(" ", r.publishDate, "—", r.title))
