import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing } from '../theme/colors';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
};

export const ThemedButton: React.FC<Props> = ({ title, onPress, variant = 'primary', style }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, style]}>
      <Text style={[styles.text, variant === 'secondary' && styles.textSecondary, variant === 'ghost' && styles.textGhost]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  text: {
    color: Colors.surface,
    fontWeight: '700',
  },
  textSecondary: {
    color: Colors.surface,
  },
  textGhost: {
    color: Colors.text,
  },
  pressed: {
    opacity: 0.85,
  },
});
