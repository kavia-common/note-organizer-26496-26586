import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Colors, Elevation, Radius, Spacing, Typography } from '../theme/colors';
import { useNotes } from '../context/NotesContext';

type Props = {
  onClose?: () => void;
};

export const CategoryDrawer: React.FC<Props> = ({ onClose }) => {
  const { categories, activeCategoryId, setActiveCategory, notes } = useNotes();

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const n of notes) {
      const key = n.categoryId ?? 'uncategorized';
      map.set(key, (map.get(key) || 0) + 1);
    }
    const all = notes.length;
    map.set('all', all);
    return map;
  }, [notes]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {categories.map((c) => {
          const selected = c.id === activeCategoryId;
          const count = counts.get(c.id) ?? (c.id === 'all' ? counts.get('all') || 0 : 0);
          return (
            <Pressable
              key={c.id}
              onPress={() => {
                setActiveCategory(c.id);
                onClose?.();
              }}
              style={({ pressed }) => [
                styles.item,
                selected && styles.itemActive,
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.dot, { backgroundColor: c.color ?? Colors.primary }]} />
              <Text style={[styles.name, selected && styles.nameActive]}>{c.name}</Text>
              <View style={[styles.badge, selected && styles.badgeActive]}>
                <Text style={[styles.badgeText, selected && styles.badgeTextActive]}>{count}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 52,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
    flex: 1,
  },
  header: {
    ...Typography.title,
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  list: {
    paddingBottom: Spacing.xl,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginVertical: 6,
    ...Elevation.card,
  },
  itemActive: {
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.18,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: Spacing.md,
  },
  name: {
    ...Typography.body,
    flex: 1,
  },
  nameActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.md,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  badgeActive: {
    backgroundColor: '#DBEAFE',
    borderColor: Colors.primary,
  },
  badgeText: {
    color: Colors.mutedText,
    fontWeight: '600',
  },
  badgeTextActive: {
    color: Colors.primary,
  },
  pressed: {
    opacity: 0.9,
  },
});
