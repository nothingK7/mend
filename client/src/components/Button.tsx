import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'panic';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    style,
    fullWidth = false,
}) => {
    const getButtonStyle = () => {
        switch (variant) {
            case 'primary':
                return styles.primary;
            case 'secondary':
                return styles.secondary;
            case 'outline':
                return styles.outline;
            case 'ghost':
                return styles.ghost;
            case 'panic':
                return styles.panic;
            default:
                return styles.primary;
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'primary': return styles.primaryText;
            case 'panic': return styles.panicText;
            case 'outline': return styles.outlineText;
            case 'ghost': return styles.ghostText;
            default: return styles.secondaryText;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.base,
                getButtonStyle(),
                fullWidth && styles.fullWidth,
                disabled && styles.disabled,
                style,
                // Add Kintsugi Glow for primary
                variant === 'primary' && !disabled && theme.shadows.glow
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? theme.colors.background : theme.colors.primary} />
            ) : (
                <Text style={[styles.textBase, getTextStyle()]}>
                    {variant === 'panic' ? title.toUpperCase() : title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        paddingVertical: 12, // Explicit 12px
        paddingHorizontal: 24, // Explicit 24px
        borderRadius: theme.borderRadius.md, // 8px (Standardized)
        alignItems: 'center',
        justifyContent: 'center',
        // @ts-ignore - Web compatibility
        cursor: 'pointer',
    },
    fullWidth: {
        width: '100%',
    },
    disabled: {
        opacity: 0.5,
    },
    textBase: {
        fontSize: theme.typography.sizes.md,
        fontWeight: theme.typography.weights.medium as any,
        letterSpacing: 0.5,
    },

    // Variants
    primary: {
        backgroundColor: theme.colors.primary,
        ...theme.borders.gold,
    },
    primaryText: {
        color: theme.colors.background, // Dark text on Gold
        fontWeight: 'bold',
    },

    input: {
        backgroundColor: theme.colors.surfaceHighlight,
        borderRadius: theme.borderRadius.md, // 8px
        padding: theme.spacing.md,
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: theme.colors.borderDim,
        // @ts-ignore
        outlineStyle: 'none', // Remove web outline
    },
    outlineText: {
        color: theme.colors.primary,
    },

    secondary: {
        backgroundColor: theme.colors.surfaceHighlight,
        borderWidth: 1,
        borderColor: theme.colors.borderDim,
    },
    secondaryText: {
        color: theme.colors.text,
    },

    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },

    ghost: {
        backgroundColor: 'transparent',
    },
    ghostText: {
        color: theme.colors.textSecondary,
    },

    panic: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.error,
        marginTop: theme.spacing.xl,
    },
    panicText: {
        color: theme.colors.error,
        fontWeight: 'bold',
        letterSpacing: 2,
    }
});
