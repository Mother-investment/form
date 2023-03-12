import { ButtonHTMLAttributes } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ButtonColor {
	PRIMARY = 'primary',
	SECONDARY = 'secondary'
}


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
	className?: string
	color?: ButtonColor
	square?: boolean
	disabled?: boolean
}

export const Button:React.FC<ButtonProps> = (props) => {
	const {
		className,
		children,
		color = ButtonColor.PRIMARY,
		square,
		disabled,
		...otherProps
	} = props

	const mods: Mods = {
		[cls.square]: square,
		[cls.disabled]: disabled
	}

	return (
		<button className={classNames(cls.Button, mods, [className, cls[color]])} disabled={disabled} {...otherProps}>
			{children}
		</button>
	)
}