
import {Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
// import Modal from 'react-modal';
import { useState } from 'react';
import { useObserver } from 'mobx-react';
import AuthStore from '../MobX/AuthStore';
import { useContext } from 'react';
import { observer } from 'mobx-react';
const Login = observer(({Store, showModal, handleModalClose, openRegClick, show, onClose,isOpen}) =>{
  // const authStore = useContext(AuthStore);
  console.log(Store.isAuthenticated)
  console.log(showModal)
  // if (!showModal) {
    
  //   return null;
  // }
  const id='modalAuth'
  const handleClick =()=>{
    openRegClick();
    handleModalClose();
  }
  const handleLogin = (e) => {
    e.preventDefault();
    // Логика для обработки входа пользователя
    // ...
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkLogin, setcheckLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };
    console.log(data)
    const UserData = JSON.stringify(data);
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/auth/token/login/`,
      data: UserData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
      .then(response => {
        // Обработка успешного входа
        setcheckLogin(true)
        console.log('Успешный вход:', response.data);
        localStorage.setItem('authToken', response.data.auth_token);
        Store.login()
        handleModalClose();
      })
      .catch(error => {
        // Обработка ошибки
        setcheckLogin(false)
        console.error('Ошибка входа:', error);
      });
  };

  
    
  
    
  return (
    
  //   <Modal
  //     isOpen={isOpen}
  //     onRequestClose={onClose}
  //     contentLabel="Модальное окно"
  //   >
  //     <div className="modal" tabIndex="-1" id={id}>
  //     <div className="modal-dialog">
  //       <div className="modal-content">
  //         <div className="modal-header">
  //           <h5 className="modal-title">Модальное окно авторизации</h5>
  //           <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
  //         </div>
  //         <div className="modal-body">
  //           {/* Ваш контент модального окна */}
  //         </div>
  //         <div className="modal-footer">
  //           <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Закрыть</button>
  //           <button type="button" className="btn btn-primary">Войти</button>
  //         </div>
  //       </div>
  //     </div>
  // </div>
  //   </Modal>


      
    //   <Modal show={showModal} onHide={handleModalClose}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Авторизация и регистрация</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUserName">
              <Form.Label>Логин</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Введите логин'/>
              <Form.Group controlId="formBasicPassword" style={{paddingBottom: '10px'}}>
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              {/* <Form.Text className="text-muted">
                Мы никогда не передадим вашу электронную почту кому-либо еще.
              </Form.Text> */}
            </Form.Group>
            {!checkLogin && (
              <Form.Group style={{alignItems: 'center', display: 'flex', justifyContent: 'center', color: 'red'}}>
                <p>Неверный пароль или логин</p>
              </Form.Group>
            )}
            

            
            <Form.Group style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
                <Button variant="primary" type="submit" style={{alignItems: 'center', display: 'flex', justifyContent: 'center', width: '200px', padding:'5px'}} >
                    Войти
                </Button>
            </Form.Group>
            <Form.Group style={{alignItems: 'center', display: 'flex', justifyContent: 'center',}}>
                <Form.Label>Еще не зарегистрированы?</Form.Label>
                <Form.Label style={{color: '#0D6EFD'}} onClick={handleClick}>Зарегистрироваться</Form.Label>
            </Form.Group>
            
          </Form>
    //     </Modal.Body>
    //   </Modal>
    
  );
})

export default Login;