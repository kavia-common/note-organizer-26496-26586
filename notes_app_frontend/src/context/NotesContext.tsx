import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { mockCategories, mockNotes } from '../data/mockData';
import { Category, Note } from '../types';

type NotesContextType = {
  notes: Note[];
  categories: Category[];
  activeCategoryId: string;
  searchQuery: string;
  filteredNotes: Note[];
  // PUBLIC_INTERFACE
  setActiveCategory: (categoryId: string) => void;
  // PUBLIC_INTERFACE
  setSearchQuery: (q: string) => void;
  // PUBLIC_INTERFACE
  addNote: (partial?: Partial<Note>) => Note;
  // PUBLIC_INTERFACE
  updateNote: (id: string, updates: Partial<Note>) => void;
  // PUBLIC_INTERFACE
  deleteNote: (id: string) => void;
  // PUBLIC_INTERFACE
  getNote: (id: string) => Note | undefined;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(() => mockNotes);
  const [categories] = useState<Category[]>(() => mockCategories);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const setActiveCategory = useCallback((categoryId: string) => {
    setActiveCategoryId(categoryId);
  }, []);

  const addNote = useCallback((partial?: Partial<Note>): Note => {
    const now = Date.now();
    const id = Math.random().toString(36).slice(2);
    const newNote: Note = {
      id,
      title: partial?.title ?? '',
      content: partial?.content ?? '',
      categoryId: partial?.categoryId ?? (activeCategoryId !== 'all' ? activeCategoryId : undefined),
      createdAt: now,
      updatedAt: now,
      pinned: !!partial?.pinned,
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, [activeCategoryId]);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n)),
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const getNote = useCallback(
    (id: string) => notes.find((n) => n.id === id),
    [notes],
  );

  const filteredNotes = useMemo(() => {
    let list = notes;

    if (activeCategoryId !== 'all') {
      list = list.filter((n) => n.categoryId === activeCategoryId);
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q),
      );
    }

    // Pinned notes first, then by updatedAt desc
    return [...list].sort((a, b) => {
      const pinDiff = Number(!!b.pinned) - Number(!!a.pinned);
      if (pinDiff !== 0) return pinDiff;
      return b.updatedAt - a.updatedAt;
    });
  }, [notes, activeCategoryId, searchQuery]);

  const value: NotesContextType = {
    notes,
    categories,
    activeCategoryId,
    searchQuery,
    filteredNotes,
    setActiveCategory,
    setSearchQuery,
    addNote,
    updateNote,
    deleteNote,
    getNote,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

export const useNotes = (): NotesContextType => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
};
