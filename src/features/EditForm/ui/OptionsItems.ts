import { IOption } from 'shared/ui/Select/Select'

export enum OptionName {
    GENDER = 'gender'
}

interface IOptions {
	gender: IOption[]
}

export const getOptionsItems = (name : OptionName) => {

	const options: IOptions = {
		gender: [
			{ label: 'Мужской', value: 'Male' },
			{ label: 'Женский', value: 'Female' },
			{ label: 'Другой', value: 'other' }
		]
	}

	return options[name]
}


export const getValue = (value: string, name: OptionName) => {
	return value ? getOptionsItems(name).find((option) => option.value === value) : ''
}