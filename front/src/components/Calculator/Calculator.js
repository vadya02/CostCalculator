import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Footer from '../Static/Footer';
import Header from '../Static/Header';
import ChartReact from '../etc/ChartReact';
import AuthStore from '../MobX/AuthStore';
// import StartPage from '../StartPage';
import { Bar } from 'react-chartjs-2';
import ModalAuth from '../Authorization/ModalAuth';
// import Chart from './Chart';
import { Chart } from 'react-google-charts';
import ModalReg from '../Authorization/ModalReg';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import CarDescriptionStore from '../MobX/CarDescriptionStore';
// Chart.register(category);
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
function Calculator( {Store} ) {
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
    let navigate = useNavigate();
    useEffect(() => {
      handleMarkaGet();
      handleRegionGet();
      // setcheckSum(false)
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
    const handleModificationView = (model) => {
      axios.get('http://127.0.0.1:8000/modification-by-model/', { 
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
        setModificationList(response.data)
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
          
          // CarDescriptionStore.Nalog = Summa.nalog
          // CarDescriptionStore.Toplivo = Summa.toplivo
          CarDescriptionStore.updateNalog(response.data.nalog)
          CarDescriptionStore.updateToplivo(response.data.toplivo)
          
          console.log('Текущий налог: ' + CarDescriptionStore.Nalog)
          console.log('Текущая стоимость топлива: ' + CarDescriptionStore.Toplivo)
          setcheckSum(true);
          setErrorCount(true)
        })
        .catch(error => {
          // Обработка ошибки
          console.error(error);
          setErrorCount(false)
        });}
  }
  
  
  
  
  // const authStore = useContext(authStore);
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

  // const google = useGoogleCharts();
  
  
  return (
    <div className="bg-black text-light" >
        {console.log('Авторизация' + Store.isAuthenticated)}
        {!Store.isAuthenticated && (
          <div>
            {console.log('Авторизация' + Store.isAuthenticated)}
            <Header Store={AuthStore} showOptions={false} showBack={true}/>
            <div className='container text-center' >
              {/* <StartPage Store={AuthStore}/> */}
              <div>
      
     
              <Container fluid className="" style={{height: '100vh'}}>
              <Row className="h-100 justify-content-center align-items-center">
                <Col md={6} className="text-center">
                  <h1>Калькулятор расчета стоимости владения автомобилем</h1>
                  <p>Чтобы рассчитать стоимость войдите в систему</p>
                  <Button style={{marginRight:'10px'}} variant="outline-primary" className="login" data-toggle='modal' data-target='#modalAuth' onClick={ ()=>{handleModalAuthActiveOpen(); console.log(isModalAuthActive)}}>Вход</Button>
                  <Button variant="primary" className="signup" onClick={ ()=>{handleModalRegActiveOpen()}}>Регистрация</Button>
                </Col>
              </Row>
            </Container>
                {/* <div class="container h-100 text-center p-50">
                <div class=" row h-100 justify-content-center align-items-center ">
                    <div class="col-md-6 p-80">
                        
                        <h1>Заголовок</h1>
                        <p>Текст на странице.</p>
                        <button variant="outline-primary" className="login" data-toggle='modal' data-target='#modalAuth' onClick={ ()=>{handleModalAuthActiveOpen(); console.log(isModalAuthActive)}}>Вход</button>
                        <button variant="primary" className="signup" onClick={ ()=>{handleModalRegActiveOpen()}}>Регистрация</button>
                    </div>
                </div>
            </div> */}
              <ModalAuth Store={Store} showModal = {isModalAuthActive} handleModalClose = {handleModalAuthActiveClose} openRegClick={handleModalRegActiveOpen}/>
              <ModalReg Store={Store} showModal = {isModalRegActive} handleModalClose = {handleModalRegActiveClose} openAuthClick={handleModalAuthActiveOpen}/>
                
            </div>
            </div>
          </div>
          
          
        )}
        {Store.isAuthenticated && (
        <div>
        <Header Store={AuthStore} showOptions={false} showBack={true}/>

        {/*  */}
        {/* <Container>
          <Row>
            <Col>
              <div className='row justify-content-center' >
                  <h5 className='col-md-3' >Марка автомобиля</h5>
                  <select  className="form-select"  onChange={(e) => {handleBrandChange(e.target.value);console.log(e.target.value); handleModelsView(e.target.value)}}>
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
            <Col>
              <div className='row justify-content-center' >
                  <h5 >Модель автомобиля</h5>
                  <select className="form-select" onChange={(e) => {handleModelChange(e.target.value); handleModificationView(e.target.value)}}>
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
          <Row>

          </Row>
        </Container> */}
        {/*  */}

        <div className='container text-center p-5' >

            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}} >
                <h5 className='col-md-3' style={{width: '30%', textAlign: 'left'}}>Марка автомобиля</h5>
                <select  className="form-select" style={{width: '30%'}} onChange={(e) => {handleBrandChange(e.target.value);console.log(e.target.value); handleModelsView(e.target.value)}}>
                <option value=""></option>
                    {BrandList &&
                    BrandList.map((brand) => (
                        <option key={brand} value={brand}>
                        {brand}
                        </option>
                    ))}
                </select>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{width: '30%', textAlign: 'left'}}>Модель автомобиля</h5>
                <select className="form-select" style={{width: '30%'}} onChange={(e) => {handleModelChange(e.target.value); handleModificationView(e.target.value)}}>
                <option value=""></option>
                
                {ModelList &&
                  ModelList.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
            </div>
            <div className='row justify-content-center ml-autoы' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{width: '30%', textAlign: 'left'}}>Модификация</h5>
                <select className="form-select" style={{width: '30%'}} onChange={(e) => {handleModificationIdChange(e.target.value); console.log(e.target.value)}}>
                <option value=""></option>
                
                {ModificatioinList &&
                  ModificatioinList.map((modification) => (
                    <option key={modification.id} value={modification.id}>
                      {modification.Power} л.с. {modification.Capacity_of_engine} куб.мл.
                    </option>
                  ))}
                </select>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{width: '30%', textAlign: 'left'}}>Выберите регион</h5>
                <select className="form-select" style={{width: '30%'}} onChange={(e) => {handleRegionChange(e.target.value); console.log(e.target.value)}}>
                <option value=""></option>
                
                {RegionList&&
                  RegionList.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.Nazvanie_regiona} 
                    </option>
                  ))}
                </select>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{ width: '30%', textAlign: 'left'}}>Годовой пробег</h5>
                <input type="number" class="form-control" style={{width: '30%'}} id="exampleInput" placeholder="" onChange={(e)=>handleProbegChange(e.target.value)}></input>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{ width: '30%', textAlign: 'left'}}>Цена топлива</h5>
                <input type="number" class="form-control" style={{width: '30%'}} id="exampleInput" placeholder="" onChange={(e)=>handleCostChange(e.target.value)}></input>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{width: '30%', textAlign: 'left'}}>Расход топлива</h5>
                <input type="number" class="form-control" style={{width: '30%'}} id="exampleInput" placeholder="" onChange={(e)=>handleRashodChange(e.target.value)}></input>
            </div>
            <div className='container d-flex justify-content-center align-items-center' style={{padding: '10px', display: 'flex'}}>
                <button className='btn btn-primary' onClick={() => {
                    handleRegionChange(Region);
                    handleCountSum(Modification_id, Probeg, Region, Rashod, FuelPrice)
                    // handleCheckSumChange()
                    
                    console.log(Region)
                  }}>Рассчитать
                </button>
                
            </div>
            {!errorCount&&(
                  <p style={{color: 'red'}}>Заполните все поля</p>
                )}
            {checkSum &&(
              <>
                {/* <CountSum nalog={Probeg} toplivo={Rashod} summa={10}/> */}
                <div className="container text-center ">
                  <Container className="text-center">
                    <Row>
                      <p className='fw-normal'>
                        <b>{Summa.sum_of_carship}</b>руб. Полная сумма владения за 1 год
                      </p>
                    </Row>
                    <Row>
                      <Col>
                        <p>
                          {Summa.sum_of_carship/12} руб. в месяц
                        </p>
                      </Col>
                      <Col>
                        <h6>
                          {Probeg/Summa.sum_of_carship} руб. за 1 км. пробега
                        </h6>
                      </Col>
                      
                    </Row>
                    {/* <Row className='d-flex justify-content-center'>
                      <p>Налог: {Summa.nalog } руб.</p>
                      <p>Топливо {Summa.toplivo} руб.</p>
                      <p>Итоговая стоимость {Summa.sum_of_carship} руб.</p>
                      <Chart
                          width={'500px'}
                          height={'300px'}
                          chartType="PieChart"
                          loader={<div>Loading Chart</div>}
                          data={chartData}
                          options={{
                            title: 'My Daily Activities',
                          }}
                          rootProps={{ 'data-testid': '1' }}
                        />
                      
                      
                    </Row> */}
                    <Row className='d-flex justify-content-center text-center'>
                      <p>Налог: {Summa.nalog } руб.</p>
                      <p>Топливо {Summa.toplivo} руб.</p>
                      <p>Итоговая стоимость {Summa.sum_of_carship} руб.</p>
                      <div style={{width: '50%'}}>
                        <ChartReact/>
                      </div>
                      
                    </Row>
                  </Container>

                 
                </div>
              </>
              
            )}
        </div></div>
        )}
        <Footer/>
    </div>
  );
}

export default Calculator;