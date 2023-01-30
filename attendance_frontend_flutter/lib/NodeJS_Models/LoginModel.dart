class LoginModel {
  int? status;
  String? message;
  Data? data;

  LoginModel({this.status, this.message, this.data});

  LoginModel.fromJson(Map<String, dynamic> json) {
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
  String? accessToken;
  Details? details;
  bool? isAdmin;

  Data({this.accessToken, this.details, this.isAdmin});

  Data.fromJson(Map<String, dynamic> json) {
    accessToken = json['Access_token'];
    details =
        json['details'] != null ? new Details.fromJson(json['details']) : null;
    isAdmin = json['isAdmin'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['Access_token'] = this.accessToken;
    if (this.details != null) {
      data['details'] = this.details!.toJson();
    }
    data['isAdmin'] = this.isAdmin;
    return data;
  }
}

class Details {
  String? sId;
  String? employeeID;
  String? employeeName;
  int? mobileNo;
  String? email;
  String? createdAt;
  String? updatedAt;
  int? iV;
  List<Attendance>? attendance;

  Details(
      {this.sId,
      this.employeeID,
      this.employeeName,
      this.mobileNo,
      this.email,
      this.createdAt,
      this.updatedAt,
      this.iV,
      this.attendance});

  Details.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    employeeID = json['EmployeeID'];
    employeeName = json['EmployeeName'];
    mobileNo = json['mobileNo'];
    email = json['email'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
    if (json['Attendance'] != null) {
      attendance = <Attendance>[];
      json['Attendance'].forEach((v) {
        attendance!.add(new Attendance.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['EmployeeID'] = this.employeeID;
    data['EmployeeName'] = this.employeeName;
    data['mobileNo'] = this.mobileNo;
    data['email'] = this.email;
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['__v'] = this.iV;
    if (this.attendance != null) {
      data['Attendance'] = this.attendance!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Attendance {
  String? month;
  String? weekDay;
  String? checkIn;
  String? sId;
  String? createdAt;
  String? updatedAt;
  int? iV;
  String? employeeID;
  String? employeeName;
  String? date;

  Attendance(
      {this.month,
      this.weekDay,
      this.checkIn,
      this.sId,
      this.createdAt,
      this.updatedAt,
      this.iV,
      this.employeeID,
      this.employeeName,
      this.date});

  Attendance.fromJson(Map<String, dynamic> json) {
    month = json['Month'];
    weekDay = json['WeekDay'];
    checkIn = json['CheckIn'];
    sId = json['_id'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
    employeeID = json['EmployeeID'];
    employeeName = json['EmployeeName'];
    date = json['Date'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['Month'] = this.month;
    data['WeekDay'] = this.weekDay;
    data['CheckIn'] = this.checkIn;
    data['_id'] = this.sId;
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['__v'] = this.iV;
    data['EmployeeID'] = this.employeeID;
    data['EmployeeName'] = this.employeeName;
    data['Date'] = this.date;
    return data;
  }
}
