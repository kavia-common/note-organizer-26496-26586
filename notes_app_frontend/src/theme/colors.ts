export const Colors = {
  primary: '#2563EB', // Blue
  secondary: '#F59E0B', // Amber
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  error: '#EF4444',
  mutedText: '#6B7280',
  border: '#E5E7EB',
  shadow: 'rgba(17, 24, 39, 0.08)',
};

export const Elevation = {
  card: {
    shadowColor: Colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

export const Spacing = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
};

export const Typography = {
  title: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.mutedText,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
  },
};
