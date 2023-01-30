import { request } from "express";
import AttendanceModel from "../Models/AttendanceModel.js";
import UsersModel from "../Models/UsersModel.js";

// Post
export const Attenance = async (req, res, next) => {
  const EmployeeuniqueId = req.params.employeeid;

  const EmployeeDetails = await UsersModel.findById(req.params.employeeid);
  const EmployeeID = EmployeeDetails.EmployeeID;
  const EmployeeName = EmployeeDetails.EmployeeName;

  const Attendance = new AttendanceModel({
    EmployeeID: EmployeeID,
    EmployeeName: EmployeeName,
    Date: req.body.Date,
    Month: req.body.Month,
    WeekDay: req.body.WeekDay,
    CheckIn: req.body.CheckIn,
    CheckOut: req.body.CheckOut,
  });

  try {
    const SavedAttendace = await Attendance.save();

    // try {
    //   await UsersModel.findByIdAndUpdate(EmployeeuniqueId, {
    //     // here we let/use Hotel model cuz  we add room into hotel particular hotel with hotelid
    //     $push: { Attendance: SavedAttendace }, // here push rooms into hotel
    //   });
    // } catch (errors) {
    //   next(errors);
    // }
    res.status(200).json({
      status: 200,
      message: "Attendace Filled Successfully !!!",
      data: { Attendace: SavedAttendace },
    });
    console.log("Attendace Filled Successfully ! ❤️❤️❤️");
  } catch (error) {
    next(error);
  }
};

// Put checkOut
export const AttenanceCheckOutCheckOut = async (req, res, next) => {
  try {
    const AttenanceCheckOutCheckOutUpdate =
      await AttendanceModel.findByIdAndUpdate(
        req.params.todayid,
        { $set: req.body },
        { new: true }
      ); //{new: true} => showm new updated json format with new data

    // try {
    //   // const AttendaceCheckOutUpdate = (
    //   //   await UsersModel.findById(req.params.employeeid)
    //   // ).Attendance.updateOne(
    //   //   { _id: req.params.employeeid, "Attendance._id": req.params.todayid },
    //   //   {
    //   //     $set: {
    //   //       "Attendance.$.CheckOut": req.body.CheckOut,
    //   //     },
    //   //   },
    //   //   { new: true }
    //   // );
    //   // res.status(200).json({
    //   //   status: 200,
    //   //   message: "CheckOut Updated Successfully !!!",
    //   //   data: { Attendace: AttendaceCheckOutUpdate },
    //   // });
    //   // console.log("CheckOut Updated Successfully! 🥳🥳🥳");
    //   // "-----------------------------------------------------------------------------------"
    //   const length = (await UsersModel.findById(req.params.employeeid))
    //     .Attendance.length;
    //   console.log(length + " ================================");
    //   for (let i = 0; i < length; i++) {
    //     console.log(
    //       (await UsersModel.findById(req.params.employeeid)).Attendance[i]._id +
    //         " [[[[[[[[[[[[[[[[[[[[[[[[["
    //     );
    //     console.log(req.params.todayid + " [[[[[[[[[[[[[[[[[[[[[[[[[");
    //     if (
    //       (await UsersModel.findById(req.params.employeeid)).Attendance[
    //         i
    //       ]._id.toString() == req.params.todayid.toString()
    //     ) {
    //       (await UsersModel.findById(req.params.employeeid)).Attendance.findByIdAndUpdate(
    //         req.params.todayid,
    //         {
    //           $set: {
    //             Month: req.body.Month,
    //             WeekDay: req.body.WeekDay,
    //             CheckIn: req.body.CheckIn,
    //             CheckOut: req.body.CheckOut,
    //             Date: req.body.Date,
    //           },
    //         },
    //         { new: true }
    //       );
    //       res.status(200).json({
    //         status: 200,
    //         message: "CheckOut Updated Successfully !!!",
    //         data: { Attendace: AttendaceCheckOutUpdate },
    //       });
    //       console.log("CheckOut Updated Successfully! 🥳🥳🥳");
    //     } else {
    //       console.log("No Id Matches ....");
    //     }
    //   }
    // } catch (error) {
    //   next(error);
    // }

    // try {
    //   const x =(await (await UsersModel.findById(req.params.employeeid)).Attendance.findById(req.params.todayid)).Date

    //   console.log(x + "-------------------")
    // } catch (error) {

    // }
    res.status(200).json({
      status: 200,
      message: "CheckOut / CheckIn Updated Successfully !!!",
      data: { Attendace: AttenanceCheckOutCheckOutUpdate },
    });
    console.log("CheckOut / CheckIn Updated Successfully! 🥳🥳🥳");
  } catch (error) {
    next(error);
  }
};

// Get specific Employee Attendace
export const GetSpecificEmployeeAttendace = async (req, res, next) => {
  try {
    const GetSpecificEmployeeAttendace = await UsersModel.findById(
      req.params.employeeid
    );
    const EmployeeID = (await UsersModel.findById(req.params.employeeid))
      .EmployeeID;
    const GetAttendance = await AttendanceModel.find({
      EmployeeID: EmployeeID,
    });   

    const GetEmployeeName = GetSpecificEmployeeAttendace.EmployeeName;
    res.status(200).json({
      status: 200,
      message: "Get Specific Employee Attendance Successfully !!!",
      data: { Attendace: { EmployeeName: GetEmployeeName, GetAttendance } },
    });

    // console.log(GetSpecificEmployeeAttendace.Attendance)
    console.log("Get Specific Employee Attendance Successfully ! 😊😊😊");
  } catch (error) {
    // res.status(500).json(error);
    next(error);
  }
};

// Get All Employee Attendance
export const GetAllEmployeeAttendace = async (req, res, next) => {
  try {
    const GetAllEmployeeAttendace = await AttendanceModel.find();
    res.status(200).json({
      status: 200,
      message: "Get All Employee Attendance Successfully !!!",
      data: { AllEmployeeAttendace: GetAllEmployeeAttendace },
    });
    console.log("Get Specific Employee Attendance Successfully ! 😊😊😊");
  } catch (error) {
    next(error);
  }
};
