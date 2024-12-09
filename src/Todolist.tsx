import React, {useRef, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType, TasksType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    removeTasks: (tId: string) => void
    changeFilter: (val: FilterValueType) => void
    addTask: (newTitle: string) => void
    changesStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType

}

export const Todolist = ({
                             title,
                             tasks,
                             removeTasks,
                             changeFilter,
                             addTask,
                             changesStatus,
    filter
                         }: TodolistPropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeFilterHandler = (value: FilterValueType) => changeFilter(value)
    const removeTasksHandler = (tId: string) => removeTasks(tId)
    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            addTask(newTitle.trim());
            setNewTitle('')
        }else {
            setError('Title is required')
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }


    const mappedTasks = tasks.map((t: TasksType) => {
        const removeTasksHandler = () => {
            removeTasks(t.id)

        }
        const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changesStatus(t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={onchangeHandler}/>
                <span>{t.title}</span>

                <Button removeTasks={removeTasksHandler} title={'X'}/>

            </li>
        )
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    
    const changeFilterTasksAll = () => {
        changeFilterHandler('All')
    }
    const changeFilterTasksActive = () => {
        changeFilter('Active')
    }
    const changeFilterTasksCompleted= () => {
        changeFilter('Complete')
    }
    return (

        <div className="App">
            <div className="todolost">
                <h3>{title}</h3>
                <div>
                    <input value={newTitle}
                           onChange={onChangeHandler}
                           onKeyDown={onKeyDownHandler}
                           className={error ? 'error' : '' }/>
                    <Button clickTask={addTaskHandler} title={'+'}/>
                    {error && <div className='error-message'>{error}</div>}
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
                    <Button className={filter === 'All' ? 'active-filter' : ''} starter={() => changeFilterTasksAll} title={'All'} />
                    <Button className={filter === 'Active' ? 'active-filter' : ''} starter={() => changeFilterHandler('Active')} title={'Active'}/>
                    <Button className={filter === 'Complete' ? 'active-filter' : ''} starter={() => changeFilterTasksCompleted} title={'Complete'}/>

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
