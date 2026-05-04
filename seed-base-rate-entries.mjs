/**
 * seed-base-rate-entries.mjs
 * Creates Nepali FY 2083 BS months (Baisakh–Chaitra) with placeholder rates.
 * Admin must edit real percentages in Sanity Studio.
 *
 * Run: $env:SANITY_TOKEN = "YOUR_TOKEN_HERE"
 *      node seed-base-rate-entries.mjs
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'v41axjo7',
  dataset: 'production',
  apiVersion: '2026-03-08',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const MONTHS = [
  'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra',
];

const YEAR = 2083;

async function run() {
  if (!process.env.SANITY_TOKEN) {
    console.error('SANITY_TOKEN is not set.');
    process.exit(1);
  }

  const existing = await client.fetch(
    '*[_type == "baseRateEntry" && nepaliYear == $y]{ nepaliMonth }',
    { y: YEAR },
  );
  const have = new Set(existing.map((d) => d.nepaliMonth));

  let created = 0;
  for (const month of MONTHS) {
    if (have.has(month)) {
      console.log(`SKIP ${YEAR} ${month}`);
      continue;
    }
    await client.create({
      _type: 'baseRateEntry',
      nepaliYear: YEAR,
      nepaliMonth: month,
      monthlyBaseRate: '— (edit in Studio)',
    });
    console.log(`CREATE ${YEAR} ${month}`);
    created++;
  }
  console.log(`Done. Created ${created}.`);
}

run().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
