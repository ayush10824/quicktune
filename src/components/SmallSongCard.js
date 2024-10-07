import {
	Card,
	CardMedia,
	Box,
	CardContent,
	Typography,
	IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveSong, setIsPlaying } from '../redux/slices/playerSlice';

const TinyText = styled(Typography)({
	fontSize: '0.90rem',
});

const SmallSongCard = ({ track }) => {
	const { title, songImage, songUrl } = track;

	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const dispatch = useDispatch();

	const handlePlayClick = (_) => {
		dispatch(setActiveSong(track));
		dispatch(setIsPlaying(true));
	};

	const handlePauseClick = (_) => {
		dispatch(setIsPlaying(false));
	};

	return (
		<Card
			sx={{
				display: 'flex',
				height: '50px',
			}}
		>
			<CardMedia
				component='img'
				sx={{ width: '50px', height: '100%' }}
				alt='cover'
				image={songImage}
			/>
			<Box
				alignSelf='center'
				sx={{ display: 'flex', flexDirection: 'row', maxWidth: '280px' }}
			>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<TinyText component='div' variant='h5'>
						{title?.split('(')[0]?.split('-')[0]}
					</TinyText>
				</CardContent>
				<Box alignSelf='center'>
					{(activeSong !== track || !isPlaying) && (
						<IconButton
							sx={{ height: 38, width: 38 }}
							onClick={handlePlayClick}
							disabled={!songUrl}
						>
							<PlayArrowIcon />
						</IconButton>
					)}
					{activeSong === track && isPlaying && (
						<IconButton
							sx={{ height: 38, width: 38 }}
							onClick={handlePauseClick}
							disabled={!songUrl}
						>
							<PauseIcon />
						</IconButton>
					)}
				</Box>
			</Box>
		</Card>
	);
};

export default SmallSongCard;
