import React, {useRef, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType, TasksType} from "./App";
import {Button} from "./Button";
import {log} from "node:util";

type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    removeTasks: (tId: string)=> void
    changeFilter: (val: FilterValueType) => void
    addTask: (newTitle:string) => void

}

export const Todolist = ({title,
                             tasks,
                             removeTasks,
                             changeFilter,
                             addTask}: TodolistPropsType) => {

const[newTitle, setNewTitle] = useState('')

    // const changeFilterAllHeader = () => changeFilter('All')
    // const changeFilterActiveHeader = () => changeFilter('Active')
    // const changeFilterCompleteHeader = () => changeFilter('Complete')

    const changeFilterHandler = (value:FilterValueType) => changeFilter(value)
    const removeTasksHandler = (tId: string) => removeTasks(tId)
    const addTaskHandler =  () => {
        addTask(newTitle);
        setNewTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            addTaskHandler()
            // addTask(newTitle)
            // setNewTitle('')
        }}

    const mappedTasks = tasks.map((t: TasksType) => {
            const removeTasksHandler = () => {
            removeTasks(t.id)
        }


            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    {/*<button onClick={removeTasksHandler}>X</button>*/}
                    <Button removeTasks={removeTasksHandler} title={'X'}/>
                </li>
            )
    })

    const onChangeHandler = (e:  ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    return (

        <div className="App">
            <div className="todolost">
                <h3>{title}</h3>
                <div>
                    <input value={newTitle}
                           onChange={onChangeHandler}
                           onKeyDown={onKeyDownHandler}
                    />
                    {/*<button onClick={addTaskHandler}>+</button>*/}
                    <Button clickTask={addTaskHandler} title={'+'}/>

                </div>
                {
                tasks.length === 0
                ? <div>Ваш список дел пуст</div>
                : <ul>
                        {mappedTasks}

            </ul>
                }
                {/*{tasksList}*/}
                <div>
                    {/*<button onClick={() =>changeFilterHeandler('All')}>All</button>*/}
                    {/*<button onClick={() =>changeFilterHeandler('Active')}>Active</button>*/}
                    {/*<button onClick={() =>changeFilterHeandler('Complete')}>Complete</button>*/}
                    <Button starter={() =>changeFilterHandler ('All')} title={'All'} />
                    <Button starter={() =>changeFilterHandler ('Active')} title={'Active'} />
                    <Button starter={() =>changeFilterHandler('Complete')} title={'Complete'} />
                </div>
            </div>
        </div>

    )
        ;
};
///////......................
// import React, {useRef} from 'react';
// import {FilterValueType, TasksType} from "./App";
// import {Button} from "./Button";
//
// type TodolistPropsType = {
//     title: string
//     tasks: TasksType[]
//     removeTasks: (tId: string)=> void
//     changeFilter: (val: FilterValueType) => void
//     addTask: (newTitle:string) => void
//
// }
//
// export const Todolist = ({title,
//                              tasks,
//                              removeTasks,
//                              changeFilter,
//                              addTask}: TodolistPropsType) => {
//     //или  помощи тернарника
//
//
//
//     // let tasksList;
//     // if (props.tasks.length === 0) {
//     //     tasksList = <div>Ваш список дел пуст</div>
//     // } else {
//     //     tasksList = <ul>
//     //         {
//     //             props.tasks.map((t: TasksType) => {
//     //                 return (
//     //                     <li key={t.id}>
//     //                         <button>X</button>
//     //                         <input type="checkbox" checked={t.isDone}/>
//     //                         <span>{t.title}</span>
//     //                     </li>
//     //                 )
//     //             })
//     //         }
//     //     </ul>
//     // }
//     const inputRef = useRef<HTMLInputElement>(null)
//
//     return (
//
//         <div className="App">
//             <div className="todolost">
//                 <h3>{title}</h3>
//                 <div>
//                     <input ref={inputRef}/>
//                     <button onClick={() => {
//                         if(inputRef.current){
//                             addTask(inputRef.current.value)
//                             inputRef.current.value=''
//                         }}}>+</button>
//                     {/*<Button title={'+'}/>*/}
//
//                 </div>
//                 {
//                     tasks.length === 0
//                         ? <div>Ваш список дел пуст</div>
//                         : <ul>
//                             {tasks.map((t: TasksType) => {
//                                 return (
//                                     <li key={t.id}>
//                                         <button onClick={() => removeTasks(t.id)}>X</button>
//                                         <input type="checkbox" checked={t.isDone}/>
//                                         <span>{t.title}</span>
//                                     </li>
//                                 )
//                             })}
//                         </ul>
//                 }
//                 {/*{tasksList}*/}
//                 <div>
//                     <button onClick={() => changeFilter('All')}>All</button>
//                     <button onClick={() => changeFilter('Active')}>Active</button>
//                     <button onClick={() => changeFilter('Complete')}>Complete</button>
//                     {/*<Button title={'All'}/>*/}
//                     {/*<Button title={'Active'}/>*/}
//                     {/*<Button title={'Completed'}/>*/}
//                 </div>
//             </div>
//         </div>
//
//     )
//         ;
// };
