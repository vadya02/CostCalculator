import React from 'react'
import Header from '../Static/Header'
import AuthStore from '../MobX/AuthStore'
function AddObject() {
  return (

    <div className='bg-black text-light'>
      <Header Store={AuthStore} showOptionsAdmin={false} showBackAdmin={true}/>
      AddObject
    </div>
  )
}

export default AddObject