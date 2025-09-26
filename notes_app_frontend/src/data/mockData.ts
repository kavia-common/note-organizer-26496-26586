import { Category, Note } from '../types';

export const mockCategories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'work', name: 'Work', color: '#2563EB' },
  { id: 'personal', name: 'Personal', color: '#10B981' },
  { id: 'ideas', name: 'Ideas', color: '#F59E0B' },
  { id: 'study', name: 'Study', color: '#8B5CF6' },
];

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Project kickoff notes',
    content:
      'Agenda:\n- Introductions\n- Goals & KPIs\n- Timeline\n- Risks & dependencies\n\nAction items assigned to team leads.',
    categoryId: 'work',
    pinned: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    updatedAt: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: '2',
    title: 'Grocery list',
    content: 'Milk, Eggs, Bread, Avocados, Coffee beans, Oats, Yogurt',
    categoryId: 'personal',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    updatedAt: Date.now() - 1000 * 60 * 60 * 6,
  },
  {
    id: '3',
    title: 'App ideas',
    content:
      '– Habit tracker with gamification\n– Minimalist journaling app\n– Local farmer’s market navigator',
    categoryId: 'ideas',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
    updatedAt: Date.now() - 1000 * 60 * 60 * 1,
  },
  {
    id: '4',
    title: 'Study plan - React Native',
    content:
      'Topics:\n- Navigation\n- Hooks\n- Performance\n- Testing\nResources: official docs + curated articles.',
    categoryId: 'study',
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
    updatedAt: Date.now() - 1000 * 60 * 30,
  },
];
