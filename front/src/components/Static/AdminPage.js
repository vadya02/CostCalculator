// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, redirect } from 'react-router-dom';
import ModalAuth from '../Authorization/ModalAuth';
import ModalReg from '../Authorization/ModalReg';
import AuthStore from '../MobX/AuthStore';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from './Header';
const AdminPage = observer(({Store, UserName, showOptions}) =>{
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
  else
  return (
    
    <div className='bg-black text-light'>
      <Header Store={AuthStore} showOptionsAdmin={true}/>
     
      <Container fluid className="" style={{height: '100vh'}}>
        <Row className="m-5  align-items-center">
          <Col md={8} className="pe-10 ">
            <h3>Администрирование пользователей</h3>
            <Row className="align-items-center">
              <Col>
                <h5>Пользователи</h5>
              </Col>
              <Col>
                <Button variant="outline-primary" className='m-1'>Добавить</Button>
                <Button variant="outline-primary">Изменить</Button>
              </Col>

            </Row>

            
          </Col>
        </Row>
        <Row className="m-5">
          <Col md={8} className="pe-10">
            <h3>Администрирование БД "Автомобили"</h3>
            <Row className="align-items-center">
              <Col>
                <h5>Марка автомобиля</h5>
              </Col>
              <Col>
                <Button variant="outline-primary" className='m-1'>Добавить</Button>
                <Button variant="outline-primary">Изменить</Button>
              </Col>

            </Row>
            <Row className="align-items-center">
              <Col>
                <h5>Модель автомобиля</h5>
              </Col>
              <Col>
                <Button variant="outline-primary" className='m-1'>Добавить</Button>
                <Button variant="outline-primary">Изменить</Button>
              </Col>

            </Row>
            <Row className="align-items-center">
              <Col>
                <h5>Модификация автомобиля</h5>
              </Col>
              <Col>
                <Button variant="outline-primary" className='m-1'>Добавить</Button>
                <Button variant="outline-primary">Изменить</Button>
              </Col>

            </Row>
            <Row className="align-items-center">
              <Col>
                <h5>Регион эксплуатации</h5>
              </Col>
              <Col>
                <Button variant="outline-primary" className='m-1'>Добавить</Button>
                <Button variant="outline-primary">Изменить</Button>
              </Col>

            </Row>
            <Row className="align-items-center">
              <Col>
                <h5>Описание автомобиля</h5>
              </Col>
              <Col>
                <Button variant="outline-primary" className='m-1'>Добавить</Button>
                <Button variant="outline-primary">Изменить</Button>
              </Col>

            </Row>
            <Row className="align-items-center">
              <Col>
                <h5>Ранее запрошенный автомобиль</h5>
              </Col>
              <Col>
                <Button variant="outline-primary" className='m-1'>Добавить</Button>
                <Button variant="outline-primary">Изменить</Button>
              </Col>

            </Row>
            <Row className="align-items-center">
              <Col>
                <h5>Статистика</h5>
              </Col>
              <Col>
                <Button variant="outline-primary" className='m-1'>Добавить</Button>
                <Button variant="outline-primary">Изменить</Button>
              </Col>

            </Row>
            <Row className="align-items-center">
              <Col>
                <h5>Налог</h5>
              </Col>
              <Col>
                <Button variant="outline-primary" className='m-1'>Добавить</Button>
                <Button variant="outline-primary">Изменить</Button>
              </Col>

            </Row>
          </Col>
        </Row>
      </Container>
      <ModalAuth Store={Store} showModal = {isModalAuthActive} handleModalClose = {handleModalAuthActiveClose} openRegClick={handleModalRegActiveOpen}/>
      <ModalReg Store={Store} showModal = {isModalRegActive} handleModalClose = {handleModalRegActiveClose} openAuthClick={handleModalAuthActiveOpen}/>
        
    </div>
  );
})

export default AdminPage;