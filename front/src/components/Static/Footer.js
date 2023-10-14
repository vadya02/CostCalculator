// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import logo from '../../img/logo.png'
import { Container, Row, Col, Button } from 'react-bootstrap';
const Footer = observer(({Store, UserName, showOptions}) =>{

  
  return (
    
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col sm={6}>
            <div className="navbar-brand mr-4">
                <img src={logo}/>
                <p style={{fontSize: '12px'}}>сервис по расчету <br/>стоимости владения авто</p>
                
            </div>
            <p>
                © 2023 АвтоСтат.рф Все права защищены.
            </p>
          </Col>
          <Col sm={6}>
            <p>Контакты</p>
            <p>8(999)777-55-55</p>
            <p>г. Иркутск ул. Лермонтова 83</p>
          </Col>
        </Row>
      </Container>
      <div class="ratio ratio-21x9">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4227.306134011447!2d104.25962598100251!3d52.261282913597725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5da82377ce848fa7%3A0x48f3b2cc30369dc5!2z0JjRgNCd0JjQotCj!5e0!3m2!1sru!2sru!4v1695442794872!5m2!1sru!2sru" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>     
      </div>
    </footer>

  );
})

export default Footer;