import "./SpecificDetail.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SpecificUserDetail = () => {
  const [SpecificUserDetail, setSpecificUserDetail] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users/" + window.localStorage.getItem("userSpecificId"))
      .then((response) => {
        console.log(response.data);
        setSpecificUserDetail(response.data.data.GetSpecificUser);
        // console.log(
        //   SpecificUserDetail.data.data+ "-----------------------------"
        // );
      })
      .catch((error) => {
        console.error(`Error:${error}`);
      });
  }, [SpecificUserDetail]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link
              to={"/users/edit/" + window.localStorage.getItem("userSpecificId")}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                {window.localStorage.getItem("userSpecificId") ? (
                  <h1 className="itemTitle">{SpecificUserDetail.name}</h1>
                ) : (
                  <h1 className="itemTitle">" 😫 "</h1>
                )}
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  {window.localStorage.getItem("userSpecificId") ? (
                    <span className="itemValue">
                      {" "}
                      {SpecificUserDetail.email}
                    </span>
                  ) : (
                    <h1 className="itemValue">" 😫 "</h1>
                  )}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  {window.localStorage.getItem("userSpecificId") ? (
                    <span className="itemValue">
                      {SpecificUserDetail.mobileNo}
                    </span>
                  ) : (
                    <h1 className="itemValue">" 😫 "</h1>
                  )}
                </div>
                <div className="detailItem">
                  {/* <span className="itemKey">Tour Packages Booked:</span> */}
                  {/* <span>Rides Booked</span> */}
                  {window.localStorage.getItem("userSpecificId") ? (
                    <span className="itemValue">
                      {/* {SpecificUserDetail.TourPackageBooked} */}
                    </span>
                  ) : (
                    <h1 className="itemValue">" 😫 "</h1>
                  )}
                </div>
                <div className="detailItem">
                  {/* <span className="itemKey">Hotel Booked:</span> */}
                  {window.localStorage.getItem("userSpecificId") ? (
                    <span className="itemValue">
                      {SpecificUserDetail.HotelBooked}
                    </span>
                  ) : (
                    <h1 className="itemValue">" 😫 "</h1>
                  )}
                </div>
                <div className="detailItem">
                  {/* <span className="itemKey">Room Booked:</span> */}
                  {window.localStorage.getItem("userSpecificId") ? (
                    <span className="itemValue">
                      {SpecificUserDetail.RoomBooked}
                    </span>
                  ) : (
                    <h1 className="itemValue">" 😫 "</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        {/* <div className="bottom">
          <h1 className="title">Last Transactions ----- stattic data</h1>
          <List />
        </div> */}
      </div>
    </div>
  );
};

export default SpecificUserDetail;
