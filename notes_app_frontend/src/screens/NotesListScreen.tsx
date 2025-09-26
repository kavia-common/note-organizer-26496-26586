import React, { useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet, Pressable, Text } from 'react-native';
import { useNotes } from '../context/NotesContext';
import { Colors, Spacing } from '../theme/colors';
import { SearchBar } from '../components/SearchBar';
import { NoteCard } from '../components/NoteCard';
import { EmptyState } from '../components/EmptyState';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStack = {
  NotesList: undefined;
  NoteEditor: { id?: string };
};

type Props = NativeStackScreenProps<RootStack, 'NotesList'>;

export const NotesListScreen: React.FC<Props> = ({ navigation }) => {
  const { filteredNotes, setSearchQuery, searchQuery, deleteNote, updateNote, addNote } = useNotes();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Notes',
      headerLeft: () => (
        <Pressable
          onPress={() => {
            const parent = navigation.getParent();
            // parent is the DrawerNavigator; it has openDrawer method in its navigation prop
            // We guard-call to avoid type issues in web.
            // @ts-expect-error drawer method exists when nested under DrawerNavigator
            parent?.openDrawer?.();
          }}
          style={({ pressed }) => [
            {
              paddingHorizontal: 12,
              paddingVertical: 6,
              marginLeft: 6,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.border,
              backgroundColor: '#EEF2FF',
            },
            pressed && { opacity: 0.8 },
          ]}
        >
          <Text style={{ color: Colors.primary, fontWeight: '700' }}>Categories</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />

      {filteredNotes.length === 0 ? (
        <EmptyState
          title={searchQuery ? 'No results' : 'No notes yet'}
          subtitle={
            searchQuery
              ? 'Try a different search query.'
              : 'Tap the + button to create your first note.'
          }
        />
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onPress={() => navigation.navigate('NoteEditor', { id: item.id })}
              onDelete={() => deleteNote(item.id)}
              onTogglePin={() => updateNote(item.id, { pinned: !item.pinned })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}

      <Pressable
        onPress={() => {
          const n = addNote({ title: 'New note', content: '' });
          navigation.navigate('NoteEditor', { id: n.id });
        }}
        style={({ pressed }) => [styles.fab, pressed && styles.pressed]}
      >
        <Text style={styles.fabPlus}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  fab: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Elevation.card,
  },
  fabPlus: {
    color: Colors.surface,
    fontSize: 32,
    lineHeight: 34,
  },
  pressed: { opacity: 0.9 },
});
