import { Stack, Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

import SmallSongCard from './SmallSongCard';
import { useGetRecommendedSongsQuery } from '../redux/services/shazamApi';

const RelatedSongSidebar = () => {
	const activeSong = useSelector((state) => state.player.activeSong);

	const { data, isFetching, error } = useGetRecommendedSongsQuery({
		id: `track-similarities-id-${activeSong?.key}`,
	});

	let relatedShazamSongList = data?.resources?.['shazam-songs']; // it is an obj of obj
	if (relatedShazamSongList)
		relatedShazamSongList = Object.values(relatedShazamSongList);

	return (
		<Stack>
			<Typography variant='h6'>Similar Songs</Typography>
			{error && <div>Error in loading new related Songs</div>}
			{isFetching && (
				<Box sx={{ display: 'flex' }} alignContent='center'>
					<Typography sx={{ display: 'inline' }}>
						Finding new related songs &nbsp;
						<CircularProgress size='1rem' color='inherit' />
					</Typography>
				</Box>
			)}
			{relatedShazamSongList
				?.filter((track) => track?.attributes?.streaming?.preview)
				?.map((track) => (
					<SmallSongCard
						key={track?.id}
						track={{
							key: track?.id || '',
							id: track?.id || '',
							title: track?.attributes?.title || '',
							artist: track?.attributes?.primaryArtist || '',
							songUrl: track?.attributes?.streaming?.preview || '',
							songImage: track?.attributes?.images?.coverArt || '',
						}}
					/>
				))}
		</Stack>
	);
};

export default RelatedSongSidebar;
