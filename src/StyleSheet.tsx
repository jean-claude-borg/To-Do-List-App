// import { StyleSheet } from 'react-native';
// import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';

// const lightTheme = true;

// import {
//   DarkTheme as NavigationDarkTheme,
//   DefaultTheme as NavigationDefaultTheme,
// } from '@react-navigation/native';

// const { LightTheme, DarkTheme } = adaptNavigationTheme({
//   reactNavigationLight: NavigationDefaultTheme,
//   reactNavigationDark: NavigationDarkTheme,
// });

// const CombinedLightTheme = {
//   ...MD3LightTheme,
//   ...LightTheme,
//   colors: {
//     ...MD3LightTheme.colors,
//     ...LightTheme.colors,
//   },
// };
// const CombinedDarkTheme = {
//   ...MD3DarkTheme,
//   ...DarkTheme,
//   colors: {
//     ...MD3DarkTheme.colors,
//     ...DarkTheme.colors,
//   },
// };

// const theme = lightTheme == true ? { ...CombinedLightTheme } : { ...CombinedDarkTheme };


import { StyleSheet } from 'react-native';
import { useContext } from 'react';
import UserSettingsContext from './UserSettingsContext';
import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const useAppTheme = () => {
  const settingsContextValue = useContext(UserSettingsContext);
  if (!settingsContextValue) {
    console.log("error getting user settings", settingsContextValue);;
    return;
  }
  const userSettings = settingsContextValue;

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
  
  const theme = userSettings.darkMode === true ? { ...CombinedDarkTheme } : { ...CombinedLightTheme };
  return theme
  // if (userSettings.darkMode)
  //   return CombinedDarkTheme
  // else {
  //   return CombinedLightTheme
  // }
  // return userSettings.darkMode ? { ...CombinedDarkTheme } : { ...CombinedLightTheme };
};

export const styles = StyleSheet.create({
  homeBottomCardToucbableOpacity: {
    // aspectRatio: 1.5,
    // justifyContent: "space-evenly",
    // backgroundColor: theme.colors.secondaryContainer,
    // borderRadius: 10,
    // flex: 1,
    // paddingHorizontal: 5
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 16
  },
  sectionHeaderText: {
    marginLeft: 10,
    fontWeight: 'bold'
  }
});
