import UsersModel from "../Models/UsersModel.js";

// delete
export const DeleteUser = async (req, res, next) => {
  try {
    const DeleteUser = await UsersModel.findByIdAndDelete(req.params.id); //{new: true} => showm new updated json format with new data
    res.status(200).json({
      status: 200,
      message: "Employee Record Deleted Successfully ! ⏰⏰⏰",
      data: { DeleteUser },
    });
    console.log("Employee Record Deleted Successfully ! ⏰⏰⏰");
  } catch (error) {
    next(error);
  }
};

// put
export const UpdateUser = async (req, res, next) => {
  try {
    const UpdateEmployee = await UsersModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ); //{new: true} => showm new updated json format with new data
    res.status(200).json({
      status: 200,
      message: "Employee Record updated Successfully ! ⏰⏰⏰",
      data: { UpdateEmployee },
    });
    console.log("Employee Record Updated Successfully ! 🥳🥳🥳");
  } catch (error) {
    next(error);
  }
};

// get specific
export const GetSpecificUser = async (req, res, next) => {
  try {
    const GetSpecificUser = await UsersModel.findById(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Get Specific Employee Record Successfully ! ⏰⏰⏰",
      data: { GetSpecificUser },
    });
    console.log("Get Specific Employee Record Successfully ! ⏰⏰⏰");
  } catch (error) {
    next(error);
  }
};

// get all users
export const GetAllUser = async (req, res, next) => {
  // const failed = true;
  // if (failed) {return next(createerror(401,"error"));}

  try {
    const Users = await UsersModel.find();
    //const Users = await User.findid("lskdjfklsj"); // For the testing of error ...
    res.status(200).json({
      status: 200,
      message: "Employee Record Get Successfully ! 😊😊😊",
      data: { Users },
    });
    console.log("Employee Record Get Successfully ! 😊😊😊");
  } catch (error) {
    // res.status(500).json(error);
    next(error);
  }
};
