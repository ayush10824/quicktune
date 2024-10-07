import { Stack, Typography } from '@mui/material';

import { useGetGlobalGenresQuery } from '../redux/services/shazamApi';
import GenreItem from './GenreItem';

const GenreSidebar = () => {
	const { data, isFetching, error } = useGetGlobalGenresQuery();
	const genresList = data?.global?.genres;

	if (error) {
		return <Typography>Error loading genres</Typography>;
	}

	if (isFetching) {
		return <Typography>Loading genres only for you</Typography>;
	}

	return (
		<Stack
			direction='row'
			sx={{
				// overflowY: 'auto',
				height: '95%',
				flexDirection: 'column',
			}}
		>
			{genresList.map((genre) => (
				<GenreItem key={genre?.id} genre={genre} />
			))}
		</Stack>
	);
};

export default GenreSidebar;
