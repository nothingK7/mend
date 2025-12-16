import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { theme } from '../theme';
import { DetoxService } from '../services/DetoxService';

export const DetoxScreen = ({ navigation }: any) => {
    const [streak, setStreak] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStatus();
    }, []);

    async function loadStatus() {
        try {
            const status = await DetoxService.getStatus();
            setStreak(status.streakDays);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleResetPress = () => {
        Alert.alert(
            'Reset Timer?',
            'This will reset your streak to 0. Use this only if you actually contacted them.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'I broke contact',
                    style: 'destructive',
                    onPress: confirmReset
                }
            ]
        );
    };

    const confirmReset = () => {
        Alert.alert(
            'Are you sure?',
            'Healing is non-linear. Being honest is part of the process.',
            [
                { text: 'Nevermind', style: 'cancel' },
                { text: 'Yes, Reset', style: 'destructive', onPress: performReset }
            ]
        );
    }

    const performReset = async () => {
        setLoading(true);
        await DetoxService.resetTimer();
        setStreak(0);
        setLoading(false);
    };

    return (
        <Container safe padded>
            <Typography variant="h1" centered>Detox Tracker</Typography>

            <View style={styles.streakContainer}>
                <View style={styles.ring}>
                    <Typography variant="display" centered color={theme.colors.primary}>
                        {streak}
                    </Typography>
                    <Typography variant="caption" centered>DAYS CLEAN</Typography>
                </View>
            </View>

            <Typography variant="body" centered style={{ marginBottom: theme.spacing.xl, color: theme.colors.textSecondary }}>
                Every day without contact is a victory.
            </Typography>

            <Button
                title="I Contacted Them (Reset)"
                variant="outline"
                onPress={handleResetPress}
                fullWidth
                style={{ borderColor: theme.colors.error }}
            />
            <Button
                title="Back to Protocol"
                variant="ghost"
                onPress={() => navigation.goBack()}
                fullWidth
                style={{ marginTop: theme.spacing.lg }}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    streakContainer: {
        alignItems: 'center',
        marginVertical: theme.spacing.xl,
    },
    ring: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 4,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.glow,
    },
    counterContainer: {
        alignItems: 'center',
        marginVertical: theme.spacing.xxl,
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.surface,
        borderRadius: 200,
        width: 250,
        height: 250,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    counter: {
        fontSize: 80,
        color: theme.colors.primary,
        marginBottom: 0,
        lineHeight: 90,
    }
});
