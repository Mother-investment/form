import { classNames } from 'shared/lib/classNames/classNames'
import cls from './FormPage.module.scss'
import { memo } from 'react'
import { Container } from 'shared/ui/Container/Container'
import { EditForm } from 'features/EditForm'

interface FormPageProps {
	className?: string
}

export const FormPage:React.FC<FormPageProps> = memo((props) => {
	const { className } = props

	return (
		<div className={classNames(cls.FormPage, {}, [className])}>
			<Container>
				<EditForm />
			</Container>
		</div>
	)
})