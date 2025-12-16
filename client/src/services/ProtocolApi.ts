import { AuthService } from './AuthService';
import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || Platform.select({
    android: 'http://10.0.2.2:8080/api/v1',
    ios: 'http://localhost:8080/api/v1',
    default: 'http://localhost:8080/api/v1', // Web
});

export const ProtocolApi = {
    async getCurrentDay() {
        const token = await AuthService.getToken();
        const response = await fetch(`${API_URL}/protocol/current`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch day content');
        return response.json();
    },

    async completeDay(dayNumber: number, journalContent: string, moodScore: number, sleepHours: number) {
        const token = await AuthService.getToken();
        const response = await fetch(`${API_URL}/protocol/complete`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dayNumber,
                journalContent,
                moodScore,
                sleepHours,
                movement: true // Hardcoded for MVP
            })
        });
        if (!response.ok) throw new Error('Failed to complete day');
        return true;
    }
};
