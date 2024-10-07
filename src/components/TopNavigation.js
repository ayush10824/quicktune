import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, TextField, InputAdornment, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';

import { useGetSearchResultQuery } from '../redux/services/shazamApi';
import { setSearchResult, setSearching } from '../redux/slices/playerSlice';

const TopNavigation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState('');
    const [finalInputValue, setFinalInputValue] = useState('');
    const [mount, setMount] = useState(true);

    const { data, refetch, isFetching } = useGetSearchResultQuery(
        { term: finalInputValue.trim() },
        { skip: mount }
    );

    const handleSearch = (e) => {
        e.preventDefault();
        if (inputValue.length === 0) return;
        setFinalInputValue(inputValue);
        if (mount) setMount(false);
        else refetch();
        navigate('discover');
    };

    useEffect(() => {
        if (data) {
            dispatch(setSearchResult(data));
        }
    }, [data, dispatch]);

    useEffect(() => {
        dispatch(setSearching(isFetching));
    }, [dispatch, isFetching]);

    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                left: 0,
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                height: '80px',
                background: '#282c34',
                zIndex: '1',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Box width='150px'>
                <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
                    <Typography variant='h4' component='h1' sx={{ fontWeight: 'bold' }}>
                        Quick<Box sx={{ display: 'inline', color: 'green' }}>Tune</Box>
                    </Typography>
                </Link>
            </Box>
            <TextField
                sx={{
                    flexGrow: 1,
                    '& .MuiFilledInput-root': {
                        backgroundColor: '#3a3f47',
                        borderRadius: '25px',
                        color: 'white', // Text color for better readability
                        padding: '10px 15px', // Increased padding
                        '&:hover': {
                            backgroundColor: '#4a4f57',
                        },
                        '&.Mui-focused': {
                            backgroundColor: '#4a4f57',
                            border: '2px solid green',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#b0bec5', // Lighter label color
                    },
                    '& .MuiInputBase-input': {
                        color: 'white', // Input text color
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: '#90a4ae', // Lighter placeholder color
                    },
                }}
                id='search-bar'
                label='Type a song, artist, album'
                variant='filled'
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') handleSearch(e);
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleSearch} sx={{ color: 'white' }}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default TopNavigation;
