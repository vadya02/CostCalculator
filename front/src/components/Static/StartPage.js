// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import ModalAuth from '../Authorization/ModalAuth';
import ModalReg from '../Authorization/ModalReg';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
const StartPage = observer(({Store, showOptions}) =>{
  const navigate = useNavigate();
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
              if (response.data.username == 'admin'){
                Store.loginAdmin()
                console.log('вход админа')
                return redirect('/Admin')
                // Store.login()
              }
              else{
                Store.login()
                console.log('вход пользователя')
                return redirect('/about')
              }
              // Store.login(); // Если токен валиден, устанавливаем состояние авторизации
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
  if (Store.isAuthenticated){
    // return redirect("/about")
    navigate('/about')
  }
  else if (Store.isAuthenticatedAdmin){
    // return redirect("/about")
    console.log('osuvfodfvnofvnnvpeivoe')
    navigate('/Admin')
  }
  // else
  return (
    
    <div className='bg-black text-light'>
      
     
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
      <ModalAuth Store={Store} showModal = {isModalAuthActive} handleModalClose = {handleModalAuthActiveClose} openRegClick={handleModalRegActiveOpen}/>
      <ModalReg Store={Store} showModal = {isModalRegActive} handleModalClose = {handleModalRegActiveClose} openAuthClick={handleModalAuthActiveOpen}/>
        
    </div>
  );
})

export default StartPage;