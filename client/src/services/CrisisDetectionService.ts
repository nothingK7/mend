const CRISIS_KEYWORDS = [
    'suicide',
    'kill myself',
    'end it all',
    'want to die',
    'hurt myself',
    'no reason to live'
];

export const CrisisDetectionService = {
    analyze(text: string): boolean {
        if (!text) return false;
        const lowerText = text.toLowerCase();
        return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword));
    }
};
