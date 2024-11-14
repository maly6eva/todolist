import React from 'react';
import {TasksType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>

}

export const Todolist = (props: TodolistPropsType) => {
    //или рои помощи тернарника
    // const tasksList: JSX.Element = props.tasks.length === 0
    //     ? <div>Ваш список дел пуст</div>
    //     : <ul>
    //         // {
    //                      props.tasks.map((t: TasksType) => {
    //                          return (
    //                             <li key={t.id}>
    //                                  <input type="checkbox" checked={t.isDone}/>
    //                                <span>{t.title}</span>
    //                             </li>
    //                         )
    //                     })
    //     }
    //                     </ul>

    let tasksList;
    if (props.tasks.length === 0) {
        tasksList = <div>Ваш список дел пуст</div>
    } else {
        tasksList = <ul>
            {
                props.tasks.map((t: TasksType) => {
                    return (
                        <li key={t.id}>
                            <button>X</button>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })
            }
        </ul>
    }

    return (

        <div className="App">
            <div className="todolost">
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <Button title={'+'}/>
                    <button>+</button>
                </div>
                {tasksList}
                <div>
                    <Button title={'All'}/>
                    <Button title={'Active'}/>
                    <Button title={'Completed'}/>
                </div>
            </div>
        </div>

    )
        ;
};
