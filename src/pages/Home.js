import { Box, Container, Grid } from '@mui/material';
import GenreSidebar from '../components/GenreSidebar';
import RelatedSongSidebar from '../components/RelatedSongSidebar';
import SongsList from '../components/SongsList';

const HomePage = () => {
	return (
		<Container maxWidth="lg" sx={{ mb: '75px' }}>
			<Grid container spacing={2}>
				{/* Related Songs Sidebar */}
				<Grid item xs={12} sm={4}>
					<Box sx={{ height: '100%' }}>
						<RelatedSongSidebar />
					</Box>
				</Grid>

				{/* Main Songs List */}
				<Grid item xs={12} sm={4}>
					<Box sx={{ height: '100%' }}>
						<SongsList />
					</Box>
				</Grid>

				{/* Genre Sidebar */}
				<Grid item xs={12} sm={4}>
					<Box sx={{ height: '100%' }}>
						<GenreSidebar />
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default HomePage;
