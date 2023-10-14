import { ReactNode, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(function(){
		if(!isAuthenticated) navigate('/');
	}, [isAuthenticated, navigate]);
    
	return isAuthenticated ? children : null;
}

export default ProtectedRoute;
