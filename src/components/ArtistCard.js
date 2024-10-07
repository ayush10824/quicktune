import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const ArtistCard = ({ artist }) => {
	return (
		<>
			{artist?.name && (
				<Card
					sx={{
						maxWidth: '10rem',
						height: '12rem',
						flexGrow: '1',
					}}
				>
					<CardMedia
						sx={{ height: '9rem', width: 'auto' }}
						image={artist?.avatar}
						style={{
							mask: 'linear- gradient(to right, rgba(0, 0, 0, 1.0) 50%, transparent 100%)',
						}}
					></CardMedia>
					<CardContent sx={{ height: '0.5rem' }}>
						<Typography>{artist?.name}</Typography>
					</CardContent>
				</Card>
			)}
		</>
	);
};

export default ArtistCard;
