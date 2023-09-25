import React from 'react';

const defaultState = {
    username: "Guest",
    setUserName: () => {},
    email: "",
    setEmailName: () => {},
    darkMode: false,
    setDarkMode: () => {},
    colourScheme: false,
    setColourScheme: () => {},
    defaultListView: true,
    setDefaultListView: () => {},
    signUpLater: false,
    setSignUpLater: () => {},
};

const UserSettingsContext = React.createContext<{
    username: string,
    setUserName: (username: string) => void,
    email: string,
    setEmailName: (email: string) => void,
    darkMode: boolean,
    setDarkMode: (darkMode: boolean) => void,
    colourScheme: boolean,
    setColourScheme: (colourScheme: boolean) => void,
    defaultListView: boolean,
    setDefaultListView: (defaultListView: boolean) => void,
    signUpLater: boolean,
    setSignUpLater: (state:boolean) =>void,
} | null>(defaultState);

export default UserSettingsContext;