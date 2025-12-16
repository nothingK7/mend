import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { Button } from './Button';
import { theme } from '../theme';

interface Props {
    mood: number;
    setMood: (m: number) => void;
    sleep: number;
    setSleep: (s: number) => void;
}

export const WellnessCard: React.FC<Props> = ({ mood, setMood, sleep, setSleep }) => {
    return (
        <View style={styles.container}>
            <Typography variant="h3" style={{ marginBottom: theme.spacing.md }}>Daily Check-In</Typography>

            <View style={styles.row}>
                <View style={styles.section}>
                    <Typography variant="body" weight="medium">Mood (1-10)</Typography>
                    <View style={styles.controls}>
                        <Button
                            title="-"
                            variant="outline"
                            onPress={() => setMood(Math.max(1, mood - 1))}
                            style={styles.smallBtn}
                        />
                        <Typography variant="h2" style={styles.value}>{mood}</Typography>
                        <Button
                            title="+"
                            variant="outline"
                            onPress={() => setMood(Math.min(10, mood + 1))}
                            style={styles.smallBtn}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Typography variant="body" weight="medium">Sleep (Hours)</Typography>
                    <View style={styles.controls}>
                        <Button
                            title="-"
                            variant="outline"
                            onPress={() => setSleep(Math.max(0, sleep - 0.5))}
                            style={styles.smallBtn}
                        />
                        <Typography variant="h2" style={styles.value}>{sleep}</Typography>
                        <Button
                            title="+"
                            variant="outline"
                            onPress={() => setSleep(Math.min(24, sleep + 0.5))}
                            style={styles.smallBtn}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        marginVertical: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    row: {
        flexDirection: 'column', // Stack on mobile for space
        gap: theme.spacing.lg,
    },
    section: {
        alignItems: 'center',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: theme.spacing.sm,
        gap: theme.spacing.md,
    },
    smallBtn: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        minWidth: 40,
    },
    value: {
        minWidth: 40,
        textAlign: 'center',
    }
});
