import VerifyDetailsModel from "../Models/VerifyDetailsModel.js";

//post add verify Details
export const AddVeifyDetails = async (req, res, next) => {
  const AddVeifyDetail = new VerifyDetailsModel(req.body);

  try {
    const SavedAddVeifyDetail = await AddVeifyDetail.save();
    res.status(200).json({
      status: 200,
      message: "verify Details Added Successfully !!!",
      data: SavedAddVeifyDetail,
    });
    console.log("verify Details Added Successfully ! ❤️❤️❤️");
  } catch (error) {
    next(error);
  }
};

// get Verify Details
export const GetVeifyDetails = async (req, res, next) => {
  try {
    const GetVeifyDetails = await VerifyDetailsModel.findOne();
    //const hotels = await Hotel.findid("lskdjfklsj"); // For the testing of error ...
    res.status(200).json({
      status: 200,
      message: "GetVeifyDetails Get Successfully !!!",
      data: { GetVeifyDetails },
    });
    console.log("GetVeifyDetails Record Get Successfully ! 😊😊😊");
  } catch (error) {
    // res.status(500).json(error);
    next(error);
  }
};
