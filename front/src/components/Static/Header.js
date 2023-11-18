// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, redirect, Navigate } from 'react-router-dom';
import ModalAuth from '../Authorization/ModalAuth';
import ModalReg from '../Authorization/ModalReg';
import AuthStore from '../MobX/AuthStore';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import logo from '../../img/logo.png'
import { Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
const Header = observer(({Store, UserName, showOptions, showOptionsAdmin, showBack, showBackAdmin, showBackList}) =>{
    let navigate = useNavigate();
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
        Store.logoutAdmin()
        Store.logout();
        localStorage.removeItem('authToken');
        navigate('/StartPage')
    }
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
            //   Store.login(); // Если токен валиден, устанавливаем состояние авторизации
            })
            .catch(error => {
              console.log('Ошибка проверки авторизации:', error);
              Store.logout();
            });
        }
      }, []);
    // const authStore = useContext(authStore);
    

  return (
    <div className="" >
        <header className="navbar navbar-expand-lg navbar-dark" style={{borderBottom:'1px solid gray'}}>
        <div className="container container">
            {/* <a className="navbar-brand mr-4">АвтоСтат <p style={{fontSize: '12px'}}>сервис по расчету <br/>стоимости владения авто</p></a> */}
            
            {!showOptionsAdmin && (
                <div className="navbar-brand mr-4">
                    <img src={logo}/>
                    <p style={{fontSize: '12px'}}>сервис по расчету <br/>стоимости владения авто</p>
                </div>
            )} 
            {showBackAdmin && (
                <Button id="navbarNav">
                    <Link  style={{color: 'white', textDecoration: "none"}} to="/Admin" id='navbarNav' className='nav-item'>На главную</Link>
                </Button>  
            )}
            {showBack && (
                <Button id="navbarNav">
                    <Link  style={{color: 'white', textDecoration: "none"}} to="/about" id='navbarNav' className='nav-item'>На главную</Link>
                </Button>  
            )}
            {showBackList && (
                <Button id="navbarNav">
                    <Link  style={{color: 'white', textDecoration: "none"}} to="/ListOfModels" id='navbarNav' className='nav-item'>Назад</Link>
                </Button>  
            )}
            {/* <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button> */}
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
                        <li className="nav-item" style={{paddingRight: '10px'}}> 
                            <Button variant="transparent">
                                <Link style={{color: 'white', textDecoration: "none"}} to="/ListOfMOdels" id='navbarNav' className='nav-item'>Каталог моделей</Link>
                            </Button>
                        </li>
                        <li className="nav-item" style={{paddingRight: '10px'}}> 
                            <Button variant="transparent">
                                <Link style={{color: 'white', textDecoration: "none"}} to="/recomend" id='navbarNav' className='nav-item'>Помощь в подборе авто</Link>
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

            {showOptionsAdmin && (
            <>
                <div className="navbar-brand mr-4">
                    <h3>Панель администратора</h3>
                </div>
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
                <div className="collapse navbar-collapse justify-content-end " id="navbarNav">
                    <ul className="navbar-nav text-center navbar">
                        <li className="nav-item" style={{paddingRight: '10px'}}> 
                            <Button variant="transparent">
                                <Link style={{color: 'white', textDecoration: "none"}} to="/CarList" id='navbarNav' className='nav-item'>Автомобили</Link>
                            </Button>           
                        </li>
                        <li className="nav-item" style={{paddingRight: '10px'}}> 
                            <Button variant="transparent">
                                <Link style={{color: 'white', textDecoration: "none"}} to="/calculator" id='navbarNav' className='nav-item'>Пользователи</Link>
                            </Button>
                        </li>
                        <li className="nav-item" style={{paddingRight: '10px'}}> 
                            <Button variant="transparent">
                                <Link style={{color: 'white', textDecoration: "none"}} to="/ListOfMOdels" id='navbarNav' className='nav-item'></Link>
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
  );
})

export default Header;