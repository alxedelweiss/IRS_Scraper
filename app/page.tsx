'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
	const [formData, setFormData] = useState('' as string)
	const [hasSearched, setHasSearched] = useState(false as boolean)
	const [isLoading, setIsLoading] = useState(false as boolean)
	const [searchResults, setSearchResults] = useState([] as string[])
	const [sortField, setSortField] = useState(-1 as number)
	const [sortOrder, setSortOrder] = useState('asc' as string)

	let index = 1
	// console.log(searchResults[sortField][0], sortOrder)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setHasSearched(true)
		fetch('http://localhost:5555/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		})
			.then((res) => {
				if (res.status === 200) {
					console.log('success')
					res.json().then((data) => setSearchResults(data))
					setIsLoading(false)
				} else {
					console.error('failed')
				}
			})
			.catch((err) => console.error(err))
	}

	const sortTable = (field: number) => {
		const order = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc'
		setSortField(field)
		setSortOrder(order)
		handleSorting(field, order)
	}

	const handleSorting = (sortField: number, sortOrder: string) => {
		const sorted = [...searchResults].sort((a, b) => {
			return (
				a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
					numeric: true
				}) * (sortOrder === 'asc' ? 1 : -1)
			)
		})
		setSearchResults(sorted)
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
			{isLoading && <p className='text-center text-lg font-bold'>Loading...</p>}
			{!isLoading && hasSearched && (
				<section className='flex flex-col overflow-x-auto'>
					<h2 className='text-2xl my-2 font-bold text-center'>
						Search Results
					</h2>
					{searchResults.length === 0 ? (
						<p className='text-center text-lg font-bold'>
							No results found. Please try again.
						</p>
					) : (
						<>
							<p className='text-center text-lg font-bold'>
								{searchResults.length} results found.
							</p>

							<table className='min-w-full text-center text-xs font-light'>
								<thead className='border-b bg-amber-500 text-white font-medium dark:border-neutral-500'>
									<tr>
										<th scope='col' className='cursor-pointer py-4'>
											#
										</th>
										<th
											scope='col'
											className='hover:bg-slate-600 cursor-pointer'
											onClick={() => sortTable(0)}
										>
											Name of Business
											{sortField === 0 && sortOrder === 'asc' ? (
												<Image
													src='/arrow-up.svg'
													width='0'
													height='0'
													sizes='100vw'
													className='w-6 h-auto inline-block'
													alt='arrow up'
												/>
											) : (
												<Image
													src='/arrow-down.svg'
													width='0'
													height='0'
													sizes='100vw'
													className='w-6 h-auto inline-block'
													alt='arrow down'
												/>
											)}
										</th>
										<th
											scope='col'
											className='hover:bg-slate-600 cursor-pointer'
											onClick={() => sortTable(1)}
										>
											Address
											{sortField === 1 && sortOrder === 'asc' ? (
												<Image
													src='/arrow-up.svg'
													width='0'
													height='0'
													sizes='100vw'
													className='w-6 h-auto inline-block'
													alt='arrow up'
												/>
											) : (
												<Image
													src='/arrow-down.svg'
													width='0'
													height='0'
													sizes='100vw'
													className='w-6 h-auto inline-block'
													alt='arrow down'
												/>
											)}
										</th>
										<th
											scope='col'
											className='hover:bg-slate-600 cursor-pointer'
											onClick={() => sortTable(2)}
										>
											City/State/ZIP
											{sortField === 2 && sortOrder === 'asc' ? (
												<Image
													src='/arrow-up.svg'
													width='0'
													height='0'
													sizes='100vw'
													className='w-6 h-auto inline-block'
													alt='arrow up'
												/>
											) : (
												<Image
													src='/arrow-down.svg'
													width='0'
													height='0'
													sizes='100vw'
													className='w-6 h-auto inline-block'
													alt='arrow down'
												/>
											)}
										</th>
										<th
											scope='col'
											className='hover:bg-slate-600 cursor-pointer'
											onClick={() => sortTable(3)}
										>
											Point of Contact
											{sortField === 3 && sortOrder === 'asc' ? (
												<Image
													src='/arrow-up.svg'
													width='0'
													height='0'
													sizes='100vw'
													className='w-6 h-auto inline-block'
													alt='arrow up'
												/>
											) : (
												<Image
													src='/arrow-down.svg'
													width='0'
													height='0'
													sizes='100vw'
													className='w-6 h-auto inline-block'
													alt='arrow down'
												/>
											)}
										</th>
										<th
											scope='col'
											className='hover:bg-slate-600 cursor-pointer'
											onClick={() => sortTable(4)}
										>
											Telephone
											{sortField === 4 && sortOrder === 'asc' ? (
												<Image
													src='/arrow-up.svg'
													width='0'
													height='0'
													sizes='100vw'
													className='w-6 h-auto inline-block'
													alt='arrow up'
												/>
											) : (
												<Image
													src='/arrow-down.svg'
													width='0'
													height='0'
													sizes='100vw'
													className='w-6 h-auto inline-block'
													alt='arrow down'
												/>
											)}
										</th>
										<th
											scope='col'
											className='hover:bg-slate-600 cursor-pointer'
											onClick={() => sortTable(5)}
										>
											Type of Service
											{sortField === 5 && sortOrder === 'asc' ? (
												<Image
													src='/arrow-up.svg'
													width='0'
													height='0'
													sizes='100vw'
													className='w-6 h-auto inline-block'
													alt='arrow up'
												/>
											) : (
												<Image
													src='/arrow-down.svg'
													width='0'
													height='0'
													sizes='100vw'
													className='w-6 h-auto inline-block'
													alt='arrow down'
												/>
											)}
										</th>
									</tr>
								</thead>
								<tbody>
									{searchResults &&
										searchResults.map((entry) => (
											<tr
												key={entry[0]}
												className='border-b dark:border-neutral-500'
											>
												<td className='whitespace-nowrap font-medium'>
													{index++}
												</td>
												<td className='whitespace-nowrap py-4'>{entry[0]}</td>
												<td className='whitespace-nowrap py-4'>{entry[1]}</td>
												<td className='whitespace-nowrap py-4'>{entry[2]}</td>
												<td className='whitespace-nowrap py-4'>{entry[3]}</td>
												<td className='whitespace-nowrap py-4'>{entry[4]}</td>
												<td className='whitespace-nowrap py-4'>{entry[5]}</td>
											</tr>
										))}
								</tbody>
							</table>
						</>
					)}
				</section>
			)}
		</main>
	)
}
