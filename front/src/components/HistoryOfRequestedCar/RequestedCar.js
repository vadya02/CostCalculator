import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import Header from './Header';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Modal } from 'react-bootstrap';
import CalculatorStore from '../Calculator/CalculatorStore'
import { Table } from 'react-bootstrap';
// import { useEffect } from 'react';
function RequestedCar({ title, content }) {   
  let navigate = new useNavigate();
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
  function TruncateString({ text, maxLength }) {
    // Проверяем, длиннее ли строка, чем максимальное значение
    if (text.length <= maxLength) {
      return <span>{text}</span>;
    }
  
    // Обрезаем строку до максимальной длины и добавляем многоточие
    const truncatedText = text.slice(0, maxLength);
  
    return <span>{truncatedText}</span>;
  }
    var storedToken = localStorage.getItem('authToken');
    useEffect(() => {

      storedToken = localStorage.getItem('authToken');

    }, []);
  return (
    <div>

      <Table bordered>
        <thead >
          <tr>
          
            <th>Марка</th>
            <th>Модель</th>
            <th>Модификация</th>
            <th>Регион</th>
            <th>Годовой пробег</th>
            <th>Цена топлива</th>
            <th>Расход топлива</th>
            
            <th>Стоимость владения</th>
            <th>Дата запроса</th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
        
    

  
          {requestedCar&&
            requestedCar.map((car) => (
            <tr key={car.id}>
              {/* <td>{car.id}</td> */}
              <td>
                {/* <select className="form-select" style={{width: '30%'}} onChange={(e) => {handleBrandChange(e.target.value);console.log(e.target.value); handleModelsView(e.target.value)}}>
                
                    {BrandList &&
                    BrandList.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                    ))}
                </select> */}
                {car.car_name}
              </td>
              <td>
                {/* <select className="form-select" style={{width: '30%'}} onChange={(e) => {handleModelChange(e.target.value); handleModificationView(e.target.value)}}>
                <option value=""></option>
                
                {ModelList &&
                  ModelList.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select> */}
                {car.car_model}
              </td>
              <td style={{textAlign: 'right'}}>
                {/* <input style={{width: '100px'}} type="number" id="firstName" name="firstName" value={car.modification_power}/><br/> */}
                {car.modification_power} л.с. {car.modification_capacity} см.куб.</td>
              <td>
                {/* <select className="form-select" style={{width: '30%'}} onChange={(e) => {handleRegionChange(e.target.value); console.log(e.target.value)}}>
                <option value=""></option>
                
                {RegionList&&
                  RegionList.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.Nazvanie_regiona} 
                    </option>
                  ))}
                </select> */}
                {car.region_name}
              </td>
              <td style={{textAlign: 'right'}}>
                {/* <input style={{width: '100px'}} type="number" id="firstName" name="firstName" value={car.probeg}/><br/> */}
                {car.probeg}
              </td>
              <td style={{textAlign: 'right'}}>
                {/* <input style={{width: '100px'}} type="number" id="firstName" name="firstName" value={car.cost_of_fuel}/><br/> */}
                {car.cost_of_fuel}
              </td>
              <td style={{textAlign: 'right'}}>
                {/* <input style={{width: '100px'}} type="number" id="firstName" name="firstName" value={car.rashod}/><br/> */}
                {car.rashod}
              </td>
              <td style={{textAlign: 'right'}}> 
                <b>Топливо: </b><br/>{car.sum_of_fuel} <br/>
                <b>Налог: </b><br/>{car.sum_of_nalog} <br/>
                <b>Итоговая стоимость: </b><br/>{car.cost_of_ownership}
              
              </td>
                <td> <TruncateString text={car.request_date} maxLength={10} /></td>
                <td> 

                  <Button variant="primary" onClick={() => toggleBlock(car.id)}>
                    {car.isOpen ? 'Свернуть' : 'Статистика'}
                  </Button>

        
                  {car.isOpen && (
                    <>
                      <div>
                        <p>
                        Статистика по автомобилю: <br/>
                        <strong>
                          {car.car_name} {car.car_model}
                        </strong>
                        
                        <br/>
                        Количество запросов со <br/>
                        стороны пользователей: <br/>
                        <strong>
                          {car.kolichestvo_zaprosov}
                        </strong>
                        
                        </p>
                      </div>  
                    </>
                    )}
                  {/* {!showStatistic&& (
                    <Button onClick={() =>{handleStatistic(); handleShowStatistic(); toggleBlock(car.id)}} style={{marginRight: '10px'}}>Статистика</Button>

                  )}
                  {showStatistic&&(
                    <div>
                      <p>
                        Статистика по автомобилю: 
                        {car.car_name} {car.car_model}
                      </p>
                      <p>
                        Количество запросов со 
                        стороны пользователей: {car.kolichestvo_zaprosov}
                      </p>
                      <Button onClick={() =>{handleCloseStatistic()}} style={{marginRight: '10px'}}>Закрыть</Button>
                    </div>
                  )} */}<br/>
                  {/* <Button onClick={()=> {
                    CalculatorStore.updateMarka(car.car_name)
                    CalculatorStore.updateModel(car.car_model)
                    CalculatorStore.updateModification(car.modification_name)
                    CalculatorStore.updateRegion(parseInt(car.region))
                    CalculatorStore.updateProbeg(car.probeg)
                    CalculatorStore.updateCostOfFuel(car.cost_of_fuel)
                    CalculatorStore.updateExpenditureOfFuel(car.rashod)
                    
                    navigate('/calculator')

                  }} style={{marginTop: '10px'}}>Пересчитать</Button> */}
                  <Button onClick={()=> {
                    CalculatorStore.updateMarka(car.car_name)
                    CalculatorStore.updateModel(car.car_model)
                    CalculatorStore.updateModification(car.modification_name)
                    CalculatorStore.updateRegion(parseInt(car.region))
                    CalculatorStore.updateProbeg(car.probeg)
                    CalculatorStore.updateCostOfFuel(car.cost_of_fuel)
                    CalculatorStore.updateExpenditureOfFuel(car.rashod)
                  }}>
                    <Link style={{color: 'white', textDecoration: "none"}} to='/Calculator' id='navbarNav' className='nav-item'>Пересчитать</Link>
                  </Button>
                </td>
                
              {/* Вывод других данных из ответа */}
              {/* <Modal show={showStatistic} onHide={handleCloseStatistic}>
                <Modal.Header closeButton>
                  <Modal.Title>Статистика по автомобилю: {car.car_name} {car.car_model}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Количество запросов со стороны пользователей: {car.kolichestvo_zaprosov}
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
              </Modal> */}
            </tr>
            
          ))}
          {/* Добавьте другие строки как необходимо */}
        </tbody>
      </Table>
            
        
      {/* {requestedCar&&
        requestedCar.map((car) => (
          
          <Card key={car.id} className="bg-black text-light " style={{borderColor: 'gray'}}>
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
                        <Button variant="primary" onClick={() => toggleBlock(car.id)}>
                          {car.isOpen ? 'Свернуть' : 'Статистика'}
                        </Button>

              
                        {car.isOpen && (
                          <>
                            <div>
                              <p>
                              Статистика по автомобилю: <br/>
                              <strong>
                                {car.car_name} {car.car_model}
                              </strong>
                              
                              <br/>
                              Количество запросов со <br/>
                              стороны пользователей: <br/>
                              <strong>
                                {car.kolichestvo_zaprosov}
                              </strong>
                              
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