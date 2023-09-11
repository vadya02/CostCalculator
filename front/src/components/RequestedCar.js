import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, Button, Modal } from 'react-bootstrap';
// import { useEffect } from 'react';
function RequestedCar({ title, content }) {   
  const [requestedCar, setRequestedCar] = useState('')
  const [statistic, setStatistic] = useState('')
  const [showStatistic, setShowStatistic] = useState('')
  const [checkTax, setCheckTax] = useState(false)
  const [blocks, setBlocks] = useState([]);

  const handleCloseStatistic = () => setShowStatistic(false);
  const handleShowStatistic = () => setShowStatistic(true);
  const handleCheckTax = () => {
    setCheckTax(prevState => !prevState)
  }
  function handleStatistic  () {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/statistic',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      }
    })
    .then((response) => {
      setStatistic(response.data)
      let name = response.data.Marka
      console.log(statistic)
    })
    .catch((error) =>{ console.error(error); console.log('svfev')});
  }
  useEffect(() => {
    handleCarList();
  }, []);
  function handleCarList () {
    
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/requested_car',
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        }
      })
      .then((response) => {
        setRequestedCar(response.data)
        setBlocks(response.data);
        console.log(response.data)
      })
      .catch((error) =>{ console.error(error); console.log('svfev')});
  };
  const toggleBlock = id => {
    setRequestedCar(prevBlocks =>
      prevBlocks.map(block =>
        block.id === id ? { ...block, isOpen: !block.isOpen } : block
      )
    );
  };
  return (
    <div className="">
      {requestedCar&&
        requestedCar.map((car) => (
          
          <Card key={car.id}>
            <Card.Body>
              <Card.Title>Марка: {car.car_name}</Card.Title>
              <Card.Text>Модель: {car.car_model}</Card.Text>
              <Card.Text>Итоговая стоимость: {car.cost_of_ownership}</Card.Text>
              <Button onClick={() =>{handleStatistic(); handleShowStatistic()}} style={{marginRight: '10px'}}>Статистика</Button>
              <Modal show={showStatistic} onHide={handleCloseStatistic}>
                <Modal.Header closeButton>
                  <Modal.Title>Статистика по автомобилю: {car.car_name} {car.car_model}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Количество запросов со стороны пользователей: {car.kolichestvo_zaprosov}
                </Modal.Body>
                <Modal.Footer>
                  {/* <Button variant="secondary" onClick={handleCloseStatistic}>
                    Закрыть
                  </Button> */}
                  
                </Modal.Footer>
              </Modal>
              {/* {!checkTax && ( */}
                <Button variant="primary" onClick={() => toggleBlock(car.id)}>
                  {car.isOpen ? 'Свернуть' : 'Подробнее'}
                </Button>
              {/* )} */}
              
              {car.isOpen && (
                <>
                  {/* <Button variant="primary" onClick={handleCheckTax}>Свернуть</Button> */}
                  <div>
                    <p>
                      Объем двигателя: {car.modification_capacity} куб.см.
                      Мощность: {car.modification_power} л.с.
                    </p>
                  </div>  
                </>
                )}
            </Card.Body>
          </Card>
          // <option key={region.id} value={region.id}>
          //   {region.Nazvanie_regiona} 
          // </option>
        ))}
      {/* <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
          <Button variant="primary">Подробнее</Button>
        </Card.Body>
      </Card> */}

    </div>
  );
  }

export default RequestedCar;