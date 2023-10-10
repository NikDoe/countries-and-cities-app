import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';

function BackButton() {
	const navigate = useNavigate();
    
	const handleNavigateBack = (e: FormEvent) => {
		e.preventDefault();
		navigate(-1);
	};
    
	return (
		<Button 
			customType='back'
			onClick={handleNavigateBack}
		>
					&larr; Back
		</Button>
	);
}

export default BackButton;
