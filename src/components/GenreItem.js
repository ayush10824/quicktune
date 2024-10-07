import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { useGetGenreSongsQuery } from '../redux/services/shazamApi';
import { setCurrentSongs } from '../redux/slices/playerSlice';

const GenreItem = ({ genre }) => {
	const dispatch = useDispatch();
	const [mount, setMount] = useState(true);
	const [clickCount, setClickCount] = useState(0);

	// technique to skip fetching on mounting the component -> conditional fetching using skip parameter
	const { data, refetch, error } = useGetGenreSongsQuery(
		{ listId: genre?.listid },
		{ skip: mount }
	);

	const fetchGenreSongs = () => {
		if (mount) setMount(false);
		else refetch(); // to fetch after this genre has been already fetched once in case user click again
		// we should refetch so that in case previous fetch got error somehow, we will again fetch now

		setClickCount((prevState) => prevState + 1);
		// using it so that with every query even though data doesn't change count changes and
		// currentSong list updates in useEffect, to show this genre's song in currentSongs list
	};

	// not returning anything in these cases as it will rerender the return part everytime based
	// on different conditions and then clicking a genre will make it disappear for a second to rerender
	// also in case of error the whole comonent will be invisible as it will simply return
	// if (error) return; if (isFetching) return;
	if (error) console.log('Error in loading genre songs!!');

	useEffect(() => {
		// dispatch using setstate because the returned component is not rendering so if it is
		// outside setState it will create confusion for react as it won't update the returned component
		// and give warning
		if (data) {
			const genreSongs = data?.tracks?.map((track) => ({
				key: track?.key || '',
				id: track?.hub?.actions?.[0]?.id || '',
				title: track?.title || '',
				artist: track?.artists?.[0]?.alias?.split('-')?.join(' ') || '',
				songUrl: track?.hub?.actions?.[1]?.uri || '',
				songImage: track?.images?.coverart || '',
			}));
			dispatch(setCurrentSongs(genreSongs));
		}
	}, [clickCount, data, dispatch]);

	return (
		<Box sx={{ borderBottom: '1px black solid' }}>
			<Button
				variant='text'
				sx={{
					'&.MuiButton-text': { color: 'black' },
				}}
				onClick={fetchGenreSongs}
			>
				<Typography variant='body2'>{genre?.name}</Typography>
			</Button>
		</Box>
	);
};

export default GenreItem;
