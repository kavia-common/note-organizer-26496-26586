import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { Colors, Elevation, Radius, Spacing } from '../theme/colors';

type Props = {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
};

export const SearchBar: React.FC<Props> = ({ value, onChangeText, onClear, placeholder = 'Search notes...' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrap}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.mutedText}
          style={styles.input}
          returnKeyType="search"
        />
        {value?.length > 0 && (
          <Pressable onPress={onClear} style={({ pressed }) => [styles.clearBtn, pressed && styles.pressed]}>
            <View style={styles.clearDot} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.select({ ios: 12, android: 8 }),
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.background,
  },
  inputWrap: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    ...Elevation.card,
  },
  input: {
    fontSize: 16,
    color: Colors.text,
  },
  clearBtn: {
    position: 'absolute',
    right: 10,
    top: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
  },
  clearDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  pressed: { opacity: 0.7 },
});
