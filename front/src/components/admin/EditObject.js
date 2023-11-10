import React from 'react'
import Header from '../Static/Header'
import AuthStore from '../MobX/AuthStore'
function EditObject() {
  return (
    <div className='bg-black text-light'>
      <Header Store={AuthStore} showOptionsAdmin={false} showBackAdmin={true}/>
      EditOblect
    </div>
  )
}

export default EditObject