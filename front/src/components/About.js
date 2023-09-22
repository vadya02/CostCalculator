// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, redirect } from 'react-router-dom';
import ModalAuth from './ModalAuth';
import ModalReg from './ModalReg';
import AuthStore from './AuthStore';
import { observer } from 'mobx-react';
import Header from './Header';
import { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import car from '../images/car.jpeg'
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
              // response.json()
              Store.login(); // Если токен валиден, устанавливаем состояние авторизации
              // return redirect("/calculator")
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
    
    const HandleQuit = () => {
        Store.logout();
        localStorage.removeItem('authToken');
    }
    const [modalShow, setModalShow] = useState(false);

    const openModal = () => {
        console.log('Opening modal');
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
    };
  if (Store.isAuthenticated){
    return redirect("/calculator")
  }
  else
  return (
    
    <div >
      
      <Header Store={AuthStore} showOptions={true}/>
      <Container fluid className="" style={{height: '100vh'}}>
      <Row className="h-100 justify-content-center align-items-center">
        <Col md={6} className="text-center">
          <h1>Калькулятор расчета стоимости владения автомобилем</h1>
          <p>Чтобы рассчитать стоимость войдите в систему</p>
          <image>{car}</image>
          <Button style={{marginRight:'10px'}} variant="outline-primary" className="login" data-toggle='modal' data-target='#modalAuth' onClick={ ()=>{handleModalAuthActiveOpen(); console.log(isModalAuthActive)}}>Вход</Button>
          <Button variant="primary" className="signup" onClick={ ()=>{handleModalRegActiveOpen()}}>Регистрация</Button>
        </Col>
      </Row>
    </Container>
        
      <ModalAuth Store={Store} showModal = {isModalAuthActive} handleModalClose = {handleModalAuthActiveClose} openRegClick={handleModalRegActiveOpen}/>
      <ModalReg Store={Store} showModal = {isModalRegActive} handleModalClose = {handleModalRegActiveClose} openAuthClick={handleModalAuthActiveOpen}/>
        
    </div>
    
  );
})

export default About;