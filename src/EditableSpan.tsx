// @flow
import * as React from 'react';
import {ChangeEvent, useState} from "react";

type Props = {
    oldTitle: string
    onClick: (updateTitle: string) => void
}
export const EditableSpan = ({oldTitle, onClick}: Props) => {
    const [edit, setEdit] = useState(false)
    const [updateTitle, setUpdateTitle] = useState('')

    const editHandler = () => {
        setEdit(!edit)
        onClick(updateTitle)
    }

    const updateTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(event.currentTarget.value)
    }

    return (
        edit
            ? <input value={updateTitle}
                     onBlur={editHandler}
                     onChange={updateTitleHandler}
                     autoFocus
            />
            : <span onDoubleClick={editHandler}>{oldTitle}</span>

    );
};