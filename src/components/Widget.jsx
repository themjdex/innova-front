import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Widget = observer(({ valutes, yesterday }) => {
	const [diff, setDiff] = useState([]);

	const calculate = () => {
		let diffValues = [];
		for (let i = 0; i < valutes.length; i++) {
			diffValues.push(valutes[i].value - yesterday[i].value);
		}
		setDiff(diffValues);
	}

	useEffect(() => {
		calculate();
	}, []);
	console.log(diff);
	const checkHandler = (e) => {
		e.target.parentNode.className = 'hidden';
	}
	return (
		<>
			{valutes.length > 0 ? <span >Курс на {valutes[0].date}</span> : ''}
			<div className='flex flex-row justify-end'>
				<Link className='p-2 bg-white rounded text-blue-500 w-28 mr-2' to='/'>Обновить</Link>
				<Link className='p-2 bg-white rounded text-blue-500 w-28' to='/settings'>Настройки</Link>
			</div>

			{valutes && valutes.map(valute => {
				return (
					<div className='flex flex-row bg-white text-black justify-between my-2 p-2 rounded' key={valute.id}>
						<input type='hidden' id={valute.id}></input>
						<input type='checkbox' onChange={checkHandler} />
						<div>{valute.valute}</div>
						<div>{valute.value} ₽</div>
					</div>)
			})}
		</>
	)
});

export default Widget;