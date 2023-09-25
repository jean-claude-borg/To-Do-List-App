import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { useAppTheme } from './StyleSheet.tsx'
import { MainNavigator } from './MainNavigator.tsx'
import { useState, useEffect } from 'react'
import UserSettingsContext from './UserSettingsContext.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};

export default function App() {

  const [username, setUserName] = useState("Guest");
  const [email, setEmailName] = useState("No Email");
  const [darkMode, setDarkMode] = useState(false);
  const [colourScheme, setColourScheme] = useState(false);
  const [defaultListView, setDefaultListView] = useState(true);
  const [signUpLater, setSignUpLater] = useState(true);

  const loadData = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      if (savedUsername !== null) {
        setUserName(savedUsername);
      }
      const savedEmail = await AsyncStorage.getItem('email');
      if (savedEmail !== null) {
        setEmailName(savedEmail);
      }
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
      const savedColourScheme = await AsyncStorage.getItem('colourScheme');
      if (savedColourScheme !== null) {
        setColourScheme(JSON.parse(savedColourScheme));
      }
      const savedDefaultListView = await AsyncStorage.getItem('defaultListView');
      if (savedDefaultListView !== null) {
        setDefaultListView(JSON.parse(savedDefaultListView));
      }
      const savedSignUpLater = await AsyncStorage.getItem('signUpLater');
      if (savedSignUpLater !== null) {
        setSignUpLater(JSON.parse(savedSignUpLater));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const theme = useAppTheme();
  if (!theme) {
    console.log("theme is undefined");
    return;
  }

  return (
    //wrapping entire application in safe area view causes animations to be laggy
    //navigation container considers safe areas by default
    <UserSettingsContext.Provider value={{
      username,
      setUserName,
      email,
      setEmailName,
      darkMode,
      setDarkMode,
      colourScheme,
      setColourScheme,
      defaultListView,
      setDefaultListView,
      signUpLater,
      setSignUpLater
    }}>
      <PaperProvider theme={darkMode ? CombinedDarkTheme:CombinedLightTheme} key={darkMode ? 0 : 1}>
        <StatusBar style={darkMode ? "light" : "dark"} />
        <MainNavigator />
      </PaperProvider>
    </UserSettingsContext.Provider>
  );
}
