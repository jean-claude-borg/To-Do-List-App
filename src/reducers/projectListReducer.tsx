import React from "react";
import * as Types from '../types/types.tsx'

export const projectListContext = React.createContext<Types.ProjectListContextType_T | null>(null);

export function projectListReducer(projectList: Types.ProjectList_T, action: Types.ProjectListActionType_T): Types.ProjectList_T {
    
    switch (action.type) {
        case 'SET_PROJECT_LIST':
            return action.payload;

        case 'TOGGLE_TASK_COMPLETE':{
            const newProjectList = { idCounter: projectList.idCounter, projects: projectList.projects.map(project => ({
                ...project,
                tasks: project.tasks.map(task => {
                    if (task.id === action.taskID) {
                        return {
                            ...task,
                            completed: !task.completed
                        };
                    }
                    return task;
                })
            }))}
            return newProjectList;
        }

        case 'TOGGLE_PROJECT_PINNED':{
            const newProjectList = {
                ...projectList,
                projects: projectList.projects.map(project => {
                    if (project.projectID === action.projectID) {
                        return {
                            ...project,
                            pinned: !project.pinned
                        };
                    }
                    return project;
                })
            };
            return newProjectList;
        }

        case 'TOGGLE_PROJECT_PINNED':{
            const newProjectList = { idCounter: projectList.idCounter , projects: projectList.projects.map(project => ({
                ...project,
                tasks: project.tasks.map(task => {
                    if (task.id === action.taskID) {
                        return {
                            ...task,
                            pinned: !task.pinned
                        };
                    }
                    return task;
                })
            }))}
            return newProjectList;
        }

        case 'CREATE_NEW_PROJECT': {
            if (!action.title) {
                console.log("cannot create project with no title");
                return projectList;
            }
            
            const newProject = {
                title: action.title,
                projectID: projectList.idCounter + 1,
                pinned: false,
                tasks: [] 
            };
            
            const newProjectList = {
                ...projectList,
                idCounter: projectList.idCounter + 1, 
                projects: [...projectList.projects, newProject] 
            };
            
            return newProjectList;
        }

        case 'CREATE_NEW_TASK': {
            if (!action.title) {
                console.log("cannot create task without title");
                return projectList;
            }
        
            const projectIndex = projectList.projects.findIndex(project => project.projectID === action.projectID);
            if (projectIndex === -1) {
                console.log("could not find matching project to add task to");
                return projectList;
            }
        
            const newTask = {
                id: projectList.idCounter + 1,
                title: action.title,
                description: !action.description ? null : action.description,
                startDate: !action.startDate ? new Date(0) : action.startDate,
                dueDate: !action.dueDate ? new Date(0) : action.dueDate,
                priority: !action.priority ? 1 : action.priority,
                completed: false,
                pinned: false
            };
        
            const updatedTasks = [...projectList.projects[projectIndex].tasks, newTask];
            const updatedProjects = projectList.projects.map((project, index) => index === projectIndex ? { ...project, tasks: updatedTasks } : project);
            return {
                idCounter: projectList.idCounter + 1,
                projects: updatedProjects
            };
        }

        case 'DELETE_TASK': {
            const projectIndex = projectList.projects.findIndex(project => project.projectID === action.projectID);
            if (projectIndex === -1) {
                console.log("could not find matching project to delete task from");
                return projectList;
            }

            const updatedTasks = projectList.projects[projectIndex].tasks.filter(task => task.id !== action.taskID);
            const updatedProjects = projectList.projects.map((project, index) => 
                index === projectIndex ? { ...project, tasks: updatedTasks } : project
            );

            return {
                ...projectList,
                projects: updatedProjects
            };
        }

        case 'EDIT_TASK': {
            // finds index of project containing the task to edit
            const projectIndex = projectList.projects.findIndex(project => project.projectID === action.projectID);
            if (projectIndex === -1) {
                console.log("could not find matching project to edit task");
                return projectList;
            }
        
            // finds task to edit in project
            const taskIndex = projectList.projects[projectIndex].tasks.findIndex(task => task.id === action.taskID);
            if (taskIndex === -1) {
                console.log("could not find the task to edit");
                return projectList;
            }
        
            // creates an updated task based on the provided changes
            const oldTask = projectList.projects[projectIndex].tasks[taskIndex];
            const updatedTask = {
                ...oldTask,
                title: action.title ? action.title : oldTask.title,
                description: action.description !== undefined ? action.description : oldTask.description,
                startDate: action.startDate ? action.startDate : oldTask.startDate,
                dueDate: action.dueDate ? action.dueDate : oldTask.dueDate,
                priority: action.priority ? action.priority : oldTask.priority,
            };
        
            // replaces the old task with the updated task in the task list and updates projectList
            const updatedTasks = [...projectList.projects[projectIndex].tasks];
            updatedTasks[taskIndex] = updatedTask;
        
            const updatedProjects = projectList.projects.map((project, index) => 
                index === projectIndex ? { ...project, tasks: updatedTasks } : project
            );
        
            return {
                ...projectList,
                projects: updatedProjects
            };
        }

        case 'RENAME_PROJECT': {
            const projectIndex = projectList.projects.findIndex(project => project.projectID === action.projectID);
            if (projectIndex === -1) {
                console.log("could not find matching project to rename");
                return projectList;
            }
            if(!action.title){
                console.log("cannot rename a project to nothing");
                return projectList;
            }
        
            const updatedProject = { ...projectList.projects[projectIndex], title: action.title };
            const updatedProjects = projectList.projects.map((project, index) => 
                index === projectIndex ? updatedProject : project
            );
        
            return {
                ...projectList,
                projects: updatedProjects
            };
        }

        case 'DELETE_PROJECT': {
            const updatedProjects = projectList.projects.filter(project => project.projectID !== action.projectID);
            return {
                ...projectList,
                projects: updatedProjects
            };
        }
        
        default:
            return projectList;
    }
  }