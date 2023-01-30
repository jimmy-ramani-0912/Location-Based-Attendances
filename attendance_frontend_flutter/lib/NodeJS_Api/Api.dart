import 'dart:convert';
import 'package:attendance_frontend_flutter/NodeJS_Models/AttendanceModel.dart';
import 'package:attendance_frontend_flutter/NodeJS_Models/LoginModel.dart';
import 'package:attendance_frontend_flutter/NodeJS_Models/VerifyDetailModel.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

String URL = "http://192.168.0.106:5000/";

///1 LogIN
class LogIN {
  LogIN();
  Future<LoginModel> Log_In(EmployeeID, password) async {
    var url = URL + "api/auth/login";
    http.Response response = await http.post(Uri.parse(url),
        headers: {"content-type": "application/json"},
        body: json.encode({
          "EmployeeID": EmployeeID,
          "password": password,
        }));
    var data = json.decode(response.body);
    print("Employee Logged In Successfully${response.body}");
    return LoginModel.fromJson(data);
  }
}

///2 Retrive Data Of Verify Details
class VerifyDetail {
  VerifyDetail();

  Future<VerifyDetailModel> Verify_Detail() async {
    final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();
    final SharedPreferences prefs = await _prefs;
    var url = URL + "api/addverifydetail";
    http.Response response = await http.get(Uri.parse(url), headers: {
      'Content-Type': 'application/json',
      'Cookie': "access_token=${prefs.getString("Token")}"
    });
    var data = json.decode(response.body);
    print("VerifyDetail" + response.body);
    return VerifyDetailModel.fromJson(data);
  }
}

///3 Posting Empty Attendance of Employee
class PostingEmptyAttendance {
  PostingEmptyAttendance();
  Future<AttendanceModel> CheckIn(
      Month, WeekDay, CheckIn, CheckOut, Date) async {
    final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();
    final SharedPreferences prefs = await _prefs;
    var url =
        URL + "api/attendace/" + prefs.getString("EmployeeUniqID").toString();

    http.Response response = await http.post(Uri.parse(url),
        headers: {
          "content-type": "application/json",
          'Cookie': "access_token=${prefs.getString("Token")}"
        },
        body: json.encode({
          "Month": Month,
          "WeekDay": WeekDay,
          "CheckIn": CheckIn,
          "CheckOut": CheckOut,
          "Date": Date,
        }));
    var data = json.decode(response.body);
    print("Employee Today's Empty Attendance Added Successfully${response.body}");
    return AttendanceModel.fromJson(data);
  }
}

///3 Putting Attendance of Employee (CheckIn)
class PuttingCheckinAttendance {
  PuttingCheckinAttendance();
  Future<AttendanceModel> CheckIn(CheckIn) async {
    final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();
    final SharedPreferences prefs = await _prefs;
    var url = URL +
        "api/attendace/" +
        prefs.getString("EmployeeUniqID").toString() +
        "/" +
        prefs.getString("TodayID").toString();
    http.Response response = await http.put(Uri.parse(url),
        headers: {
          "content-type": "application/json",
          'Cookie': "access_token=${prefs.getString("Token")}"
        },
        body: json.encode({
          "CheckIn": CheckIn,
        }));
    var data = json.decode(response.body);
    print("Employee Check In Successfully${response.body}");
    return AttendanceModel.fromJson(data);
  }
}

///4 Puting Attendance of Employee (CheckOut)
class PuttingCheckoutAttendance {
  PuttingCheckoutAttendance();
  Future<AttendanceModel> CheckOut(CheckOut) async {
    final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();
    final SharedPreferences prefs = await _prefs;
    var url = URL +
        "api/attendace/" +
        prefs.getString("EmployeeUniqID").toString() +
        "/" +
        prefs.getString("TodayID").toString();
    http.Response response = await http.put(Uri.parse(url),
        headers: {
          "content-type": "application/json",
          'Cookie': "access_token=${prefs.getString("Token")}"
        },
        body: json.encode({
          "CheckOut": CheckOut,
          // "Month": prefs.getString("Month").toString(),
          // "WeekDay": prefs.getString("WeekDay").toString(),
          // "CheckIn": prefs.getString("CheckIn").toString(),
          // "Date": prefs.getString("Date").toString(),
          // "CheckOut": CheckOut,
        }));
    var data = json.decode(response.body);
    print("Employee Check Out Successfully${response.body}");
    return AttendanceModel.fromJson(data);
  }
}

///5 Getting Attendance of Specifc Employee
class GettingAttendance {
  GettingAttendance();
  Future<AttendanceModel> Check() async {
    final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();
    final SharedPreferences prefs = await _prefs;
    var url =
        URL + "api/attendace/" + prefs.getString("EmployeeUniqID").toString();
    http.Response response = await http.get(Uri.parse(url), headers: {
      "content-type": "application/json",
      'Cookie': "access_token=${prefs.getString("Token")}"
    });

    var data = json.decode(response.body);
    print("Employee Attendace ${response.body}");
    return AttendanceModel.fromJson(data);
  }
}
