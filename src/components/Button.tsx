import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
	customType?: 'default' | 'primary' | 'back' | 'position';
}

function Button(props: ButtonProps) {
	const {
		children,
		customType = 'default',
		...otherProps
	} = props;

	const classNamesString = `${styles.btn} ${styles[customType]}`;

	return (
		<button
			className={classNamesString}
			{...otherProps}
		>
			{children}
		</button>
	);
}

export default Button;
