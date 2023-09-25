import { RouteProp, NavigationProp } from '@react-navigation/native';

export type HomeStackParamList = {
    "Home": undefined;
    "Pinned Tasks": undefined;
    "Completed Tasks": undefined;
    "Upcoming Tasks": undefined;
    "Todays Tasks": undefined;
};

export type RootStackParamList = {
    "Task Groups": undefined;
    "Project View": { projectID: number };
    "HomeScreen": undefined;
};

export type UnifiedParamList = {
    "Home": undefined;
    "Pinned Tasks": undefined;
    "Completed Tasks": undefined;
    "Upcoming Tasks": undefined;
    "Todays Tasks": undefined;
    "Task Groups": undefined;
    "Project View": { projectID: number };
    "HomeScreen": undefined;
  };

export type Task_T = {
    id: number,
    title: string,
    description: string | null,
    startDate: Date,
    dueDate: Date,
    completed: boolean,
    pinned: boolean,
    priority: number,
}
export type Project_T = {
    title: string,
    projectID: number,
    pinned: boolean,
    tasks: Task_T[]
}
export type ProjectList_T = {
    idCounter: number;
    projects: Project_T[];
}

export type ProjectViewProps = {
    route: RouteProp<UnifiedParamList, 'Project View'>;
    navigation: NavigationProp<UnifiedParamList, 'Project View'>;
};

export type TaskComponentProps = {
    task: Task_T;
    setEditTaskScreenVisible: (state:boolean)=>void;
    setTaskToEdit: (task:Task_T)=>void;
};

export type TaskComponentExpandedProps = {
    task: Task_T;
    heightToAnimate: number;
    setHeightToAnimate: (height:number)=>void;
    setEditTaskScreenVisible: (state:boolean)=>void;
    setTaskToEdit: (task:Task_T)=>void;
};

export type ProjectListContextType_T = {
    projectList: ProjectList_T;
    dispatch: React.Dispatch<any>;
};

export type ProjectListActionType_T = {
    type: string; 
    projectID?: number;
    taskID: number; 
    title?: string;
    description?: string;
    startDate?: Date;
    dueDate?: Date;
    priority?: number;
    payload?: any
}

export type CreateTaskModalProps_T = {
    isCreateTaskScreenVisible: boolean;
    setCreateTaskScreenVisible: (state:boolean) => void;
    projectID: number
}

export type EditTaskModalProps_T = {
    isEditTaskScreenVisible: boolean;
    setEditTaskScreenVisible: (state:boolean) => void;
    projectID: number;
    task: Task_T;
}

export type PriorityButtonProps_T = {
    isPriorityMenuVisible: boolean;
    setPriorityMenuVisible: (state:boolean) => void; 
    selectedPriority: number;
    setSelectedPriority: (priority: number) => void
}

export type StartDateButtonProps_T = {
    isStartDateMenuVisible: boolean,
    setStartDateMenuVisible: (state:boolean) => void; 
    startDate: any;
    setStartDate: (date: any) => void;
    setStartDatePickerVisible: (state: boolean) => void;
}

export type DueDateButtonProps_T = {
    isDueDateMenuVisible: boolean,
    setDueDateMenuVisible: (state:boolean) => void; 
    dueDate: any;
    setDueDate: (date: any) => void;
    setDueDatePickerVisible: (state: boolean) => void;
}

export type ProjectsSearchDisplayListProps_T = {
    resultsProjects: Project_T[];
    searchQuery: string;
};

export type TasksSearchDisplayListProps_T = {
    resultsTasks: {projectID: number, task: Task_T}[];
    searchQuery: string;
};

export type ProjectViewMenuButtonProps_T = {
    project: Project_T;
    showCompletedTasks: boolean;
    setShowCompletedTasks: (state:boolean)=>void;
}

export type RenameProjectModalProps_T = {
    project: Project_T; 
    isRenameProjectModalVisible: boolean;
    setRenameProjectModalVisible: (state:boolean)=>void
}

export type DeleteProjectModalProps_T = {
    project: Project_T; 
    isDeleteProjectModalVisible: boolean;
    setDeleteProjectModalVisible: (state:boolean)=>void
}