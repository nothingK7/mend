import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { theme } from '../theme';

interface TypographyProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'display';
    children: React.ReactNode;
    style?: any;
    color?: string;
    centered?: boolean;
    weight?: keyof typeof theme.typography.weights;
}

export const Typography: React.FC<TypographyProps> = ({
    variant = 'body',
    children,
    style,
    color,
    centered,
    weight
}) => {
    return (
        <Text style={[
            styles[variant],
            color && { color },
            centered && { textAlign: 'center' },
            weight && { fontWeight: theme.typography.weights[weight] as any },
            style
        ]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    display: {
        fontSize: theme.typography.sizes.display,
        fontWeight: theme.typography.weights.light as any, // Elegant light weight
        color: theme.colors.primary, // Gold
        marginBottom: theme.spacing.xl,
        letterSpacing: theme.typography.letterSpacing.normal,
    },
    h1: {
        fontSize: theme.typography.sizes.xxl,
        fontWeight: theme.typography.weights.medium as any,
        color: theme.colors.text,
        marginBottom: theme.spacing.lg,
        letterSpacing: theme.typography.letterSpacing.wide,
    },
    h2: {
        fontSize: theme.typography.sizes.xl,
        fontWeight: theme.typography.weights.medium as any,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
        letterSpacing: theme.typography.letterSpacing.wide,
    },
    h3: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.medium as any,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
        letterSpacing: theme.typography.letterSpacing.wide,
    },
    body: {
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text,
        lineHeight: theme.typography.lineHeights.body,
        marginBottom: theme.spacing.xs,
    },
    caption: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.textMuted,
        letterSpacing: theme.typography.letterSpacing.widest,
        textTransform: 'uppercase',
    }
});
