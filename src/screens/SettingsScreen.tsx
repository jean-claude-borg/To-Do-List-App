import { Surface, Text } from 'react-native-paper';
import { useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import { List, Switch, Divider } from 'react-native-paper';
import UserSettingsContext from '../UserSettingsContext.tsx'
import AsyncStorage from '@react-native-async-storage/async-storage';

// const saveUserSettings = async (key, value) => {
//     try {
//         await AsyncStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//         console.error("Error saving user settings:", error);
//     }
// };

export function SettingsScreen() {

    const settingsContextValue = useContext(UserSettingsContext);
    if (!settingsContextValue) {
        console.log("error getting project list:", settingsContextValue);;
        return;
    }
    const userSettings = settingsContextValue;

    return (
        <ScrollView style={{ flex: 1 }}>
            <List.Section>
                <List.Subheader>Account Information</List.Subheader>
                <List.Item
                    title="Username"
                    description={userSettings.username}
                    left={props => <List.Icon {...props} icon="account" />}
                />
                <List.Item
                    title="Email"
                    description={userSettings.email}
                    left={props => <List.Icon {...props} icon="lock" />}
                />
            </List.Section>

            <Divider />
            <List.Section>
                <List.Subheader>App Preferences</List.Subheader>
                <List.Item
                    title="Dark Mode"
                    left={props => <List.Icon {...props} icon="theme-light-dark" />}
                    right={props => <Switch value={userSettings.darkMode}
                        onValueChange={async () => {
                            const newDarkModeValue = !userSettings.darkMode;
                            userSettings.setDarkMode(newDarkModeValue);
                            // await saveUserSettings('darkMode', newDarkModeValue);
                        }} />}
                />
                <List.Item
                    title="Default List View"
                    left={props => <List.Icon {...props} icon="view-agenda" />}
                    right={props => <Switch value={userSettings.defaultListView}
                        onValueChange={async () => {
                            const newDefaultListViewValue = !userSettings.defaultListView;
                            userSettings.setDefaultListView(newDefaultListViewValue);
                            // await saveUserSettings('defaultListView', newDefaultListViewValue);
                        }} />}
                />
            </List.Section>


            <Divider />

            <List.Section>
                <List.Subheader>About</List.Subheader>
                <List.Item
                    title="Version"
                    left={props => <List.Icon {...props} icon="information" />}
                    description="1.0.0"
                />
            </List.Section>
        </ScrollView>
    );
}
