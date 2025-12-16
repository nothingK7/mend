export const typography = {
    fontFamily: {
        // In a real app we would load a Serif font for Headings via expo-font
        // For MVP Web/Native default safely, we use system serif for headings to allow differentiation
        heading: 'System',
        body: 'System',
    },
    sizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 24,
        xxl: 32,
        display: 48,
    },
    weights: {
        regular: '400',
        medium: '500',
        bold: '700',
        light: '300',
    },
    lineHeights: {
        body: 24,
        heading: 1.2,
    },
    letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.5, // For headings to give that "premium" feel
        widest: 1.5, // For uppercase labels
    }
};
