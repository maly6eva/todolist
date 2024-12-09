import React from 'react';


type ButtonPropsType = {
    title: string
    starter?: () => void
    clickTask?: () => void
    removeTasks?: () => void
    className?: string
    onClick?: () => void

}

export const Button = ({ title, starter, clickTask, removeTasks, className, onClick}:  ButtonPropsType) => {

    const onClickHandler = () => {

        if (starter) {
            starter()
        }
        if (clickTask) {
            clickTask()
        }
        if (removeTasks) {
            removeTasks()
        }
    }

    return (
        <button onClick={onClickHandler} className={className} >{title}</button>
    );
};

