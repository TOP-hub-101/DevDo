import { updateProjectList } from "./coreClasses";
import { createDefaultProject, setProjectsCount, setTodosCount } from "./forms";
import { addProjectToDOM } from "./dom";

function initializeStorage(){
    if(!localStorage.getItem('projectsList') || localStorage.getItem('projectsList') == '[]'){
        setProjectCount(0);
        setTodoCount(0);
        createDefaultProject();
    }
    else {
        const newProjectsList = JSON.parse(localStorage.getItem('projectsList'));
        updateProjectList(newProjectsList);
        for (let project of newProjectsList){
            addProjectToDOM(project, project.id);
        } 
        if (localStorage.getItem('projectsCount')){
            const localProjectsCount = JSON.parse(localStorage.getItem('projectsCount'));
            setProjectsCount(localProjectsCount);
        }
        if (localStorage.getItem('todosCount')){
            const localTodosCount = JSON.parse(localStorage.getItem('todosCount'));
            setTodosCount(localTodosCount);
        }
    }
}

function updateLocalVariables(key, value){
    localStorage.setItem(`${key}`, JSON.stringify(value));
}

export { initializeStorage, updateLocalVariables };