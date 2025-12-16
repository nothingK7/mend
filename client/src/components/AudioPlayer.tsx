import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { Button } from './Button';
import { Typography } from './Typography';
import { theme } from '../theme';

interface Props {
    source: string;
}

export const AudioPlayer: React.FC<Props> = ({ source }) => {
    const [sound, setSound] = useState<Audio.Sound>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorObj, setErrorObj] = useState<any>(null);

    async function loadSound() {
        setLoading(true);
        try {
            const { sound } = await Audio.Sound.createAsync({ uri: source });
            setSound(sound);
            setLoading(false);
        } catch (error) {
            console.error('Error loading sound', error);
            setErrorObj(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSound();
        return () => {
            sound?.unloadAsync();
        };
    }, [source]);

    async function handlePlayPause() {
        if (!sound) return;
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator color={theme.colors.primary} />
            ) : sound ? (
                <View style={styles.controls}>
                    <Button
                        title={isPlaying ? "Pause Session" : "Play Session"}
                        onPress={handlePlayPause}
                        variant="primary"
                        style={styles.playButton}
                    />
                </View>
            ) : (
                <View>
                    <Typography variant="caption" color={theme.colors.error}>
                        Audio Failed. Try Web Player:
                    </Typography>
                    {/* Web Fallback */}
                    {globalThis.window ? (
                        <audio controls src={source} style={{ marginTop: 10 }}>
                            <a href={source}>Download audio</a>
                        </audio>
                    ) : (
                        <Button
                            title="Retry"
                            onPress={loadSound}
                            variant="ghost"
                        />
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        marginVertical: theme.spacing.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playButton: {
        minWidth: 150,
    },
});
