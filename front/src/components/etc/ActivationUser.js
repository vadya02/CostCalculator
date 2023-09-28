// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Static/Header';
import AuthStore from '../MobX/AuthStore';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
function ActivationUser() {    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');
  
    useEffect(() => {
      if (uid && token) {
        // Отправить POST-запрос с помощью Axios или другой библиотеки
        // Используйте uid и token для подтверждения почты
        const requestData = { uid, token };
        const confirmationUrl = 'http://localhost:8000/auth/users/activation/';
        // Отправка POST-запроса с помощью Axios
        axios.post(confirmationUrl, requestData)
        .then(response => {
            // Обработка ответа от сервера
            console.log(response.data);
            // Возможно, вы захотите выполнить какие-то дополнительные действия после подтверждения почты
        })
        .catch(error => {
            // Обработка ошибок
            console.error('Error:', error);
        });
      }
    }, [uid, token]);
  
  return (
    <div className="">
        <Header Store={AuthStore}/>
        <h5 className='h1'>
            Ваш аккаунт активирован
        </h5>
        <p className='text-primary text-left'> <Link to="/calculator">Перейдите по данной ссылке</Link></p>
    </div>
  );
  }

export default ActivationUser;