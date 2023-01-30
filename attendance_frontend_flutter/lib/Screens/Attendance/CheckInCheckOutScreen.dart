import 'package:attendance_frontend_flutter/NodeJS_Api/Api.dart';
import 'package:attendance_frontend_flutter/NodeJS_Models/AttendanceModel.dart';
import 'package:attendance_frontend_flutter/NodeJS_Models/VerifyDetailModel.dart';
import 'package:flutter/material.dart';
import 'dart:async';
import 'package:network_info_plus/network_info_plus.dart';
import 'package:geolocator/geolocator.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:slide_to_act/slide_to_act.dart';

class CheckIn_Out extends StatefulWidget {
  const CheckIn_Out({Key? key}) : super(key: key);

  @override
  State<CheckIn_Out> createState() => _CheckIn_OutState();
}

class _CheckIn_OutState extends State<CheckIn_Out> {
  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

  Position? _currentPosition;

  double screenHeight = 0;
  double screenWidth = 0;

  var EmployeeID = "";

  String checkIn = "--/--";
  String checkOut = "--/--";

  // final info = NetworkInfo();

  Color primary = const Color(0xffeef444c);

  @override
  void initState() {
    super.initState();
    loadSettings();
    _getRecord();
    _postEmptydata();
    _getCurrentPosition();
  }

  loadSettings() async {
    final SharedPreferences prefs = await _prefs;
    setState(() {
      EmployeeID = (prefs.getString("EmployeeID"))!;
    });
  }

  Future<void> _getCurrentPosition() async {
    await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high)
        .then((Position position) {
      setState(() => _currentPosition = position);
      // _getAddressFromLatLng(_currentPosition!);
    }).catchError((e) {
      debugPrint(e);
    });
  }

  void _getRecord() async {
    try {
      final SharedPreferences prefs = await _prefs;
      AttendanceModel data = await GettingAttendance().Check();
      var length = data.data?.attendace?.getAttendance?.length;
      String? check_In = data
          .data?.attendace?.getAttendance![length!.toInt() - 1].checkIn
          .toString();
      String? check_Out = data
          .data?.attendace?.getAttendance![length!.toInt() - 1].checkOut
          .toString();

      String? TodayID = data
          .data?.attendace?.getAttendance![length!.toInt() - 1].sId
          .toString();
      prefs.setString("TodayID", TodayID!);

      setState(() {
        if (check_In.toString() != "--/--") {
          checkIn = check_In!;
        }
        if (check_Out.toString() != "--/--") {
          checkOut = check_Out!;
        }
        if (check_Out.toString() == "--/--" && check_In.toString() == "--/--") {
          checkIn = "--/--";
          checkOut = "--/--";
        }
      });
    } catch (e) {
      setState(() {
        checkIn = "--/--";
        checkOut = "--/--";
      });
    }
  }

  Future<void> _postEmptydata() async {
    try {
      AttendanceModel data = await GettingAttendance().Check();
      var length = data.data?.attendace?.getAttendance?.length;

      String? datefromdatabase = data
          .data?.attendace?.getAttendance![length!.toInt() - 1].date
          .toString();

      String datefromcurrent = DateTime.now().day.toString() +
          (DateFormat(' MMMM yyyy').format(DateTime.now())).toString();

      if (datefromdatabase.toString() != datefromcurrent.toString()
          // || (data.data?.attendace?.getAttendance)!.isEmpty
          ) {
        String Date = DateTime.now().day.toString() +
            (DateFormat(' MMMM yyyy').format(DateTime.now())).toString();
        String Month = DateTime.now().month.toString();
        String WeekDay = (DateFormat('EEEE').format(DateTime.now())).toString();
        String CheckOut = "--/--";
        String CheckIn = "--/--";

        final SharedPreferences prefs = await _prefs;

        AttendanceModel data = await PostingEmptyAttendance()
            .CheckIn(Month, WeekDay, CheckIn, CheckOut, Date);

        AttendanceModel data2 = await GettingAttendance().Check();
        var length = data2.data?.attendace?.getAttendance?.length;
        String? TodayID = data
            .data?.attendace?.getAttendance![length!.toInt() - 1].sId
            .toString();
        prefs.setString("TodayID", TodayID!);

        print("Empty Data Uploaded Successfully ...");
      } else
        print("Empty Data couldn't Uploaded Successfully ...");
    } catch (e) {}
  }

  @override
  Widget build(BuildContext context) {
    screenHeight = MediaQuery.of(context).size.height;
    screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
        body: SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          Container(
            alignment: Alignment.centerLeft,
            margin: const EdgeInsets.only(top: 32),
            child: Text(
              "Welcome",
              style: TextStyle(
                color: Colors.black54,
                fontFamily: "NexaRegular",
                fontSize: screenWidth / 20,
              ),
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            child: Text(
              "Employee " + EmployeeID,
              style: TextStyle(
                fontFamily: "NexaBold",
                fontSize: screenWidth / 18,
              ),
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            margin: const EdgeInsets.only(top: 32),
            child: Text(
              "Today's Status",
              style: TextStyle(
                fontFamily: "NexaBold",
                fontSize: screenWidth / 18,
              ),
            ),
          ),
          Container(
            margin: const EdgeInsets.only(top: 12, bottom: 32),
            height: 150,
            decoration: const BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black26,
                  blurRadius: 10,
                  offset: Offset(2, 2),
                ),
              ],
              borderRadius: BorderRadius.all(Radius.circular(20)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Expanded(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "Check In",
                        style: TextStyle(
                          fontFamily: "NexaRegular",
                          fontSize: screenWidth / 20,
                          color: Colors.black54,
                        ),
                      ),
                      Text(
                        checkIn,
                        style: TextStyle(
                          fontFamily: "NexaBold",
                          fontSize: screenWidth / 18,
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "Check Out",
                        style: TextStyle(
                          fontFamily: "NexaRegular",
                          fontSize: screenWidth / 20,
                          color: Colors.black54,
                        ),
                      ),
                      Text(
                        checkOut,
                        style: TextStyle(
                          fontFamily: "NexaBold",
                          fontSize: screenWidth / 18,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Container(
              alignment: Alignment.centerLeft,
              child: RichText(
                text: TextSpan(
                  text: DateTime.now().day.toString(),
                  style: TextStyle(
                    color: primary,
                    fontSize: screenWidth / 18,
                    fontFamily: "NexaBold",
                  ),
                  children: [
                    TextSpan(
                      text: DateFormat(' MMMM yyyy').format(DateTime.now()),
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: screenWidth / 20,
                        fontFamily: "NexaBold",
                      ),
                    ),
                  ],
                ),
              )),
          StreamBuilder(
            stream: Stream.periodic(const Duration(seconds: 1)),
            builder: (context, snapshot) {
              return Container(
                alignment: Alignment.centerLeft,
                child: Text(
                  DateFormat('hh:mm:ss a').format(DateTime.now()),
                  style: TextStyle(
                    fontFamily: "NexaRegular",
                    fontSize: screenWidth / 20,
                    color: Colors.black54,
                  ),
                ),
              );
            },
          ),
          checkOut == "--/--"
              ? Container(
                  margin: const EdgeInsets.only(top: 24, bottom: 12),
                  child: Builder(
                    builder: (context) {
                      final GlobalKey<SlideActionState> key = GlobalKey();

                      return SlideAction(
                        text: checkIn == "--/--"
                            ? "Slide to Check In"
                            : "Slide to Check Out",
                        textStyle: TextStyle(
                          color: Colors.black54,
                          fontSize: screenWidth / 20,
                          fontFamily: "NexaRegular",
                        ),
                        outerColor: Colors.white,
                        // innerColor:
                        // ,
                        key: key,
                        onSubmit: () async {
                          // var wifiIP = await info.getWifiIP();
                          // print(wifiIP.toString() + "-------------------------------------------");

                          //Retrive data from the api of verify latlong of office
                          VerifyDetailModel data =
                              await VerifyDetail().Verify_Detail();

                          var lat = data.data?.getVeifyDetails?.latitude;
                          var long = data.data?.getVeifyDetails?.longitude;

                          var radius = data.data?.getVeifyDetails?.radius;

                          final double distance = Geolocator.distanceBetween(
                              lat!.toDouble(),
                              long!.toDouble(),
                              (_currentPosition?.latitude)!.toDouble(),
                              (_currentPosition?.longitude)!.toDouble());

                          if (distance <= (radius)!.toDouble()) {
                            if (checkIn == "--/--") {
                              // final SharedPreferences prefs = await _prefs;

                              String CheckIn = (DateFormat('hh:mm:ss a')
                                      .format(DateTime.now()))
                                  .toString();

                              AttendanceModel data =
                                  await PuttingCheckinAttendance()
                                      .CheckIn(CheckIn);
                              print(
                                  "Valid for present for check In ................................");

                              if (data.status == 200) {
                                ScaffoldMessenger.of(context)
                                    .showSnackBar(const SnackBar(
                                  content: Text("Check In Successfully ..."),
                                  backgroundColor: Colors.red,
                                ));

                                setState(() {
                                  checkIn = CheckIn;
                                });
                              } else {
                                ScaffoldMessenger.of(context)
                                    .showSnackBar(const SnackBar(
                                  content: Text("Something Went Wrong ..."),
                                  backgroundColor: Colors.red,
                                ));
                              }
                            } else if (checkIn != "--/--" &&
                                checkOut == "--/--") {
                              String CheckOut = (DateFormat('hh:mm:ss a')
                                      .format(DateTime.now()))
                                  .toString();
                              AttendanceModel data =
                                  await PuttingCheckoutAttendance()
                                      .CheckOut(CheckOut);

                              if (data.status == 200) {
                                ScaffoldMessenger.of(context)
                                    .showSnackBar(const SnackBar(
                                  content: Text("Check Out Successfully ..."),
                                  backgroundColor: Colors.red,
                                ));
                                setState(() {
                                  checkOut = CheckOut;
                                });
                              } else {
                                ScaffoldMessenger.of(context)
                                    .showSnackBar(const SnackBar(
                                  content: Text("Something Went Wrong ..."),
                                  backgroundColor: Colors.red,
                                ));
                              }
                            }
                          } else {
                            ScaffoldMessenger.of(context)
                                .showSnackBar(const SnackBar(
                              content: Text("You Are Not In Valid Range ..."),
                              backgroundColor: Colors.red,
                            ));

                            key.currentState!.reset();
                          }
                        },
                      );
                    },
                  ),
                )
              : Container(
                  margin: const EdgeInsets.only(top: 32, bottom: 32),
                  child: Text(
                    "You have completed this day!",
                    style: TextStyle(
                      fontFamily: "NexaRegular",
                      fontSize: screenWidth / 20,
                      color: Colors.black54,
                    ),
                  ),
                ),

          // location != " " ? Text(
          //   "Location: " + location,
          // ) : const SizedBox(),

          // Scan QR

          // GestureDetector(
          //   onTap: () {
          //     // scanQRandCheck();
          //   },
          //   child: Container(
          //     height: screenWidth / 2,
          //     width: screenWidth / 2,
          //     decoration: BoxDecoration(
          //       color: Colors.white,
          //       borderRadius: BorderRadius.circular(20),
          //       boxShadow: const [
          //         BoxShadow(
          //           color: Colors.black26,
          //           offset: Offset(2, 2),
          //           blurRadius: 10,
          //         ),
          //       ],
          //     ),
          //     child: Column(
          //       mainAxisAlignment: MainAxisAlignment.center,
          //       crossAxisAlignment: CrossAxisAlignment.center,
          //       children: [
          //         Stack(
          //           alignment: Alignment.center,
          //           children: [
          //             Icon(
          //               FontAwesomeIcons.expand,
          //               size: 70,
          //               color: primary,
          //             ),
          //             Icon(
          //               FontAwesomeIcons.camera,
          //               size: 25,
          //               color: primary,
          //             ),
          //           ],
          //         ),
          //         Container(
          //           margin: const EdgeInsets.only(top: 8,),
          //           child: Text(
          //             checkIn == "--/--" ? "Scan to Check In" : "Scan to Check Out",
          //             style: TextStyle(
          //               fontFamily: "NexaRegular",
          //               fontSize: screenWidth / 20,
          //               color: Colors.black54,
          //             ),
          //           ),
          //         ),
          //       ],
          //     ),
          //   ),
          // ),
        ],
      ),
    ));
  }
}
