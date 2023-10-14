// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Static/Header';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RequestedCar from './RequestedCar';
function CarList({Store}) {    
    const handleCarList =()=>{

    }
  
  return (
    <div className="bg-black text-light" style={{height: '100vh'}}>
        <Header Store={Store} showOptions={false} showBack={true}/>
        <h5 className='text-center'>
            Список ранее запрашиваемых автомобилей:
        </h5>
        <RequestedCar title={'BMW'} content={'M5'}/>

    </div>
  );
  }

export default CarList;