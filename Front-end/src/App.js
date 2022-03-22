import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
