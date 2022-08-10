
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import Widget from './components/Widget';
import widgetState from './store/widgetState';


const App = observer(() => {
  const [valutes, setValutes] = useState([]);
  const [valutesYesterday, setValutesYesterday] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Функция-активатор получения данных с сервера, записи в стейт и хуки
   */
  const fetchData = async () => {
    await widgetState.setCurrentValues();
    let yesterday = moment().subtract(1, 'days').format('DD/MM/YYYY');
    await widgetState.setYesterdayValues(yesterday);
    setValutes(widgetState.getCurrentValues());
    setValutesYesterday(widgetState.getYesterdayValues());
  }

  /**
   * Функция-активатор обновления данных на сервере
   */
  const update = async () => {
    await widgetState.updateValues();
    fetchData();
  }

  setInterval(() => {
    update();
  }, widgetState.timer);

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  return (
    <div className='w-full h-max text-white text-center bg-gradient-to-r from-cyan-500 to-blue-500'>
      <div className='flex flex-col w-6/12 mx-auto justify-center h-full'>
        {loading ?
          <div className='h-max bg-gradient-to-r from-cyan-500 to-blue-500'>Идет загрузка...</div> :
          <Widget valutes={valutes} yesterday={valutesYesterday} />}
      </div>
    </div>
  );
});


export default App;
