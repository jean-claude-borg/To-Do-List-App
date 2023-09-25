import { Text, IconButton, Portal, Modal, Card, TextInput, Button, HelperText, useTheme, Menu } from 'react-native-paper'
import { Platform, KeyboardAvoidingView, View } from 'react-native'
import { useState, useContext, useEffect } from 'react'
import { projectListContext } from '../reducers/projectListReducer.tsx';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppTheme } from '../StyleSheet.tsx';
import * as Types from '../types/types.tsx'

function RenameProjectModal({ project, isRenameProjectModalVisible, setRenameProjectModalVisible}: Types.RenameProjectModalProps_T) {

    const theme = useAppTheme();
    if (!theme) return null; 
    const { colors } = theme;

    const contextValue = useContext(projectListContext);
    if (!contextValue) {
        console.log("error getting project list:", contextValue);;
        return;
    }
    const { projectList, dispatch } = contextValue;

    const [projectTitle, setProjectTitle] = useState(project.title);
    const [projectTitleError, setProjectTitleError] = useState(false);

    useEffect(() => {
        setProjectTitle(project.title);
    }, [project]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} //documentation recommends setting behaviour differently between ios and android
            style={{ flex: 1 }}
        >
            <Portal>
                <Modal
                    visible={isRenameProjectModalVisible}
                    onDismiss={() => setRenameProjectModalVisible(false)}
                    contentContainerStyle={{ marginHorizontal: '5%', borderRadius: 20, overflow: "hidden" }}
                >
                    <Card mode={"contained"} style={{ width: "100%" }}>
                        <Card.Content>
                            <TextInput
                                label="Title"
                                mode="outlined"
                                value={projectTitle}
                                style={{ marginTop: 0 }}
                                onChangeText={text => {
                                    setProjectTitleError(false);
                                    setProjectTitle(text);
                                }}
                                error={projectTitleError}
                            />
                            <HelperText type="error" visible={projectTitleError} style={{ marginTop: -5, marginBottom: 0 }}>
                                *Task title is required!
                            </HelperText>
                        </Card.Content>
                        <Card.Actions style={{ marginTop: 0 }}>
                            <View style={{ flexDirection: "row-reverse", alignItems: "center", width: "100%", paddingHorizontal: 0 }}>
                                <Button textColor={colors.onPrimaryContainer}
                                    buttonColor={colors.primaryContainer}
                                    style={{ borderColor: colors.inverseSurface, borderWidth: 0.5 }}
                                    onPress={() => {
                                        if (!projectTitle.trim()) {
                                            setProjectTitleError(true);
                                            return;
                                        }
                                        dispatch({
                                            type: "RENAME_PROJECT",
                                            projectID: project.projectID,
                                            title: projectTitle
                                        });
                                        setRenameProjectModalVisible(false);
                                    }}>Rename Project</Button>
                            </View>
                        </Card.Actions>
                    </Card>
                </Modal>
            </Portal>
        </KeyboardAvoidingView>
    )
}

function DeleteProjectModal({ project, isDeleteProjectModalVisible, setDeleteProjectModalVisible}: Types.DeleteProjectModalProps_T) {

    const theme = useAppTheme();
    if (!theme) return null; 
    const { colors } = theme;

    const navigation = useNavigation<StackNavigationProp<Types.UnifiedParamList, 'HomeScreen'>>();

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
                    visible={isDeleteProjectModalVisible}
                    onDismiss={() => setDeleteProjectModalVisible(false)}
                    contentContainerStyle={{ marginHorizontal: '5%', borderRadius: 20, overflow: "hidden" }}
                >
                    <Card mode={"contained"} style={{ width: "100%" }}>
                        <Card.Title
                            title={`Delete ${project.title}?`}
                            titleVariant='titleMedium'
                            titleStyle={{alignSelf:"center", paddingTop:5}}
                        />
                        <Card.Actions style={{ marginTop: 0 }}>
                            <View style={{ flexDirection: "row-reverse", alignItems: "center", width: "100%", paddingHorizontal: 0 }}>
                                <Button textColor={colors.onErrorContainer}
                                    buttonColor={colors.errorContainer}
                                    style={{ borderColor: colors.inverseSurface, borderWidth: 0.5 }}
                                    onPress={() => {
                                        navigation.navigate("HomeScreen");
                                        dispatch({
                                            type: "DELETE_PROJECT",
                                            projectID: project.projectID,
                                        });
                                        setDeleteProjectModalVisible(false);
                                }}>Delete Project</Button>
                            </View>
                        </Card.Actions>
                    </Card>
                </Modal>
            </Portal>
        </KeyboardAvoidingView>
    )
}

export function ProjectViewMenuButton({ project, showCompletedTasks, setShowCompletedTasks }: Types.ProjectViewMenuButtonProps_T) {

    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isRenameProjectModalVisible, setRenameProjectModalVisible] = useState(false);
    const [isDeleteProjectModalVisible, setDeleteProjectModalVisible] = useState(false);

    return (
        <View>
            <Menu
                style={{ paddingTop: 2, borderRadius: 5 }}
                visible={isMenuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchorPosition='top'
                anchor={
                    <IconButton
                        icon="dots-vertical"
                        size={25}
                        style={{ marginRight: 7 }}
                        onPress={() => { setMenuVisible(true); }}
                    />
                }
            >
                <Menu.Item
                    onPress={() => {
                        setMenuVisible(false);
                        setShowCompletedTasks(!showCompletedTasks)
                    }}
                    title={showCompletedTasks ? "Hide Completed Tasks" : "Show Completed Tasks"} />
                <Menu.Item
                    onPress={() => {
                        setRenameProjectModalVisible(true);
                        setMenuVisible(false);
                    }}
                    title="Rename Project" />
                <Menu.Item
                    onPress={() => {
                        setDeleteProjectModalVisible(true);
                        setMenuVisible(false);
                    }}
                    title="Delete Project" />
            </Menu>
            <RenameProjectModal project={project} isRenameProjectModalVisible={isRenameProjectModalVisible} setRenameProjectModalVisible={setRenameProjectModalVisible}/>
            <DeleteProjectModal project={project} isDeleteProjectModalVisible={isDeleteProjectModalVisible} setDeleteProjectModalVisible={setDeleteProjectModalVisible}/>
        </View>
    );
}