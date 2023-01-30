import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Widget = ({ type }) => {
  const [getusertotal, setusertotal] = useState([]);
  const [gettourstotal, settourstotal] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("/api/users")
      .then((response) => response.data)
      .then((data) => {
        setusertotal(data.data.Users);
      });
  };

  let data;
  switch (type) {
    case "users":
      data = {
        title: "Total Registered Accounts",
        total: getusertotal.length,
        isMoney: false,
        link: (
          <Link to="/users" style={{ textDecoration: "none" }}>
            <span className="link">View All Users</span>
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        total: "152311",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.total}
          {/* {data.isMoney && "$"} {amount} */}
        </span>
        <span className="link">{data.link}</span>
      </div>
      {/* <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div> */}
    </div>
  );
};

export default Widget;
