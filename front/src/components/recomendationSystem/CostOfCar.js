/* eslint-disable no-unused-vars */
import React from 'react'
import { observer } from 'mobx-react'
import Header from '../Static/Header';
import AuthStore from '../MobX/AuthStore';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import CalculatorStore from '../Calculator/CalculatorStore';
import CarDescriptionStore from '../MobX/CarDescriptionStore';
import axios from 'axios';
export const CostOfCar = observer((Store, CarDescriptionStore) => {
    const [Probeg, setProbeg] = useState(0);
    const [render, setRender] = useState(0);
    const [Rashod, setRashod] = useState(0);
    const [FuelPrice, setFuelPrice] = useState(0);
    const [year, setYear] = useState(0);
    const [Modification_id, setModification_id] = useState(0);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [errorCount, setErrorCount] = useState(false);
    const [showCalculator, setShowCalculator] = useState('');

    const [BrandList, setBrandList] = useState([]);
    const [ModelList, setModelList] = useState([]);
    const [Summa, setSumma] = useState([]);
    const [ModificatioinList, setModificationList] = useState([]);
    const [RegionList, setRegionList] = useState([]);
    const [Region, setRegion] = useState([]);
    const [checkSum, setcheckSum] = useState(false);
    const [RegionName, setRegionName] = useState('');
    var storedToken = localStorage.getItem('authToken');
    useEffect(() => {
        handleRegionGet();
        handleMarkaGet();
        handleModelsView();
        handleModificationView();
        console.log('Хук useState Calculator.js отработал' )
        // setcheckSum(false)
        // storedToken = localStorage.getItem('authToken');
        setErrorCount(false)
        if (storedToken) {
          AuthStore.login();
        }
        setShowCalculator(Store.isAuthenticated)
      }, []);
      const handleModelChange = (selectedModel) => {
        setModel(selectedModel);
        CalculatorStore.updateModel(selectedModel)
        console.log('текущая модель: ' + CalculatorStore.Model)
      }
      const handleModificationIdChange = (id) => {
        setModification_id(id);
        // CalculatorStore.updateModification(id)
        // console.log('текущая модификация: ' + CalculatorStore.Modification)
      }
      const handleRegionChange = (region) => {
        setRegion( region);
        CalculatorStore.updateRegion(region)
        console.log('текущий регион: ' + CalculatorStore.Region)
      }
  
      //получение списка марок авто
      function handleMarkaGet (selectedBrand) {
        setBrand(selectedBrand);
        console.log(brand)
  
          axios({
            method: 'get',
            // url: 'https://chatbot.ext.lomger.tech/auth/users/',
            url: 'http://127.0.0.1:8000/brands',
            headers: {'Access-Control-Allow-Origin': 'http://localhost:3000',}
          })
          .then((response) => {
            setBrandList(response.data.map(item => item.Nazvanie_brand))
            console.log(BrandList)
          })
          .catch((error) =>{ console.error(error); console.log('svfev')});
      }
      async function handleRegionGet (selectedRegion) {
        setRegion(selectedRegion);
          await axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/regions',
            headers: {'Access-Control-Allow-Origin': 'http://localhost:3000',}
          })
          .then((response) => {
            setRegionList(response.data)
            console.log(RegionList[0].Nazvanie_regiona)
            setRegionName(getNameOfRegion(parseInt(CalculatorStore.Region)-1))
          })
          .catch((error) =>{ console.error(error)});
      }
  
      //получение списка моделей марки после выбора марки авто
  
      const handleModelsView = (brand) => {
        setBrand(brand)
        console.log(brand)
        axios.get('http://127.0.0.1:8000/models-by-brand/', { 
          method: 'GET',
          params: {
            Nazvanie_marki: CalculatorStore.Marka
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
          // Обработка ошибки
          console.error(error);
        });
        console.log(brand)
      }
      const handleModificationView = () => {
        axios.get('http://127.0.0.1:8000/modification-by-model/', { 
          method: 'GET',
          params: {
            Nazvanie_modeli: CalculatorStore.Model
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
          // Обработка ошибки
          console.error(error);
        });
        console.log(brand)
      }

      const handleBrandChange = (selectedBrand) => {
        setBrand(selectedBrand);
        CalculatorStore.updateMarka(selectedBrand)
        console.log('текущая марка: ' + CalculatorStore.Marka)
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
      function getNameOfRegion(id){
        try{
          let s1 = RegionList[id-1].Nazvanie_regiona
          return s1
        }
        catch{
          console.error();
          return CalculatorStore.Region
        }
      }
      const handleProbegChange = (probeg) => {
        setProbeg(probeg);
        CalculatorStore.updateProbeg(probeg)
        console.log('текущий пробег: ' + CalculatorStore.Probeg)
      }
  return (
    <div className='bg-black' style={{height: '100vh'}}>
        <Header Store={AuthStore} showOptions={false} showBack={true}/>
        <Container className='p-3 justify-content-center'>
            <Row className='justify-content-center'>
                <h3 style={{color: 'white'}} className='text-center m-3'>
                  Оцените свою машину за 1 минуту
                </h3>
            </Row>
            <Row className='justify-content-left'>

                <p style={{color: 'white'}}>
                Сайт «Цена Авто» совместно с Аналитическим агентством «АВТОСТАТ» представляет вам простой, понятный и главное справедливый калькулятор для оценки вашего автомобиля.

                Для его создания мы применили авторскую методику расчёта стоимости, которая основывается на реальных предложениях о продаже аналогичного автомобиля дилерами и физическими лицами.
                </p>
                <p style={{color: 'white'}}>
                  Узнайте стоимость Вашего автомобиля всего за 1 минуту.
                </p>
            </Row>

            <Row className='justify-content-center p-2'>
                <select  className="form-select bg-dark text-light" style={{width: '30%'}} onChange={(e) => {
                    handleBrandChange(e.target.value);
                    handleModelsView(e.target.value)
                  }} placeholder='Марка'>
                  <option value={CalculatorStore.Marka}>{CalculatorStore.Marka}</option>
                    {BrandList &&
                    BrandList.map((brand) => (
                        <option key={brand} value={brand}>
                        {brand}
                        </option>
                    ))}
                </select>
            </Row>
              <Row className='justify-content-center p-2'>
                <select className="form-select bg-dark text-light" style={{width: '30%'}} onChange={(e) => {
                  handleModelChange(e.target.value); 
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
                <select className="form-select bg-dark text-light" style={{width: '30%'}} onChange={(e) => {
                  handleModificationIdChange(e.target.value); 
                  CalculatorStore.updateModification(e.target.value)
                  console.log('проверка на число: ' + Number.isInteger(e.target.value))
                  console.log('номер текущей модификации: '+CalculatorStore.Modification)
                  // CalculatorStore.updateModification(getNameOfModification(e.target.value));
                  // console.log('имя модификации: ' + getNameOfModification(e.target.value))
                  // console.log('имя модификации: ' + ModificatioinList[0].Power)
                }}>
                <option value={CalculatorStore.Modification}>{ getNameOfModification(parseInt(CalculatorStore.Modification))}</option>
                
                {ModificatioinList &&
                  ModificatioinList.map((modification) => (
                    <option key={modification.id} value={modification.id}>
                      {modification.Power} л.с. {modification.Capacity_of_engine} куб.мл.
                    </option>
                  ))}
                </select>
              </Row>
              <Row className='justify-content-center p-2'>
                <input 
                  type="number" 
                  value={CalculatorStore.Probeg}
                  className="form-select bg-dark text-light" 
                  style={{width: '30%'}} 
                  id="exampleInput" 
                  placeholder="Пробег" 
                  onChange={(e)=>
                    {handleProbegChange(e.target.value)}
                  }>

                </input>
              </Row>
              <Row className='justify-content-center p-2'>
                <input 
                  type="number" 
                  value={CalculatorStore.Probeg}
                  className="form-select bg-dark text-light" 
                  style={{width: '30%'}} 
                  id="exampleInput" 
                  placeholder="Год выпуска" 
                  onChange={(e)=>
                    {handleProbegChange(e.target.value)}
                  }>

                </input>
              </Row>
              <Row className='justify-content-center p-2'>
                <Button variant='outline-success' style={{width: '30%'}}>
                  Оценить
                </Button>
              </Row>

        </Container>
    </div>
  )
});
