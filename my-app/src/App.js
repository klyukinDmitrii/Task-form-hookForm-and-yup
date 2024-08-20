import styles from './App.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef, useEffect } from 'react';
import { TextField } from './components/TextField';

const fieldsSchema = yup.object().shape({
	email: yup

		.string()
		.required('Почта обязательна')
		.email('Почта должна быть существующей.'),
	password: yup
		.string()
		.required('Пароль обязателен')
		.min(6, 'Пароль должен быть как минимум из 6 символов')
		.max(20, 'Пароль не должен превышать 20 символов'),
	checkPassword: yup
		.string()
		.required('Пароль обязателен')
		.oneOf([yup.ref('password'), null], 'Пароль должен совпадать'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(fieldsSchema),
		mode: 'onChange',
	});

	const buttonRef = useRef(null);

	function onSubmit(data) {
		console.log(data);
	}

	useEffect(() => {
		if (isValid) {
			buttonRef.current.focus();
		}
	}, [isValid]);

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					placeholder="Введите почту:"
					name="email"
					register={register}
					errors={errors}
				/>
				<TextField
					placeholder="Введите пароль:"
					name="password"
					register={register}
					errors={errors}
				/>
				<TextField
					placeholder="Повторите пароль:"
					name="checkPassword"
					register={register}
					errors={errors}
				/>

				<button
					ref={buttonRef}
					disabled={!isValid}
					type="submit"
					className={styles.buttons}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
