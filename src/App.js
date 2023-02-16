import {Routes, Route} from "react-router-dom"
import Home from './components/Home/Home';
import SearchScreen from './components/Search/Search';
import DetailScreen from './components/Details/Detail';

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
