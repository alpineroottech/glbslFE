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

/** Priority tiers — lower index = higher in hierarchy */
const ROLE_TIERS: { label: string; keywords: string[] }[] = [
  { label: 'Chairman', keywords: ['chairman', 'chairperson', 'अध्यक्ष'] },
  { label: 'Vice Chairman', keywords: ['vice chair', 'vice-chair', 'उपाध्यक्ष'] },
  { label: 'Chief Executive Officer', keywords: ['chief executive', 'ceo', 'प्रमुख कार्यकारी'] },
  { label: 'Directors', keywords: ['director', 'सञ्चालक', 'निर्देशक'] },
  { label: 'Secretary', keywords: ['secretary', 'सचिव'] },
  { label: 'Committee Members', keywords: ['committee', 'समिति'] },
  { label: 'Members', keywords: ['member', 'सदस्य'] },
  { label: 'Officers', keywords: ['officer', 'अधिकृत', 'अधिकारी'] },
  { label: 'Staff', keywords: ['staff', 'कर्मचारी'] },
];

function getTierIndex(position: string): number {
  const lower = (position || '').toLowerCase();
  const idx = ROLE_TIERS.findIndex(tier =>
    tier.keywords.some(kw => lower.includes(kw))
  );
  return idx === -1 ? ROLE_TIERS.length : idx;
}

function getTierLabel(position: string): string {
  const lower = (position || '').toLowerCase();
  const tier = ROLE_TIERS.find(t => t.keywords.some(kw => lower.includes(kw)));
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
