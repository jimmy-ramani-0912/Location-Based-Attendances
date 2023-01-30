import 'package:attendance_frontend_flutter/NodeJS_Api/Api.dart';
import 'package:attendance_frontend_flutter/NodeJS_Models/AttendanceModel.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:month_year_picker/month_year_picker.dart';

class AttendanceHistory extends StatefulWidget {
  const AttendanceHistory({Key? key}) : super(key: key);

  @override
  State<AttendanceHistory> createState() => _AttendanceHistoryState();
}

class _AttendanceHistoryState extends State<AttendanceHistory> {
  double screenHeight = 0;
  double screenWidth = 0;

  Color primary = const Color(0xffeef444c);

  String _month = DateFormat('MMMM').format(DateTime.now());

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
                "My Attendance",
                style: TextStyle(
                  fontFamily: "NexaBold",
                  fontSize: screenWidth / 18,
                ),
              ),
            ),
            Stack(
              children: [
                Container(
                  alignment: Alignment.centerLeft,
                  margin: const EdgeInsets.only(top: 32),
                  child: Text(
                    _month,
                    style: TextStyle(
                      fontFamily: "NexaBold",
                      fontSize: screenWidth / 18,
                    ),
                  ),
                ),
                Container(
                  alignment: Alignment.centerRight,
                  margin: const EdgeInsets.only(top: 32),
                  child: GestureDetector(
                    onTap: () async {
                      final month = await showMonthYearPicker(
                          context: context,
                          initialDate: DateTime.now(),
                          firstDate: DateTime(2022),
                          lastDate: DateTime(2099),
                          builder: (context, child) {
                            return Theme(
                              data: Theme.of(context).copyWith(
                                colorScheme: ColorScheme.light(
                                  primary: primary,
                                  secondary: primary,
                                  onSecondary: Colors.white,
                                ),
                                textButtonTheme: TextButtonThemeData(
                                  style: TextButton.styleFrom(
                                    primary: primary,
                                  ),
                                ),
                                textTheme: const TextTheme(
                                  headline4: TextStyle(
                                    fontFamily: "NexaBold",
                                  ),
                                  overline: TextStyle(
                                    fontFamily: "NexaBold",
                                  ),
                                  button: TextStyle(
                                    fontFamily: "NexaBold",
                                  ),
                                ),
                              ),
                              child: child!,
                            );
                          });

                      if (month != null) {
                        setState(() {
                          _month = DateFormat('MMMM').format(month);
                        });
                      }
                    },
                    child: Text(
                      "Pick a Month",
                      style: TextStyle(
                        fontFamily: "NexaBold",
                        fontSize: screenWidth / 18,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(
              height: screenHeight / 1.45,
              child: FutureBuilder<AttendanceModel>(
                future: GettingAttendance().Check(),
                builder: (context, snapshots) {
                  return (snapshots.hasData)
                      ? ListView.builder(
                          itemCount: snapshots
                              .data?.data?.attendace?.getAttendance?.length,
                          itemBuilder: (context, index) {
                            return (snapshots.data?.data?.attendace
                                        ?.getAttendance![index]?.month) ==
                                    _month.toString()
                                ? Container(
                                    margin: EdgeInsets.only(
                                        top: index > 0 ? 12 : 0,
                                        left: 6,
                                        right: 6),
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
                                      borderRadius: BorderRadius.all(
                                          Radius.circular(20)),
                                    ),
                                    child: Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: [
                                        Expanded(
                                          child: Container(
                                            margin: const EdgeInsets.only(),
                                            decoration: BoxDecoration(
                                              color: primary,
                                              borderRadius:
                                                  const BorderRadius.all(
                                                      Radius.circular(20)),
                                            ),
                                            child: Center(
                                              child: Text(
                                                // DateFormat('EE\ndd').format(snap[index]['date'].toDate())
                                                (snapshots
                                                        .data
                                                        ?.data
                                                        ?.attendace
                                                        ?.getAttendance![
                                                            index]
                                                        ?.month)
                                                    .toString(),
                                                style: TextStyle(
                                                  fontFamily: "NexaBold",
                                                  fontSize:
                                                      screenWidth / 18,
                                                  color: Colors.white,
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                        Expanded(
                                          child: Column(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            children: [
                                              Text(
                                                "Check In",
                                                style: TextStyle(
                                                  fontFamily: "NexaRegular",
                                                  fontSize:
                                                      screenWidth / 18,
                                                  color: Colors.black54,
                                                ),
                                              ),
                                              Text(
                                                (snapshots
                                                        .data
                                                        ?.data
                                                        ?.attendace
                                                        ?.getAttendance![
                                                            index]
                                                        ?.checkIn)
                                                    .toString(),
                                                style: TextStyle(
                                                  fontFamily: "NexaBold",
                                                  fontSize:
                                                      screenWidth / 22,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                        Expanded(
                                          child: Column(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            children: [
                                              Text(
                                                "Check Out",
                                                style: TextStyle(
                                                  fontFamily: "NexaRegular",
                                                  fontSize:
                                                      screenWidth / 18,
                                                  color: Colors.black54,
                                                ),
                                              ),
                                              Text(
                                                (snapshots
                                                        .data
                                                        ?.data
                                                        ?.attendace
                                                        ?.getAttendance![
                                                            index]
                                                        ?.checkOut)
                                                    .toString(),
                                                style: TextStyle(
                                                  fontFamily: "NexaBold",
                                                  fontSize:
                                                      screenWidth / 22,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  )
                                : const SizedBox();
                          })
                      : SizedBox();
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
