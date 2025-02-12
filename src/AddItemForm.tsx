// @flow
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

type Props = {
    addItem: ( title: string) => void

};


export const AddItemForm = ({addItem}: Props) => {
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (itemTitle.trim() !== '') {
            addItem( itemTitle.trim())
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    return (
        <div>


            <input
                className={error ? 'error' : ''}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />



            <Button
                variant="outlined"
                size='small'
                onClick={addTaskHandler}
                endIcon={<SendIcon />}
                color='secondary'
            >

                Send
            </Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};