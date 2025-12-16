import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { theme } from '../theme';

export const PanicScreen = ({ navigation }: any) => {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.5,
                    duration: 4000,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 4000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Container safe centered padded style={{ backgroundColor: '#000' }}>
            {/* Deep black for panic mode to reduce sensory load */}

            <Typography variant="display" centered color={theme.colors.error} style={{ marginBottom: 40 }}>
                BREATHE
            </Typography>

            <View style={styles.circleContainer}>
                <Animated.View style={[styles.circle, { transform: [{ scale }] }]} />
            </View>

            <Typography variant="body" centered style={{ marginTop: 40, marginBottom: 40 }}>
                Inhale... Exhale...
            </Typography>

            <Button
                title="I'm Okay Now"
                variant="outline"
                onPress={() => navigation.goBack()}
                fullWidth
                style={{ marginTop: 60, minWidth: 200, borderColor: theme.colors.textMuted }}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    circleContainer: {
        width: 300,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: theme.colors.surfaceHighlight,
        opacity: 0.5,
    }
});
