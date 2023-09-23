import React from 'react';
import Header from './components/Header';
import Calculator from './components/Calculator';
import ActivationUser from './components/ActivationUser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './components/CarList';
import { Provider } from 'mobx-react';
import AuthStore from './components/AuthStore';
import StartPage from './components/StartPage';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Provider authStore={AuthStore}>
        <Router>
          {/* <Header/> */}
          <Routes>
          {/* <Route path='/startPage' element={<StartPage Store={AuthStore}/>}/> */}
            <Route path='/calculator' element={<Calculator Store={AuthStore}/>}/>
            <Route path='/activationAccount' element={<ActivationUser Store={AuthStore}/>}/>
            <Route path='/CarList' element={<CarList Store={AuthStore}/>}/>
            <Route path='/StartPage' element={<StartPage Store={AuthStore}/>}/>
            <Route path='/about' element={<About Store={AuthStore}/>}/>
          </Routes>
        
        </Router>
      </Provider>
      
    </div>
  );
}

export default App;
