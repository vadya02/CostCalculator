import React from 'react';
import Header from './components/Static/Header';
import Calculator from './components/Calculator/Calculator';
import ActivationUser from './components/etc/ActivationUser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './components/HistoryOfRequestedCar/CarList';
import { Provider } from 'mobx-react';
import AuthStore from './components/MobX/AuthStore';
import StartPage from './components/Static/StartPage';
import ListOfModels from './components/Catalog/ListOfModels';
import About from './components/Static/About';
import CarDescriptionStore from './components/MobX/CarDescriptionStore';
import AboutCar from './components/Catalog/AboutCar';
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
            <Route path='/ListOfModels' element={<ListOfModels Store={AuthStore} CarDescriptionStore={CarDescriptionStore}/>}/>
            <Route
              path="/aboutCar"
              // render={(props) => (
              //   <AboutCar {...props} Description="Hello from FirstPage!" />
              // )}
              element={<AboutCar  Description={CarDescriptionStore.CarDescription} CarDescriptionStore={CarDescriptionStore}/>}
            />
          </Routes>
        
        </Router>
      </Provider>
      
    </div>
  );
}

export default App;
