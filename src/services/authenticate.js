const authenticated = ()=>{
  if(localStorage.getItem('token')){
    return true
  }
  else{
    return false
  }
}

export {authenticated}