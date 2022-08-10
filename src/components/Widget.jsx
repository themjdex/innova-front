import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import widgetState from '../store/widgetState';

const Widget = observer(({ valutes, yesterday }) => {
	const [diff, setDiff] = useState([]);

	useEffect(() => {
		/**
		 * Функция высчитывает разницу курсов сегодняшнего и вчерашнего дня 
		 */
		const calculate = () => {
			let diffValues = [];
			for (let i = 0; i < valutes.length; i++) {
				diffValues.push(valutes[i].value - yesterday[i].value);
			}
			setDiff(diffValues);
		}
		calculate();
	}, [valutes, yesterday]);

	return (
		<>
			{valutes.length > 0 ? <span >Курс на {valutes[0].date}</span> : ''}
			<div className='flex flex-row justify-end'>
				<Link className='p-2 bg-white rounded text-blue-500 w-28' to='/settings'>Настройки</Link>
			</div>

			{valutes && valutes.map(valute => {
				return (
					<>
						{widgetState.getItemVisibility(valute.id - 1).visible ?
							<div className='flex flex-row bg-white text-black justify-between my-2 p-2 rounded' key={valute.id}>
								<div>{valute.nominal} {valute.valute}</div>
								{diff[valute.id] < 0 ?
									<div className='text-red-600 font-bold'>{valute.value} ₽</div> :
									<div className='text-green-500 font-bold'>{valute.value} ₽</div>}
							</div> : ''}
					</>)
			})}
		</>
	)
});

export default Widget;