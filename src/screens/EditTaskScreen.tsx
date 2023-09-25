import * as Types from '../types/types.tsx'
import { Platform, KeyboardAvoidingView, View } from 'react-native'
import { Modal, Portal, Card, TextInput, IconButton, Button, Menu, useTheme, HelperText } from 'react-native-paper'
import { useState, useContext, useEffect } from 'react'
import { projectListContext } from '../reducers/projectListReducer.tsx';
import { useAppTheme } from '../StyleSheet.tsx';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

function PriorityButton({ isPriorityMenuVisible, setPriorityMenuVisible, selectedPriority, setSelectedPriority }: Types.PriorityButtonProps_T) {

    let priority = null;
    if (selectedPriority === 1)
        priority = "Low"
    else if (selectedPriority === 2)
        priority = "Normal"
    else
        priority = "High"

    return (
        <Menu
            style={{ paddingTop: 2, borderRadius: 5, width: 160 }}
            visible={isPriorityMenuVisible}
            onDismiss={() => setPriorityMenuVisible(false)}
            anchorPosition='bottom'
            anchor={
                <Button
                    mode={"elevated"}
                    icon={"menu-down"}
                    contentStyle={{ flexDirection: 'row-reverse' }}
                    style={{
                        borderRadius: 5,
                        marginTop: 15,
                        width: 160,
                    }}
                    onPress={() => setPriorityMenuVisible(true)}>
                    {priority} Priority
                </Button>
            }
        >
            <Menu.Item
                onPress={() => {
                    setSelectedPriority(3);
                    setPriorityMenuVisible(false);
                }}
                title="High" />
            <Menu.Item
                onPress={() => {
                    setSelectedPriority(2);
                    setPriorityMenuVisible(false);
                }}
                title="Normal" />
            <Menu.Item
                onPress={() => {
                    setSelectedPriority(1);
                    setPriorityMenuVisible(false);
                }}
                title="Low" />
        </Menu>
    );
}

function StartDateButton({ isStartDateMenuVisible, setStartDateMenuVisible, startDate, setStartDate, setStartDatePickerVisible }: Types.StartDateButtonProps_T) {

    const setToday = () => {
        setStartDate(new Date());
    };

    const setNextWeek = () => {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        setStartDate(nextWeek);
    };

    const setNextMonth = () => {
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setStartDate(nextMonth);
    };

    return (
        <Menu
            style={{ paddingTop: 2, borderRadius: 5, width: 125 }}
            visible={isStartDateMenuVisible}
            onDismiss={() => setStartDateMenuVisible(false)}
            anchorPosition='bottom'
            anchor={
                <Button
                    mode={"elevated"}
                    icon={"menu-down"}
                    contentStyle={{ flexDirection: 'row-reverse' }}
                    style={{
                        borderRadius: 5,
                        marginTop: 15,
                        width: 125,
                    }}
                    onPress={() => setStartDateMenuVisible(true)}>
                    {startDate === null ? "Start Date" : startDate.toLocaleDateString()}
                </Button>
            }
        >
            <Menu.Item
                onPress={() => {
                    setToday();
                    setStartDateMenuVisible(false);
                }}
                title="Today" />
            <Menu.Item
                onPress={() => {
                    setNextWeek();
                    setStartDateMenuVisible(false);
                }}
                title="Next Week" />
            <Menu.Item
                onPress={() => {
                    setNextMonth();
                    setStartDateMenuVisible(false);
                }}
                title="Next Month" />
            <Menu.Item
                onPress={() => {
                    setStartDatePickerVisible(true);
                    setStartDateMenuVisible(false);
                }}
                title="Custom" />
        </Menu>
    );
}

function DueDateButton({ isDueDateMenuVisible, setDueDateMenuVisible, dueDate, setDueDate, setDueDatePickerVisible }: Types.DueDateButtonProps_T) {

    const setToday = () => {
        setDueDate(new Date());
    };

    const setNextWeek = () => {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        setDueDate(nextWeek);
    };

    const setNextMonth = () => {
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setDueDate(nextMonth);
    };

    return (
        <Menu
            style={{ paddingTop: 2, borderRadius: 5, width: 125 }}
            visible={isDueDateMenuVisible}
            onDismiss={() => setDueDateMenuVisible(false)}
            anchorPosition='bottom'
            anchor={
                <Button
                    mode={"elevated"}
                    icon={"menu-down"}
                    contentStyle={{ flexDirection: 'row-reverse' }}
                    style={{
                        borderRadius: 5,
                        marginTop: 7,
                        width: 125,
                    }}
                    onPress={() => setDueDateMenuVisible(true)}>
                    {dueDate === null ? "Due Date" : dueDate.toLocaleDateString()}
                </Button>
            }
        >
            <Menu.Item
                onPress={() => {
                    setToday();
                    setDueDateMenuVisible(false);
                }}
                title="Today" />
            <Menu.Item
                onPress={() => {
                    setNextWeek();
                    setDueDateMenuVisible(false);
                }}
                title="Next Week" />
            <Menu.Item
                onPress={() => {
                    setNextMonth();
                    setDueDateMenuVisible(false);
                }}
                title="Next Month" />
            <Menu.Item
                onPress={() => {
                    setDueDatePickerVisible(true);
                    setDueDateMenuVisible(false);
                }}
                title="Custom" />
        </Menu>
    );
}

export function EditTaskModal({ isEditTaskScreenVisible, setEditTaskScreenVisible, projectID, task }: Types.EditTaskModalProps_T) {

    const [isPriorityMenuVisible, setPriorityMenuVisible] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState(task.priority | 2);

    const [isStartDateMenuVisible, setStartDateMenuVisible] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(task.startDate);

    const [isDueDateMenuVisible, setDueDateMenuVisible] = useState(false);
    const [dueDate, setDueDate] = useState<Date | null>(task.dueDate);

    const [taskTitle, setTaskTitle] = useState(task.title);
    const [titleError, setTitleError] = useState(false);
    const [taskDescription, setTaskDescription] = useState(task.description);

    const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [dueDatePickerVisible, setDueDatePickerVisible] = useState(false);

    const theme = useAppTheme();
    if (!theme) return null; 
    const { colors } = theme;

    const setDueDateFromPicker = (event: DateTimePickerEvent, date?: Date) => {
        const { type } = event;
        if (type === "set" && date) {
            setDueDate(date);
            setDueDatePickerVisible(false);
        }
        if (type === "dismissed")
            setDueDatePickerVisible(false);
    };

    const setStartDateFromPicker = (event: DateTimePickerEvent, date?: Date) => {
        const { type } = event;
        if (type === "set" && date) {
            setStartDate(date);
            setStartDatePickerVisible(false);
        }
        if (type === "dismissed")
            setStartDatePickerVisible(false);
    };

    useEffect(() => {
        setTitleError(false);
    }, [isEditTaskScreenVisible]); //resets relevant variables every time modal is opened

    const contextValue = useContext(projectListContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);;
        return;
    }
    const { projectList, dispatch } = contextValue;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} //documentation recommends setting behaviour differently between ios and android
            style={{ flex: 1 }}
        >
            <Portal>
                <Modal
                    visible={isEditTaskScreenVisible}
                    onDismiss={() => setEditTaskScreenVisible(false)}
                    contentContainerStyle={{ marginHorizontal: '5%', borderRadius: 20, overflow: "hidden" }}
                >
                    <Card mode={"contained"} style={{ width: "100%" }}>
                        <Card.Content>
                            <TextInput
                                label="Title"
                                mode="outlined"
                                value={taskTitle}
                                dense={true}
                                style={{ marginTop: 5, fontSize: 15 }}
                                onChangeText={text => {
                                    setTitleError(false);
                                    setTaskTitle(text);
                                }}
                                error={titleError}
                            />
                            <HelperText type="error" visible={titleError} style={{ marginTop: -5, marginBottom: 0 }}>
                                *Task title is required!
                            </HelperText>
                            <TextInput
                                label="Description"
                                mode="outlined"
                                multiline={true}
                                numberOfLines={5}
                                dense={false}
                                value={taskDescription ? taskDescription : ""}
                                onChangeText={setTaskDescription}
                                style={{ marginTop: -9, fontSize: 14, textAlignVertical: "center" }}
                            />
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <StartDateButton isStartDateMenuVisible={isStartDateMenuVisible}
                                    setStartDateMenuVisible={setStartDateMenuVisible}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    setStartDatePickerVisible={setStartDatePickerVisible}
                                />
                                <PriorityButton isPriorityMenuVisible={isPriorityMenuVisible}
                                    setPriorityMenuVisible={setPriorityMenuVisible}
                                    selectedPriority={selectedPriority}
                                    setSelectedPriority={setSelectedPriority}
                                />
                            </View>
                            <DueDateButton isDueDateMenuVisible={isDueDateMenuVisible}
                                setDueDateMenuVisible={setDueDateMenuVisible}
                                dueDate={dueDate}
                                setDueDate={setDueDate}
                                setDueDatePickerVisible={setDueDatePickerVisible}
                            />

                        </Card.Content>
                        <Card.Actions style={{ marginTop: 35, flexDirection: "row" }}>
                            <IconButton
                                icon={"trash-can-outline"}
                                iconColor={colors.error}
                                style={{ borderColor: "transparent" }}
                                onPress={() => {
                                    dispatch({
                                        type: "DELETE_TASK",
                                        projectID: projectID,
                                        taskID: task.id,
                                    });
                                    setEditTaskScreenVisible(false);
                                }} />
                            <Button textColor={colors.onPrimaryContainer}
                                buttonColor={colors.primaryContainer}
                                style={{ borderWidth: 0.5, borderColor: colors.inverseSurface }}
                                onPress={() => {
                                    if (!taskTitle.trim()) {
                                        setTitleError(true);
                                        return;
                                    }
                                    dispatch({
                                        type: "EDIT_TASK",
                                        projectID: projectID,
                                        taskID: task.id,
                                        title: taskTitle,
                                        description: taskDescription ? taskDescription.trim() : null,
                                        startDate: !startDate ? new Date(0) : startDate,
                                        dueDate: !dueDate ? new Date(0) : dueDate,
                                        priority: selectedPriority,
                                    });
                                    setEditTaskScreenVisible(false);
                                }}>
                                Save Changes
                            </Button>
                        </Card.Actions>
                    </Card>
                </Modal>
            </Portal>
            {dueDatePickerVisible &&
                <DateTimePicker
                    testID="dueDatePicker"
                    value={new Date()}
                    mode={"date"}
                    themeVariant="dark" //only works for ios 
                    accentColor={colors.primary} //only works for ios 
                    textColor={colors.onPrimary} //only works for ios 
                    onChange={setDueDateFromPicker}
                />
            }
            {startDatePickerVisible &&
                <DateTimePicker
                    testID="startDatePicker"
                    value={new Date()}
                    mode={"date"}
                    themeVariant="dark" //only works for ios 
                    accentColor={colors.primary} //only works for ios 
                    textColor={colors.onPrimary} //only works for ios 
                    onChange={setStartDateFromPicker}
                />
            }
        </KeyboardAvoidingView>
    );
}