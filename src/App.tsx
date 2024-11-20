import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterValueType = 'All' | 'Complete' | 'Active'

function App() {
    const todolistTitle_1 = 'What to learn'

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: '&CSS', isDone: true},
        {id: v1(), title: 'TS', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
    ])
    console.log(tasks)

    const [valForDurshlag, setValForDurshlag] = useState('All')
    const removeTasks = (tId: string) => {
        // tasks=tasks.filter(el => el.id !== tId)
        // setTasks(tasks);
        //или
        setTasks(tasks.filter(el => el.id !== tId))
    }

    const changeFilter = (val: FilterValueType) => {
        setValForDurshlag(val)
    }




    const addTask = (newTitle: string) => {
       const newTasks:TasksType =  {id: v1(), title: newTitle, isDone: false}
        setTasks([newTasks, ...tasks])
    }
        let durshlag = tasks

        if (valForDurshlag === 'Complete') {
            durshlag = tasks.filter(el => el.isDone)
        }
        if (valForDurshlag === 'Active') {
            durshlag = tasks.filter(el => !el.isDone)
        }

        return (
            <div className='App'>
                <Todolist
                    title={todolistTitle_1}
                    tasks={durshlag}
                    removeTasks={removeTasks}
                    changeFilter={changeFilter}
                    addTask={addTask}
                />
            </div>
        );

}
export default App;
