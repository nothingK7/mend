import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { ProtocolScreen } from '../screens/ProtocolScreen';
import { AuthLoadingScreen } from '../screens/AuthLoadingScreen';
import { PanicScreen } from '../screens/PanicScreen';
import { DetoxScreen } from '../screens/DetoxScreen';
import { FakeTodoListScreen } from '../screens/FakeTodoListScreen';
import { theme } from '../theme';

const Stack = createNativeStackNavigator();

const linking = {
    prefixes: ['mend://', 'https://mend.app'],
    config: {
        screens: {
            Login: 'login',
            Protocol: 'protocol',
            Panic: 'panic',
            Detox: 'detox',
        },
    },
};

export const RootNavigator = () => {
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator
                id="RootStack"
                initialRouteName="AuthLoading"
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: theme.colors.background }
                }}
            >
                <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Protocol" component={ProtocolScreen} />
                <Stack.Screen name="Panic" component={PanicScreen} />
                <Stack.Screen name="Detox" component={DetoxScreen} />
                <Stack.Screen name="FalseBottom" component={FakeTodoListScreen} options={{ gestureEnabled: false, animation: 'none' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
