import type { ComponentType } from 'react';
import {
  ColorsPage,
  FontsPage,
  LayoutPage,
  OverviewPage,
} from './foundations';

export type PreviewEntry = {
  // Globally unique across every group — it is the deep-link slug (`#page=<id>`)
  // and the active-page key.
  id: string;
  name: string;
  description: string;
  Page: ComponentType;
};

export type NavGroup = {
  name: string;
  entries: PreviewEntry[];
};

export const DESIGN_SYSTEM = {
  title: 'Design System',
  description:
    'A reusable system of foundations, components, and patterns for product surfaces.',
} as const;

export const OVERVIEW_ENTRY: PreviewEntry = {
  id: 'overview',
  name: 'Overview',
  description: 'The visual foundations and principles that shape this system.',
  Page: OverviewPage,
};

export const NAV_GROUPS: NavGroup[] = [
  {
    name: 'Colors',
    entries: [
      {
        id: 'color-roles',
        name: 'Color roles',
        description: 'Brand, semantic, text, background, and border colors.',
        Page: ColorsPage,
      },
    ],
  },
  {
    name: 'Fonts',
    entries: [
      {
        id: 'type-scale',
        name: 'Type scale',
        description: 'Font families, headings, body text, labels, and captions.',
        Page: FontsPage,
      },
    ],
  },
  {
    name: 'Layout',
    entries: [
      {
        id: 'spacing-radius',
        name: 'Spacing and radius',
        description: 'The spacing rhythm and corner treatments used by the system.',
        Page: LayoutPage,
      },
    ],
  },
];

export const ALL_ENTRIES: PreviewEntry[] = [
  OVERVIEW_ENTRY,
  ...NAV_GROUPS.flatMap((group) => group.entries),
];

const duplicateIds = ALL_ENTRIES.map((entry) => entry.id).filter(
  (id, index, ids) => ids.indexOf(id) !== index,
);
if (duplicateIds.length > 0) {
  throw new Error(
    `Duplicate preview page id(s): ${[...new Set(duplicateIds)].join(
      ', ',
    )}. Every page id must be unique across all nav groups.`,
  );
}