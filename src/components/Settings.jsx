import axios from 'axios';
import { useEffect, useState } from 'react';

function Settings() {
	const [valutes, setValutes] = useState('');

	const data = async () => {
		const res = await axios.get('http://localhost:8010/proxy/add')
		setValutes(res.data);
	}

	useEffect(() => {

		data();

	}, []);
	return (
		<div>{valutes}</div>
	);
}

export default Settings;