import React, {useEffect, useState} from 'react';
import './Charecter.css';
import {useAppSelector} from "../../hooks/redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';


function Character() {
    const {character, isLoading, error} = useAppSelector(state => state.characterReducer)
    const [change, setChange] = useState(true)
    const [value, setValue] = useState('')
    let name = character.name;
    useEffect(() => {
        setValue(character.name)
    }, [isLoading])
    const handleClick = () => {
        setChange(!change)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const handleSave = () => {
        name = value
        setChange(true)
    }
    useEffect(() => {
        name = value
    }, [name])
    return (
        <div className="character_container">
            {isLoading && <div className='loader'><CircularProgress/></div>}
            {error && <h1>{error}</h1>}
            {!isLoading &&
            <Box sx={{boxShadow: 5, my: 5}}>
                <Card variant="outlined" sx={{bgcolor: 'text.primary', color: 'background.paper'}}>
                    <CardContent>
                        <div className='edit_block'>

                            {change ?
                                <>
                                    <Typography variant="h5" component="div" mr={2}>
                                        {!change ? name : value}
                                    </Typography>
                                    <Button variant="outlined" startIcon={<EditIcon/>} onClick={handleClick}>
                                        Edit
                                    </Button>
                                </>
                                :
                                <>
                                    <input className='edit_field' type="text" onChange={handleChange} value={value}/>
                                    <Button variant="outlined" startIcon={<EditIcon/>} onClick={handleSave}>
                                        Save
                                    </Button>
                                </>

                            }
                        </div>
                        <Typography sx={{mb: 1.5, color: "rgba(255,255,255,0.6)"}}>
                            Birth year: {character.birth_year}
                        </Typography>
                        <Typography variant="body2">
                            Gender: {character.gender}
                        </Typography>
                        <Typography variant="body2">
                            Eye color: {character.eye_color}
                        </Typography>
                        <Typography variant="body2">
                            Hair color: {character.hair_color}
                        </Typography>
                        <Typography variant="body2">
                            Skin color: {character.skin_color}
                        </Typography>
                        <Typography variant="body2">
                            Height: {character.height}
                        </Typography>
                        <Typography variant="body2">
                            Mass: {character.mass}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            }
        </div>
    );
}

export default Character;
