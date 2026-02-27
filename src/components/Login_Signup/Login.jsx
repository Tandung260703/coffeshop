import "./Login.css"
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {account} from "../../App.jsx"

const Login=()=>{
    const navigate=useNavigate()
    const [loginForm,setLoginForm]=useState({
        username:'',
        password:''
    })
    const [err,setErr]=useState('')
    const inputData=(e)=>{
        setLoginForm({...loginForm,[e.target.name]:e.target.value})
    }
    const checkExist=(e)=>{
        e.preventDefault()
        const getData=async()=>{
            const res=await fetch('http://localhost:4000')
            const data=await res.json()
            console.log(data)
        }
        getData()



        const checkUsername= account.findIndex(item=>item.username==loginForm.username)
        const checkPassword= account.findIndex(item=>item.password==loginForm.password)
        if(checkUsername!=-1 && checkPassword!=-1 && checkUsername===checkPassword){
            navigate('/')
        }else if(checkUsername!=-1 && checkPassword==-1){
            setErr('Sai mật khẩu')
        }else{
            setErr('Tài khoản không tồn tại.')
        }
        setLoginForm({
            username:"",
            password:""
        })
    }
    return(
        <div id="containerLogin" style={{ maxWidth: 600, margin: "50px auto"  }}>
            <h2>Đăng nhập</h2>
            <form onSubmit={checkExist}>
                <div className="inputField">
                    <label>Username:</label>
                    <input type="text" name="username" placeholder="Tên đăng nhâp" value={loginForm.username} onChange={(e)=>{inputData(e)}} />
                </div>

                <div className="inputField">
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="Mật khẩu" value={loginForm.password} onChange={(e)=>{inputData(e)}}/>
                </div>

                <button type='submit'>Đăng nhập</button>
            </form>
                <p style={{'color':'red'}}>{err.length>0?err:undefined}</p>
            <h5>Bạn chưa có tài khoản? <i><u id="navigateSignup" onClick={()=>{navigate('/signup')}}>Sign up</u></i></h5>
        </div>
    )

}

export default Login; 