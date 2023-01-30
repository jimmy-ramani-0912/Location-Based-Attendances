import UsersModel from "../Models/UsersModel.js";
import bcrypt from "bcryptjs";
import { createerror } from "../Utils/Error.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Post new user account
export const Register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const HashPassword = bcrypt.hashSync(req.body.password, salt);

    const NewEmployee = new UsersModel({
      // here i don't write req.body directly cuz of it will not provide more security
      EmployeeID: req.body.EmployeeID,
      EmployeeName: req.body.EmployeeName,
      mobileNo: req.body.mobileNo,
      email: req.body.email,
      password: HashPassword,
      isAdmin: req.body.isAdmin,
    });

    // const token = jwt.sign(
    //   { id: NewUser._id, isAdmin: NewUser.isAdmin },
    //   process.env.JWT
    // );

    // res.cookie("access_token", token, {
    //   httpOnly: true, //this one not allowed to any access this cookie
    // });

    await NewEmployee.save();
    res.status(201).send({
      status: 201,
      message: "Employee Registered successfully! 😊😊😊",
      data: { NewEmployee },
    });
    //res.status(201).json(NewEmployee);
    console.log("Employee Registered successfully! 😊😊😊");
  } catch (error) {
    next(error);
  }
};

//post login user by post
export const Login = async (req, res, next) => {
  try {
    const GetUser = await UsersModel.findOne({ EmployeeID: req.body.EmployeeID });
    if (!GetUser) return next(createerror(404, "User Not Found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      GetUser.password
    );
    //Compare password which is written by the user and another one which is available in model/database
    if (!isPasswordCorrect)
      return next(
        createerror(405, "Password is Wrong and Please Try Again! 😫😫😫")
      );

    const token = jwt.sign(
      { id: GetUser._id, isAdmin: GetUser.isAdmin },
      process.env.JWT
    );
    // console.log(GetUser.isAdmin +"5555555654465466664444444444")
    const { password, isAdmin, ...otherDetails } = GetUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true, //this one not allowed to any access this cookie
      })
      .status(200)
      .json({status:200 , message:"Employee Logged In Successfully",data:{Access_token: token, details: { ...otherDetails }, isAdmin }});
    console.log("Employee Getting / Login successfully! 👌👌👌");
  } catch (error) {
    next(error);
  }
};

//Log Out
export const logout = async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "You Log Out Successfully" });
};

//post Reset Password
export const ResetPassword = async (req, res, next) => {
  // // Get user based on the token
  // const hashedToken = crypto
  //   .createHash("sha256")
  //   .update(req.params.token)
  //   .digest("hex");

  // const user = await UsersModel.findOne({
  //   passwordResetToken: hashedToken,
  //   passwordResetExpires: { $gt: Date.now() },
  // });
  // //If token has not expired, and there is user, set the new password
  // if (!user)
  //   return next(createerror(400, "Token is invalid or has expired! 😫😫😫"));

  // const salt = bcrypt.genSaltSync(10);
  // const HashPassword = bcrypt.hashSync(req.body.password, salt);
  // user.password = HashPassword;
  // // user.password = req.body.password;
  // user.passwordResetToken = undefined;
  // user.passwordResetExpires = undefined;
  // await user.save();

  // const token = jwt.sign(
  //   { id: user._id },
  //   process.env.JWT
  //   //{    expiresIn: process.env.JWT_EXPIRES_IN,  }
  // );
  // res.cookie("access_token", token, {
  //   // expires: new Date(
  //   //   Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   // ),
  //   httpOnly: true,
  //   //secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  // });
  // user.password = undefined;
  // res.status(200).json({
  //   status: 200,
  //   message: "Your Password Reset Successfully",
  //   token,
  //   data: { user },
  // });
  // console.log("Password Reset Successfully! 🥳🥳🥳");
};

// //post updatePassword user
// export const updatePassword = async (req, res, next) => {

//     const user = await User.findById(req.user._id).select("+password");
//     if (
//       !(await user.correctPassword(req.body.CurrentPassword, user.password))
//     ) {
//       return next(createerror(404, "Your current password is wrong! 😫😫😫"));
//     }

//     user.password = req.body.password;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT
//       //{    expiresIn: process.env.JWT_EXPIRES_IN,  }
//     );
//     res.cookie("access_token", token, {
//       // expires: new Date(
//       //   Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//       // ),
//       httpOnly: true,
//       secure: req.secure || req.headers["x-forwarded-proto"] === "https",
//     });
//     user.password = undefined;
//     res.status(200).json({
//       status: 200,
//       message: "Your Password Updated Successfully",
//       token,
//       data: { user },
//     });
//     console.log("Password Updated Successfully ! 🥳🥳🥳");
// };
