// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
import CountSum from './CountSum';
import AuthStore from './AuthStore';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
function Calculator( {Store} ) {
    const [Probeg, setProbeg] = useState(0);
    const [Rashod, setRashod] = useState(0);
    const [FuelPrice, setFuelPrice] = useState(0);
    const [year, setYear] = useState(0);
    const [Modification_id, setModification_id] = useState(0);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
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
      storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        Store.login();
      }
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
    const handleCheckSumChange = () => {
      setcheckSum(true);
    }
    const handleSumView =() =>{
      return <CountSum/>
    }
    //получение списка марок авто
    function handleMarkaGet (selectedBrand) {
      // const selectedBrand = event.target.value;
      // setSelectedBrand(selectedBrand);
      // const selectedBrand=e.target.value;
      setBrand(selectedBrand);
      console.log(brand)
      // axios
      //   // .get(`/api/models?brand=${selectedBrand}`)
      //   .get(`http://localhost:8000/brands`, {
      //     headers: {
      //       'Access-Control-Allow-Origin': 'http://localhost:3000', // Замените на адрес вашего фронтенда
      //       // Другие заголовки, если необходимо
      //     }
      //   })
        axios({
          method: 'get',
          // url: 'https://chatbot.ext.lomger.tech/auth/users/',
          url: 'http://127.0.0.1:8000/brands',
          headers: {'Access-Control-Allow-Origin': 'http://localhost:3000',}
        })
        .then((response) => {
          response.json()
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
          response.json()
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
        // body: JSON.stringify({
        //   brand: brand
        // }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

      })
      .then(response => {
        response.json()
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
        response.json()
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
        // setModificationList(response.data)
        console.log(response.data);
      })
      .catch(error => {
        // Обработка ошибки
        console.error(error);
      });
  }
  
  return (
    <div className="">
        <Header Store={AuthStore} showOptions={true}/>
        <div className='container text-center p-5' >
            <div className='row justify-content-center' >
                <h5 className='col-md-3' style={{marginRight: '10px', width: '30%'}}>Марка автомобиля</h5>
                <select  className="form-select" style={{width: '30%'}} onChange={(e) => {handleBrandChange(e.target.value);console.log(e.target.value); handleModelsView(e.target.value)}}>
                <option value="">Выберите марку автомобиля</option>
                    {BrandList &&
                    BrandList.map((brand) => (
                        <option key={brand} value={brand}>
                        {brand}
                        </option>
                    ))}
                </select>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{marginRight: '10px', width: '30%'}}>Модель автомобиля</h5>
                <select className="form-select" style={{width: '30%'}} onChange={(e) => {handleModelChange(e.target.value); handleModificationView(e.target.value)}}>
                <option value="">Выберите модель автомобиля</option>
                
                {ModelList &&
                  ModelList.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{marginRight: '10px', width: '30%'}}>Модификация</h5>
                <select className="form-select" style={{width: '30%'}} onChange={(e) => {handleModificationIdChange(e.target.value); console.log(e.target.value)}}>
                <option value="">Выберите модификацию автомобиля</option>
                
                {ModificatioinList &&
                  ModificatioinList.map((modification) => (
                    <option key={modification.id} value={modification.id}>
                      {modification.Power} л.с. {modification.Capacity_of_engine} куб.мл.
                    </option>
                  ))}
                </select>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{marginRight: '10px', width: '30%'}}>Выберите регион</h5>
                <select className="form-select" style={{width: '30%'}} onChange={(e) => {handleRegionChange(e.target.value); console.log(e.target.value)}}>
                <option value="">Выберите регион</option>
                
                {RegionList&&
                  RegionList.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.Nazvanie_regiona} 
                    </option>
                  ))}
                </select>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{marginRight: '10px', width: '30%'}}>Годовой пробег</h5>
                <input type="number" class="form-control" style={{width: '30%'}} id="exampleInput" placeholder="Введите годовой пробег" onChange={(e)=>handleProbegChange(e.target.value)}></input>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{marginRight: '10px', width: '30%'}}>Цена топлива</h5>
                <input type="number" class="form-control" style={{width: '30%'}} id="exampleInput" placeholder="Введите цену топлива" onChange={(e)=>handleCostChange(e.target.value)}></input>
            </div>
            <div className='row justify-content-center' style={{padding: '10px', display: 'flex'}}>
                <h5 style={{marginRight: '10px', width: '30%'}}>Расход топлива</h5>
                <input type="number" class="form-control" style={{width: '30%'}} id="exampleInput" placeholder="Введите расход топлива" onChange={(e)=>handleRashodChange(e.target.value)}></input>
            </div>
            <div className='container d-flex justify-content-center align-items-center' style={{padding: '10px', display: 'flex'}}>
                <button className='btn btn-primary' onClick={() => {
                  handleRegionChange(Region);
                  handleCountSum(Modification_id, Probeg, Region, Rashod, FuelPrice)
                  handleCheckSumChange()
                  
                  console.log(Region)
                }}>Рассчитать</button>
            </div>
            {checkSum &&(
              <>
                {/* <CountSum nalog={Probeg} toplivo={Rashod} summa={10}/> */}
                <div className="">
                  <div className='container'>
                      <p>Налог: {Summa.nalog }</p>
                      <p>Топливо {Summa.toplivo}</p>
                      <p>Итоговая стоимость {Summa.sum_of_carship}</p>
                  </div>
                  

              </div>
              </>
              
            )}
        </div>
    </div>
  );
}

export default Calculator;