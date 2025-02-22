import { formatDistance } from "date-fns"
import { lightFormat } from "date-fns"
import deleteIcon from '../images/trash-can.png'
import deleteTodoIcon from '../images/trash-can-black.png'
import editButtonIcon from '../images/pencil.png'
const todayDate = lightFormat(new Date(), 'yyyy-MM-dd')

export default function Display() {
    const updateContentDisplay = (parentNode, array) => {
        clearDisplay(parentNode);
        if (array === undefined) return;
        const addTodoBtn = document.createElement('button');
        addTodoBtn.classList.add('new-todo');
        addTodoBtn.textContent = 'New Tasks +';
        parentNode.appendChild(addTodoBtn);
        generateContentDisplay(parentNode, array);
    };

    const updateProjectDisplay = (parentNode, array) => {
        clearDisplay(parentNode);
        if(array.length === 0) return;
        for (let i = 0; i < array.length; i++){
            const projectListWrapper = document.createElement('div');
            const projectName = document.createElement('div');
            const deleteProject = document.createElement('img');
            projectListWrapper.classList.add('project-list-wrapper');
            projectListWrapper.setAttribute('data-project-index', i);
            projectName.textContent = array[i].projectName;
            projectName.classList.add('project-btn');
            deleteProject.classList.add('delete-project');
            deleteProject.src = deleteIcon;
            deleteProject.setAttribute('width', '25px');
            projectListWrapper.appendChild(projectName);
            projectListWrapper.appendChild(deleteProject);
            parentNode.appendChild(projectListWrapper);
        }
    };

    const generateContentDisplay = (parentNode, array) => {
        if(array.length === 0) {
            const contentPara = document.createElement('p');
            contentPara.textContent = 'No Tasks';
            parentNode.appendChild(contentPara);
        }
        for (let i = 0; i < array.length; i++){
            const card = document.createElement('div');
            const taskName = document.createElement('h4');
            const desc = document.createElement('p');
            const dueDate = document.createElement('p');
            const priority = document.createElement('div');
            const editButton = document.createElement('img');
            const deleteTodo = document.createElement('img');

            card.classList.add('todo-card');
            card.setAttribute('data-todo-index', i);
            taskName.textContent = array[i].taskName
            dueDate.textContent = `Due ${formatDistance(array[i].dueDate, todayDate, {addSuffix: true})}`;
            desc.textContent = array[i].desc;
            desc.classList.add('todo-desc');

            priority.textContent = `${array[i].priority.toUpperCase()} Priority`;
            priority.style.backgroundColor = 
                array[i].priority === 'low'
                    ? 'lightgreen'
                    : array[i].priority === 'medium'
                        ? '#FFB52E'
                        : '#FF0000';

            editButton.src = editButtonIcon;
            editButton.setAttribute('width', '30px');
            editButton.classList.add('edit-todo-btn');
            deleteTodo.src = deleteTodoIcon;
            deleteTodo.setAttribute('width', '30px');
            deleteTodo.classList.add('delete-todo');
            

            if(!array[i].completed) {
                editButton.classList.add('edit');
                // desc.setAttribute('class', 'todo-desc edit');
            } else {
                editButton.classList.remove('edit');
                // desc.setAttribute('class', 'todo-desc');
            }

            if(array[i].completed) {
                card.classList.add('checked');
            }

            card.appendChild(taskName);
            card.appendChild(desc);
            card.appendChild(dueDate);
            card.appendChild(priority);
            card.appendChild(editButton);
            card.appendChild(deleteTodo);
            parentNode.appendChild(card);
        }
    };

    const clearDisplay = (parentNode) => {
        parentNode.textContent = '';
    };

    const initialize = (projectNode, projectArr) => {
        if (projectArr.length === 0 || projectArr === undefined) return;
        updateProjectDisplay(projectNode, projectArr);
    };

    return {
        updateContentDisplay,
        updateProjectDisplay,
        clearDisplay,
        initialize,
    };
}