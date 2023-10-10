'use client'
import { useState } from 'react'

export default function Home() {
	const [formData, setFormData] = useState('' as string)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log(formData)
	}
	return (
		<main className='flex min-h-screen flex-col items-center p-24'>
			<h1 className='text-lg font-bold'>
				Search for Authorized IRS e-file Providers for Individuals and
				Businesses
			</h1>
			<p className='mt-4'>
				For your convenience, the IRS provides an online database that allows
				you to locate the closest authorized IRS e-file providers, where you can
				electronically file your tax return.
			</p>
			<p className='my-4'>
				Simply enter your 5-digit ZIP code in the box below, or select a state
				or U.S. territory, and click the Apply button. Search results will be
				sorted in alphabetical order by the business name.
			</p>
			<form
				className='inline-flex items-center justify-center'
				onSubmit={handleSubmit}
			>
				<input
					type='text'
					placeholder='Enter Zip Code'
					onChange={(event) => setFormData(event.target.value)}
				/>
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 px-4 rounded'>
					Submit
				</button>
			</form>
		</main>
	)
}
