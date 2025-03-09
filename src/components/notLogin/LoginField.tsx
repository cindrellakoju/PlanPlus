import React from 'react'

const LoginField: React.FC = () => {
  return (
    <div className='loginfield'>
        <input type='text' id='user' placeholder='Enter your username'/>
        <input type='password' id='password' placeholder='Enter Your Password'/>
        <button>Send</button>
    </div>
  )
}

export default LoginField
