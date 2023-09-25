import { useState, useContext, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Searchbar, List, useTheme, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import { projectListContext } from '../reducers/projectListReducer.tsx';
import * as Types from '../types/types.tsx';
import { useAppTheme } from '../StyleSheet.tsx';

function searchProjects(query: string, projectList: Types.ProjectList_T): Types.Project_T[] | null {

    if (!query)
        return null;

    const results: Types.Project_T[] = [];
    projectList.projects.forEach(project => {
        // Searches for matching project titles
        if (project.title.toLowerCase().includes(query.toLowerCase())) {
            results.push(project);
        }
    });

    return results;
}

function searchTasks(query: string, projectList: Types.ProjectList_T): { projectID: number, task: Types.Task_T }[] | null {

    if (!query)
        return null;

    const results: { projectID: number, task: Types.Task_T }[] = [];
    projectList.projects.forEach(project => {
        // searches for matching tasks
        project.tasks.forEach(task => {
            if (!task.description) return;
            if (task.title.toLowerCase().includes(query.toLowerCase()) ||
                task.description.toLowerCase().includes(query.toLowerCase())) {
                results.push({ projectID: project.projectID, task: task });
            }
        });
    });
    return results;
}

function HighlightedText({ text, searchTerm }: { text: string, searchTerm: string }) {

    // finds all instances of the search term, ignores case
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);

    const { colors } = useTheme();
    
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {parts.map((part, index) => (
                <Text
                    key={index}
                    style={
                        part.toLowerCase() === searchTerm.toLowerCase()
                            ? { backgroundColor: colors.inversePrimary } // Highlight style
                            : {}
                    }>
                    {part}
                </Text>
            ))}
        </View>
    );
}

function ProjectsSearchDisplayList({ resultsProjects, searchQuery }: Types.ProjectsSearchDisplayListProps_T) {

    const theme = useTheme();

    return (
        <List.Section title={`Projects - ${resultsProjects.length} Matches`}
            titleStyle={{ fontWeight: "bold" }}
            style={{ backgroundColor: theme.colors.surfaceVariant, borderRadius: 10 }}>
            {resultsProjects.map((project, index) => (
                <List.Item key={index}
                    left={props => <List.Icon {...props} icon="folder" />}
                    title={<HighlightedText text={project.title} searchTerm={searchQuery} />}
                />
            ))}
        </List.Section>
    )
}

function TasksSearchDisplayList({ resultsTasks, searchQuery }: Types.TasksSearchDisplayListProps_T) {

    const theme = useTheme();

    const navigation = useNavigation<StackNavigationProp<Types.UnifiedParamList, 'Project View'>>();

    const contextValue = useContext(projectListContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);;
        return null;
    }
    const { projectList } = contextValue;

    return (
        <List.Section title={`Tasks - ${resultsTasks.length} Matches`}
            titleStyle={{ fontWeight: "bold" }}
            style={{ backgroundColor: theme.colors.surfaceVariant, marginTop: 5, borderRadius: 10 }}>
            {resultsTasks.map((arrayItem, index) => (
                <List.Item key={index}
                    left={props => (
                        <View style={{ justifyContent: 'center' }}>
                            <List.Icon {...props} icon="note-text" />
                        </View>
                    )}
                    right={props => (
                        <View style={{ justifyContent: 'center' }}>
                            <List.Icon {...props} icon="chevron-right" />
                        </View>
                    )}
                    title={<HighlightedText text={arrayItem.task.title} searchTerm={searchQuery} />}
                    descriptionStyle={{ paddingLeft: 5 }}
                    description={"In " + projectList.projects.find(project => project.projectID === arrayItem.projectID)?.title || "Unknown Project"}
                    onPress={() => navigation.navigate("Project View", { projectID: arrayItem.projectID })}
                />
            ))}
        </List.Section>
    )
}

export function SearchScreen() {

    const contextValue = useContext(projectListContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);;
        return;
    }
    const { projectList, dispatch } = contextValue;

    const [searchQuery, setSearchQuery] = useState('');
    const [resultsProjects, setResultsProjects] = useState<Types.Project_T[] | null>(null);
    const [resultsTasks, setResultsTasks] = useState<{ projectID: number, task: Types.Task_T }[] | null>(null);

    const debounceTimer = useRef<any>(null);

    const handleSearch = (text: any) => {
        setSearchQuery(text);

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            setResultsProjects(searchProjects(text, projectList));
            setResultsTasks(searchTasks(text, projectList));
        }, 250);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 10 }}>
                <Searchbar
                    placeholder="Search"
                    value={searchQuery}
                    style={{ borderRadius: 12 }}
                    onChangeText={handleSearch}
                />
                {(!resultsProjects || resultsProjects.length === 0) && (!resultsTasks || resultsTasks.length === 0) && (
                    <></>
                )}
                <ScrollView style={{ paddingTop: 15, paddingHorizontal: 2 }}>
                    {
                        resultsProjects &&
                        <ProjectsSearchDisplayList resultsProjects={resultsProjects} searchQuery={searchQuery} />
                    }
                    {
                        resultsTasks &&
                        <TasksSearchDisplayList resultsTasks={resultsTasks} searchQuery={searchQuery} />
                    }
                    {
                        !resultsProjects && !resultsTasks &&
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                            <Text> Search For Some Projects or Tasks! </Text>
                        </View>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}