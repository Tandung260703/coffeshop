import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {account} from "../../App.jsx"

const Signup = () => {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    name:"",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    // SDT:""
  });
  const [err, setErr] = useState('');

  const inputData = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    // console.log(signupForm)
    // console.log(signupForm)
  };
 const handleSubmit = (e) => {
  e.preventDefault();
  setErr(""); // clear lỗi trước

  if (signupForm.password !== signupForm.confirmPassword) {
    setErr("Retype Password is wrong!");
    alert("Mời bạn nhập lại");
    resetForm();
    return;
  }

  const exist = checkExist();
  if (!exist) {
    setErr("Tài khoản đã tồn tại")
    resetForm()
    return
  }else{
    postUser()
    resetForm()
  }
};
const postUser=()=>{
  const {confirmPassword,...userInfo}=signupForm
  console.log(confirmPassword)
  fetch("http://localhost:4000/api/users",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body: JSON.stringify(userInfo)
  })
  .then(res => res.json())
  .then(data => {
  if (data.message === "Lưu thành công") {
    resetForm()
    navigate("/login");
  } else {
    setErr(data.message);
  }
  })
  .catch((err) => {
    console.log(err)
  setErr("Lỗi kết nối server",err);
  });
}


const checkExist = () => {
  const found = account.find(
    info =>
      info.username === signupForm.username &&
      info.password === signupForm.password &&
      info.email === signupForm.email
  );

  if (found) {
    setErr("Tài khoản này đã tồn tại");
    resetForm();
    return false;
  }

  const sameUsername = account.find(
    (info) => info.username === signupForm.username
  );
  if (sameUsername) {
    setErr("Tên tài khoản đã được dùng");
    resetForm();
    return false;
  }

  return true;
};

const resetForm = () => {
  setSignupForm({
    name:"",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
};



  return (
    <div id="containerSigup" style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2>Đăng Kí</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputField">
          <label>Last & First Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            onChange={inputData}
            value={signupForm.name}
            required
          />
        </div>

        <div className="inputField">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Nhập tên đăng nhập"
            onChange={inputData}
            value={signupForm.username}
            required
          />
        </div>

        <div className="inputField">
          <label>password:</label>
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            onChange={inputData}
            value={signupForm.password}
            required
          />
        </div>

        <div className="inputField">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            onChange={inputData}
            value={signupForm.confirmPassword}
            required
          />
        </div>

        <div className="inputField">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="abcd@gmail.com"
            onChange={inputData}
            value={signupForm.email}
            required
          />
        </div>
        <button type="submit" >
          Đăng kí
        </button>
        <div style={{ color: "red" }}>{err?(<ul style={{"listStyleType":"none"}}>{err}</ul>) : undefined}</div>
      </form>
      <h5>Bạn đã có tài khoản?<i><u id="navigateLogin" onClick={()=>{navigate('/login')}}>Log in</u></i></h5>
    </div>
  );
};

export default Signup;
