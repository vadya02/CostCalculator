import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
// import { useEffect } from 'react';
function RequestedCar({ title, content }) {   
  const [requestedCar, setRequestedCar] = useState('')
  const [checkTax, setCheckTax] = useState(false)
  const [blocks, setBlocks] = useState([]);
  const handleCheckTax = () => {
    setCheckTax(prevState => !prevState)
  }
  useEffect(() => {
    handleCarList();
  }, []);
  function handleCarList () {
    
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/requested_car`,
        headers: {
          'Access-Control-Allow-Origin': `${process.env.REACT_APP_URL}`,
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        }
      })
      .then((response) => {
        setRequestedCar(response.data)
        setBlocks(response.data);
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