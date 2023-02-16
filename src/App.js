import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/Home';
import SearchScreen from './components/Search';
import DetailScreen from './components/Detail';

function App() {
  return (
    <div>
    
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/search' element={<SearchScreen/>} />
      <Route path='/details' element={<DetailScreen/>} />
     </Routes>
    
    </div>
  );
}

export default App;
