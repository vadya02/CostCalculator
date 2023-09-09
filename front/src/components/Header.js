// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ModalAuth from './ModalAuth';
import ModalReg from './ModalReg';
import AuthStore from './AuthStore';
import { observer } from 'mobx-react';
import { useContext } from 'react';
const Header = observer(({Store, UserName, isAuthenticated}) =>{
    const authStore = Store
    useEffect(() => {
        // При загрузке компонента
        const authToken = localStorage.getItem('authToken');
    
        if (authToken) {
          // Если есть токен, проверяем его на сервере
          axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/auth/users/me/`, // Замените на ваш URL для проверки авторизации
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
    }
    const [modalShow, setModalShow] = useState(false);

    const openModal = () => {
        console.log('Opening modal');
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
    };
  return (
    <div className="" >
        <header className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <a className="navbar-brand mr-4" >Автокалькулятор.рф</a>
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
            {!Store.isAuthenticated && (
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
            )}

            {Store.isAuthenticated && (
            <>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav text-center">
                        <li className="nav-item" style={{paddingRight: '10px'}}>         
                            <Link to="/CarList" id='navbarNav' className='nav-item'>Ваши автомобили</Link>
                        </li>
                        <li className="nav-item">
                        
                        <p>{UserName}</p>
                        </li>
                        <button onClick={HandleQuit}>Выйти</button>
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