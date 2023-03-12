import { FormPage } from 'pages/FormPage'
import { Suspense } from 'react'

const App: React.FC = () => {

	return (
		<div className='app' id='app'>
			<Suspense fallback={'<Loader/>'}>
				<FormPage />
			</Suspense>
		</div>
	)
}
export default App
