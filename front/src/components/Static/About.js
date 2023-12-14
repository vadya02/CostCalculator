/* eslint-disable no-unused-vars */
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ModalAuth from '../Authorization/ModalAuth';
import time from '../../img/time.png'
import ModalReg from '../Authorization/ModalReg';
import statistic from '../../img/statistic.png'
import AuthStore from '../MobX/AuthStore';
import Image from 'react-bootstrap/Image';
import { observer } from 'mobx-react';
import help from '../../img/help.png'
import Footer from './Footer';
import car from '../../img/car.jpeg'
import { Container, Row, Col, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import Header from './Header';
const About = observer(({Store}) =>{
  const navigate = useNavigate()
    const authStore = Store
    useEffect(() => {
        // При загрузке компонента
        const authToken = localStorage.getItem('authToken');
        // console.log('showOption: ' + showOptions)
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
              navigate('/StartPage')
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
      <Container >
        
        <Row className="gx-10 justify-content-center align-items-center" style={{padding: '50px'}}>
            <Col md={6} className="text-center">
              <h2 style={{color: 'white'}}>Расчитаем стоимость годового владения вашего автомобиля</h2>
              <Button className='btn btn-primary btn-lg'>
                <Link style={{color: 'white', textDecoration: "none"}} to="/calculator" id='navbarNav' className='nav-item'>Рассчитать стоимость</Link>
              </Button> 
            {/* <Button style={{marginRight:'10px'}} variant="outline-primary" className="login" data-toggle='modal' data-target='#modalAuth' onClick={ ()=>{handleModalAuthActiveOpen(); console.log(isModalAuthActive)}}>Вход</Button>
            <Button variant="primary" className="signup" onClick={ ()=>{handleModalRegActiveOpen()}}>Регистрация</Button> */}
            </Col>
            <Col>
              <Image src={car} fluid className="rounded mx-auto"/> 
              {/* <Image src='http://127.0.0.1:8000/media/car_images/a3f7e970b95f224a737c7dcfc06f0d0c.jpeg' fluid className="rounded mx-auto"/>  */}
              {/* <img src='http://127.0.0.1:8000/media/car_images/a3f7e970b95f224a737c7dcfc06f0d0c.jpeg' alt="Car"/> */}
            </Col>
            
            
        </Row>
        <Row className="justify-content-center align-items-center text-light" style={{padding: '50px'}}>
            <h3 className='text-center text-light'>
              Преимущества нашего сервиса
            </h3>
          <Col className=''>
            <Image src={time} fluid className="rounded mx-auto"/>
            <h5>Экономим ваше время</h5>
          </Col>
          <Col>
            <Image src={help} fluid className="rounded mx-auto"/>
            <h5>Поможем выбрать автомобиль</h5>
          </Col>
          <Col>
            <Image src={statistic} fluid className="rounded mx-auto"/>
            <h5>Распишем ваши расходы на автомобиль</h5>
          </Col>

          
          
        </Row>
        
        

            
      </Container>
      <Footer/>
      <ModalAuth Store={Store} showModal = {isModalAuthActive} handleModalClose = {handleModalAuthActiveClose} openRegClick={handleModalRegActiveOpen}/>
      <ModalReg Store={Store} showModal = {isModalRegActive} handleModalClose = {handleModalRegActiveClose} openAuthClick={handleModalAuthActiveOpen}/>
      
    </div>

  );
})

export default About;