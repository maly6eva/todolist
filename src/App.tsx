import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";



export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id!==taskId) })
        // const filteredTasks = tasks.filter((task) => {
        //     return task.id !== taskId
        // })
        // setTasks(filteredTasks)
    }

    const removeTodolist = (todolistId: string) => {

        setTodolists(todolists.filter(el => el.id !== todolistId ))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTask = (todolistId: string,title: string) => {
        const newTask = { id: v1(), title: title, isDone: false }
        setTasks({...tasks, [todolistId] : [...tasks[todolistId], newTask]
        } )
        // const newTask = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // const newTasks = [newTask, ...tasks]
        // setTasks(newTasks)
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists( todolists.map(el => el.id === todolistId ? {...el, filter} : el ))
        // const currentTodo = todolist.find(el => el.id === todolistId)
        // if(currentTodo) {
        //     currentTodo.filter = filter
        //     setTodolist([...todolist])
        // }

    }


    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el =>
                el.id === taskId ? {...el, isDone:taskStatus }: el)})
    }

    return (
        <div className="App">
            {todolists.map(el => {

                let tasksForTodolist = tasks[el.id]
                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                }

                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={el.filter}
                        removeTodolist={ removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
