import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
// import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Modal } from 'react-bootstrap';
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
    const [Summa, setSumma] = useState([]);
    const [ModificatioinList, setModificationList] = useState([]);
    const [RegionList, setRegionList] = useState([]);
    const [Region, setRegion] = useState([]);
    const [checkSum, setcheckSum] = useState(false);
    var storedToken = localStorage.getItem('authToken');
    useEffect(() => {
      handleMarkaGet();
      handleRegionGet();
      setcheckSum(false)
      storedToken = localStorage.getItem('authToken');
      setErrorCount(true)
      // if (storedToken) {
      //   Store.login();
      // }
      // setShowCalculator(Store.isAuthenticated)
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
          // response.json()
          setBrandList(response.data.map(item => item.Nazvanie_brand))
          console.log(BrandList)
          // console.log(selectedBrand)
          // console.log('mistake')
          
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
          // response.json()
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
        // response.json()
        // Обработка успешного ответа от сервера
        setModelList(response.data.map(item => item.Nazvanie_modeli))
        // setBrand(e)
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
    const handleModificationView = (model) => {
      // setBrand(brand)
      // console.log(brand)
      axios.get('http://127.0.0.1:8000/modification-by-model/', { 
        method: 'GET',
        params: {
          Nazvanie_modeli: model
        },
        // body: JSON.stringify({
        //   brand: brand
        // }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

      })
      .then(response => {
        // response.json()
        // Обработка успешного ответа от сервера
        console.log(response.data)
        setModificationList(response.data)
        // setBrand(e)
        console.log(response.data);
        // console.log(ModelList)
        // console.log(brand)
      })
      .catch(error => {
        // Обработка ошибки
        console.error(error);
      });
      console.log(brand)
    }


  const handleCountSum = (modification_id, probeg, region, rashod, cost) =>{
    console.log('регион '+region)
    if (probeg == 0 || rashod ==0 || cost == 0){
      setErrorCount(false)
    }
    else
    {
        console.log(region)
      const token = storedToken;
      axios.get('http://127.0.0.1:8000/cost_of_carship/', { 
          method: 'GET',
          params: {
            Region: region,
            Probeg: probeg,
            Modification: modification_id,
            Rashod_topliva: rashod,
            Cost_of_fuel: cost
          },
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              // 'Authorization': `Bearer ${token}`  // Передача токена в заголовках
              'Authorization': `Token ${token}`
          }

        })
        .then(response => {
          // Обработка успешного ответа от сервера
          console.log(response.data)
          setSumma(response.data)
          setcheckSum(true);
          setErrorCount(true)
          // setModificationList(response.data)
          console.log(response.data);
        })
        .catch(error => {
          // Обработка ошибки
          console.error(error);
          setErrorCount(false)
        });}
  }















  return (
    <div className="">

            <Table striped bordered hover>
              <thead>
                <tr>
                  {/* <th>Номер</th> */}
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
                      <select className="form-select" style={{width: '30%'}} onChange={(e) => {handleBrandChange(e.target.value);console.log(e.target.value); handleModelsView(e.target.value)}}>
                      {/* <option value=''></option> */}
                          {BrandList &&
                          BrandList.map((brand) => (
                              <option key={brand} value={brand}>
                                {brand}
                              </option>
                          ))}
                      </select>
                      {car.car_name}
                    </td>
                    <td>
                      <select className="form-select" style={{width: '30%'}} onChange={(e) => {handleModelChange(e.target.value); handleModificationView(e.target.value)}}>
                      <option value=""></option>
                      
                      {ModelList &&
                        ModelList.map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                      {car.car_model}
                    </td>
                    <td style={{textAlign: 'right'}}>
                      <input style={{width: '100px'}} type="number" id="firstName" name="firstName" value={car.modification_power}/><br/>
                      {car.modification_power} л.с. {car.modification_capacity} см.куб.</td>
                    <td>
                      <select className="form-select" style={{width: '30%'}} onChange={(e) => {handleRegionChange(e.target.value); console.log(e.target.value)}}>
                      <option value=""></option>
                      
                      {RegionList&&
                        RegionList.map((region) => (
                          <option key={region.id} value={region.id}>
                            {region.Nazvanie_regiona} 
                          </option>
                        ))}
                      </select>
                      {car.region}
                    </td>
                    <td style={{textAlign: 'right'}}>
                      <input style={{width: '100px'}} type="number" id="firstName" name="firstName" value={car.probeg}/><br/>
                      {/* {car.probeg} */}
                    </td>
                    <td style={{textAlign: 'right'}}>
                      <input style={{width: '100px'}} type="number" id="firstName" name="firstName" value={car.cost_of_fuel}/><br/>
                      {/* {car.cost_of_fuel} */}
                    </td>
                    <td style={{textAlign: 'right'}}>
                      <input style={{width: '100px'}} type="number" id="firstName" name="firstName" value={car.rashod}/><br/>
                      {/* {car.rashod} */}
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
                        <Button onClick={()=> {navigate('/calculator')}} style={{marginTop: '10px'}}>Пересчитать</Button>
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