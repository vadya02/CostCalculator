// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RequestedCar from '../HistoryOfRequestedCar/RequestedCar';
function CountSum(nalog, toplivo, summa) {    
    const handleCarList =()=>{

    }
  
  return (
    <div className="">
        <div className='container'>
            <p>Налог: {nalog}</p>
            <p>Топливо {toplivo}</p>
            <p>Итоговая стоимость {summa}</p>
        </div>
        

    </div>
  );
  }

export default CountSum;