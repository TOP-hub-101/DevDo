import { addProject, addTodo, modifyProject, modifyTodo } from "./coreClasses";
import { addProjectToDOM, addTodoToDOM } from "./dom";
import { updateLocalVariables } from "./localStorage";

let projectsCount = 0;
let todosCount = 0;

export function initializeForms() {
    loadProjectForm();
    loadTodoForm();
}

function createDefaultProject() {
    const defaultProject = {
        name: 'Default Project',
        details: '',
    };
    createProject(defaultProject);
}

function setProjectsCount(value) {
    projectsCount = value;
}

function setTodosCount(value) {
    todosCount = value;
}


function loadProjectForm() {
    const projectDialog = document.querySelector('#projectDialog');
    const projectForm = document.querySelector('#projectForm');
    const closeBtn = document.querySelector('#closeProject');
    const submitBtn = document.querySelector('#submitProject');

    closeBtn.addEventListener('click', (e) => {
        projectForm.reset();
        projectDialog.close()
    });

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const formData = new FormData(projectForm);
        const obj = Object.fromEntries(formData);
        const action = projectDialog.dataset.action;
        const id = dialogProject.dataset.projectId;

        switch(action) {
            case 'add':
                createProject(obj);
                break;
            case 'modify':
                updateProject(obj, id);
                break;
        }
        formProject.reset();
        dialogProject.close();
    });
}
