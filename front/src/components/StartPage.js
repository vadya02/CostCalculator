// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, redirect } from 'react-router-dom';
import ModalAuth from './ModalAuth';
import ModalReg from './ModalReg';
import AuthStore from './AuthStore';
import { observer } from 'mobx-react';

import { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
const StartPage = observer(({Store, UserName, showOptions}) =>{
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
    

    
    
    
    
    
    
    
    // const authStore = useContext(authStore);
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
      
     
      <Container fluid className="" style={{height: '100vh'}}>
      <Row className="h-100 justify-content-center align-items-center">
        <Col md={6} className="text-center">
          <h1>Калькулятор расчета стоимости владения автомобилем</h1>
          <p>Чтобы рассчитать стоимость войдите в систему</p>
          <Button style={{marginRight:'10px'}} variant="outline-primary" className="login" data-toggle='modal' data-target='#modalAuth' onClick={ ()=>{handleModalAuthActiveOpen(); console.log(isModalAuthActive)}}>Вход</Button>
          <Button variant="primary" className="signup" onClick={ ()=>{handleModalRegActiveOpen()}}>Регистрация</Button>
        </Col>
      </Row>
    </Container>
        {/* <div class="container h-100 text-center p-50">
        <div class=" row h-100 justify-content-center align-items-center ">
            <div class="col-md-6 p-80">
                
                <h1>Заголовок</h1>
                <p>Текст на странице.</p>
                <button variant="outline-primary" className="login" data-toggle='modal' data-target='#modalAuth' onClick={ ()=>{handleModalAuthActiveOpen(); console.log(isModalAuthActive)}}>Вход</button>
                <button variant="primary" className="signup" onClick={ ()=>{handleModalRegActiveOpen()}}>Регистрация</button>
            </div>
        </div>
    </div> */}
      <ModalAuth Store={Store} showModal = {isModalAuthActive} handleModalClose = {handleModalAuthActiveClose} openRegClick={handleModalRegActiveOpen}/>
      <ModalReg Store={Store} showModal = {isModalRegActive} handleModalClose = {handleModalRegActiveClose} openAuthClick={handleModalAuthActiveOpen}/>
        
    </div>
    //----------------------------------------------------------------------------------------------------------------------
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //   <div className="container">
    //     <a className="navbar-brand" href="#">Логотип</a>
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarNav">
    //       <ul className="navbar-nav ml-auto">
    //         <li className="nav-item">
    //           <a className="nav-link" href="#">Главная</a>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link" href="#">О нас</a>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link" href="#">Сервисы</a>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link" href="#">Контакты</a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
})

export default StartPage;