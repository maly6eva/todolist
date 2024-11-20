import React from 'react';


type ButtonPropsType = {
    title: string
    starter?: () => void
    clickTask?: () => void
    removeTasks?: () => void
}

export const Button = ({ title, starter, clickTask, removeTasks}:  ButtonPropsType) => {

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
        <button onClick={onClickHandler}>{title}</button>
    );
};

