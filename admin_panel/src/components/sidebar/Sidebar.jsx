import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import HotelIcon from "@mui/icons-material/Hotel";
import LivingIcon from "@mui/icons-material/Living";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import SystemSecurityUpdateGoodIcon from "@mui/icons-material/SystemSecurityUpdateGood";
import PsychologyIcon from "@mui/icons-material/Psychology";
import axios from "axios";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import BusinessIcon from '@mui/icons-material/Business';
import AssistantIcon from '@mui/icons-material/Assistant';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const navigate = useNavigate();

  const LogOut = () => {
    axios
      .get("/api/auth/logout/" + localStorage.getItem("token"))
      .then((response) => response.data);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate({
      pathname: "/login",
    });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ADMIN</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="" style={{ textDecoration: "none" }}>
            <li>
              <InsertChartIcon className="icon" />
              <span>Attendances</span>
            </li>
          </Link>
          <Link to="/complain" style={{ textDecoration: "none" }}>
            <li>
              <AssistantIcon className="icon" />
              {/* <span>Booked Rooms</span> */}
              <span>Complaints</span>
            </li>
          </Link>
          <Link to="/suggestion" style={{ textDecoration: "none" }}>
            <li>
              <AssistantIcon className="icon" />
              {/* <span>Booked Rooms</span> */}
              <span>Suggestions</span>
            </li>
          </Link>

          <Link to="/transactions" style={{ textDecoration: "none" }}>
            <li>
              <PaidRoundedIcon className="icon" />
              <span>Transactions</span>
            </li>
          </Link>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Status</span>
          </li>
          <li>
            <CircleNotificationsIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICES</p>
          <li>
            <SettingsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleIcon className="icon" />
            <span>Profile</span>
          </li>
          {window.localStorage.getItem("token") ? (
            <li onClick={LogOut}>
              <LogoutIcon className="icon" />
              <span>Log Out</span>
            </li>
          ) : (
            <Navigate to="/login" />
          )}
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;

// const Sidebar = () => {
//   const { dispatch } = useContext(DarkModeContext);
//   return (
//     <div className="sidebar">
//       <div className="top">
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <span className="logo">lamadmin</span>
//         </Link>
//       </div>
//       <hr />
//       <div className="center">
//         <ul>
//           <p className="title">MAIN</p>
//           <li>
//             <DashboardIcon className="icon" />
//             <span>Dashboard</span>
//           </li>
//           <p className="title">LISTS</p>
//           <Link to="/users" style={{ textDecoration: "none" }}>
//             <li>
//               <PersonOutlineIcon className="icon" />
//               <span>Users</span>
//             </li>
//           </Link>
//           <Link to="/products" style={{ textDecoration: "none" }}>
//             <li>
//               <StoreIcon className="icon" />
//               <span>Products</span>
//             </li>
//           </Link>
//           <li>
//             <CreditCardIcon className="icon" />
//             <span>Orders</span>
//           </li>
//           <li>
//             <LocalShippingIcon className="icon" />
//             <span>Delivery</span>
//           </li>
//           <p className="title">USEFUL</p>
//           <li>
//             <InsertChartIcon className="icon" />
//             <span>Stats</span>
//           </li>
//           <li>
//             <NotificationsNoneIcon className="icon" />
//             <span>Notifications</span>
//           </li>
//           <p className="title">SERVICE</p>
//           <li>
//             <SettingsSystemDaydreamOutlinedIcon className="icon" />
//             <span>System Health</span>
//           </li>
//           <li>
//             <PsychologyOutlinedIcon className="icon" />
//             <span>Logs</span>
//           </li>
//           <li>
//             <SettingsApplicationsIcon className="icon" />
//             <span>Settings</span>
//           </li>
//           <p className="title">USER</p>
//           <li>
//             <AccountCircleOutlinedIcon className="icon" />
//             <span>Profile</span>
//           </li>
//           <li>
//             <ExitToAppIcon className="icon" />
//             <span>Logout</span>
//           </li>
//         </ul>
//       </div>
//       <div className="bottom">
//         <div
//           className="colorOption"
//           onClick={() => dispatch({ type: "LIGHT" })}
//         ></div>
//         <div
//           className="colorOption"
//           onClick={() => dispatch({ type: "DARK" })}
//         ></div>
//       </div>
//     </div>
//   );
// };
