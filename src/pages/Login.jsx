import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const { login } = useAuth();
    const navigate = useNavigate();    

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "password") {
            login('admin');
            navigate('/dashboard')  
        }else if (username === "doctor" && password === "password") {
            login('doctor');
            navigate('/')
        }else{
            alert('credenciales incorrectas')
        }      
    } 

  return (
    <main className='login__form'>
        <h1> Iniciar sesion</h1>
        <form onSubmit={handleLogin} className='form__container'>
            <label htmlFor="username">Usuario</label>
            <input id='username' name='username' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input id ='password' name='password' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit'>Iniciar sesion</button>
        </form>
    </main>
  )
}

export default Login