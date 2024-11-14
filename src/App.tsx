import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
}

function App() {
    const todolistTitle_1 = 'What to learn'


    const tasks: Array<TasksType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS/TS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS/TS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]

    return (
        <div className='App'>
            <Todolist
                title={todolistTitle_1}
                tasks={tasks}
            />
        </div>
    );
}

export default App;
