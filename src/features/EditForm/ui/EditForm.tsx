import cls from './EditForm.module.scss'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { memo, useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Input } from 'shared/ui/Input/Input'
import { IOption, Select } from 'shared/ui/Select/Select'
import { useBirthDateCreator } from 'shared/lib/hooks/useBirthDateCreator/useBirthDateCreator'
import { getOptionsItems, OptionName } from './OptionsItems'
import { withHookFormMask } from 'use-mask-input'
import { Button, ButtonColor } from 'shared/ui/Button/Button'
import { Modal } from 'shared/ui/Modal/Modal'

interface EditFormProps {
	className?: string
}

interface FormValues {
	firstName: string
	lastName: string
	dayBirth: string
	monthBirth: string
	yearBirth: string
	gender: string
	phone: string
	mail: string
	address: string
	agree: string
}

export const EditForm:React.FC<EditFormProps> = memo((props) => {
	const { className } = props

	const [dayBirth, setDayBirth] = useState<IOption[]>([])
	const [birthDate, getDaysBirthDate] = useBirthDateCreator()

	const [isOpenModalAgree, setIsOpenModalAgree] = useState(false)
	const [isOpenModalSubmit, setIsOpenModalSubmit] = useState(false)

	const onShowModalAgree = useCallback(() => setIsOpenModalAgree(true), [])
	const onCloseModalAgree = useCallback(() => setIsOpenModalAgree(false), [])
	const onShowModalSubmit = useCallback(() => setIsOpenModalSubmit(true), [])
	const onCloseModalSubmit = useCallback(() => setIsOpenModalSubmit(false), [])

	const {
		register,
		watch,
		resetField,
		setValue,
		control,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({ mode: 'onChange' })


	const birthDatValues = watch(['monthBirth', 'yearBirth'])
	const dayBirthValue = watch('dayBirth')

	const firstNameValue = watch('firstName')
	const lastNameValue = watch('lastName')

	const agreeValue = watch('agree')

	if(birthDatValues) {
		getDaysBirthDate(...birthDatValues)
	}
	if(birthDate.days.length !== dayBirth.length) {
		setDayBirth(birthDate.days)
	}
	if(+dayBirthValue > dayBirth.length) {
		resetField('dayBirth')
	}

	const onSubmit = () => {
		onCloseModalAgree()
		if(!Object.keys(errors).length && agreeValue && firstNameValue && lastNameValue ) {
			if(agreeValue && agreeValue === 'Yes') {
				onShowModalSubmit()
			}else if(agreeValue && agreeValue === 'No'){
				onShowModalAgree()
			}
		}
	}

	const modalOnSubmit = () => {
		setValue('agree', 'Yes')
		onSubmit()
	}

	return (
		<form className={classNames(cls.EditForm, {}, [className])} onSubmit={handleSubmit(onSubmit)}>
			<div className={cls.formItem}>
				<h2>Имя</h2>
				<Input
					className={errors.firstName ? cls.errorField : ''}
					placeholder='Ведите имя'
					register={register(
						'firstName',
						{required: true, maxLength: 50, pattern: /^[a-zа-яё\s]+$/i}
					)}
				/>
				{errors.firstName?.type === 'required' && <p>Заполните поле!</p>}
				{errors.firstName?.type === 'pattern' && <p>Нужно заполнить правильно!</p>}
				{errors.firstName?.type === 'maxLength' && <p>Слишком много буков!</p>}
			</div>

			<div className={cls.formItem}>
				<h2>Фамилия</h2>
				<Input
					className={errors.lastName ? cls.errorField : ''}
					placeholder='Ведите фамилию'
					register={register(
						'lastName',
						{required: true, maxLength: 50, pattern: /^[a-zа-яё\s]+$/i}
					)}
				/>
				{errors.lastName?.type === 'required' && <p>Заполните поле!</p>}
				{errors.lastName?.type === 'pattern' && <p>Нужно заполнить правильно!</p>}
				{errors.lastName?.type === 'maxLength' && <p>Слишком много буков!</p>}
			</div>

			<div className={cls.formItem}>
				<h2>День рождения</h2>
				<div className={cls.birthday}>
					<Controller
						name='dayBirth'
						control={control}
						rules={{
							required: 'Поле обязательное'
						}}
						render={({ field: { onChange, value }, fieldState: { error } }) => <>
							<Select
								placeholder='День'
								className={errors.dayBirth ? cls.errorField : ''}
								value={value}
								options={dayBirth}
								onChange={onChange}
							/>
						</>
						}
					/>
					{errors.dayBirth?.type === 'required' && <p>Заполните поле!</p>}
					<Controller
						name='monthBirth'
						control={control}
						rules={{
							required: 'Поле обязательное'
						}}
						render={({ field: { onChange, value }, fieldState: { error } }) => <>
							<Select
								placeholder='Месяц'
								className={errors.monthBirth ? cls.errorField : ''}
								value={value}
								options={birthDate.months}
								onChange={onChange}
							/>
						</>
						}
					/>
					{errors.monthBirth?.type === 'required' && <p>Заполните поле!</p>}
					<Controller
						name='yearBirth'
						control={control}
						rules={{
							required: 'Поле обязательное'
						}}
						render={({ field: { onChange, value }, fieldState: { error } }) => <>
							<Select
								placeholder='Год'
								className={errors.yearBirth ? cls.errorField : ''}
								value={value}
								options={birthDate.years}
								onChange={onChange}
							/>
						</>
						}
					/>
					{errors.yearBirth?.type === 'required' && <p>Заполните поле!</p>}
				</div>
			</div>

			<div className={cls.formItem}>
				<h2>Пол</h2>
				<Controller
						name='gender'
						control={control}
						rules={{
							required: 'Поле обязательное'
						}}
						render={({ field: { onChange, value }, fieldState: { error } }) => <>
							<Select
								placeholder='Укажите пол'
								className={errors.gender ? cls.errorField : ''}
								value={value}
								options={getOptionsItems(OptionName.GENDER)}
								onChange={onChange}
							/>
						</>
						}
					/>
					{errors.gender?.type === 'required' && <p>Заполните поле!</p>}
			</div>

			<div className={cls.formItem}>
				<h2>Номер телефона</h2>
				<Input
					className={errors.phone ? cls.errorField : ''}
					type='tel'
					placeholder='+7 (999) 999-99-99'
					register={withHookFormMask(register('phone', {required: true}), ['+7 (999) 999-99-99'])}
				/>
				{errors.phone?.type === 'required' && <p>Заполните поле!</p>}
			</div>

			<div className={cls.formItem}>
				<h2>Электронная почта</h2>
				<Input
					className={errors.mail ? cls.errorField : ''}
					type='mail'
					placeholder='Введите почту'
					register={register(
						'mail',
						{pattern: /^\s*(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"\s]{2,})\s*$/i}
					)}
				/>
				{errors.mail?.type === 'pattern' && <p>Нужно заполнить правильно!</p>}
			</div>

			<div className={cls.formItem}>
				<h2>Адрес</h2>
				<Input
					className={errors.address ? cls.errorField : ''}
					placeholder='Введите адрес'
					register={register(
						'address',
						{required: false, maxLength: 100}
					)}
				/>
				{errors.address?.type === 'maxLength' && <p>Слишком много буков!</p>}
			</div>

			<div className={cls.formItem}>
				<h2>Вы согласны отправить информацию?</h2>
					<span>Да<input className={cls.agreeInput} {...register('agree', { required: true })} type='radio' value='Yes' checked={agreeValue === 'Yes'} /></span>
					<span>Нет<input className={cls.agreeInput} {...register('agree', { required: true })} type='radio' value='No' checked={agreeValue === 'No' || !agreeValue} /></span>
			</div>


			<Button
				className={cls.btn}
				color={ButtonColor.PRIMARY}
				onClick={onSubmit}
			>
				Отправить
			</Button>
			<Button
				className={cls.btn}
				color={ButtonColor.SECONDARY}
				onClick={() => reset()}
			>
				Сброс
			</Button>

			{isOpenModalAgree &&
				<Modal isOpen={isOpenModalAgree} onClose={onCloseModalAgree}>
					<h1>Нужно все же согласиться на отправку информации!</h1>
					<h2>{'Иначе никак :('}</h2>
					<Button
						className={cls.btn}
						color={ButtonColor.PRIMARY}
						onClick={modalOnSubmit}
					>
						Принять
					</Button>
					<Button
						className={cls.btn}
						color={ButtonColor.SECONDARY}
						onClick={onCloseModalAgree}
					>
						Отмена
					</Button>
				</Modal>
			}
			{isOpenModalSubmit &&
				<Modal isOpen={isOpenModalSubmit} onClose={onCloseModalSubmit}>
					<h1>{`Спасибо ${firstNameValue}  ${lastNameValue} за отправку формы`}</h1>

					<Button
						className={cls.btn}
						color={ButtonColor.PRIMARY}
						onClick={onCloseModalSubmit}
					>
						Отлично
					</Button>
				</Modal>

			}
		</form>
	)
})
