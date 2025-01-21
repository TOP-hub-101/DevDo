import { removeProject, removeTodo, getTodoList, toggleAndGetStatus } from "./coreClasses";

function initializeDOM() {
    const addProjectBtn = document.querySelector('#addProjectBtn');
    const projectDialog = document.querySelector('#projectDialog');
    const todoDialog = document.querySelector('#todoDialog');
    const addTodoBtn = document.querySelector('#addTodoBtn');
    addProjectBtn.addEventListener('click', () => {
        projectDialog.dataset.action = 'add';
        projectDialog.showModal();
    });
    addTodoBtn.addEventListener('click', () => {
        todoDialog.dataset.action = 'add';
        todoDialog.showModal();
    });
}

function createElementWithClass(type, content, className){
    const element = document.createElement(`${type}`);
    if(classValue){
        element.classList.add(className);
    }
    element.textContent = content;
    return element;
}



function addProjectToDOM(obj, projectId){
    const container = document.querySelector('#projectContainer');
    const projectDiv = createElementWithClass('div', '', 'projectDiv');
    const {divInfo, deleteBtn} = createProjectElements(obj.name, obj.details);
    divInfo.addEventListener('contextmenu', (e) => openModifyProjectForm(e, projectId));
    divInfo.addEventListener('click', (e) => selectProject(e, projectId));
    divInfo.click();
    projectDiv.append(divInfo, deleteBtn);
    container.append(projectDiv);
}

function createProjectElements(nameProject, detailsProject){
    const name = createElementWithClass('h1', nameProject, 'nameP');
    const details = createElementWithClass('div', detailsProject, 'detailsP');
    const deleteBtn = createElementWithClass('button', 'X', 'deleteBtn');
    const divInfo = document.createElement('div');
    divInfo.append(name, details);

    deleteBtn.addEventListener('clic', (e) => {
        const todoContainer = document.querySelector('#todoContainer');
        const parentDiv = e.target.parentNode;
        const projectId = parentDiv.dataset.id;
        removeProject(projectId);
        parentDiv.remove();
        if(todoContainer.dataset.projectId === projectId){
            todoContainer.textContent = '';
        }
    });
    return {divInfo, deleteBtn};
}

function openModifyProjectForm(e, projectId){
    e.preventDefault();
    const projectDialog = document.querySelector('#projectDialog');
    projectDialog.dataset.projectId = projectId;
    projectDialog.dataset.action = 'modify';
    projectDialog.showModal();
}

function selectProject(e, projectId) {
    updateProjectDivName(e);
    const todoDialog = document.querySelector('#todoDialog');
    todoDialog.dataset.projectId = projectId;
    updateTodoContainer(projectId);
}

function updateTodoContainer(projectId){
    const todoContainer = document.querySelector('#todoContainer');
    todoContainer.textContent = '';
    todoContainer.dataset.projectId = projectId;
    const todoList = getTodoList(projectId);
    for (let todo of todoList){
        addTodoToDOM(todo, todo.id);
    }
}

function updateProjectDivName(e){
    const divInfo = e.currentTarget;
    const projectName = divInfo.querySelector('nameP');
    const name = projectName.textContent;
    const currentProjectName = document.querySelector('#currentProjectName');
    currentProjectName.textContent = DataTransferItemList;
}
