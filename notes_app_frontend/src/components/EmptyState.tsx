import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../theme/colors';

type Props = {
  title: string;
  subtitle?: string;
};

export const EmptyState: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.badge} />
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
  },
  badge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#DBEAFE',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.title,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.subtitle,
    textAlign: 'center',
    marginTop: 6,
  },
});
