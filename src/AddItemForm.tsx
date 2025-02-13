// @flow
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

            <TextField
                       size='small'
                       id="outlined-basic" label="Outlined..." variant="outlined"
                       className={error ? 'error' : ''}
                       value={itemTitle}
                       onChange={changeItemTitleHandler}
                       onKeyUp={addItemOnKeyUpHandler}
                       error={!!error}
                       sx={{
                           width: '180px',  // 👈 уменьшаем ширину
                           '& .MuiInputBase-root': { height: '30px', fontSize: '20px' }, // 👈 уменьшаем высоту и шрифт внутри
                           '& .MuiInputLabel-root': { fontSize: '15px' }, // 👈 уменьшаем размер label
                           '& .MuiOutlinedInput-root': { padding: '2px' } // 👈 уменьшаем внутренние отступы
                       }}
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