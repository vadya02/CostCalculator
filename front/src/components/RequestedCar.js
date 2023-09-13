import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, Button, Modal } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
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

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Номер</th>
                  <th>Марка</th>
                  <th>Модель</th>
                  <th>Стоимость владения</th>
                  <th>Дата запроса</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              
          

        
                {requestedCar&&
                  requestedCar.map((car) => (
                  <tr key={car.id}>
                    <td>{car.id}</td>
                    <td>{car.car_name}</td>
                    <td>{car.car_model}</td>
                    <td>{car.cost_of_ownership}</td>
                    
                      {/* <script>
                        const date = new Date(jsonData.fullDate);

                        // Получение года, месяца и дня
                        const year = date.getFullYear(); // Год (например, 2023)
                        const month = date.getMonth() + 1; // Месяц (0-11, поэтому добавляем 1) (например, 9)
                        const day = date.getDate(); // День (например, 13)

                        // Преобразование в строку в нужном формате (например, "2023-09-13")
                        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    
                      </script> */}
                     <td> {car.request_date}</td>
                     <td> <Button onClick={() =>{handleStatistic(); handleShowStatistic()}} style={{marginRight: '10px'}}>Статистика</Button></td>
                      
                    {/* Вывод других данных из ответа */}
                    <Modal show={showStatistic} onHide={handleCloseStatistic}>
                <Modal.Header closeButton>
                  <Modal.Title>Статистика по автомобилю: {car.car_name} {car.car_model}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Количество запросов со стороны пользователей: {car.kolichestvo_zaprosov}
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
              </Modal>
                  </tr>
                  
                ))}
                {/* Добавьте другие строки как необходимо */}
              </tbody>
            </Table>
            
        
      {/* {requestedCar&&
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

                </Modal.Footer>
              </Modal>

                <Button variant="primary" onClick={() => toggleBlock(car.id)}>
                  {car.isOpen ? 'Свернуть' : 'Подробнее'}
                </Button>

              
              {car.isOpen && (
                <>
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

        ))} */}

    </div>
  );
  }

export default RequestedCar;