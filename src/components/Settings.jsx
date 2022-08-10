
import { useState } from 'react';
import widgetState from '../store/widgetState';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Settings = observer(() => {
	const [whiteList, setWhiteList] = useState(widgetState.getWhiteList());
	const [updateInterval, setUpdateInterval] = useState(widgetState.getUpdateTimer());

	/**
	 * Получение и сохранение нового значения таймера
	 * @param {EventTarget} e ивент onChange
	 */
	const timerHandler = (e) => {
		widgetState.setUpdateTimer(+e.target.value);
		setUpdateInterval(`${widgetState.getUpdateTimer()}`);
	}

	/**
	 * Изменение стиля выбранного элемента списка и изменения whitelist
	 * @param {EventTarget} e ивент onChange
	 */
	const checkHandler = (e) => {
		e.target.parentNode.className = 'flex flex-row bg-gray-300 text-black justify-between my-2 p-2 rounded w-1/2 mx-auto line-through';
		widgetState.changeWhiteList(e.target.previousSibling.id);
		setWhiteList(widgetState.getWhiteList());
	}

	return (
		<div className='w-full h-full text-white text-center bg-gradient-to-r from-cyan-500 to-blue-500'>
			<Link to='/' className='mt-8 p-2 bg-white rounded text-blue-500'>Назад</Link>
			<h1 className='text-lg mb-4'>Таймер автоматического обновления</h1>
			<select className='text-black border-none w-44' value={updateInterval} onChange={timerHandler}>
				<option value='86400000'>Раз в сутки</option>
				<option value='43200000'>Раз в 12 часов</option>
				<option value='3600000'>Раз в час</option>
				<option value='300000'>Раз в 5 минут</option>
			</select>
			<h1 className='text-lg mb-4'>Скрыть определенные валюты</h1>
			<div>
				{whiteList.map(item => {
					return (
						<>
							{item.visible ?
								<div className='flex flex-row bg-white text-black justify-between my-2 p-2 rounded w-1/2 mx-auto' key={item.id}>
									<input type='hidden' id={item.id} />
									<input type='checkbox' onChange={checkHandler} />
									<span>{item.valute}</span>
								</div> :
								<div className='flex flex-row bg-gray-300 text-black justify-between my-2 p-2 rounded w-1/2 mx-auto line-through' key={item.id}>
									<input type='hidden' id={item.id} />
									<input type='checkbox' onChange={checkHandler} />
									<span>{item.valute}</span>
								</div>}

						</>
					);
				})}
			</div>


		</div>
	);
});

export default Settings;