// class AttendanceModel {
//   int? status;
//   String? message;
//   Data? data;
//
//   AttendanceModel({this.status, this.message, this.data});
//
//   AttendanceModel.fromJson(Map<String, dynamic> json) {
//     status = json['status'];
//     message = json['message'];
//     data = json['data'] != null ? new Data.fromJson(json['data']) : null;
//   }
//
//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     data['status'] = this.status;
//     data['message'] = this.message;
//     if (this.data != null) {
//       data['data'] = this.data!.toJson();
//     }
//     return data;
//   }
// }
//
// class Data {
//   Attendace? attendace;
//
//   Data({this.attendace});
//
//   Data.fromJson(Map<String, dynamic> json) {
//     attendace = json['Attendace'] != null
//         ? new Attendace.fromJson(json['Attendace'])
//         : null;
//   }
//
//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     if (this.attendace != null) {
//       data['Attendace'] = this.attendace!.toJson();
//     }
//     return data;
//   }
// }
//
// class Attendace {
//   String? sId;
//   String? employeeID;
//   String? employeeName;
//   String? date;
//   String? month;
//   String? weekDay;
//   String? checkIn;
//   String? createdAt;
//   String? updatedAt;
//   int? iV;
//   String? checkOut;
//
//   Attendace(
//       {this.sId,
//         this.employeeID,
//         this.employeeName,
//         this.date,
//         this.month,
//         this.weekDay,
//         this.checkIn,
//         this.createdAt,
//         this.updatedAt,
//         this.iV,
//         this.checkOut});
//
//   Attendace.fromJson(Map<String, dynamic> json) {
//     sId = json['_id'];
//     employeeID = json['EmployeeID'];
//     employeeName = json['EmployeeName'];
//     date = json['Date'];
//     month = json['Month'];
//     weekDay = json['WeekDay'];
//     checkIn = json['CheckIn'];
//     createdAt = json['createdAt'];
//     updatedAt = json['updatedAt'];
//     iV = json['__v'];
//     checkOut = json['CheckOut'];
//   }
//
//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     data['_id'] = this.sId;
//     data['EmployeeID'] = this.employeeID;
//     data['EmployeeName'] = this.employeeName;
//     data['Date'] = this.date;
//     data['Month'] = this.month;
//       data['WeekDay'] = this.weekDay;
//     data['CheckIn'] = this.checkIn;
//     data['createdAt'] = this.createdAt;
//     data['updatedAt'] = this.updatedAt;
//     data['__v'] = this.iV;
//     data['CheckOut'] = this.checkOut;
//     return data;
//   }
// }

class AttendanceModel {
  int? status;
  String? message;
  Data? data;

  AttendanceModel({this.status, this.message, this.data});

  AttendanceModel.fromJson(Map<String, dynamic> json) {
    status = json['status'];
    message = json['message'];
    data = json['data'] != null ? new Data.fromJson(json['data']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['status'] = this.status;
    data['message'] = this.message;
    if (this.data != null) {
      data['data'] = this.data!.toJson();
    }
    return data;
  }
}

class Data {
  Attendace? attendace;

  Data({this.attendace});

  Data.fromJson(Map<String, dynamic> json) {
    attendace = json['Attendace'] != null
        ? new Attendace.fromJson(json['Attendace'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.attendace != null) {
      data['Attendace'] = this.attendace!.toJson();
    }
    return data;
  }
}

class Attendace {
  String? employeeName;
  List<GetAttendance>? getAttendance;

  Attendace({this.employeeName, this.getAttendance});

  Attendace.fromJson(Map<String, dynamic> json) {
    employeeName = json['EmployeeName'];
    if (json['GetAttendance'] != null) {
      getAttendance = <GetAttendance>[];
      json['GetAttendance'].forEach((v) {
        getAttendance!.add(new GetAttendance.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['EmployeeName'] = this.employeeName;
    if (this.getAttendance != null) {
      data['GetAttendance'] =
          this.getAttendance!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class GetAttendance {
  String? employeeID;
  String? employeeName;
  String? date;
  String? month;
  String? weekDay;
  String? checkIn;
  String? checkOut;
  String? sId;
  String? createdAt;
  String? updatedAt;
  int? iV;

  GetAttendance(
      {this.employeeID,
        this.employeeName,
        this.date,
        this.month,
        this.weekDay,
        this.checkIn,
        this.checkOut,
        this.sId,
        this.createdAt,
        this.updatedAt,
        this.iV});

  GetAttendance.fromJson(Map<String, dynamic> json) {
    employeeID = json['EmployeeID'];
    employeeName = json['EmployeeName'];
    date = json['Date'];
    month = json['Month'];
    weekDay = json['WeekDay'];
    checkIn = json['CheckIn'];
    checkOut = json['CheckOut'];
    sId = json['_id'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['EmployeeID'] = this.employeeID;
    data['EmployeeName'] = this.employeeName;
    data['Date'] = this.date;
    data['Month'] = this.month;
    data['WeekDay'] = this.weekDay;
    data['CheckIn'] = this.checkIn;
    data['CheckOut'] = this.checkOut;
    data['_id'] = this.sId;
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['__v'] = this.iV;
    return data;
  }
}
