import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
}

export type FilterValueType = 'All' | 'Complete' | 'Active'

function App() {
    const todolistTitle_1 = 'What to learn'

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: '&CSS', isDone: true},
        {id: 5, title: 'TS', isDone: true},
        {id: 6, title: 'Redux', isDone: false},
    ])


    const [valForDurshlag, setValForDurshlag] = useState('All')
    const removeTasks = (tId: number) => {
        // tasks=tasks.filter(el => el.id !== tId)
        // setTasks(tasks);
        //или
        setTasks(tasks.filter(el => el.id !== tId))
    }

    const changeFilter = (val: FilterValueType) => {
        setValForDurshlag(val)
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
                />
            </div>
        );

}
export default App;
