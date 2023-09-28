// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, redirect } from 'react-router-dom';
import ModalAuth from '../Authorization/ModalAuth';
// import time from '../img/time.png'
import ModalReg from '../Authorization/ModalReg';
// import statistic from '../img/statistic.png'
import AuthStore from '../MobX/AuthStore';
import Image from 'react-bootstrap/Image';
import { observer } from 'mobx-react';
// import help from '../img/help.png'
import Footer from '../Static/Footer';
import { useNavigate } from 'react-router-dom';
// import car from '../img/car.jpeg'

import { useContext } from 'react';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import Header from '../Static/Header';
const ListOfModels = observer(({Store, CarDescriptionStore, UserName, showOptions}) =>{
    const authStore = Store
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
              Store.login(); // Если токен валиден, устанавливаем состояние авторизации
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



    const [Probeg, setProbeg] = useState(0);
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
    const [CarDescriptionList, setCarDescriptionList] = useState([]);
    const [Summa, setSumma] = useState([]);
    const [ModificatioinList, setModificationList] = useState([]);
    const [RegionList, setRegionList] = useState([]);
    const [Region, setRegion] = useState([]);
    const [checkSum, setcheckSum] = useState(false);
    const data = {
      labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май'],
      datasets: [
        {
          label: 'Продажи',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: [65, 59, 80, 81, 56],
        },
      ],
    };
    var storedToken = localStorage.getItem('authToken');
    let navigate = useNavigate();
    useEffect(() => {
      handleMarkaGet();
      handleRegionGet();
      handleCarDescriptionList();
      setcheckSum(false)
      storedToken = localStorage.getItem('authToken');
      setErrorCount(true)
      if (storedToken) {
        Store.login();
      }
      setShowCalculator(Store.isAuthenticated)
    }, []);
    
    const handleProbegChange = (probeg) => {
      setProbeg(probeg);
    }
    const handleRashodChange = (rashod) => {
      setRashod(rashod);
    }
    const handleCostChange = (cost) => {
      setFuelPrice(cost);
    }
    const handleBrandChange = (selectedBrand) => {
      setBrand(selectedBrand);
    }
    const handleModelChange = (selectedModel) => {
      setModel(selectedModel);
    }
    const handleModificationIdChange = (id) => {
      setModification_id(id);
    }
    const handleRegionChange = (region) => {
      setRegion( region);
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
    };
    function handleRegionGet (selectedRegion) {
      setRegion(selectedRegion);
        axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/regions',
          headers: {'Access-Control-Allow-Origin': 'http://localhost:3000',}
        })
        .then((response) => {
          setRegionList(response.data)
        })
        .catch((error) =>{ console.error(error); console.log('svfev')});
    };

    //получение списка моделей марки после выбора марки авто

    const handleModelsView = (brand) => {
      setBrand(brand)
      console.log(brand)
      axios.get('http://127.0.0.1:8000/models-by-brand/', { 
        method: 'GET',
        params: {
          Nazvanie_marki: brand
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
    
    const handleModelList = (model) => {
        axios.get('http://127.0.0.1:8000/car_descriptions', { 
          method: 'GET',
          params: {
            Nazvanie_modeli: model
          },
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
  
        })
        .then(response => {
          console.log(response.data)

          setCarDescriptionList(response.data)
          CarDescriptionStore.CarDescription = response.data.map(item => item.description)
          CarDescriptionStore.SalonImage = response.data.map(item => item.salon_image)
          console.log(CarDescriptionStore.CarDescription)
        })
        .catch(error => {
          // Обработка ошибки
          console.error(error);
        });
        console.log(brand)
      }
      const handleCarDescriptionList = () => {
        axios.get('http://127.0.0.1:8000/car_descriptions_all', { 
          method: 'GET',
          params: {
            Nazvanie_modeli: model
          },
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
  
        })
        .then(response => {
          console.log(response.data)

          setCarDescriptionList(response.data)
        })
        .catch(error => {
          // Обработка ошибки
          console.error(error);
        });
        console.log(brand)
      }


  
  
  
  // const authStore = useContext(authStore);

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

  // const google = useGoogleCharts();
  const chartData = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ];
  
  return (
    
    <div style={{backgroundColor:'black'}}>
      
      <Header Store={AuthStore} showOptions={false} showBack={true}/>
      <Container className='text-light' style={{padding: '30px', margin: '30px'}} >
        <Row className='text-center'>
            <h3>Каталог автомобилей</h3>
        </Row>
        {/* <Row className='text-center'>
            <Col className='text-center'>
                <h5 className='col-md-3' >Марка автомобиля</h5>
            </Col>
            <Col className='text-center'>
                <h5 className='col-md-3' >Модель автомобиля</h5>
            </Col>
        </Row> */}
        <Row className='p-20 text-center ' >
            <Col className='d-flex justify-content-center'>
              <div>
                <h5 >Марка автомобиля</h5>
                  <select className="form-select bg-dark text-white " style={{width:'300px'}}  onChange={(e) => {handleBrandChange(e.target.value);console.log(e.target.value); handleModelsView(e.target.value)}}>
                  <option value=""></option>
                      {BrandList &&
                      BrandList.map((brand) => (
                          <option key={brand} value={brand}>
                          {brand}
                          </option>
                      ))}
                  </select>
              </div>
                  
            </Col>
            <Col className='d-flex justify-content-center'>
              <div>
                <h5 >Модель автомобиля</h5>
                  <select className="form-select bg-dark text-white" style={{width:'300px'}} onChange={(e) => {handleModelChange(e.target.value); handleModelList(e.target.value)}}>
                  <option value=""></option>
                  
                  {ModelList &&
                    ModelList.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
              </div>
                  

            </Col>
            
          </Row>
          <Row xs={1} md={2} className="g-4">
            {CarDescriptionList&&
              CarDescriptionList.map((car) => (
              // <Card key={car.id} className="bg-black text-light " style={{borderColor: 'gray'}}>
              //   <Card.Body>
              //     <Image src={car.main_image} fluid className="rounded mx-auto"/>
              //   </Card.Body>
              // </Card>
              <Col key={car.id} style={{padding: '60px'}}>
                <Card className='bg-dark text-light'>
                  <Card.Img variant="top" src={car.main_image} />
                  <Card.Body>
                    <Card.Title>{car.name_of_car}</Card.Title>
                      <Button>
                        <Link style={{color: 'white', textDecoration: "none"}} to='/aboutCar' id='navbarNav' className='nav-item'>Подробнее</Link>
                      </Button>
                    </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>


      </Container>
      <Footer/>

      
    </div>

  );
})

export default ListOfModels;