import React from 'react';
import Header from './components/Header';
import Calculator from './components/Calculator';
import ActivationUser from './components/ActivationUser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './components/CarList';
import { Provider } from 'mobx-react';
import AuthStore from './components/AuthStore';
function App() {
  return (
    <div className="App">
      <Provider authStore={AuthStore}>
        <Router>
          {/* <Header/> */}
          <Routes>
            <Route exact path='/calculator' element={<Calculator Store={AuthStore}/>}/>
            <Route path='/activationAccount' element={<ActivationUser Store={AuthStore}/>}/>
            <Route path='/CarList' element={<CarList Store={AuthStore}/>}/>
          </Routes>
        
        </Router>
      </Provider>
      {/* <Router>

        <Routes>
          <Route path='/' Component={Calculator}/>
          <Route path='/activationAccount' Component={ActivationUser}/>
          <Route path='/CarList' Component={CarList}/>
        </Routes>
      
      </Router> */}
      
    </div>
  );
}

export default App;
