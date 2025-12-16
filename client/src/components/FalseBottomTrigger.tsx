import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const FalseBottomTrigger = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.trigger}
            onLongPress={() => (navigation as any).navigate('FalseBottom')}
            delayLongPress={500}
            activeOpacity={1}
        >
            <View style={styles.dot} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    trigger: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 60,
        height: 60,
        zIndex: 9999, // Always on top
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        padding: 10,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(0,0,0,0.05)', // Almost invisible
    }
});
