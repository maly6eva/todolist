import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
// import {Button} from "./Button";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack';
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

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
    updateTodolistTitle: (todolistId: string, updatedTitle: string) => void
}




export const Todolist = ({todolistId, title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter,  removeTodolist, updateTaskTitle, updateTodolistTitle}: PropsType) => {

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

    const updateTodolistTitleHandler = ( updateTitle: string) => {
        updateTodolistTitle(todolistId, updateTitle)

    }

    const updateTaskTitleHandler = (taskId: string, updateTitle: string) => {
        updateTaskTitle(todolistId, taskId, updateTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan onClick={updateTodolistTitleHandler} oldTitle={title}/>
                <IconButton onClick={removeTodolistOnclick} color='secondary' >
                    <DeleteIcon />
                </IconButton>

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

                            const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>

                                <Checkbox {...label} defaultChecked  checked={task.isDone} onChange={changeTaskStatusHandler} color='secondary'/>
                                    <EditableSpan oldTitle={task.title}  onClick={(updateTitle) => updateTaskTitleHandler(task.id, updateTitle)}/>

                                <IconButton onClick={removeTaskHandler} aria-label="delete" color='secondary'>
                                    <DeleteIcon />
                                </IconButton>

                            </li>
                        })}
                    </ul>
            }
            <Stack direction="row" spacing={1}>
                <Button
                    size='small'
                    variant='contained'
                    color={filter === 'all' ? 'secondary' : 'primary'}
                        onClick={() => changeFilterTasksHandler('all')}>All</Button>
                <Button
                    size='small'
                    variant='contained'
                    color={filter === 'active' ? 'secondary' : 'primary'}
                        onClick={() => changeFilterTasksHandler('active')}>Active</Button>
                <Button
                    size='small'
                    variant='contained'
                    color={filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>
            </ Stack>
        </div>
    )
}
