import { useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useSelector, useDispatch } from 'react-redux';

import { setCurrentSongs } from '../redux/slices/playerSlice';
import SongsListItem from './SongsListItem';
import { useGetTopGlobalChartsQuery } from '../redux/services/shazamApi';

const SongsList = () => {
	const dispatch = useDispatch();
	const currentSongs = useSelector((state) => state.player.currentSongs);
	// console.log(currentSongs);

	const { data, isFetching, error } = useGetTopGlobalChartsQuery();
	useEffect(() => {
		if (data) {
			const songs = data?.tracks?.map((track) => ({
				key: track?.key || '',
				id: track?.hub?.actions?.[0]?.id || '',
				title: track?.title || '',
				artist: track?.artists?.[0]?.alias?.split('-')?.join(' ') || '',
				songUrl: track?.hub?.actions?.[1]?.uri || '',
				songImage: track?.images?.coverart || '',
			}));
			dispatch(setCurrentSongs(songs));
		}
	}, [data, dispatch]);

	if (error) {
		return (
			<Typography variant='h6' textAlign='center'>
				Failed to load data. Please Check your connection.
			</Typography>
		);
	}

	// Showing Loading State
	if (isFetching)
		return (
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						top: '30%',
						left: '40%',
					}}
				>
					<CircularProgress
						sx={{ position: 'absolute', left: '50%', bottom: '100%' }}
						color='inherit'
					/>
					<Typography variant='subtitle2' sx={{ fontStyle: 'italic' }}>
						Looking into the world of harmony...
					</Typography>
				</Box>
			</Box>
		);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				mb: '75px',
			}}
		>
			{/* heading */}
			<Grid container sx={{ pb: '2px' }}>
				<Grid item xs={4}>
					<Paper elevation={2} square>
						Title
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper elevation={2} square>
						Artist
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper elevation={2} square>
						Duration
					</Paper>
				</Grid>
			</Grid>
			{/* data items */}
			<Grid container>
				{/* {data?.tracks?.map((track, index) => (
					<SongsListItem
						index={index}
						key={track.key}
						track={{
							key: track?.key || '',
							id: track?.hub?.actions?.[0]?.id || '',
							title: track?.title || '',
							artist: track?.artists?.[0]?.alias?.split('-')?.join(' ') || '',
							songUrl: track?.hub?.actions?.[1]?.uri || '',
							songImage: track?.images?.coverart || '',
						}}
					/>
				))} */}
				{currentSongs.map((track, index) => (
					<SongsListItem index={index} key={track?.key} track={track} />
				))}
			</Grid>
		</Box>
	);
};

export default SongsList;
