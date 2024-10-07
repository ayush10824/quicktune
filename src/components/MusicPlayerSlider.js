import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, Container, Slider, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';

import { useSelector, useDispatch } from 'react-redux';

import { setIsPlaying } from '../redux/slices/playerSlice';

const WallPaper = {
	position: 'fixed',
	width: '100%',
	height: '68px',
	bottom: 0,
	left: 0,
	overflow: 'hidden',
	background: 'linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)',
	transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
};

const TinyText = styled(Typography)({
	fontSize: '0.75rem',
	opacity: 0.38,
	fontWeight: 500,
	letterSpacing: 0.2,
});

let firstTime = 0;

const MusicPlayerSlider = () => {
	const theme = useTheme();
	const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
	// const lightIconColor =
	//   theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

	const dispatch = useDispatch();

	const activeSong = useSelector((state) => state.player.activeSong);
	const isPlaying = useSelector((state) => state.player.isPlaying);

	const [volume, setVolume] = useState(1);
	const [paused, setPaused] = useState(true);
	const [duration, setDuration] = useState(0);
	const [timeProgress, setTimeProgress] = useState(0);

	const audioRef = useRef(null);
	const timeSliderEl = useRef(null);
	const playAnimationRef = useRef();

	const repeat = useCallback(() => {
		const currTime = Math.floor(audioRef.current?.currentTime);
		setTimeProgress(currTime);

		playAnimationRef.current = requestAnimationFrame(repeat);
	}, [setTimeProgress, audioRef]);

	function formatDuration(value) {
		const minute = Math.floor(value / 60);
		const secondLeft = value - minute * 60;
		return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
	}

	const onLoadedMetadata = () => {
		const seconds = Math.floor(audioRef.current.duration);
		setDuration(seconds);
	};

	const onPlayingEnded = () => {
		setPaused(true);
		dispatch(setIsPlaying(false));
	};

	useEffect(() => {
		audioRef.current.volume = volume; // volume ranges from 0 to 1
	}, [volume]);

	useEffect(() => {
		if (firstTime < 2) {
			firstTime++;
		} else {
			audioRef.current.src = activeSong?.songUrl;
			audioRef.current.play();
		}
	}, [activeSong]);

	useEffect(() => {
		setPaused(!isPlaying);
	}, [isPlaying]);

	useEffect(() => {
		if (paused) {
			audioRef.current.pause();
			cancelAnimationFrame(playAnimationRef.current);
		} else {
			audioRef.current.play();
		}
		playAnimationRef.current = requestAnimationFrame(repeat);
	}, [paused, audioRef, repeat]);

	// useEffect(() => {
	// 	console.log(
	// 		'audioRef.current.currentTime:',
	// 		audioRef?.current?.currentTime,
	// 		'position:',
	// 		position,
	// 		'timeProgress:',
	// 		timeProgress
	// 	);
	// }, [audioRef?.current?.currentTime, position, timeProgress]);

	return (
		<Box
			sx={{
				width: '100%',
				overflow: 'hidden',
			}}
		>
			<Box sx={WallPaper}>
				<Box
					sx={{
						display: 'flex',
						height: '100%',
						justifyItems: 'center',
						alignItems: 'center',
					}}
				>
					<Box sx={{ display: 'flex', width: '25%', columnGap: '10px' }}>
						<img
							src={activeSong?.songImage || ''}
							style={{ height: '60px', width: 'auto', paddingLeft: '10px' }}
							alt='cover'
						/>
						<audio
							ref={audioRef}
							src={activeSong?.songUrl || ''}
							onLoadedMetadata={onLoadedMetadata}
							onEnded={onPlayingEnded}
							style={{ display: 'none' }}
						/>

						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
							}}
							justifyContent='flex-end'
						>
							<Typography variant='h6' sx={{ align: 'left' }}>
								{`${activeSong?.title?.substring(0, 12)}${
									activeSong?.title.length > 20 ? '..' : ''
								}`}
							</Typography>
							<Typography
								variant='body2'
								letterSpacing={-0.25}
								sx={{ color: '#505050' }}
							>
								{activeSong?.artist?.charAt(0)?.toUpperCase() +
									activeSong?.artist?.slice(1) || ''}
							</Typography>
						</Box>
					</Box>
					<Container
						sx={{ display: 'flex', flexDirection: 'column', width: '40%' }}
					>
						<Box
							sx={{ display: 'flex' }}
							justifyContent='center'
							alignContent='flex-start'
							marginTop={-2}
						>
							<Box>
								<IconButton
									size='small'
									aria-label='backward 10 seconds'
									onClick={() => {
										audioRef.current.currentTime = Math.max(
											0,
											timeProgress - 10
										);
									}}
								>
									<FastRewindRoundedIcon
										fontSize='large'
										htmlColor={mainIconColor}
									/>
								</IconButton>
							</Box>
							<Box>
								<IconButton
									size='small'
									disabled={!activeSong?.songUrl}
									aria-label={paused ? 'play' : 'pause'}
									onClick={() => {
										setPaused(!paused);
										dispatch(setIsPlaying(!isPlaying));
									}}
								>
									{paused ? (
										<PlayArrowRounded
											fontSize='large'
											htmlColor={mainIconColor}
										/>
									) : (
										<PauseRounded fontSize='large' htmlColor={mainIconColor} />
									)}
								</IconButton>
							</Box>
							<Box>
								<IconButton
									size='small'
									aria-label='forward 10 seconds'
									onClick={() => {
										audioRef.current.currentTime = Math.min(
											duration,
											timeProgress + 10
										);
									}}
								>
									<FastForwardRoundedIcon
										fontSize='large'
										htmlColor={mainIconColor}
									/>
								</IconButton>
							</Box>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								mt: -2,
								mb: 1,
							}}
						>
							<TinyText>{formatDuration(timeProgress)}</TinyText>
							<TinyText>-{formatDuration(duration - timeProgress)}</TinyText>
						</Box>
						<Slider
							ref={timeSliderEl}
							aria-label='time-indicator'
							size='small'
							value={timeProgress}
							min={0}
							max={duration}
							// onChange={(_, value) => setPosition(value)}
							onChange={(_, value) => (audioRef.current.currentTime = value)}
							sx={{
								color:
									theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
								height: 3,
								padding: 0,
								'& .MuiSlider-thumb': {
									width: 8,
									height: 8,
									transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
									'&:before': {
										boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
									},
									'&:hover, &.Mui-focusVisible': {
										boxShadow: `0px 0px 0px 8px ${
											theme.palette.mode === 'dark'
												? 'rgb(255 255 255 / 16%)'
												: 'rgb(0 0 0 / 16%)'
										}`,
									},
									'&.Mui-active': {
										width: 12,
										height: 12,
									},
								},
								'& .MuiSlider-rail': {
									opacity: 0.28,
								},
							}}
						/>
					</Container>
					<Box sx={{ display: 'flex', width: '15%', pr: '100px' }}>
						<VolumeUpRoundedIcon htmlColor={mainIconColor} />
						<Slider
							aria-label='Volume'
							min={0}
							max={1}
							defaultValue={1}
							step={0.01}
							onChange={(_, value) => setVolume(value)}
							size='small'
							sx={{
								mt: '11px',
								height: 3,
								color:
									theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
								padding: 0,
								'& .MuiSlider-thumb': {
									width: 8,
									height: 8,
									transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
									'&:before': {
										boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
									},
									'&:hover, &.Mui-focusVisible': {
										boxShadow: `0px 0px 0px 8px ${
											theme.palette.mode === 'dark'
												? 'rgb(255 255 255 / 16%)'
												: 'rgb(0 0 0 / 16%)'
										}`,
									},
									'&.Mui-active': {
										width: 12,
										height: 12,
									},
								},
								'& .MuiSlider-rail': {
									opacity: 0.28,
								},
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default MusicPlayerSlider;
