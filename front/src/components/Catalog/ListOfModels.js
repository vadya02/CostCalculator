// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthStore from '../MobX/AuthStore';
import { observer } from 'mobx-react';
// import help from '../img/help.png'
import Footer from '../Static/Footer';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Header from '../Static/Header';
import CalculatorStore from '../Calculator/CalculatorStore';
// eslint-disable-next-line no-unused-vars
const ListOfModels = observer(({Store, CarDescriptionStore, UserName, showOptions}) =>{
  
    const [brand, setBrand] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [model, setModel] = useState('');
    const [BrandList, setBrandList] = useState([]);
    const [ModelList, setModelList] = useState([]);
    const [CarDescriptionList, setCarDescriptionList] = useState([]);

    // eslint-disable-next-line no-unused-vars
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
            // eslint-disable-next-line no-unused-vars
            .then(response => {
              Store.login(); // Если токен валиден, устанавливаем состояние авторизации
            })
            .catch(error => {
              console.log('Ошибка проверки авторизации:', error);
              Store.logout();
            });
        }
      }, []);

    var storedToken = localStorage.getItem('authToken');
    useEffect(() => {
      console.log("Текущая марка: " + CarDescriptionStore.Marka)
      console.log("Текущая модель: " + CarDescriptionStore.Model)
      handleMarkaGet();
      handleCarDescriptionList()
      setBrand(CarDescriptionStore.Marka)
      setModel(CarDescriptionStore.Model)
      // handleModelList(CarDescriptionStore.Model)
      storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        Store.login();
      }
      // setShowCalculator(Store.isAuthenticated)
    }, []);
    const handleBrandChange = (selectedBrand) => {
      
      CarDescriptionStore.updateMarka(selectedBrand)
      console.log("Текущая марка:"+CarDescriptionStore.Marka)
      setBrand(selectedBrand);
    }
    const handleModelChange = (selectedModel) => {
      
      CarDescriptionStore.updateModel(selectedModel)
      console.log("Текущая марка:"+CarDescriptionStore.Model)
      setModel(selectedModel);
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
      const handleCarDescriptionList = async () => {
        await axios.get('http://127.0.0.1:8000/car_descriptions_all', { 
          method: 'GET',
          // params: {
          //   Nazvanie_modeli: model
          // },
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
  return (
    
    <div style={{backgroundColor:'black'}} className='justify-content-center'>
      
      <Header Store={AuthStore} showOptions={false} showBack={true}/>
      <Container className='text-light' >
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
              {/* <div>
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

              </div> */}
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Марка автомобиля</Form.Label>
                <Form.Select className='bg-dark text-white'
                  custom
                  defaultValue={CarDescriptionStore.Marka}
                  onChange={(e) => {handleBrandChange(e.target.value);console.log(e.target.value); handleModelsView(e.target.value)}}
                >
                  <option className='bg-dark text-white' value={CarDescriptionStore.Marka}>{CarDescriptionStore.Marka}</option>
                  {BrandList &&
                    BrandList.map((brand) => (
                        <option key={brand} value={brand}>
                        {brand}
                        </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className='d-flex justify-content-center'>
              {/* <div>
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
              </div> */}
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Модель автомобиля</Form.Label>
                <Form.Select
                  className='bg-dark text-white'
                  custom
                  defaultValue={CarDescriptionStore.Model}
                  onChange={(e) => {handleModelChange(e.target.value); handleModelList(e.target.value)}}
                >
                  <option value={CarDescriptionStore.Model}>{CarDescriptionStore.Model}</option>
                  {ModelList &&
                    ModelList.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

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
                <Card className='bg-dark text-light' >
                  <Card.Img variant="top" src={car.main_image} style={{height: "350px"}}/>
                  <Card.Body>
                    <Card.Title>{car.name_of_car}</Card.Title>
                      <Button onClick={()=>{
                        CalculatorStore.updateMarka(CarDescriptionList[car.id-1].marka_name) 
                        CalculatorStore.updateModel(CarDescriptionList[car.id-1].model_name) 
                        CarDescriptionStore.updateSalonImage(CarDescriptionList[car.id-1].salon_image)  
                        CarDescriptionStore.updateCarDescription(CarDescriptionList[car.id-1].description) 
                      }   
                      }>
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