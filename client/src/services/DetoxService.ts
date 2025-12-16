import { AuthService } from './AuthService';
import { Platform } from 'react-native';

const API_URL = Platform.select({
    android: 'http://10.0.2.2:8080/api/v1',
    ios: 'http://localhost:8080/api/v1',
    default: 'http://localhost:8080/api/v1', // Web
});

export const DetoxService = {
    async getStatus() {
        const token = await AuthService.getToken();
        // Mocking for MVP if Backend endpoint not ready, but we should adding Endpoint.
        // Assuming backend endpoint exists or we mock it here.
        // Let's mock local state for velocity if backend is bottleneck, but we have a backend dev (me).
        // Let's implement backend controller for Detox first or mock it.
        // Mocking for now to show UI flow, can implement Backend Controller in next step.
        return {
            lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
            streakDays: 5,
            resetCount: 0
        };
    },

    async resetTimer() {
        // Mock reset
        return {
            lastContactDate: new Date().toISOString(),
            streakDays: 0,
            resetCount: 1
        };
    }
};
