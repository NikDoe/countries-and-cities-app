import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/AuthContext';

import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from './pages/ProtectedRoute';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';
import City from './components/City';

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Routes>
						<Route index element={<Homepage />}/>
						<Route path='pricing' element={<Pricing />}/>
						<Route path='product' element={<Product />}/>
						<Route path='login' element={<Login />}/>
						<Route 
							path='app' 
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={
								<Navigate to='cities' 
									replace={true} />
							} />
							<Route path='cities' element={<CityList />} 
							/>
							<Route path='cities/:id' element={<City />} />
							<Route path='countries' element={<CountryList />} 
							/>
							<Route path='form' element={<Form />} />
						</Route>
						<Route path='*' element={<PageNotFound />}/>
					</Routes>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
