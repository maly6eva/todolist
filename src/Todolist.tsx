import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: ( todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string,taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, updatedTitle: string) => void
}


export const Todolist = ({todolistId, title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter,  removeTodolist, updateTaskTitle}: PropsType) => {

    //todo refactor
    // let tasksForTodolist = tasks
    // if (el.filter === 'active') {
    //     tasksForTodolist = tasks.filter(task => task.isDone)
    // }
    // if (el.filter === 'completed') {
    //     tasksForTodolist = tasks.filter(task => task.isDone)
    // }



    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(todolistId, filter)
    }

    const removeTodolistOnclick = () => {
        removeTodolist(todolistId )
    }

    const addTaskHandler = (title: string) => {
        addTask( todolistId, title)
    }



    return (
        <div>
            <h3>
                {title}
                <Button title={'+'} onClick={removeTodolistOnclick}/>
            </h3>

            <AddItemForm addItem={addTaskHandler }/>

            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(todolistId, task.id)
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(todolistId, task.id, newStatusValue)
                            }

                            const updateTaskTitleHandler = (updateTitle: string) => {
                                updateTaskTitle(todolistId, task.id, updateTitle)
                            }
                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan oldTitle={task.title}  onClick={ updateTaskTitleHandler}/>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}
