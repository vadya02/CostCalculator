// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { Link} from 'react-router-dom';
import AuthStore from '../MobX/AuthStore';
import Image from 'react-bootstrap/Image';
import { observer } from 'mobx-react';
import Footer from '../Static/Footer';
import { Container, Row, Button } from 'react-bootstrap';
import Header from '../Static/Header';
import CalculatorStore from '../Calculator/CalculatorStore';
// eslint-disable-next-line no-unused-vars
const AboutCar = observer(({Store, CarDescriptionStore, Description, image_1, image_2,image_3}) =>{

  function handleCountSum (){
    CalculatorStore.updateMarka(CalculatorStore.Marka) 
    CalculatorStore.updateModel(CalculatorStore.Model) 
  }
  return (
    
    <div style={{backgroundColor:'black'}}>
      
      <Header Store={AuthStore} showOptions={false} showBackList={true}/>
        <Container>
          <Row style={{padding: '60px'}}>
            <Image src={CarDescriptionStore.SalonImage} fluid className="rounded mx-auto"/>
          </Row>
          <Row>
            <p className='bg-black text-light'>{CarDescriptionStore.CarDescription}</p>
          </Row>
          <Row className='justify-content-center' style={{padding: '30px'}}>
            <Button style={{width: '300px'}} onClick={handleCountSum()}>
              <Link style={{color: 'white', textDecoration: "none", width: '300px'}} to='/Calculator' id='navbarNav' className='nav-item'>Рассчитать стоимость владения</Link>
            </Button>
          </Row>


        </Container>
      <Footer/>
      
      
    </div>

  );
})

export default AboutCar;