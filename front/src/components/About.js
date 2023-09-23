// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, redirect } from 'react-router-dom';
import ModalAuth from './ModalAuth';
import ModalReg from './ModalReg';
import AuthStore from './AuthStore';
import Image from 'react-bootstrap/Image';
import { observer } from 'mobx-react';
import car from '../img/car.jpeg'
import { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from './Header';
const About = observer(({Store, UserName, showOptions}) =>{
    const authStore = Store
    useEffect(() => {
        // При загрузке компонента
        const authToken = localStorage.getItem('authToken');
        console.log('showOption: ' + showOptions)
        if (authToken) {
          // Если есть токен, проверяем его на сервере
          axios({
            method: 'GET',
            url: 'http://localhost:8000/auth/users/me/', // Замените на ваш URL для проверки авторизации
            headers: {
              Authorization: `Token ${authToken}`,
            },
          })
            .then(response => {
              Store.login(); // Если токен валиден, устанавливаем состояние авторизации
            })
            .catch(error => {
              console.log('Ошибка проверки авторизации:', error);
              Store.logout();
            });
        }
      }, []);
    
    const [isModalAuthActive, setIsModalAuthActive] = useState(false)
    const [isModalRegActive, setIsModalRegActive] = useState(false)
    function handleModalAuthActiveOpen () {
        setIsModalAuthActive(true)
    } 
    function handleModalAuthActiveClose (){
        setIsModalAuthActive(false)
    } 
    function handleModalRegActiveOpen () {
        setIsModalRegActive(true)
    } 
    function handleModalRegActiveClose (){
        setIsModalRegActive(false)
    } 
  
  return (
    
    <div style={{backgroundColor:'black'}}>
      
      <Header Store={AuthStore} showOptions={true}/>
      <Container style={{height: '90vh'}} >
        
        <Row className="h-100 justify-content-center align-items-center">
            <Col md={6} className="text-center">
            <h3 style={{color: 'white'}}>Расчитаем стоимость годового владения вашего авто</h3>
            <Button>
                    <Link style={{color: 'white', textDecoration: "none"}} to="/calculator" id='navbarNav' className='nav-item'>Рассчитать стоимость</Link>
                </Button> 
            {/* <Button style={{marginRight:'10px'}} variant="outline-primary" className="login" data-toggle='modal' data-target='#modalAuth' onClick={ ()=>{handleModalAuthActiveOpen(); console.log(isModalAuthActive)}}>Вход</Button>
            <Button variant="primary" className="signup" onClick={ ()=>{handleModalRegActiveOpen()}}>Регистрация</Button> */}
            </Col>
            <Col>
            <Image src={car} fluid className="rounded mx-auto"/> 
            </Col>
            
            
        </Row>
        
        

            
      </Container>
      <ModalAuth Store={Store} showModal = {isModalAuthActive} handleModalClose = {handleModalAuthActiveClose} openRegClick={handleModalRegActiveOpen}/>
      <ModalReg Store={Store} showModal = {isModalRegActive} handleModalClose = {handleModalRegActiveClose} openAuthClick={handleModalAuthActiveOpen}/>
        
    </div>

  );
})

export default About;