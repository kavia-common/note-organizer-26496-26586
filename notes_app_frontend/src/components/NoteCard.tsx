import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors, Elevation, Radius, Spacing, Typography } from '../theme/colors';
import { Note } from '../types';

type Props = {
  note: Note;
  onPress: () => void;
  onDelete?: () => void;
  onTogglePin?: () => void;
};

export const NoteCard: React.FC<Props> = ({ note, onPress, onDelete, onTogglePin }) => {
  const date = new Date(note.updatedAt);
  const subtitle = `Updated ${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.headerAccent} />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {note.title || 'Untitled'}
        </Text>
        <Text numberOfLines={2} style={styles.preview}>
          {note.content || 'No content yet.'}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.actions}>
            <Pressable onPress={onTogglePin} style={styles.actionPill}>
              <Text style={styles.actionText}>{note.pinned ? 'Unpin' : 'Pin'}</Text>
            </Pressable>
            <Pressable onPress={onDelete} style={[styles.actionPill, styles.danger]}>
              <Text style={[styles.actionText, { color: Colors.surface }]}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    ...Elevation.card,
  },
  headerAccent: {
    height: 6,
    backgroundColor: Colors.primary,
  },
  content: {
    padding: Spacing.lg,
    gap: 6,
  },
  title: {
    ...Typography.title,
  },
  preview: {
    ...Typography.body,
    color: Colors.mutedText,
  },
  footer: {
    marginTop: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitle: {
    ...Typography.subtitle,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#EEF2FF',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  danger: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  actionText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.95,
  },
});
