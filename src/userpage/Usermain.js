import React from 'react'
import PackageList from '../adminpage/PackageList';
import Localtitle from '../components/Localtitle';

import Userapp from '../components/Userapp'

const Usermain = () => {
  const username = localStorage.getItem("username");
  return (
    <div>
      <Userapp />
      <h1 style={{color:'#00235B'}}>Hi! Welcome {username}</h1 >
      <Localtitle />
     <PackageList />
    </div>
  )
}

export default Usermain
