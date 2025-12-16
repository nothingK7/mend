import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { AuthService } from '../services/AuthService';
import { theme } from '../theme';

export const AuthLoadingScreen = ({ navigation }: any) => {
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = await AuthService.getToken();

            if (token) {
                // Token exists, verify identity with Biometrics or Fallback
                const authenticated = await AuthService.authenticateBiometric();

                if (authenticated) {
                    navigation.replace('Protocol');
                    return;
                }
            }

            // No token or auth failed/cancelled
            navigation.replace('Login');

        } catch (error) {
            console.error('Auth check failed', error);
            navigation.replace('Login');
        }
    };

    return (
        <Container safe centered>
            <Typography variant="display" color={theme.colors.primary}>MEND</Typography>
            <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
            <Typography variant="caption" style={{ marginTop: 20 }}>
                RESTORING...
            </Typography>
        </Container>
    );
};
