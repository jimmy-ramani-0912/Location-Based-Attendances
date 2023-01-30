import "./AddingUser.scss";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddingUser = ({ title }) => {
  const [file, setFile] = useState("");
  const [EmployeeID, setEmployeeID] = useState("");
  const [EmployeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, SetPassword] = useState("");

  const navigate = useNavigate();

  let user = {
    EmployeeID: EmployeeID,
    EmployeeName: EmployeeName,
    mobileNo: mobileNo,
    email: email,
    password: password,
  };

  let AddUser = (event) => {
    event.preventDefault();
    axios
      .post("/api/auth/register", user)
      .then((response) => {
        if (response.data != null) {
          console.log(response.data);
          navigate({
            pathname: "/users",
          });
        }
      })
      .catch((error) => {
        console.error(`Error:${error}`);
      });
  };

  let textChanged = (event) => {
    if (event.target.name === "EmployeeID") {
      setEmployeeID(event.target.value);
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "mobileNo") {
      setMobileNo(event.target.value);
    } else if (event.target.name === "password") {
      SetPassword(event.target.value);
    } else if (event.target.name === "EmployeeName") {
      setEmployeeName(event.target.value);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {/* {inputs.map((input) => ( */}
              {/* <div className="formInput" key={input.id}> */}
              <div className="formInput">
                <label>EmployeeID</label>
                <input
                  type="text"
                  name="EmployeeID"
                  value={EmployeeID}
                  placeholder="jim_my0915"
                  onChange={textChanged}
                />
              </div>
              <div className="formInput">
                <label>EmployeeName</label>
                <input
                  type="text"
                  name="EmployeeName"
                  value={EmployeeName}
                  placeholder="Jimmy Ramani"
                  onChange={textChanged}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  type="mail"
                  name="email"
                  value={email}
                  placeholder="jimmyprajapati33@gmail.com"
                  onChange={textChanged}
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  type="text"
                  name="mobileNo"
                  value={mobileNo}
                  placeholder="+91 72026929303"
                  onChange={textChanged}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="********"
                  onChange={textChanged}
                />
              </div>
              {/* ))} */}
              <button onClick={AddUser}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddingUser;
