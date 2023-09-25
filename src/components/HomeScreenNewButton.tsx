import { Text, IconButton, Portal, Modal, Card, TextInput, Button, HelperText, useTheme } from 'react-native-paper'
import { Platform, KeyboardAvoidingView, View } from 'react-native'
import { useState, useContext } from 'react'
import { useAppTheme } from '../StyleSheet.tsx';
import { projectListContext } from '../reducers/projectListReducer.tsx';

export function HomeScreenNewButton(){

    const theme = useAppTheme();
    if (!theme) return null; 
    const { colors } = theme;
    
    const [isNewProjectModalVisible, setNewProjectModalVisible] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [projectTitleError, setProjectTitleError] = useState(false);

    const contextValue = useContext(projectListContext);
    if(!contextValue)
    {
        console.log("error getting project list:", contextValue);;
        return;
    }
    const { projectList, dispatch } = contextValue;

    return(
        <View>
            <IconButton
                icon="plus-circle-outline"
                size={30}
                style={{ marginRight: -5 }}
                onPress={() => {setNewProjectModalVisible(true);}}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"} //documentation recommends setting behaviour differently between ios and android
                style={{ flex: 1 }}
            >
                <Portal>
                    <Modal
                        visible={isNewProjectModalVisible}
                        onDismiss={()=>setNewProjectModalVisible(false)}
                        contentContainerStyle={{marginHorizontal: '5%', borderRadius: 20, overflow: "hidden"}}
                    >
                        <Card  mode={"contained"} style={{width:"100%"}}>
                            <Card.Content>
                                <TextInput 
                                    label="New Project Title"
                                    mode="outlined"
                                    value={projectTitle}
                                    style={{marginTop: 0}}
                                    onChangeText={text => {
                                        setProjectTitleError(false);
                                        setProjectTitle(text);
                                    }}
                                    error={projectTitleError}
                                />
                                <HelperText type="error" visible={projectTitleError} style={{marginTop:-5, marginBottom:0}}>
                                    *Project title is required!
                                </HelperText>
                            </Card.Content>
                            <Card.Actions style={{marginTop:0}}>
                                <View style={{flexDirection:"row-reverse", alignItems:"center", width:"100%", paddingHorizontal:0}}>
                                    <Button textColor={colors.onPrimaryContainer} 
                                            buttonColor={colors.primaryContainer}
                                            style={{borderColor: colors.inverseSurface, borderWidth:0.5}}
                                            onPress={() => {
                                                if (!projectTitle.trim()) {
                                                    setProjectTitleError(true);
                                                    return;
                                                }
                                                dispatch({
                                                    type:"CREATE_NEW_PROJECT",
                                                    title: projectTitle
                                                });
                                                setNewProjectModalVisible(false);
                                        }}>Create Project</Button>
                                </View>
                        </Card.Actions>
                        </Card>
                    </Modal>
                </Portal>
            </KeyboardAvoidingView>
        </View>
    );
}