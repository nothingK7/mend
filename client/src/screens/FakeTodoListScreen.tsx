import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { theme } from '../theme';
import { Button } from '../components/Button';

const FAKE_TODOS = [
    { id: '1', text: 'Buy groceries', done: false },
    { id: '2', text: 'Call insurance company', done: true },
    { id: '3', text: 'Schedule dentist appointment', done: false },
    { id: '4', text: 'Pick up dry cleaning', done: false },
    { id: '5', text: 'Email marketing team', done: true },
];

export const FakeTodoListScreen = ({ navigation }: any) => {
    return (
        <Container safe padded style={{ backgroundColor: '#fff' }}>
            {/* Intentionally light/boring for camouflage */}
            <View style={styles.header}>
                <Typography variant="h2" style={{ color: '#000' }}>My Tasks</Typography>
                <Button title="Exit" variant="ghost" onPress={() => navigation.goBack()} style={{ opacity: 0 }} />
            </View>

            <FlatList
                data={FAKE_TODOS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={[styles.checkbox, item.done && styles.checked]} />
                        <Typography
                            variant="body"
                            style={[styles.text, item.done && styles.doneText]}
                        >
                            {item.text}
                        </Typography>
                    </View>
                )}
            />
            <Button
                title="Safe Exit"
                variant="ghost"
                onPress={() => navigation.navigate('Protocol')}
                style={{ marginTop: 20, opacity: 0.05 }}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        marginRight: theme.spacing.md,
    },
    checked: {
        backgroundColor: theme.colors.primary,
    },
    text: {
        color: theme.colors.text,
    },
    doneText: {
        textDecorationLine: 'line-through',
        color: theme.colors.textMuted,
    },
});
