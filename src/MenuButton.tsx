import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type MenuButtonPropsType = {
    background?: string
    boxShadow: string
}

export const MenuButton = styled(Button)<MenuButtonPropsType>(({background, boxShadow })=>({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: `0 0 0 2px ${boxShadow || "#054B62"}, 4px 4px 0 0 ${boxShadow  || "#054B62"}`,
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background:  background || '#1565c0',

}))