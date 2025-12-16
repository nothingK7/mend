import React from 'react';
import { View, StyleSheet, ViewStyle, Image } from 'react-native';
import { Typography } from './Typography';
import { theme } from '../theme';

// Require assets (Webpack/Metro compatible)
const bowlBroken = require('../../assets/bowl_broken.png');
const bowlGlued = require('../../assets/bowl_glued.png');
const bowlGold = require('../../assets/bowl_gold.png');

interface Props {
    currentDay: number;
    totalDays?: number;
    style?: ViewStyle;
}

export const ProgressIndicator: React.FC<Props> = ({ currentDay, totalDays = 30, style }) => {
    const progress = Math.min((currentDay / totalDays) * 100, 100);

    const getPhaseContent = (day: number) => {
        if (day <= 7) return { text: "Phase 1: Stabilizing", sub: "The Break", image: bowlBroken };
        if (day <= 14) return { text: "Phase 2: Processing", sub: "The Glue", image: bowlGlued };
        return { text: "Phase 3: Rebuilding", sub: "The Gold", image: bowlGold };
    };

    const phase = getPhaseContent(currentDay);

    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <Typography variant="caption" color={theme.colors.textMuted}>
                    MY MEND JOURNEY
                </Typography>
                <Typography variant="caption" color={theme.colors.primary} style={{ fontWeight: 'bold' }}>
                    {phase.text}
                </Typography>
            </View>

            <View style={{ alignItems: 'center', marginVertical: theme.spacing.md }}>
                <Image
                    source={phase.image}
                    style={{ width: 120, height: 120, borderRadius: 60 }}
                    resizeMode="cover"
                />
                <Typography variant="caption" style={{ marginTop: theme.spacing.sm, fontStyle: 'italic', color: theme.colors.textSecondary }}>
                    "{phase.sub}"
                </Typography>
            </View>

            <View style={styles.track}>
                <View style={[styles.fill, { width: `${progress}%` }]} />
            </View>

            <Typography variant="caption" style={{ marginTop: 4, textAlign: 'right' }}>
                {progress.toFixed(0)}% Healed
            </Typography>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm,
    },
    track: {
        height: 8,
        backgroundColor: theme.colors.surfaceHighlight,
        borderRadius: 4,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
    }
});
