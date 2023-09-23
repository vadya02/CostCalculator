// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, redirect, Navigate } from 'react-router-dom';
import ModalAuth from './ModalAuth';
import ModalReg from './ModalReg';
import AuthStore from './AuthStore';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import logo from '../img/logo.png'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Header = observer(({Store, UserName, showOptions, showBack, showBackAbout}) =>{
    let navigate = useNavigate();
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
        navigate('/StartPage')
    }

  return (
    <div className="" >
        <header className="navbar navbar-expand-lg navbar-dark" style={{borderBottom:'1px solid gray'}}>
        <div className="container container">
            
           

            {/* <a className="navbar-brand mr-4">АвтоСтат <p style={{fontSize: '12px'}}>сервис по расчету <br/>стоимости владения авто</p></a> */}
            <div className="navbar-brand mr-4">
                <img src={logo}/>
                <p style={{fontSize: '12px'}}>сервис по расчету <br/>стоимости владения авто</p>
            </div>
            {showBack && (
                <Button>
                    <Link style={{color: 'white', textDecoration: "none"}} to="/about" id='navbarNav' className='nav-item'>На главную</Link>
                </Button>  
            )}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* !authStore.isAuthenticated */}
            {/* {!Store.isAuthenticated && (
            <>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav text-center">
                    <li className="nav-item">
                    
                        <button variant="outline-primary" className="login" data-toggle='modal' data-target='#modalAuth' onClick={ ()=>{handleModalAuthActiveOpen(); console.log(isModalAuthActive)}}>Вход</button>
                    
                    </li>
                    
                        
                    <li className="nav-item">
                        <button variant="primary" className="signup" onClick={ ()=>{handleModalRegActiveOpen()}}>Регистрация</button>
                    </li>
                    
                </ul>
            </div>
                
            </>
            )} */}

            {Store.isAuthenticated && showOptions && (
            <>

                <div className="collapse navbar-collapse justify-content-end " id="navbarNav">
                    <ul className="navbar-nav text-center navbar">
                        <li className="nav-item" style={{paddingRight: '10px'}}> 
                            <Button variant="transparent">
                                <Link style={{color: 'white', textDecoration: "none"}} to="/CarList" id='navbarNav' className='nav-item'>История запросов</Link>
                            </Button>     
                               
                            
                        </li>
                        <li className="nav-item" style={{paddingRight: '10px'}}> 
                            <Button variant="transparent">
                                <Link style={{color: 'white', textDecoration: "none"}} to="/calculator" id='navbarNav' className='nav-item'>Калькулятор</Link>
                            </Button>     
                               
                            
                        </li>
                        <li className="nav-item">
                        
                        <p>{UserName}</p>
                        </li>
                        <Button variant="btn btn-outline-danger" onClick={HandleQuit}>Выход</Button>
                    </ul>
                </div>
                
            </>
            )}

        </div>
        </header>
        

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

export default Header;