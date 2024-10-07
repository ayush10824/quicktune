import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';

import SongsListItem from '../components/SongsListItem';
import RelatedSongSidebar from '../components/RelatedSongSidebar';
import ArtistCard from '../components/ArtistCard';

const DiscoverPage = () => {
	const searchResult = useSelector((state) => state.player.searchResult);
	const isSearching = useSelector((state) => state.player.isSearching);
	return (
		<>
			{isSearching && (
				<Box sx={{ display: 'flex' }} alignContent='center'>
					<Typography sx={{ display: 'inline' }}>
						Searching for songs &nbsp;
						<CircularProgress size='1rem' color='inherit' />
					</Typography>
				</Box>
			)}
			{!isSearching && (
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						justifyContent: 'space-between',
						mb: '75px',
					}}
				>
					<Box sx={{ width: '70%' }}>
						<Box>
							<Typography variant='h5'>Songs</Typography>
							{searchResult?.tracks?.hits?.map(({ track }, index) => (
								<SongsListItem
									index={index}
									key={track.key}
									track={{
										key: track?.key || '',
										id: track?.hub?.actions?.[0]?.id || '',
										title: track?.title || '',
										artist: track?.subtitle?.split('-')?.join(' ') || '',
										songUrl: track?.hub?.actions?.[1]?.uri || '',
										songImage: track?.images?.coverart || '',
									}}
								/>
							))}
							{!searchResult?.tracks?.hits && (
								<Typography variant='body1'>
									No songs found with this name.
								</Typography>
							)}
						</Box>
						<Box sx={{ pt: '30px' }}>
							<Typography variant='h5'>Artists</Typography>
							<Box sx={{ display: 'flex' }}>
								{
									<ArtistCard
										artist={searchResult?.artists?.hits?.[0]?.artist}
									/>
								}
								{!searchResult?.artists?.hits?.[0]?.artist && (
									<Typography variant='body1' sx={{ fontStyle: 'italic' }}>
										No artist found with this name.
									</Typography>
								)}
							</Box>
						</Box>
					</Box>

					<Box sx={{ width: '30%', pl: '10px' }}>
						<RelatedSongSidebar />
					</Box>
				</Box>
			)}
		</>
	);
};

export default DiscoverPage;
