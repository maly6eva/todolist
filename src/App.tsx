import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Grid2';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {NavButton} from './NavButton'
import CssBaseline from '@mui/material/CssBaseline'
import Switch from '@mui/material/Switch';


type ThemeMode = 'dark' | 'light'

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
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }

    const removeTodolist = (todolistId: string) => {

        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const addTodolist = (title: string) => {
        const id = v1()
        const newTodolist: TodolistType = {id, title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [id]: []})

    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter} : el))
    }


    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el =>
                el.id === taskId ? {...el, isDone: taskStatus} : el)
        })
    }

    const updateTaskTitle = (todolistId: string, taskId: string, updatedTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: updatedTitle} : el)
        })
    }

    const updateTodolistTitle = (todolistId: string, updatedTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: updatedTitle} : el))
    }


    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#6771dd'
            }
        }
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="App">


            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <AppBar position="static">
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <NavButton background={theme.palette.primary.dark}>Sign in</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Sign up</NavButton>
                            <NavButton background={'#a665cb'}>Faq</NavButton>
                            <Switch color={'default'} onChange={changeMode}/>
                        </div>

                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid2 container sx={{p: '30px 0'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid2>

                    <Grid2 container spacing={4}>
                        {todolists.map(el => {

                            let tasksForTodolist = tasks[el.id]
                            if (el.filter === 'active') {
                                tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                            }

                            if (el.filter === 'completed') {
                                tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                            }
                            return (
                                <Grid2 key={el.id}>
                                    <Paper elevation={8} sx={{p: '15px'}}>
                                        <Todolist
                                            todolistId={el.id}
                                            title={el.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={el.filter}
                                            removeTodolist={removeTodolist}
                                            updateTaskTitle={updateTaskTitle}
                                            updateTodolistTitle={updateTodolistTitle}
                                        />
                                    </Paper>
                                </Grid2>
                            )
                        })}
                    </Grid2>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
