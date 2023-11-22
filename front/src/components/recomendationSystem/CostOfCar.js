/* eslint-disable no-unused-vars */
import React, { createContext, useContext } from 'react'
import { observer } from 'mobx-react'
import Header from '../Static/Header';
import AuthStore from '../MobX/AuthStore';
import { Container, Row, Col, Form, Button, Spinner, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import CalculatorStore from '../Calculator/CalculatorStore';
import axios from 'axios';
import CostOfCarStore from './CostOfCarStore';

const CostOfCarContext = createContext(CostOfCarStore)
export const CostOfCar = observer((Store) => {
  const costOfCar = useContext(CostOfCarContext)
  const [brand, setBrand] = useState('');
  const [cost, setCost] = useState('')
  const [checkViewCost, setCheckViewCost] = useState(false)
  const [errorCount, setErrorCount] = useState(false);
  const [BrandList, setBrandList] = useState([]);
  const [ModelList, setModelList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ModificatioinList, setModificationList] = useState([]);
  
  var storedToken = localStorage.getItem('authToken');
  useEffect(() => {
    handleMarkaGet();
    setErrorCount(false)
    if (storedToken) {
      AuthStore.login();
    }
  }, []);

  //получение списка марок авто
  async function handleMarkaGet () {
    console.log(brand)

      await axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/brands',
        headers: {'Access-Control-Allow-Origin': 'http://localhost:3000',}
      })
      .then((response) => {
        setBrandList(response.data.map(item => item.Nazvanie_brand))
        console.log(BrandList)
      })
      .catch((error) =>{ console.error(error); console.log('svfev')});
  }
  
  //получение списка моделей марки после выбора марки авто

  const handleModelsView = async (brand) => {
    setBrand(brand)
    console.log(brand)
    await axios.get('http://127.0.0.1:8000/models-by-brand/', { 
      method: 'GET',
      params: {
        Nazvanie_marki: costOfCar.marka
      },
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => {
      setModelList(response.data.map(item => item.Nazvanie_modeli))
      console.log(response.data);
      console.log(ModelList)
      console.log(brand)
    })
    .catch(error => {
      console.error(error);
    });
    console.log(brand)
  }

  const handleModificationView = async () => {
    await axios.get('http://127.0.0.1:8000/modification-by-model/', { 
      method: 'GET',
      params: {
        Nazvanie_modeli: costOfCar.model
      },
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => {
      console.log(response.data)
      setModificationList(response.data)
    })
    .catch(error => {
      console.error(error);
    });
    console.log(brand)
  }

  const getNameOfModification = (id) => {
    try{
      let s1 =  ModificatioinList[id-1].Power
      let s2 = ModificatioinList[id-1].Capacity_of_engine
      console.log('модификация: ' + s1 + s2)
      let str = s1 + ' л.с. ' + s2 + 'куб.см.'
      return (str)
    }
    catch{
      console.log('название модификации пусто')
      return CalculatorStore.Modification
    }
  }
  const getCapacityOfEngine = (id) => {
    try{
      let s1 =  ModificatioinList[id-1].Capacity_of_engine
      return (parseFloat(s1))
    }
    catch{
      console.log('название модификации пусто')
      return costOfCar.modification
    }
  }

  const getPowerOfEngine = (id) => {
    try{
      let s1 =  ModificatioinList[id-1].Power
      return (parseFloat(s1))
    }
    catch{
      console.log('название модификации пусто')
      return costOfCar.modification
    }
  }
  const calculateCostOfCar = async () => {
    setCheckViewCost(false)
    setLoading(true)
    await axios.get('http://127.0.0.1:8000/cars_from_parcing/', { 
      method: 'GET',
      params: {
        Nazvanie_marki: costOfCar.marka,
        Nazvanie_modeli: costOfCar.model,
        Mileage: costOfCar.probeg,
        Year: costOfCar.year,
        Engine_Capacity: getCapacityOfEngine(costOfCar.modification)
      },
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => {
      setCost(response.data.cost_of_car)
      costOfCar.updateMainImage(response.data.image_of_car)
      setCheckViewCost(true)
      setLoading(false)
    })
    .catch(error => {
      console.error(error);
    });
    console.log(brand)
  }
  return (
    <div className='bg-black' style={{height: '100%'}}>
      <Header Store={AuthStore} showOptions={false} showBack={true}/>
      <Container className='p-3 justify-content-center'>
        <Row className='justify-content-center'>
            <h3 style={{color: 'white'}} className='text-center m-3'>
              Оцените свою машину за 1 минуту
            </h3>
        </Row>
        <Row className='justify-content-left'>
            <p style={{color: 'white'}}>
            Сайт «Автостат.рф» совместно представляет вам простой, понятный и главное справедливый калькулятор для оценки вашего автомобиля.

            Для его создания мы применили авторскую методику расчёта стоимости, которая основывается на реальных предложениях о продаже аналогичного автомобиля дилерами и физическими лицами.
            </p>
            <p style={{color: 'white'}}>
              Узнайте стоимость Вашего автомобиля всего за 1 минуту.
            </p>
        </Row>
          
        <Row className='justify-content-center p-2'>
          <h5 className='text-center text-light'>Марка</h5>
            <select  className="form-select bg-dark text-light" style={{width: '30%'}} onChange={(e) => {
                costOfCar.updateMarka(e.target.value);
                handleModelsView(e.target.value)
              }} placeholder='Марка'>
                <option placeholder='Марка' value={costOfCar.marka}>{costOfCar.marka}</option>
                {BrandList &&
                BrandList.map((brand) => (
                    <option key={brand} value={brand}>
                    {brand}
                    </option>
                ))}
            </select>
        </Row>
        <Row className='justify-content-center p-2'>
          <h5 className='text-center text-light'>Модель</h5>
          <select className="form-select bg-dark text-light" style={{width: '30%'}} onChange={(e) => {
            costOfCar.updateModel(e.target.value); 
            handleModificationView(e.target.value)
          }}>
          <option value={CalculatorStore.Model}>{CalculatorStore.Model}</option>
          
          {ModelList &&
            ModelList.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </Row>
        <Row className='justify-content-center p-2'>
          <h5 className='text-center text-light'>Модификация</h5>
          <select className="form-select bg-dark text-light" style={{width: '30%'}} onChange={(e) => {
            costOfCar.updateModification(e.target.value); 
            // CalculatorStore.updateModification(e.target.value)
            console.log('проверка на число: ' + Number.isInteger(e.target.value))
            console.log('номер текущей модификации: '+CalculatorStore.Modification)
          }}>
          <option value={CalculatorStore.Modification}>{ getNameOfModification(parseInt(costOfCar.modification))}</option>
          
          {ModificatioinList &&
            ModificatioinList.map((modification) => (
              <option key={modification.id} value={modification.id}>
                {modification.Power} л.с. {modification.Capacity_of_engine} куб.мл.
              </option>
            ))}
          </select>
        </Row>
        <Row className='justify-content-center p-2'>
          <h5 className='text-center text-light'>Пробег</h5>
          <input 
            type="number" 
            value={costOfCar.probeg}
            className="form-select bg-dark text-light" 
            style={{width: '30%'}} 
            id="exampleInput" 
            placeholder="Пробег" 
            onChange={(e)=>
              {costOfCar.updateProbeg(e.target.value)}
            }>

          </input>
        </Row>
        <Row className='justify-content-center p-2'>
        <h5 className='text-center text-light'>Год выпуска</h5>
          <input 
            type="number" 
            min={1990}
            max={2023}
            step={1}
            value={costOfCar.year}
            className="form-select bg-dark text-light" 
            style={{width: '30%'}} 
            id="exampleInput" 
            placeholder="Год выпуска" 
            onChange={(e)=>
              {costOfCar.updateYear(e.target.value)}
            }>
          </input>
        </Row>
        <Row className='justify-content-center p-2'>
          <Button variant='outline-success' style={{width: '30%'}} onClick={() => calculateCostOfCar()}>
            Оценить
          </Button>
        </Row>
        {loading && (
          <Row className='justify-content-center p-2'>
            <Spinner animation="border" variant="light"/>
          </Row>
        )}
        {checkViewCost && (
          <Container className='m-3 text-light border-light border-3'>
            <Row className='justify-content-center p-2'>
              <Col>
                <Image src={costOfCar.main_image} fluid className="rounded mx-auto"/>
              </Col>
              <Col>
                <h1>
                  {costOfCar.marka} {costOfCar.model}
                </h1>
                <p>
                  Год выпуска: {costOfCar.year}
                </p>
                <p>
                  Объем двигателя: {getCapacityOfEngine(costOfCar.modification)} л.
                </p>
                <p>
                  Мощность двигателя: {getPowerOfEngine(costOfCar.modification)} л.с.
                </p>
                <p>
                  Пробег: {costOfCar.probeg} км.
                </p>
              </Col>
            </Row> 
            <div className=' border-bottom'></div>
            <Row className='justify-content-center p-2'>
              <h1>
                Рыночная цена:  {parseFloat(cost).toFixed(2)} руб.
              </h1>
            </Row> 
          </Container>
           
        )}

      </Container>
    </div>
  )
});
