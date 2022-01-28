import React, {useEffect, useState} from 'react';
import './Charecters.css';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/redux";
import {fetchCharacter, fetchCharacters} from "../../store/reducers/ActionCreators";
import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {IconButton, Pagination, TextField} from "@mui/material";
import {SearchOutlined} from '@mui/icons-material'


function Characters() {
    const [page, setPage] = React.useState(1);
    const [value, setValue] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {characters, isLoading, error} = useAppSelector(state => state.charactersReducer)

    useEffect(() => {
        dispatch(fetchCharacters(page))
    }, [page])

    const handleChange = (event: any, value: React.SetStateAction<number>) => {
        setPage(value);
    };

    const handleClick = (url: string) => {
        dispatch(fetchCharacter(url))
        navigate("/character")
    }
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    const filteredData = characters.filter(item => {
        return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    return (
        <div className="characters">
            {isLoading && <div className='loader'><CircularProgress/></div>}
            {error && <h1>{error}</h1>}
            {!isLoading &&
            <>
                <h1>Characters List </h1>
                <TextField onChange={handleOnChange}
                           fullWidth
                           id="standard-bare"
                           className='search'
                           variant="outlined"
                           placeholder="Search..."
                           InputProps={{
                               endAdornment: (
                                   <IconButton>
                                       <SearchOutlined/>
                                   </IconButton>
                               ),
                           }}
                />
                <Box display="grid" gridTemplateColumns="repeat(auto-fill, 275px)" gap={5} justifyContent="center">
                    {characters && filteredData.map((item, index) =>
                        <Box key={index} sx={{minWidth: 275, boxShadow: 5}}>
                            <Card variant="outlined" sx={{bgcolor: 'text.primary', color: 'background.paper'}}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography sx={{mb: 1.5, color: "rgba(255,255,255,0.6)"}}>
                                        Birth year: {item.birth_year}
                                    </Typography>
                                    <Typography variant="body2">
                                        Gender: {item.gender}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => handleClick(item.url)} size="small" variant="outlined"
                                            sx={{color: "rgb(144, 202, 249)"}}>See More</Button>
                                </CardActions>
                            </Card>
                        </Box>
                    )}
                </Box>
                <Box display="grid" justifyContent="center" sx={{my: 5}}>
                    <Pagination className='pagination_btn' count={8} page={page} onChange={handleChange}
                                sx={{my: 5, color: "#ffffff"}} color='primary'/>
                </Box>

            </>
            }

        </div>
    );
}

export default Characters;
