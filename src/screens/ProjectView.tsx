import * as Types from '../types/types.tsx'
import { ScrollView, Animated, Dimensions, View, Easing } from 'react-native'
import { useState, useRef, useEffect, useContext } from 'react'
import { Surface, Text, Divider, List, IconButton, FAB, Card } from 'react-native-paper';
import { projectListContext } from '../reducers/projectListReducer.tsx';
import { CreateTaskModal } from './CreateTaskScreen.tsx';
import { EditTaskModal } from './EditTaskScreen.tsx';
import { ProjectViewMenuButton } from '../components/ProjectViewMenuButton.tsx';

const listItemHeight = 65;

function TaskExpandedContent({ task, heightToAnimate, setHeightToAnimate, setEditTaskScreenVisible, setTaskToEdit }: Types.TaskComponentExpandedProps) {

    const startDate = task.startDate.getDate() === new Date(0).getDate() ? "" : task.startDate.toLocaleDateString();
    const dueDate = task.dueDate.getDate() === new Date(0).getDate() ? "" : task.dueDate.toLocaleDateString();

    let priority = null;
    if (task.priority === 3) { priority = "High" }
    else if (task.priority === 1) { priority = "Low" }
    else { priority = "Normal" }

    return (
        <View
            onLayout={(event) => {
                var { x, y, width, height } = event.nativeEvent.layout;
                if (Math.abs(height - heightToAnimate) > 10) {
                    setHeightToAnimate(height);
                }
            }}
            style={{
                minHeight: 50,
                padding: 0,
                paddingBottom: 0,
                paddingTop: 0,
                justifyContent: 'space-between',
            }}
        >
            <Card mode='contained' style={{ padding: 10, borderRadius: 0, paddingBottom: 0 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Description</Text>
                    <Text style={{ fontSize: priority === "High" ? 14 : (priority === "Medium" ? 13 : 12), fontWeight: priority === "High" ? "bold" : "normal" }}>{priority} Priority</Text>
                </View>
                <Text variant='bodyMedium' style={{ marginTop: 2 }}>{task.description || "No description provided."}</Text>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 15, marginBottom: 0 }}>
                    <View style={{ flexDirection: "row", gap: 25 }}>
                        <Text>Start: {startDate}</Text>
                        <Text>Due: {dueDate}</Text>
                    </View>
                    <IconButton icon="border-color" size={22}
                        style={{ alignSelf: "flex-end", marginRight: 12 }}
                        onPress={() => {
                            setTaskToEdit(task);
                            setEditTaskScreenVisible(true)
                        }}
                    />
                </View>
            </Card>
        </View>

    )

}

function TaskComponent({ task, setEditTaskScreenVisible, setTaskToEdit }: Types.TaskComponentProps) {

    const [isExpanded, setIsExpanded] = useState(false); // each list items keeps track of its own expanded state
    const [heightToAnimate, setHeightToAnimate] = useState(0);
    const animationValue = useRef(new Animated.Value(0)).current;  // Animated value ranging from 0 (collapsed) to 1 (expanded)

    const contextValue = useContext(projectListContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);;
        return;
    }
    const { projectList, dispatch } = contextValue;

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const completionAnimationValue = useRef(new Animated.Value(task.completed ? 1 : 0)).current;

    // Calculate opacity for the ticked icon
    const animatedIconOpacity = completionAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    // Calculate scale for the pop-in effect
    const animatedIconScale = completionAnimationValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1.4, 1]  // Pop in and settle effect
    });

    const handleCompletion = () => {
        dispatch({ type: "TOGGLE_TASK_COMPLETE", taskID: task.id });
    };
    const handlePinned = () => {
        dispatch({ type: "TOGGLE_TASK_PINNED", taskID: task.id });
    };

    useEffect(() => {
        Animated.timing(completionAnimationValue, {
            toValue: task.completed ? 1 : 0,
            duration: 750,
            useNativeDriver: true,
            easing: Easing.elastic(1)
        }).start();
    }, [task.completed]);

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: isExpanded ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isExpanded]);

    const animatedViewHeight = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, heightToAnimate || 0]  // Adjusts the values to fit the content size
    });

    return (
        <>
            <List.Item
                title={task.title}
                style={{ height: listItemHeight, justifyContent: "center" }}
                left={props => (
                    <IconButton {...props} icon={task.pinned ? "star" : "star-outline"} onPress={handlePinned} />
                )}
                right={props => (
                    <View style={{ flexDirection: 'row' }}>
                        <IconButton {...props} icon="checkbox-blank-circle-outline" onPress={handleCompletion} />
                        <Animated.View style={{ position: 'absolute', opacity: animatedIconOpacity, transform: [{ scale: animatedIconScale }] }}>
                            <IconButton {...props} icon="check-circle-outline" onPress={handleCompletion} />
                        </Animated.View>
                    </View>
                )}
                onPress={toggleExpansion}
            />
            <Animated.View style={{ height: animatedViewHeight, overflow: 'hidden' }}>
                <TaskExpandedContent task={task} heightToAnimate={heightToAnimate}
                    setHeightToAnimate={setHeightToAnimate}
                    setEditTaskScreenVisible={setEditTaskScreenVisible}
                    setTaskToEdit={setTaskToEdit} />
            </Animated.View>
            <Divider bold={true}></Divider>
        </>
    )
}

export function ProjectView({ route, navigation }: Types.ProjectViewProps) {

    const [isCreateTaskScreenVisible, setCreateTaskScreenVisible] = useState(false);
    const [isEditTaskScreenVisible, setEditTaskScreenVisible] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Types.Task_T>();
    const [showCompletedTasks, setShowCompletedTasks] = useState(true);

    const contextValue = useContext(projectListContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);;
        return;
    }
    const { projectList, dispatch } = contextValue;

    const projectID = route.params.projectID;
    const project = projectList.projects.find(mappedProject => mappedProject.projectID === projectID);
    if (!project) {
        console.log("error finding project");
        return;
    }

    const screenHeight = Dimensions.get('window').height;
    const maxNumberOfDividers = screenHeight / listItemHeight;
    const numberOfTasks = project.tasks.length;
    const numberOfDividersToDraw = maxNumberOfDividers - numberOfTasks;

    const spaceTakenByTasks = numberOfTasks * listItemHeight;
    const spaceTakenByDividers = Math.floor(numberOfDividersToDraw) * listItemHeight;
    const remainingSpace = screenHeight - spaceTakenByTasks - spaceTakenByDividers;

    useEffect(() => {
        navigation.setOptions({
            title: project.title,
            headerTitleStyle: {
                fontSize: 15,
            },
            headerRight: () => (
                <ProjectViewMenuButton project={project} showCompletedTasks={showCompletedTasks} setShowCompletedTasks={setShowCompletedTasks} />
            )
        });
    }, [navigation, project.title, showCompletedTasks]);

    return (
        <>
            <ScrollView>
                <Divider bold={true}></Divider>
                {showCompletedTasks &&
                    project.tasks.map((task, index) => {
                        return <TaskComponent key={index} task={task} setEditTaskScreenVisible={setEditTaskScreenVisible} setTaskToEdit={setTaskToEdit} />
                    })
                }
                {!showCompletedTasks &&
                    project.tasks
                        .filter(task => !task.completed)
                        .map((task, index) => {
                            return <TaskComponent key={index} task={task} setEditTaskScreenVisible={setEditTaskScreenVisible} setTaskToEdit={setTaskToEdit} />
                        })
                }
                {
                    // fills the rest of the screen with dividers(to make the page look like a lined paper instead of just being empty)
                    [...Array(Math.floor(numberOfDividersToDraw - 1))].map((_, index) => (
                        <Surface key={index} style={{ minHeight: listItemHeight }}>
                            <Divider bold={true} />
                        </Surface>
                    ))

                }
                <Surface style={{ minHeight: remainingSpace }}>
                    <Divider bold={true} />
                </Surface>
            </ScrollView>
            <FAB
                icon="plus"
                mode={"elevated"}
                customSize={65}
                variant='primary'
                style={{
                    position: 'absolute',
                    margin: 30,
                    right: 0,
                    bottom: 0, borderRadius: 50
                }}
                onPress={() => {
                    setCreateTaskScreenVisible(true);
                }}
            />
            <CreateTaskModal isCreateTaskScreenVisible={isCreateTaskScreenVisible} setCreateTaskScreenVisible={setCreateTaskScreenVisible} projectID={projectID} />

            {isEditTaskScreenVisible &&
                <EditTaskModal isEditTaskScreenVisible={isEditTaskScreenVisible}
                    setEditTaskScreenVisible={setEditTaskScreenVisible}
                    projectID={projectID}
                    task={taskToEdit} />
            }
        </>
    );
}