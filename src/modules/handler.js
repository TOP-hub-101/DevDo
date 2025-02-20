import ManageProject from "./coreLogic";
import Display from "./dom";
import { lightFormat } from "date-fns";

export default function handler() {
    const project = ManageProject();
    const display = Display();
    const sidebar = document.querySelector('.sidebar');
    const newProjectFormModal = document.querySelector('dialog.new-project-modal');
    const newProjectForm = document.querySelector('.new-project-form');
    const newTodoFormModal = document.querySelector('dialog.new-todo-modal');
    const newTodoForm = document.querySelector('.new-todo');
    const editTodoFormModal = document.querySelector('dialog.edit-todo-modal');
    const editTodoForm = document.querySelector('.edit-todo');
    const dueDateInput = document.querySelector('[name=due-date]');
    const mainContent = document.querySelector('.main-content');
    const projectList = document.querySelector('.projects-list');
    let currentProjectIndex = 0;
    dueDateInput.setAttribute('min', lightFormat(new Date(), 'yyyy-MM-dd'));
    sidebar.addEventListener('click', sidebarEventHandler);
    newTodoForm.addEventListener('click', newTodoFormEventHandler);
    editTodoForm.addEventListener('click', editTodoFormEventHandler);
    mainContent.addEventListener('click', mainContentEventHandler);

    function sidebarEventHandler(event){
        let target = event.target;

        if (target.classList.contains('new-project')){
            newProjectFormModal.showModal();
        }
        if (target.id === 'submit') {
            const newProjectName = document.getElementById('name').value;

        }
    }
}