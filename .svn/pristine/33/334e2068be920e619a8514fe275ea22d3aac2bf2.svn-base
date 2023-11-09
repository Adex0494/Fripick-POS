import React, {useState, useContext, useEffect} from 'react'
import { Context } from './store/context';

import MainPage from './pages/mainPage/mainPage';
import Login from './pages/login';
import { postHttpAuthResponse } from './api/helper';


function App() {
  const theContext = useContext(Context)
  const [isReadingSessionStorage, setIsReadingSessionStorage] = useState(true)
  const isAuthenticated = !!(theContext.token && theContext.userId && theContext.providerId)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoginFail, setIsLoginFail] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

  const resetAuthentication = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('providerId')
    theContext.authenticate({token: undefined, userId: undefined, providerId: undefined})
  }

  useEffect(()=>{
    if (!isAuthenticated){
      const lcToken= sessionStorage.getItem('token')
      const lcUserId= sessionStorage.getItem('userId')
      const lcProviderId= sessionStorage.getItem('providerId')
      if(lcToken && lcUserId && lcProviderId){
        theContext.authenticate({token: lcToken, userId: lcUserId, providerId:lcProviderId})
      }
    }
    setIsReadingSessionStorage(false)
  }, [])

  const authenticationRequest = async (userName, password) => {
    const body = {
      userName,
      password
    }
    try{

      const response = await postHttpAuthResponse('authentication-service/users/loginPos', body)
      if (response.data?.success){
        const {token, userId, providerId} = response.data.userInfo
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('userId', userId)
        sessionStorage.setItem('providerId', providerId)
        theContext.authenticate({token, userId, providerId})
      }else{
        setIsLoginFail(true)
      }
    }
    catch(error){
      setOpenAlert(true)
    }

  }

  const loginHandler = async(userName, password) => {
    setIsLoading(true)
    setIsLoginFail(false)
    await authenticationRequest(userName, password)
    setIsLoading(false)
  }

  return isReadingSessionStorage ? <div/> : isAuthenticated ? 
    <MainPage resetAuthentication={resetAuthentication}/> :
    <Login loginHandler={loginHandler} isLoading={isLoading} isLoginFail={isLoginFail} 
    openAlert={openAlert} setOpenAlert={setOpenAlert}/> 
}

export default App;
