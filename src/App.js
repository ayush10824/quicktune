import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import DiscoverPage from './pages/Discover';
import ErrorPage from './pages/Error';
import './App.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'discover', element: <DiscoverPage /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
