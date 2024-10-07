import { Outlet } from 'react-router-dom';

import TopNavigation from '../components/TopNavigation';
import MusicPlayerSlider from '../components/MusicPlayerSlider';

const RootLayout = () => {
	return (
		<>
			<TopNavigation />
			<main>
				<Outlet />
			</main>
			<MusicPlayerSlider />
		</>
	);
};

export default RootLayout;
