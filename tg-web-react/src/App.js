import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './cmps/Headers/Headers';
import ProductList from './cmps/ProductList/ProductList';
import Form from './cmps/Form/Form';
import {Route, Routes} from 'react-router-dom'

function App() {

  const { tg, onToggleButton } = useTelegram()

  useEffect(() => {
    tg.ready()
  }, [tg])


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />}/>
        <Route path={'form'} element={<Form />}/>
      </Routes>
      {/* <button onClick={onToggleButton}>Сменить</button> */}
    </div>
  );
}

export default App;
