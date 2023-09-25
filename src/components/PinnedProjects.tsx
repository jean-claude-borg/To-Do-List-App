import { Text, IconButton, useTheme } from 'react-native-paper'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import { projectListContext } from '../reducers/projectListReducer.tsx';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppTheme } from '../StyleSheet.tsx';
import * as Types from '../types/types.tsx';


export function PinnedProjects() {

    const contextValue = useContext(projectListContext);
    if(!contextValue)
    {
        console.log("error getting project list:", contextValue);
        return;
    }
    
    const theme = useAppTheme();
    if (!theme) return null; 
    const { colors } = theme;
    
    const navigation = useNavigation<StackNavigationProp<Types.UnifiedParamList, 'Task Groups'>>();

    const { projectList, dispatch } = contextValue;
    const pinnedProjects = projectList.projects.filter(project => project.pinned);

    return (
        <View style={{ flex: 0.23, paddingHorizontal: 10, paddingTop:15 }}>
            <View style={{ paddingHorizontal: 10, marginBottom: 0 }}>
                <Text variant={"titleSmall"}>Pinned Projects</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 2 }}>
                {pinnedProjects.map((project, index) => {
                    const completedTasks = project.tasks ? project.tasks.filter(task => task.completed).length : 0;
                    const totalTasks = project.tasks ? project.tasks.length : 0;
                    return (
                        <View key={index} style={{ width: 160, marginRight: 0, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Project View", { projectID: project.projectID })}
                                style={{
                                    height: "80%",
                                    width: "95%",
                                    borderRadius: 10,
                                    justifyContent: "space-evenly",
                                    alignItems: 'center',
                                    backgroundColor: colors.tertiaryContainer,
                                    paddingVertical: 10,
                                    paddingHorizontal: 5,
                                    elevation: 3,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 2,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: "bold",
                                        color: colors.onTertiaryContainer
                                    }}
                                    numberOfLines={3}
                                >
                                    {project.title}
                                </Text>

                                <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-end", paddingRight: 7 }}>
                                    <Text
                                        style={{
                                            fontSize: 11,
                                            color: colors.onTertiaryContainer
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
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    )

}