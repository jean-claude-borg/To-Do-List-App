import { useContext } from 'react';
import { Surface, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Types from '../types/types.tsx';
import { ProjectView } from './ProjectView.tsx';
import { projectListContext } from '../reducers/projectListReducer.tsx';
import { View, TouchableOpacity } from 'react-native';
import { styles, useAppTheme } from '../StyleSheet.tsx';
import { Page2, Page3, Page4, Page5 } from '../screens/tempScreens.tsx'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PinnedProjects } from '../components/PinnedProjects.tsx';
import { AllProjectsList } from '../components/AllProjectsList.tsx';
import { HomeScreenNewButton } from '../components/HomeScreenNewButton.tsx';

const Stack = createNativeStackNavigator();

function ProjectViewWrapper(props: any) {
    return <ProjectView {...props} />;
}

function formatDate(date: Date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[date.getDay()];
    const dateNumber = date.getDate();
    const monthName = months[date.getMonth()];

    let suffix = 'th';
    if (dateNumber === 1 || dateNumber === 21 || dateNumber === 31) {
        suffix = 'st';
    } else if (dateNumber === 2 || dateNumber === 22) {
        suffix = 'nd';
    } else if (dateNumber === 3 || dateNumber === 23) {
        suffix = 'rd';
    }
    return `${dayName} ${dateNumber}${suffix} ${monthName}`;
}

export function ProjectNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "left",
                animationTypeForReplace: "push",
                animation: "fade",
                animationDuration: 0,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 18
                },
            }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={ProjectsScreen}
                options={{
                    headerTitle: () => (
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Welcome</Text>
                            <Text style={{ fontSize: 14, paddingLeft: 1 }}>It's {formatDate(new Date())}</Text>
                        </View>
                    ),
                    headerRight: () => (
                        <HomeScreenNewButton />
                    )
                }}
            />
            <Stack.Screen name="Project View" component={ProjectViewWrapper} />
            <Stack.Screen name="Pinned Tasks" component={Page2} />
            <Stack.Screen name="Completed Tasks" component={Page3} />
            <Stack.Screen name="Upcoming Tasks" component={Page4} />
            <Stack.Screen name="Todays Tasks" component={Page5} />
        </Stack.Navigator>
    )
}

function doDatesMatch(date1: Date, date2: Date): boolean {

    if (date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()) { return true; }

    return false;
}

function TodaysTasksCard() {

    const navigation = useNavigation<StackNavigationProp<Types.UnifiedParamList, 'Todays Tasks'>>();
    const theme = useAppTheme();
    if (!theme) return null; 
    const { colors } = theme;
    
    const contextValue = useContext(projectListContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);;
        return;
    }
    const { projectList, dispatch } = contextValue;

    let todaysTasksCount = 0;
    const todaysDate = new Date();
    projectList.projects.forEach(project => {
        project.tasks.forEach(task => {
            if (doDatesMatch(task.dueDate, todaysDate))
                todaysTasksCount++;
        });
    });

    return (
        <TouchableOpacity
            style={{aspectRatio: 1.5,
                    justifyContent: "space-evenly",
                    backgroundColor: colors.secondaryContainer,
                    borderRadius: 10,
                    flex: 1,
                    paddingHorizontal: 5}}
            onPress={() => navigation.navigate("Todays Tasks")}
        >
            <Text style={{ textAlign: 'center', paddingHorizontal: 5, fontWeight: "bold", color: colors.onSecondaryContainer }}>
                {todaysTasksCount}
            </Text>
            <Text style={{ textAlign: 'center', paddingHorizontal: 2, fontWeight: "normal", color: colors.onSecondaryContainer, fontSize: 12 }} numberOfLines={5}>
                Tasks Due Today
            </Text>
        </TouchableOpacity>
    );
}

function isDateUpcoming(date1: Date, tomorrow: Date): boolean {
    const tempTomorrow = tomorrow;
    const tempDate = date1;

    // This approach to check if a date is upcoming(within one week excluding the current day) does so by specifying a range of dates 
    // in milliseconds that an upcoming task would need to be within
    const oneWeekFromToday = new Date();
    oneWeekFromToday.setDate(tempTomorrow.getDate() + 6);

    // Normalise the time so that only the date is considered
    tempTomorrow.setHours(0, 0, 0, 0);
    tempDate.setHours(0, 0, 0, 0);
    oneWeekFromToday.setHours(0, 0, 0, 0);

    if ((tempDate >= tempTomorrow) && (tempDate <= oneWeekFromToday))
        return true;

    return false;
}

function UpcomingTasksCard() {

    const navigation = useNavigation<StackNavigationProp<Types.UnifiedParamList, 'Upcoming Tasks'>>();
    const theme = useAppTheme();
    if (!theme) return null; 
    const { colors } = theme;

    const contextValue = useContext(projectListContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);;
        return;
    }
    const { projectList, dispatch } = contextValue;

    let upcomingTasksCount = 0;
    const todaysDate = new Date();
    const tomorrowsDate = new Date();
    tomorrowsDate.setDate(todaysDate.getDate() + 1)
    projectList.projects.forEach(project => {
        project.tasks.forEach(task => {
            if (isDateUpcoming(task.dueDate, tomorrowsDate))
                upcomingTasksCount++;
        });
    });

    return (
        <TouchableOpacity
            style={{aspectRatio: 1.5,
                    justifyContent: "space-evenly",
                    backgroundColor: colors.secondaryContainer,
                    borderRadius: 10,
                    flex: 1,
                    paddingHorizontal: 5}}
            onPress={() => navigation.navigate("Todays Tasks")}
        >
            <Text style={{ textAlign: 'center', paddingHorizontal: 5, fontWeight: "bold", color: colors.onSecondaryContainer }}>
                {upcomingTasksCount}
            </Text>
            <Text style={{ textAlign: 'center', paddingHorizontal: 2, fontWeight: "normal", color: colors.onSecondaryContainer, fontSize: 12 }} numberOfLines={5}>
                Upcoming Tasks
            </Text>
        </TouchableOpacity>
    );
}

function PinnedTasksCard() {

    const navigation = useNavigation<StackNavigationProp<Types.UnifiedParamList, 'Pinned Tasks'>>();
    const theme = useAppTheme();
    if (!theme) return null; 
    const { colors } = theme;

    const contextValue = useContext(projectListContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);;
        return;
    }
    const { projectList, dispatch } = contextValue;

    let pinnedTasksCount = 0;
    projectList.projects.forEach(project => {
        project.tasks.forEach(task => {
            if (task.pinned)
                pinnedTasksCount++;
        });
    });

    return (
        <TouchableOpacity
            style={{aspectRatio: 1.5,
                    justifyContent: "space-evenly",
                    backgroundColor: colors.secondaryContainer,
                    borderRadius: 10,
                    flex: 1,
                    paddingHorizontal: 5}}
            onPress={() => navigation.navigate("Todays Tasks")}
        >
            <Text style={{ textAlign: 'center', paddingHorizontal: 5, fontWeight: "bold", color: colors.onSecondaryContainer }}>
                {pinnedTasksCount}
            </Text>
            <Text style={{ textAlign: 'center', paddingHorizontal: 2, fontWeight: "normal", color: colors.onSecondaryContainer, fontSize: 12 }} numberOfLines={5}>
                Pinned Tasks
            </Text>
        </TouchableOpacity>
    );
}

export function ProjectsScreen() {

    const theme = useAppTheme();
    if (!theme) return null; 
    const { colors } = theme;

    return (
        <Surface style={{ flex: 1, backgroundColor: colors.background }}>

            <AllProjectsList />
            <PinnedProjects />

            <View style={{ display: "flex", flex: 0.1, gap: 5, paddingHorizontal: 15, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingVertical: 15 }}>
                <PinnedTasksCard />
                <UpcomingTasksCard />
                <TodaysTasksCard />
            </View>

        </Surface>
    );
}