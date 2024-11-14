import React from 'react';
import {FilterValueType, TasksType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    removeTasks: (tId: number)=> void
    changeFilter: (val: FilterValueType) => void

}

export const Todolist = ({title, tasks, removeTasks, changeFilter}: TodolistPropsType) => {
    //или  помощи тернарника



    // let tasksList;
    // if (props.tasks.length === 0) {
    //     tasksList = <div>Ваш список дел пуст</div>
    // } else {
    //     tasksList = <ul>
    //         {
    //             props.tasks.map((t: TasksType) => {
    //                 return (
    //                     <li key={t.id}>
    //                         <button>X</button>
    //                         <input type="checkbox" checked={t.isDone}/>
    //                         <span>{t.title}</span>
    //                     </li>
    //                 )
    //             })
    //         }
    //     </ul>
    // }

    return (

        <div className="App">
            <div className="todolost">
                <h3>{title}</h3>
                <div>
                    <input/>
                    <Button title={'+'}/>

                </div>
                {
                tasks.length === 0
                ? <div>Ваш список дел пуст</div>
                : <ul>
                {tasks.map((t: TasksType) => {
                        return (
                            <li key={t.id}>
                                <button onClick={() => removeTasks(t.id)}>X</button>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                            </li>
                        )
                    })}
            </ul>
                }
                {/*{tasksList}*/}
                <div>
                   <button onClick={() => changeFilter('All')}>All</button>
                    <button onClick={() => changeFilter('Active')}>Active</button>
                    <button onClick={() => changeFilter('Complete')}>Complete</button>
                    {/*<Button title={'All'}/>*/}
                    {/*<Button title={'Active'}/>*/}
                    {/*<Button title={'Completed'}/>*/}
                </div>
            </div>
        </div>

    )
        ;
};
