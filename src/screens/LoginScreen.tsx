import { useState, useContext } from 'react'
import { View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { styles } from '../StyleSheet.tsx'
import SignInContext from '../SignInContext.tsx'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserSettingsContext from '../UserSettingsContext.tsx';

export function LoginScreen() {

    const [tempUserName, setTempUserName] = useState('');
    const [password, setPassword] = useState('');

    const contextValue = useContext(SignInContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);;
        return;
    }
    const { isSignedIn, setIsSignedIn } = contextValue;

    const settingsContextValue = useContext(UserSettingsContext);
    if (!settingsContextValue) {
        console.log("error getting project list:", settingsContextValue);;
        return;
    }
    const { username, setUserName } = settingsContextValue;

    const handleLogin = () => {
        setUserName(tempUserName)
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flex: 0.3, justifyContent: "center", paddingHorizontal: 25 }}>
                <Text variant='headlineLarge'>Welcome!  </Text>
                <Text variant='headlineSmall'> Lets Create an Account  </Text>
            </View>

            <View style={{ flex: 0.7, justifyContent: "flex-start", paddingHorizontal: 25 }}>


                <TextInput
                    label="Username"
                    value={tempUserName}
                    onChangeText={setTempUserName}
                    mode="outlined"
                    style={{ marginBottom: 16 }}
                    autoCapitalize="none"
                />

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    style={{ marginBottom: 16 }}
                    secureTextEntry={true}
                />

                <Button style={{ marginTop: 16 }} mode="text" onPress={() => {  }}>
                    Already have an account? Log in
                </Button>

                <Button mode="contained" onPress={handleLogin} style={{ marginTop: 2 }}>
                    Sign Up
                </Button>

                <Button mode="text" onPress={() => {  }}>
                    Sign Up Later
                </Button>
            </View>
        </SafeAreaView>
    );
}