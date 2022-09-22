import './App.css';
import BarChart from './Component/BarChart';
import LineChart from './Component/LineChart';
import Home from './Component/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} ></Route>
          <Route path='/histogram' element={<BarChart />} ></Route>
          <Route path='/time-series' element={<LineChart />} ></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
