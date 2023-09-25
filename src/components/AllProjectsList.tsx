import { Surface, Text, Button, IconButton, useTheme, Card } from 'react-native-paper'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { projectListContext } from '../reducers/projectListReducer.tsx';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Types from '../types/types.tsx';
import { useAppTheme } from '../StyleSheet.tsx';
import UserSettingsContext from '../UserSettingsContext.tsx'

function CardView() {

    const contextValue = useContext(projectListContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);
        return;
    }
    const { projectList, dispatch } = contextValue;

    const theme = useAppTheme();
    if (!theme) return null; 
    const { colors } = theme;

    const navigation = useNavigation<StackNavigationProp<Types.UnifiedParamList, 'Task Groups'>>();

    const [scrollViewWidth, setScrollViewWidth] = useState(0);

    return (
        <ScrollView onLayout={(event) => {
            const width = event.nativeEvent.layout.width;
            setScrollViewWidth(width);
        }}
            horizontal={false}
            style={{ alignContent: "center" }}>
            <Surface elevation={0} style={{ flexDirection: "row", flexWrap: "wrap", gap: scrollViewWidth * 0.02, justifyContent: "space-around", padding: 5 }}>
                {projectList.projects.map((project, index) => {
                    const completedTasks = project.tasks ? project.tasks.filter(task => task.completed).length : 0;
                    const totalTasks = project.tasks ? project.tasks.length : 0;

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate("Project View", { projectID: project.projectID })}
                            style={{
                                aspectRatio: 1.5,
                                width: scrollViewWidth * 0.47,
                                marginHorizontal: 0,
                                borderRadius: 10,
                                justifyContent: "space-evenly",
                                alignItems: 'center',
                                backgroundColor: colors.primaryContainer,
                                elevation: 3, // for Android
                                shadowColor: "#000", // for iOS
                                shadowOffset: { width: 0, height: 2 }, // for iOS
                                shadowOpacity: 0.1, // for iOS
                                shadowRadius: 2, // for iOS
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingHorizontal: 5,
                                    marginTop: 10,
                                    fontWeight: "bold",
                                    color: colors.onPrimaryContainer
                                }}
                                numberOfLines={5}
                            >
                                {project.title}
                            </Text>
                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-end", paddingRight: 9 }}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: colors.onPrimaryContainer
                                    }}
                                >
                                    {completedTasks}/{totalTasks} Tasks Done
                                </Text>
                                <IconButton
                                    icon={project.pinned ? "star" : "star-outline"}
                                    size={18}
                                    style={{ margin: 0, padding: 0, alignSelf: "flex-end" }}
                                    onPress={() => {
                                        dispatch({
                                            type: "TOGGLE_PROJECT_PINNED",
                                            projectID: project.projectID,
                                        });
                                    }} />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </Surface>
        </ScrollView>
    )
}

function ListView() {

    const contextValue = useContext(projectListContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);
        return;
    }
    const { projectList, dispatch } = contextValue;

    const theme = useAppTheme();
    if (!theme) return null; 
    const { colors } = theme;

    const navigation = useNavigation<StackNavigationProp<Types.RootStackParamList, 'Task Groups'>>();

    return (
        <ScrollView style={{ alignContent: "center", padding:5 }}>
            {projectList.projects.map((project, index) => {
                const completedTasks = project.tasks ? project.tasks.filter(task => task.completed).length : 0;
                const totalTasks = project.tasks ? project.tasks.length : 0;

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate("Project View", { projectID: project.projectID })}
                        style={{
                            width: '100%',
                            padding: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderBottomWidth: 1,
                            borderColor: 'gray',
                            backgroundColor: colors.primaryContainer
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: colors.onPrimaryContainer
                                }}
                                numberOfLines={5}
                            >
                                {project.title}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: colors.onPrimaryContainer
                                }}
                            >
                                {completedTasks}/{totalTasks} Tasks Done
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <IconButton
                                icon={project.pinned ? "star" : "star-outline"}
                                size={18}
                                style={{ margin: 0, padding: 0 }}
                                onPress={() => {
                                    dispatch({
                                        type: "TOGGLE_PROJECT_PINNED",
                                        projectID: project.projectID,
                                    });
                                }} />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    )
}

export function AllProjectsList() {

    const contextValue = useContext(projectListContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);
        return;
    }
    const { projectList, dispatch } = contextValue;

    const settingsContextValue = useContext(UserSettingsContext);
    if (!settingsContextValue) {
        console.log("error getting project list:", settingsContextValue);;
        return;
    }
    const userSettings = settingsContextValue;

    const [projectViewProjectStyle, setProjectViewProjectStyle] = useState(userSettings.defaultListView ? "list" : "card");

    useEffect(() => {
        setProjectViewProjectStyle(userSettings.defaultListView ? "list" : "card")
      }, [userSettings.defaultListView]);

    return (
        <View style={{ flex: 0.67, paddingHorizontal: 10, paddingTop: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ paddingLeft: 10 }} variant={"titleSmall"}>Your {projectList.projects.length} Projects</Text>
                <View style={{ flexDirection: "row", marginRight: 0 }}>
                    <Button style={{ alignItems: "flex-end" }} onPress={() => setProjectViewProjectStyle('list')}>
                        {projectViewProjectStyle === 'list' && <Text>•</Text>}
                        <Text> List </Text>
                    </Button>
                    <Button onPress={() => setProjectViewProjectStyle('card')} style={{ justifyContent: "flex-end" }}>
                        {projectViewProjectStyle === 'card' && <Text>•</Text>}
                        <Text> Card </Text>
                    </Button>
                </View>
            </View>
            {
                projectViewProjectStyle === "card" &&
                <CardView />
            }
            {
                projectViewProjectStyle === "list" &&
                <ListView />
            }
        </View>
    )

}