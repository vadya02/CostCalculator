import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Footer from '../Static/Footer';
import Header from '../Static/Header';
import ChartReact from '../etc/ChartReact';
import AuthStore from '../MobX/AuthStore';
import CalculatorStore from './CalculatorStore';
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
import { type } from '@testing-library/user-event/dist/type';
// Chart.register(category);
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
function Calculator( {Store} ) {
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
    const data = {
      labels: ['Налог', 'Топливо'],
      
      datasets: [
          {
            label: 'Стоимость владения',
            // data: data_chart,
            data: [CarDescriptionStore.Nalog, CarDescriptionStore.Toplivo],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            
          },
        ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 26,
              
               // Укажите желаемый размер шрифта
            },
            
          },
        },
      },
    };
    var storedToken = localStorage.getItem('authToken');
    let navigate = useNavigate();
    useEffect(() => {
      handleRegionGet();
      handleMarkaGet();
      handleModelsView();
      handleModificationView();
      
      console.log('Хук useState Calculator.js отработал' )
      // setcheckSum(false)
      storedToken = localStorage.getItem('authToken');
      setErrorCount(false)
      if (storedToken) {
        Store.login();
      }
      setShowCalculator(Store.isAuthenticated)
    }, []);
    
    const handleProbegChange = (probeg) => {
      setProbeg(probeg);
      CalculatorStore.updateProbeg(probeg)
      console.log('текущий пробег: ' + CalculatorStore.Probeg)
    }
    const handleRashodChange = (rashod) => {
      setRashod(rashod);
      CalculatorStore.updateExpenditureOfFuel(rashod)
      console.log('текущий расход топлива: ' + CalculatorStore.Expenditure_Of_Fuel)
    }
    const handleCostChange = (cost) => {
      setFuelPrice(cost);
      CalculatorStore.updateCostOfFuel(cost)
      console.log('текущая стоимость топлива: ' + CalculatorStore.Cost_Of_Fuel)
    }
    const handleBrandChange = (selectedBrand) => {
      setBrand(selectedBrand);
      CalculatorStore.updateMarka(selectedBrand)
      console.log('текущая марка: ' + CalculatorStore.Marka)
    }
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
    };
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
    };

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
    const handleModificationView = (model) => {
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


    // const handleCountSum = (modification_id, probeg, region, rashod, cost) =>{
    //   console.log('регион '+region)
    //   if (probeg == 0 || rashod ==0 || cost == 0){
    //     setErrorCount(true)
    //   }
    //   else
    //   {
    //     const token = storedToken;
    //     axios.get('http://127.0.0.1:8000/cost_of_carship/', { 
    //         method: 'GET',
    //         params: {
    //           Region: region,
    //           Probeg: probeg,
    //           Modification: modification_id,
    //           Rashod_topliva: rashod,
    //           Cost_of_fuel: cost
    //         },
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8",
    //             // 'Authorization': `Bearer ${token}`  // Передача токена в заголовках
    //             'Authorization': `Token ${token}`
    //         }
    //       })
    //       .then(response => {
    //         setSumma(response.data)
    //         CarDescriptionStore.updateNalog(response.data.nalog)
    //         CarDescriptionStore.updateToplivo(response.data.toplivo)    
    //         console.log('Текущий налог: ' + CarDescriptionStore.Nalog)
    //         console.log('Текущая стоимость топлива: ' + CarDescriptionStore.Toplivo)
    //         setcheckSum(false);
    //         // setErrorCount(true)
    //       })
    //       .catch(error => {
    //         console.error(error);
    //         setErrorCount(true)
    //       });}
    // }
  
    const handleCountSum = (modification_id, probeg, region, rashod, cost) =>{
      if (CalculatorStore.Probeg == 0 || CalculatorStore.Expenditure_Of_Fuel ==0 || CalculatorStore.Cost_Of_Fuel == 0){
        setErrorCount(true)
      }
      else
      {
        const token = storedToken;
        axios.get('http://127.0.0.1:8000/cost_of_carship/', { 
            method: 'GET',
            params: {
              Region: CalculatorStore.Region,
              Probeg: CalculatorStore.Probeg,
              Modification: CalculatorStore.Modification,
              Rashod_topliva: CalculatorStore.Expenditure_Of_Fuel,
              Cost_of_fuel: CalculatorStore.Cost_Of_Fuel
            },
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                // 'Authorization': `Bearer ${token}`  // Передача токена в заголовках
                'Authorization': `Token ${token}`
            }
          })
          .then(response => {
            setSumma(response.data)
            CalculatorStore.updateSumma(response.data.sum_of_carship)
            CarDescriptionStore.updateNalog(response.data.nalog)
            CarDescriptionStore.updateToplivo(response.data.toplivo)    
            console.log('Текущий налог: ' + CarDescriptionStore.Nalog)
            console.log('Текущая стоимость топлива: ' + CarDescriptionStore.Toplivo)
            setcheckSum(true);
            setErrorCount(false)
            // setErrorCount(true)
          })
          .catch(error => {
            console.error(error);
            setErrorCount(true)
          });}
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
      // if (Number.isInteger(id)){
      //   let s1 =  ModificatioinList[id].Power
      //   let s2 = ModificatioinList[id].Capacity_of_engine
      //   console.log('модификация: ' + s1 + s2)
      //   return s1 + ' ' + s2
      // }

    }

    function getNameOfRegion(id){
      try{
        let s1 = RegionList[id-1].Nazvanie_regiona
        return s1
      }
      catch{
        // alert("параметр региона не число")
        console.error();
        return CalculatorStore.Region
      }
      // if (Number.isInteger(id)){
      //   let s1 =  RegionList[id].Nazvanie_regiona
      //   return s1
      // }
      // else{
      //   return CalculatorStore.Region
      // } 
    }
    

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
        <div className='container text-center p-5' >

            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}} >
                <h5 className='col-md-3' style={{width: '30%', textAlign: 'left'}}>Марка автомобиля</h5>
                <select  className="form-select" style={{width: '30%'}} onChange={(e) => {
                  handleBrandChange(e.target.value);
                  console.log(e.target.value); 
                  handleModelsView(e.target.value)
                }}>
                <option value={CalculatorStore.Marka}>{CalculatorStore.Marka}</option>
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
                <select className="form-select" style={{width: '30%'}} onChange={(e) => {
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
            </div>
            <div className='row justify-content-center ml-autoы' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{width: '30%', textAlign: 'left'}}>Модификация</h5>
                <select className="form-select" style={{width: '30%'}} onChange={(e) => {
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
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{width: '30%', textAlign: 'left'}}>Выберите регион</h5>
                <select className="form-select" style={{width: '30%'}} onChange={(e) => {
                  handleRegionChange(e.target.value);
                  CalculatorStore.updateRegion(e.target.value)
                  console.log('Текущий регион: ' + RegionList[e.target.value-1].Nazvanie_regiona)
                }}>
                <option value={CalculatorStore.Region}>{getNameOfRegion(parseInt(CalculatorStore.Region))}</option>
                
                {RegionList&&
                  RegionList.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.Nazvanie_regiona} 
                    </option>
                  ))}
                </select>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{ width: '30%', textAlign: 'left'}}>Годовой пробег (км.)</h5>
                <input 
                  type="number" 
                  value={CalculatorStore.Probeg}
                  class="form-control" 
                  style={{width: '30%'}} 
                  id="exampleInput" 
                  placeholder="" 
                  onChange={(e)=>
                    {handleProbegChange(e.target.value)}
                  }></input>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{ width: '30%', textAlign: 'left'}}>Цена топлива (руб.)</h5>
                <input 
                  type="number" 
                  value={CalculatorStore.Cost_Of_Fuel}
                  class="form-control" 
                  style={{width: '30%'}} 
                  id="exampleInput" 
                  placeholder="" 
                  onChange={(e)=>
                    {handleCostChange(e.target.value)}
                  }></input>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{width: '30%', textAlign: 'left'}}>Расход топлива (л./100 км.)</h5>
                <input 
                  type="number" 
                  value={CalculatorStore.Expenditure_Of_Fuel}
                  class="form-control" 
                  style={{width: '30%'}} 
                  id="exampleInput" 
                  placeholder="" 
                  onChange={(e)=>{
                    handleRashodChange(e.target.value)
                }}></input>
            </div>
            <div className='container d-flex justify-content-center align-items-center' style={{padding: '10px', display: 'flex'}}>
                <button className='btn btn-primary' onClick={() => {
                    // handleRegionChange(Region);
                    handleCountSum(Modification_id, Probeg, Region, Rashod, FuelPrice)
                    // handleCheckSumChange()
                    setRender(CalculatorStore.Cost_Of_Fuel)
                    console.log(Region)
                  }}>Рассчитать
                </button>
            </div>
            {/* <button className='btn btn-primary' onClick={() => {
                    CalculatorStore.Marka = ''
                    CalculatorStore.Model = ''
                    CalculatorStore.Cost_Of_Fuel = ''
                    CalculatorStore.Expenditure_Of_Fuel = ''
                    CalculatorStore.Modification = ''
                    CalculatorStore.Probeg = ''
                    CalculatorStore.Region = ''
                  }}>Очистить поля
                </button> */}
            {errorCount&&(
              <p style={{color: 'red'}}>Заполните все поля</p>
            )}
            {checkSum &&(
              <>
                {/* <CountSum nalog={Probeg} toplivo={Rashod} summa={10}/> */}
                <div className="container text-center" style={{paddingTop: '50px'}}>
                  <Container className="text-center">
                    <Row className="text-center" style={{padding: '50px'}}>
                      <Row >
                        <Col>
                          {CalculatorStore.Marka} {CalculatorStore.Model}, {getNameOfModification(CalculatorStore.Modification)}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          Пробег: {CalculatorStore.Probeg}        
                        </Col>
                        <Col>
                          Регион эксплуатации: {getNameOfRegion(CalculatorStore.Region)}        
                        </Col>
                      </Row>
                    </Row>
                    <Row>
                      <Col>
                          <Row className='justify-content-center text-center'>
                            <ChartReact render={render} data = {data} options={options}/>
                          </Row>
                          
                          <Row className='d-flex justify-content-center text-center'>
                            <p>Налог: {CarDescriptionStore.Nalog } руб.</p>
                            <p>Топливо: {CarDescriptionStore.Toplivo} руб.</p>
                            {/* <p>Итоговая стоимость {Summa.sum_of_carship} руб.</p> */}    
                          </Row>
                      </Col>
                      <Col >
                        <p >
                          <h2 style={{color: '#0D6EFD'}}>{(CalculatorStore.Probeg/Summa.sum_of_carship).toFixed(2)} руб.</h2> <h6>за 1 км. пробега</h6>
                        </p>
                        <p>
                          <h2 style={{color: '#0D6EFD'}}>{(Summa.sum_of_carship/12).toFixed(2)} руб.</h2> в месяц
                        </p>
                        <p className='fw-normal'>
                          <h1 style={{color: '#0D6EFD'}}><b>{Summa.sum_of_carship}</b> руб. </h1>Полная сумма владения за 1 год
                        </p>
                      </Col>
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