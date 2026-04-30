/**
 * Utility for grouping person records into hierarchical role tiers
 * so they render in separate rows (Chairman → Directors → Secretary etc.)
 */

export interface PersonRecord {
  id: string;
  name: string;
  position: string;
  email?: string;
  phone?: string;
  image?: string;
  order?: number;
  [key: string]: any;
}

export interface RoleGroup {
  label: string;
  members: PersonRecord[];
}

/** Priority tiers — lower index = higher in the visual hierarchy.
 *
 *  `excludeKeywords`: if the position contains any of these words the tier
 *  is skipped entirely. This prevents "Deputy Chief Executive Officer" from
 *  matching the CEO tier before the Deputy CEO tier gets a chance.
 */
interface RoleTierDef {
  label: string;
  keywords: string[];
  excludeKeywords?: string[];
}

const ROLE_TIERS: RoleTierDef[] = [
  { label: 'Chairman',                keywords: ['chairman', 'chairperson', 'अध्यक्ष'] },
  { label: 'Vice Chairman',           keywords: ['vice chair', 'vice-chair', 'उपाध्यक्ष'] },
  {
    label: 'Chief Executive Officer',
    keywords: ['chief executive officer', 'chief executive', 'ceo', 'प्रमुख कार्यकारी अधिकृत', 'प्रमुख कार्यकारी'],
    excludeKeywords: ['deputy', 'उप'],
  },
  { label: 'Deputy CEO',              keywords: ['deputy ceo', 'dceo', 'deputy chief', 'उप-प्रमुख'] },
  { label: 'Directors',               keywords: ['director', 'सञ्चालक', 'निर्देशक'] },
  { label: 'Secretary',               keywords: ['secretary', 'सचिव'] },
  { label: 'Committee Members',       keywords: ['committee', 'समिति'] },
  { label: 'Members',                 keywords: ['member', 'सदस्य'] },
  { label: 'Officers',                keywords: ['officer', 'अधिकृत', 'अधिकारी'] },
  { label: 'Staff',                   keywords: ['staff', 'कर्मचारी'] },
];

/** Match keyword as whole word for single-token keywords (prevents 'ceo' ⊂ 'dceo'). */
function kwMatches(lower: string, kw: string): boolean {
  if (kw.includes(' ') || kw.includes('-')) return lower.includes(kw);
  return new RegExp(`(^|[^a-z])${kw}([^a-z]|$)`).test(lower);
}

function tierMatches(lower: string, tier: RoleTierDef): boolean {
  if (tier.excludeKeywords?.some(ek => lower.includes(ek))) return false;
  return tier.keywords.some(kw => kwMatches(lower, kw));
}

function getTierIndex(position: string): number {
  const lower = (position || '').toLowerCase();
  const idx = ROLE_TIERS.findIndex(tier => tierMatches(lower, tier));
  return idx === -1 ? ROLE_TIERS.length : idx;
}

function getTierLabel(position: string): string {
  const lower = (position || '').toLowerCase();
  const tier = ROLE_TIERS.find(t => tierMatches(lower, t));
  return tier ? tier.label : 'Team Members';
}

/**
 * Groups an array of person records into role-based tiers.
 * Within each tier, members are sorted by their `order` field.
 * Returns only non-empty groups, in hierarchical order.
 */
export function groupByRoleHierarchy(members: PersonRecord[]): RoleGroup[] {
  const sorted = [...members].sort((a, b) => {
    const tierDiff = getTierIndex(a.position) - getTierIndex(b.position);
    if (tierDiff !== 0) return tierDiff;
    return (a.order ?? 0) - (b.order ?? 0);
  });

  const groups: Map<string, RoleGroup> = new Map();

  for (const member of sorted) {
    const label = getTierLabel(member.position);
    if (!groups.has(label)) {
      groups.set(label, { label, members: [] });
    }
    groups.get(label)!.members.push(member);
  }

  return Array.from(groups.values());
}
