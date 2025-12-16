import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert, StyleSheet, ActivityIndicator, Animated, Image } from 'react-native';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AudioPlayer } from '../components/AudioPlayer';
import { ProtocolApi } from '../services/ProtocolApi';
import { CrisisDetectionService } from '../services/CrisisDetectionService';
import { WellnessCard } from '../components/WellnessCard';
import { FalseBottomTrigger } from '../components/FalseBottomTrigger';
import { theme } from '../theme';
import { ProgressIndicator } from '../components/ProgressIndicator';

export const ProtocolScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<any>(null);
    const [journalText, setJournalText] = useState('');

    // Basic Wellness Inputs for MVP
    const [mood, setMood] = useState(5);
    const [sleep, setSleep] = useState(7);

    useEffect(() => {
        loadContent();
    }, []);

    async function loadContent() {
        try {
            const data = await ProtocolApi.getCurrentDay();
            setContent(data);
        } catch (error) {
            Alert.alert('Error', 'Could not load protocol.');
        } finally {
            setLoading(false);
        }
    }

    async function handleComplete() {
        if (!journalText) {
            Alert.alert('Journal Required', 'Please process your thoughts to complete the day.');
            return;
        }

        if (CrisisDetectionService.analyze(journalText)) {
            Alert.alert(
                'We Care About You',
                'It sounds like you might be going through a very difficult time. Would you like to connect with a crisis counselor?',
                [
                    { text: 'Yes, Get Help', onPress: () => console.log('Open Crisis Hotline') /* TODO: Open Link */, style: 'destructive' },
                    { text: 'No, I\'m Safe', onPress: () => submitDay(), style: 'cancel' }
                ]
            );
            return;
        }

        submitDay();
    }

    async function submitDay() {
        try {
            setLoading(true);
            await ProtocolApi.completeDay(content.dayNumber, journalText, mood, sleep);
            Alert.alert('Day Complete', 'See you tomorrow.');
            // Ideally refresh or lock screen here. For MVP, just reload content which might show next day if instant unlock.
            loadContent();
            setJournalText('');
        } catch (error) {
            Alert.alert('Error', 'Failed to save progress.');
        } finally {
            setLoading(false);
        }
    }

    // Pulse Animation for Detox Tracker
    const pulseAnim = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    if (!content) return (
        <Container safe centered padded>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Typography variant="caption" centered style={{ marginTop: 20 }}>Creating safe space...</Typography>
        </Container>
    );

    return (
        <Container safe>
            <FalseBottomTrigger />
            <ScrollView contentContainerStyle={{ padding: theme.spacing.lg }}>
                <ProgressIndicator currentDay={content.dayNumber} />

                <Typography variant="display" style={{ marginBottom: theme.spacing.xl }}>
                    {content.title}
                </Typography>

                <View style={styles.card}>
                    <AudioPlayer source={content.audioUrl} />
                </View>

                <View style={styles.section}>
                    <Typography variant="h2" color={theme.colors.primary}>Journal</Typography>
                    <Typography variant="body" style={{ marginBottom: theme.spacing.md, fontStyle: 'italic' }}>
                        "{content.journalPrompt}"
                    </Typography>

                    <Input
                        placeholder="Let it out..."
                        multiline
                        numberOfLines={6}
                        value={journalText}
                        onChangeText={setJournalText}
                    />
                </View>

                <View style={styles.section}>
                    <WellnessCard mood={mood} setMood={setMood} sleep={sleep} setSleep={setSleep} />
                </View>

                <Button
                    title="Complete Day"
                    onPress={handleComplete}
                    loading={loading}
                    fullWidth
                    disabled={!journalText || journalText.trim().length === 0}
                    style={{ marginTop: theme.spacing.lg, marginBottom: theme.spacing.xl, opacity: (!journalText || journalText.trim().length === 0) ? 0.5 : 1 }}
                />

                <View style={styles.tools}>
                    <Button
                        title="Panic Button"
                        variant="panic"
                        onPress={() => (navigation as any).navigate('Panic')}
                        style={{ flex: 1, marginRight: 10, height: 60, borderRadius: theme.borderRadius.xl }}
                    />

                    <View style={{ flex: 1, marginLeft: 10, height: 60, borderRadius: theme.borderRadius.xl, overflow: 'hidden', position: 'relative' }}>
                        <Animated.Image
                            source={require('../../assets/gold_texture.png')}
                            style={{
                                position: 'absolute',
                                width: '200%',
                                height: '200%',
                                opacity: 0.6,
                                transform: [{
                                    translateY: pulseAnim.interpolate({
                                        inputRange: [1, 1.05],
                                        outputRange: [0, -20]
                                    })
                                }, {
                                    rotate: pulseAnim.interpolate({
                                        inputRange: [1, 1.05],
                                        outputRange: ['0deg', '5deg']
                                    })
                                }]
                            }}
                            resizeMode="cover"
                        />
                        <Button
                            title="Detox Tracker"
                            variant="ghost" // Transparent to show liquid
                            onPress={() => (navigation as any).navigate('Detox')}
                            style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }} // Semi-transparent overlay
                        />
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: theme.spacing.xl,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        ...theme.borders.gold,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    tools: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.xxl,
    }
});
