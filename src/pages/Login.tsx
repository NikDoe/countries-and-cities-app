import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

import styles from './Login.module.css';

export default function Login() {
	const [email, setEmail] = useState('nikdoe@example.com');
	const [password, setPassword] = useState('qwerty');
	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	function handleLogin (e: FormEvent) {
		e.preventDefault();
		if(email && password ) login(email, password);
	}

	useEffect(function(){
		if(isAuthenticated) navigate('/app', { replace: true });
	}, [isAuthenticated, navigate]);

	if(isAuthenticated) return null;

	return (
		<main className={styles.login}>
			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						id='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button
						customType='primary'
						onClick={handleLogin}
					>
					Login
					</Button>
				</div>
			</form>
		</main>
	);
}
