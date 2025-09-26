import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoryDrawer } from '../components/CategoryDrawer';
import { NotesListScreen } from '../screens/NotesListScreen';
import { NoteEditorScreen } from '../screens/NoteEditorScreen';
import { Colors } from '../theme/colors';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    primary: Colors.primary,
    card: Colors.surface,
    text: Colors.text,
    border: Colors.border,
    notification: Colors.secondary,
  },
};

import type { DrawerContentComponentProps } from '@react-navigation/drawer';

// Drawer content utilizing our CategoryDrawer
const DrawerContent = (props: DrawerContentComponentProps) => (
  <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, paddingBottom: 24 }}>
    <CategoryDrawer onClose={() => props.navigation.closeDrawer()} />
  </DrawerContentScrollView>
);

// Stack for notes UI inside the Drawer
function NotesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.surface },
        headerTintColor: Colors.text,
      }}
    >
      <Stack.Screen
        name="NotesList"
        component={NotesListScreen}
        options={{ title: 'Notes' }}
      />
      <Stack.Screen
        name="NoteEditor"
        component={NoteEditorScreen}
        options={{ title: 'Edit note' }}
      />
    </Stack.Navigator>
  );
}

export const AppNavigator = () => {
  return (
    <NavigationContainer theme={AppTheme}>
      <StatusBar style="dark" />
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerStyle: { backgroundColor: Colors.background },
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={NotesStack} />
      </Drawer.Navigator>
      <View />
    </NavigationContainer>
  );
};
