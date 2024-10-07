import { useState, useEffect, useRef, useCallback } from 'react';
import {
	Grid,
	Card,
	CardMedia,
	Box,
	Typography,
	IconButton,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import PlayCircleTwoToneIcon from '@mui/icons-material/PlayCircleTwoTone';
import PauseCircleTwoToneIcon from '@mui/icons-material/PauseCircleTwoTone';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong, setIsPlaying } from '../redux/slices/playerSlice';

const SongsListItem = ({ track, index }) => {
	const [songLength, setSongLength] = useState('0:00');
	const audioRef = useRef();
	const dispatch = useDispatch();

	const { key, title, artist, songUrl, songImage } = track;
	const activeSong = useSelector((state) => state.player.activeSong);
	const isPlaying = useSelector((state) => state.player.isPlaying);

	const handlePlayClick = (_) => {
		dispatch(setActiveSong(track));
		dispatch(setIsPlaying(true));
	};

	const handlePauseClick = (_) => {
		dispatch(setIsPlaying(false));
	};

	const handleLoadedMetadata = useCallback((event) => {
		const audio = event.target;
		const duration = audio.duration;
		setSongLength(`${Math.floor(duration / 60)}:${String(Math.floor(duration) % 60).padStart(2, '0')}`);
	}, []);

	useEffect(() => {
		const audioElement = audioRef.current;
		audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
		return () => {
			audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
		};
	}, [handleLoadedMetadata]);

	return (
		<Grid
			container
			key={key}
			sx={{
				paddingBottom: '5px',
				borderBottom: '1px solid green',
				borderRadius: '4%',
				backgroundColor: '#1e1e1e', // Darker background for modern look
				color: 'black', // Text color
			}}
		>
			<Card
				sx={{
					display: 'flex',
					flexGrow: 1,
					flexBasis: 0,
					justifyItems: 'center',
					alignItems: 'center',
					padding: '10px', // Padding for card
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						flexWrap: 'wrap',
						flexGrow: 1,
						flexBasis: 0,
					}}
				>
					<Typography sx={{ pr: index < 9 ? '9.05px' : '0px' }}>
						{index + 1}.&nbsp;
					</Typography>
					<CardMedia
						component='img'
						sx={{ width: '40px', height: '40px', pr: '5px', borderRadius: '4%' }}
						src={songImage}
						alt='cover'
					/>
					<Typography sx={{ flex: 1, color: !songUrl ? 'gray' : 'black' }}>
						{`${title?.substring(0, 20)}${title.length > 20 ? '..' : ''}`}
					</Typography>
					<Divider orientation='vertical' flexItem sx={{ backgroundColor: 'gray' }} />
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						flexWrap: 'wrap',
						flexGrow: 1,
						flexBasis: 0,
					}}
				>
					<Typography sx={{ flex: 1, color: !songUrl ? 'gray' : 'black' }}>
						{artist?.charAt(0).toUpperCase() + artist?.slice(1)}
					</Typography>
					<Divider orientation='vertical' flexItem sx={{ backgroundColor: 'gray' }} />
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						flexWrap: 'wrap',
						flexGrow: 1,
						flexBasis: 0,
					}}
				>
					<Typography sx={{ color: !songUrl ? 'gray' : 'black' }}>
						{songLength}
					</Typography>
					{(activeSong !== track || !isPlaying) && (
						<IconButton onClick={handlePlayClick} disabled={!songUrl} sx={{ '&:hover': { color: 'green' } }}>
							<PlayCircleTwoToneIcon />
						</IconButton>
					)}
					{activeSong === track && isPlaying && (
						<IconButton onClick={handlePauseClick} disabled={!songUrl} sx={{ '&:hover': { color: 'red' } }}>
							<PauseCircleTwoToneIcon />
						</IconButton>
					)}

					<audio ref={audioRef} src={songUrl} />
				</Box>
			</Card>
		</Grid>
	);
};

export default SongsListItem;
