import styles from './TextField.module.css';

export const TextField = ({ placeholder, register, name, errors }) => {
	return (
		<div className={styles.input}>
			<div className={styles.black}>
			     {errors[name]?.message}
			</div>
			<input type="text" {...register(name)} id={name} placeholder={placeholder} />
		</div>




	);
};
