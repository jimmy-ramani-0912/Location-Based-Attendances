import "./SpecificUserDetailEdit.scss";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const [SpecificUserDetailonEdit, setSpecificUserDetailonEdit] = useState([]);

  const [updatefile, setupdateFile] = useState("");
  const [updateusername, setupdateUsername] = useState("");
  const [updatename, setupdateName] = useState("");
  const [updateemail, setupdateEmail] = useState("");
  const [updatemobileNo, setupdateMobileNo] = useState("");
  const [updatepassword, SetupdatePassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/users/" + window.localStorage.getItem("userSpecificId"))
      .then((response) => {
        console.log(response.data.data.GetSpecificUser);
        setSpecificUserDetailonEdit(response.data.data.GetSpecificUser);
        // console.log(
        //   SpecificUserDetail.data.data+ "-----------------------------"
        // );
      })
      .catch((error) => {
        console.error(`Error:${error}`);
      });
  }, [SpecificUserDetailonEdit]);

  let Updateduser = {
    username: updateusername,
    name: updatename,
    mobileNo: updatemobileNo,
    email: updateemail,
    password: updatepassword,
  };

  let UpdateUser = (event) => {
    event.preventDefault();
    axios
      .put(
        "/api/users/" + window.localStorage.getItem("userSpecificId"),
        Updateduser
      )
      .then((response) => {
        if (response.data != null) {
          console.log(response.data);
          navigate({
            pathname: "/users/" + window.localStorage.getItem("userSpecificId"),
          });
        }
      })
      .catch((error) => {
        console.error(`Error:${error}`);
      });
  };

  let textChanged = (event) => {
    if (event.target.name === "updateusername") {
      setupdateUsername(event.target.value);
    } else if (event.target.name === "updateemail") {
      setupdateEmail(event.target.value);
    } else if (event.target.name === "updatemobileNo") {
      setupdateMobileNo(event.target.value);
    } else if (event.target.name === "updatepassword") {
      SetupdatePassword(event.target.value);    
    } else if (event.target.name === "updatename") {
      setupdateName(event.target.value);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Information of {SpecificUserDetailonEdit.name}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                updatefile
                  ? URL.createObjectURL(updatefile)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <div className="formInput">
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setupdateFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <form>
              {/* {inputs.map((input) => ( */}
              {/* <div className="formInput" key={input.id}> */}
              <div className="formInput">
                <label>Username</label>
                <input
                  type="text"
                  name="updateusername"
                  value={updateusername}
                  placeholder={SpecificUserDetailonEdit.username}
                  onChange={textChanged}
                />
              </div>
              <div className="formInput">
                <label>Name</label>
                <input
                  type="text"
                  name="updatename"
                  value={updatename}
                  placeholder={SpecificUserDetailonEdit.name}
                  onChange={textChanged}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  type="mail"
                  name="updateemail"
                  value={updateemail}
                  placeholder={SpecificUserDetailonEdit.email}
                  onChange={textChanged}
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  type="text"
                  name="updatemobileNo"
                  value={updatemobileNo}
                  placeholder={"+91 " + SpecificUserDetailonEdit.mobileNo}
                  onChange={textChanged}
                />
              </div>
              {/* <div className="formInput">
                <label>Old Password</label>
                <input
                  type="password"
                  name="oldpassword"
                  value={oldpassword}
                  placeholder="Old Password"
                //   onChange={textChanged}
                />
              </div> */}
              <div className="formInput">
                <label>Password</label>
                <input
                  type="password"
                  name="updatepassword"
                  value={updatepassword}
                  placeholder="New Password"
                  onChange={textChanged}
                />
              </div>
              {/* ))} */}
              <button onClick={UpdateUser}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
