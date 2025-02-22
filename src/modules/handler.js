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
            newProjectFormModal.close();
            if (newProjectName === '') return
            project.newProject(newProjectName);
            display.clearDisplay(mainContent);
            display.updateProjectDisplay(projectList, project.getProjectList());
            newProjectForm.reset();
            project.updateStorage();
            return;
        }
        if (target.classList.contains('project-btn')){
            const projectList = document.querySelectorAll('.project-btn');
            for (let i = 0; i < projectList.length; i++){
                if (projectList[i].classList.contains('active')){
                    projectList[i].classList.remove('active');
                }
            }
            target.classList.add('active');
            currentProjectIndex = target.parentNode.dataset.projectIndex;
            display.updateContentDisplay(
                mainContent,
                project.getProjectTodos(currentProjectIndex)
            );
            return;
        }
        if (target.classList.contains('delete-project')) {
            if (
                confirm('This will delete the project and all its todos. Are u sure?')
            ) {
                currentProjectIndex = target.parentNode.dataset.projectIndex;
                project.deleteProject(currentProjectIndex);
                project.updateStorage();
                display.updateProjectDisplay(projectList, project.getProjectList());
                display.updateContentDisplay(mainContent);
            }
        }
    }

    function newTodoFormEventHandler(event) {
        const target = event.target;

        if (target.id === 'submit'){
            const formInput = [...newTodoForm.getElementsByTagName('input')].map(
                (input) => input.value
            );
            formInput.push(document.getElementById('priority').value);

            if (checkEmptyForm(formInput)){
                return;
            }
            project.newTodo(currentProjectIndex, formInput);
            display.updateContentDisplay(
                mainContent,
                project.getProjectTodos(currentProjectIndex)
            );
            project.updateStorage();
            newTodoForm.reset();
            newTodoFormModal.close();
        }

        if (target.id === 'cancel'){
            newTodoForm.reset();
        }
    }

    function mainContentEventHandler(event) {
        const target = event.target;

        const todoCardIndex = target.parentNode.dataset.todoIndex; // getAttribute('data-todo-index') can also be used

        if (target.classList.contains('new-todo')){
            newTodoFormModal.showModal();
        }

        if (target.classList.contains('edit')){
            const currentTodo = project.getProjectTodos(currentProjectIndex)[todoCardIndex];

            document.getElementById('edit-title').value = currentTodo.taskName;
            document.getElementById('edit-description').value = currentTodo.desc;
            document.getElementById('edit-due-date').value = currentTodo.dueDate;
            document.getElementById('edit-priority').value = currentTodo.priority;
            editTodoForm.setAttribute('data-todo-index', todoCardIndex);

            editTodoFormModal.showModal();
        }

        if (target.classList.contains('delete-todo')){
            if (!confirm('Delete Tasks?')) return;
            mainContent.removeChild(target.parentNode);
            project.deleteTodos(currentProjectIndex, todoCardIndex);
            display.updateContentDisplay(
                mainContent,
                project.getProjectTodos(currentProjectIndex)
            );

            project.updateStorage();
        }
    }

    function editTodoFormEventHandler(event) {
        const target = event.target;

        if (target.id === 'edit-submit') {
            const todoCardIndex = editTodoForm.getAttribute('data-todo-index');
            const editFormInput = [...editTodoForm.getElementsByTagName('input')].map(
                (input) => input.value
            );
            editFormInput.push(document.getElementById('edit-priority').value);
            editFormInput.push(document.getElementById('completed').value);

            if (checkEmptyForm(editFormInput)){
                return;
            }

            project.editTodo(currentProjectIndex, todoCardIndex, editFormInput);
            display.updateContentDisplay(
                mainContent,
                project.getProjectTodos(currentProjectIndex)
            );
            project.updateStorage();
            editTodoFormModal.close();
        }

        if (target.id === 'edit-cancel'){
            editTodoForm.reset();
        }
    }

    function checkEmptyForm(array) {
        if (array.includes('')){
            alert('Fill all the fields first!');
            return true;
        }
    }

    display.initialize(projectList, project.getProjectList());
}