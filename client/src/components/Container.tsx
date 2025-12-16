import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { theme } from '../theme';

interface ContainerProps {
    children: React.ReactNode;
    centered?: boolean;
    safe?: boolean;
    padded?: boolean;
    style?: any;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    centered,
    safe,
    padded,
    style
}) => {
    const Wrapper = safe ? SafeAreaView : View;

    return (
        <Wrapper style={[
            styles.container,
            centered && styles.centered,
            padded && styles.padded,
            style
        ]}>
            <View style={[styles.content]}>
                {children}
            </View>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background, // Deep Charcoal
    },
    content: {
        flex: 1,
        // Web fix for varying widths if needed, but flex 1 is safe for now
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    padded: {
        padding: theme.spacing.lg,
    },
});
