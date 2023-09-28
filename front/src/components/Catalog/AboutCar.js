// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, redirect } from 'react-router-dom';
import ModalAuth from '../Authorization/ModalAuth';
// import time from '../../img/time.png'
import ModalReg from '../Authorization/ModalReg';
// import statistic from '../../img/statistic.png'
import AuthStore from '../MobX/AuthStore';
import Image from 'react-bootstrap/Image';
import { observer } from 'mobx-react';
// import help from '../../img/help.png'
import Footer from '../Static/Footer';
// import car from '../../img/car.jpeg'
// import Image from 'react-bootstrap';
import { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../Static/Header';
const AboutCar = observer(({Store, CarDescriptionStore, Description, image_1, image_2,image_3}) =>{

  
  return (
    
    <div style={{backgroundColor:'black'}}>
      
      <Header Store={AuthStore} showOptions={true} showBackList={true}/>
        <Container style={{padding: '50px', margin: '50px'}} >
            <Image src={CarDescriptionStore.SalonImage} fluid className="rounded mx-auto"/>
            <p className='bg-black text-light'>{CarDescriptionStore.CarDescription}</p>

        </Container>
      <Footer/>
      
      
    </div>

  );
})

export default AboutCar;