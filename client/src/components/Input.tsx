import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Typography } from './Typography';

interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    error?: string;
    style?: any;
    multiline?: boolean;
    numberOfLines?: number;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export const Input: React.FC<InputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    error,
    style,
    multiline,
    numberOfLines,
    keyboardType
}) => {
    return (
        <View style={[styles.container, style]}>
            {label && (
                <Typography variant="caption" style={styles.label}>
                    {label}
                </Typography>
            )}
            <TextInput
                style={[
                    styles.input,
                    multiline && styles.multiline,
                    error ? styles.errorInput : null
                ]}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textMuted}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                numberOfLines={numberOfLines}
                keyboardType={keyboardType}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.md,
        width: '100%',
    },
    label: {
        marginBottom: theme.spacing.xs,
        color: theme.colors.textSecondary,
    },
    input: {
        backgroundColor: '#0F172A', // Deep Charcoal (Darker than surface for contrast)
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: theme.typography.sizes.md,
        color: '#F8FAFC', // Off-white explicitly
        borderWidth: 1,
        borderColor: theme.colors.borderDim,
        // @ts-ignore
        outlineStyle: 'none',
    } as any,
    multiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    errorInput: {
        borderColor: theme.colors.error,
    },
    errorText: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.error,
        marginTop: theme.spacing.xs,
    },
});
