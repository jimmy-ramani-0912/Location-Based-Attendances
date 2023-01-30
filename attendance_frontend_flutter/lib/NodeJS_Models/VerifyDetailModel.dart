class VerifyDetailModel {
  int? status;
  String? message;
  Data? data;

  VerifyDetailModel({this.status, this.message, this.data});

  VerifyDetailModel.fromJson(Map<String, dynamic> json) {
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
  GetVeifyDetails? getVeifyDetails;

  Data({this.getVeifyDetails});

  Data.fromJson(Map<String, dynamic> json) {
    getVeifyDetails = json['GetVeifyDetails'] != null
        ? new GetVeifyDetails.fromJson(json['GetVeifyDetails'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.getVeifyDetails != null) {
      data['GetVeifyDetails'] = this.getVeifyDetails!.toJson();
    }
    return data;
  }
}

class GetVeifyDetails {
  String? sId;
  String? wiFiIP;
  int? radius;
  double? latitude;
  double? longitude;
  String? createdAt;
  String? updatedAt;
  int? iV;

  GetVeifyDetails(
      {this.sId,
        this.wiFiIP,
        this.radius,
        this.latitude,
        this.longitude,
        this.createdAt,
        this.updatedAt,
        this.iV});

  GetVeifyDetails.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    wiFiIP = json['WiFi_IP'];
    radius = json['radius'];
    latitude = json['latitude'];
    longitude = json['longitude'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['WiFi_IP'] = this.wiFiIP;
    data['radius'] = this.radius;
    data['latitude'] = this.latitude;
    data['longitude'] = this.longitude;
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    data['__v'] = this.iV;
    return data;
  }
}
