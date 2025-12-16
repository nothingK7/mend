import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || Platform.select({
    android: 'http://10.0.2.2:8080/api/v1',
    ios: 'http://localhost:8080/api/v1',
    default: 'http://localhost:8080/api/v1', // Web
});

const TOKEN_KEY = 'mend_auth_token';

export const AuthService = {
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            await this.saveToken(data.token);
            return data.token;
        } catch (error) {
            throw error;
        }
    },

    async signup(email, password) {
        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            await this.saveToken(data.token);
            return data.token;
        } catch (error) {
            throw error;
        }
    },

    async saveToken(token) {
        if (Platform.OS === 'web') {
            localStorage.setItem(TOKEN_KEY, token);
        } else {
            await SecureStore.setItemAsync(TOKEN_KEY, token);
        }
    },

    async getToken() {
        if (Platform.OS === 'web') {
            return localStorage.getItem(TOKEN_KEY);
        } else {
            return await SecureStore.getItemAsync(TOKEN_KEY);
        }
    },

    async logout() {
        if (Platform.OS === 'web') {
            localStorage.removeItem(TOKEN_KEY);
        } else {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
        }
    },

    async authenticateBiometric() {
        if (Platform.OS === 'web') return true; // Web fallback (assume logged in if token exists for now)

        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!hasHardware || !isEnrolled) return true; // Fallback to pin/password if no biometric

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate to Mend',
            fallbackLabel: 'Enter Password',
        });

        return result.success;
    }
};
