import React, { useEffect, useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNotes } from '../context/NotesContext';
import { Colors, Elevation, Radius, Spacing, Typography } from '../theme/colors';

type RootStack = {
  NotesList: undefined;
  NoteEditor: { id?: string };
};

type Props = NativeStackScreenProps<RootStack, 'NoteEditor'>;

export const NoteEditorScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params ?? {};
  const { getNote, updateNote, deleteNote, categories } = useNotes();
  const original = useMemo(() => (id ? getNote(id) : undefined), [id, getNote]);

  const [title, setTitle] = useState(original?.title ?? '');
  const [content, setContent] = useState(original?.content ?? '');
  const [categoryId, setCategoryId] = useState<string | undefined | null>(original?.categoryId);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: original ? 'Edit note' : 'New note',
    });
  }, [navigation, original]);

  useEffect(() => {
    if (!id) return;
    // Auto-save on change after small debounce could be added; here we save on blur to keep simple.
  }, [id, title, content, categoryId]);

  const onSave = () => {
    if (!id) { 
      // Should not happen; creation occurs in list screen before navigate.
      Alert.alert('Error', 'Unable to save note.');
      return;
    }
    updateNote(id, { title, content, categoryId: categoryId ?? undefined });
    navigation.goBack();
  };

  const onDelete = () => {
    if (!id) return;
    Alert.alert('Delete note', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteNote(id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.pill, pressed && styles.pressed]}>
          <Text style={styles.pillText}>Back</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {id && (
            <Pressable onPress={onDelete} style={({ pressed }) => [styles.pillDanger, pressed && styles.pressed]}>
              <Text style={[styles.pillText, { color: Colors.surface }]}>Delete</Text>
            </Pressable>
          )}
          <Pressable onPress={onSave} style={({ pressed }) => [styles.pillPrimary, pressed && styles.pressed]}>
            <Text style={[styles.pillText, { color: Colors.surface }]}>Save</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="Untitled"
          placeholderTextColor={Colors.mutedText}
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
        />

        <Text style={[styles.label, { marginTop: Spacing.lg }]}>Category</Text>
        <View style={styles.categoryRow}>
          {categories.filter(c => c.id !== 'all').map((c) => {
            const selected = c.id === categoryId;
            return (
              <Pressable
                key={c.id}
                onPress={() => setCategoryId(selected ? null : c.id)}
                style={({ pressed }) => [
                  styles.categoryPill,
                  selected && { backgroundColor: '#DBEAFE', borderColor: Colors.primary },
                  pressed && styles.pressed,
                ]}
              >
                <View style={[styles.dot, { backgroundColor: c.color ?? Colors.primary }]} />
                <Text style={[styles.categoryText, selected && { color: Colors.primary, fontWeight: '700' }]}>{c.name}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.label, { marginTop: Spacing.lg }]}>Content</Text>
        <TextInput
          placeholder="Start typing..."
          placeholderTextColor={Colors.mutedText}
          value={content}
          onChangeText={setContent}
          style={styles.contentInput}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  toolbar: {
    paddingTop: 8,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.lg,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillPrimary: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
  },
  pillDanger: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.lg,
    backgroundColor: Colors.error,
  },
  pillText: {
    color: Colors.text,
    fontWeight: '700',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    padding: Spacing.lg,
    ...Elevation.card,
  },
  label: {
    ...Typography.subtitle,
    color: Colors.mutedText,
    marginBottom: 6,
  },
  titleInput: {
    ...Typography.title,
    paddingVertical: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  categoryText: { color: Colors.text, fontWeight: '600' },
  contentInput: {
    minHeight: 220,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    fontSize: 16,
    backgroundColor: '#FBFDFF',
  },
  pressed: { opacity: 0.85 },
});
