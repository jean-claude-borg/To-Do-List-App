import { useReducer, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppTheme } from './StyleSheet.tsx'
import { ProjectNavigator } from './screens/TaskGroupsScreen.tsx'
import { Page2, Page5 } from './screens/tempScreens.tsx'
import { projectListContext, projectListReducer } from './reducers/projectListReducer.tsx';
import { sampleProjectList } from './sampleProjetcs.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SearchScreen } from './screens/SearchScreen.tsx';
import { SettingsScreen } from './screens/SettingsScreen.tsx';
import { LoginScreen } from './screens/LoginScreen.tsx'
import SignInContext from './SignInContext.tsx'
import UserSettingsContext from './UserSettingsContext.tsx'

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: { paddingBottom: 7, paddingTop: 3, height: "6.35%" },
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      })}
    >
      <BottomTab.Screen
        name="Projects"
        component={ProjectNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size - 5} />
          )
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size - 5} />
          )
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size - 5} />
          )
        }}
      />
    </BottomTab.Navigator>
  )
}

export function MainNavigator() {
  const [projectList, dispatch] = useReducer(projectListReducer, sampleProjectList);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const settingsContextValue = useContext(UserSettingsContext);
  if (!settingsContextValue) {
      console.log("error getting project list:", settingsContextValue);;
      return;
  }
  const { signUpLater, setSignUpLater } = settingsContextValue;

  let initialRoute;
  if (isSignedIn || signUpLater) {
    initialRoute = "App";
  } else {
    initialRoute = "Login";
  }

  const theme = useAppTheme();

  return (
    <SignInContext.Provider value={{ isSignedIn, setIsSignedIn }}>
        <projectListContext.Provider value={{ projectList, dispatch }}>
          <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName={initialRoute}>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="App"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </projectListContext.Provider>
    </SignInContext.Provider>
  )
}