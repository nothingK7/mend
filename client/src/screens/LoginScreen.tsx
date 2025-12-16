import React, { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AuthService } from '../services/AuthService';
import { theme } from '../theme';

export const LoginScreen = ({ navigation }: any) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            if (isLogin) {
                await AuthService.login(email, password);
            } else {
                await AuthService.signup(email, password);
            }
            // Use replace to prevent going back to login
            if (navigation) {
                navigation.replace('Protocol');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', error.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container safe centered padded>
            <View style={styles.header}>
                <Typography variant="display" centered color={theme.colors.primary}>
                    MEND
                </Typography>
                <Typography variant="body" centered color={theme.colors.textSecondary} style={{ marginBottom: 40 }}>
                    {isLogin ? "Welcome back." : "Begin your healing."}
                </Typography>
            </View>

            <Input
                label="Email"
                placeholder="you@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={{ marginBottom: 20 }}
            />
            <Input
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ marginBottom: 30 }}
            />

            <Button
                title={isLogin ? "Enter" : "Create Account"}
                onPress={handleSubmit}
                loading={loading}
                fullWidth
                style={{ marginBottom: 20 }}
            />

            <Button
                title={isLogin ? "New here? Join Now" : "Have an account? Login"}
                variant="ghost"
                onPress={() => setIsLogin(!isLogin)}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: theme.spacing.xl,
        alignItems: 'center',
    }
});
