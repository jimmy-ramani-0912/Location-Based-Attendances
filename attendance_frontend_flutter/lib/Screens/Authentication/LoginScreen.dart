import 'package:attendance_frontend_flutter/NodeJS_API/Api.dart';
import 'package:attendance_frontend_flutter/NodeJS_Models/LoginModel.dart';
import 'package:flutter/material.dart';
import 'package:attendance_frontend_flutter/Screens/DashBoard/HomeScreen.dart';
import 'package:flutter_keyboard_visibility/flutter_keyboard_visibility.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  TextEditingController idController = TextEditingController();
  TextEditingController passController = TextEditingController();

  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

  double screenHeight = 0;
  double screenWidth = 0;

  Color primary = const Color(0xffeef444c);

  void LoginEmployee() async {
    final SharedPreferences prefs = await _prefs;

    FocusScope.of(context).unfocus();

    String EmployeeID = idController.text.trim();
    String password = passController.text.trim();

    if (EmployeeID.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text(
          "Please Enter EmployeeID !!!",
          style: TextStyle(
            color: Color(0xffeef444c),
            fontFamily: "NexaBold",
          ),
        ),
        // backgroundColor: Color(0xffeef444c),
      ));
    } else if (password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text(
          "Please Enter Password !!!",
          style: TextStyle(
            color: Color(0xffeef444c),
            fontFamily: "NexaBold",
          ),
        ),
        // backgroundColor: Color(0xffeef444c),
      ));
    } else {
      LoginModel data = await LogIN().Log_In(EmployeeID, password);

      if (data.status.toString() == "404") {
        print("User Not Found !!!");
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text("User Not Found !!!",
              style: TextStyle(
                color: Color(0xffeef444c),
                fontFamily: "NexaBold",
              )),
        ));
      } else if (data.status.toString() == "405") {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text(
            "Password is Wrong and Please Try Again !!!",
            style: TextStyle(
              color: Color(0xffeef444c),
              fontFamily: "NexaBold",
            ),
          ),
        ));
      } else if (data.status.toString() == "200") {
        var Token = data.data?.accessToken.toString();
        var EmployeeID = data.data?.details?.employeeID.toString();
        var EmployeeUniqID = data.data?.details?.sId;
        var EmployeeName = data.data?.details?.employeeName.toString();

        prefs.setString("Token", Token!);
        prefs.setString("EmployeeID", EmployeeID!);
        prefs.setString("EmployeeName", EmployeeName!);
        prefs.setString("EmployeeUniqID", EmployeeUniqID!);
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text(
            "Employee Logged In Successfully !",
            style: TextStyle(
              color: Color(0xffeef444c),
              fontFamily: "NexaBold",
            ),
          ),
        ));
        Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => const HomeScreen(),
        ));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final bool isKeyboardVisible =
        KeyboardVisibilityProvider.isKeyboardVisible(context);
    screenHeight = MediaQuery.of(context).size.height;
    screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Column(
        children: [
          isKeyboardVisible
              ? SizedBox(
                  height: screenHeight / 16,
                )
              : Container(
                  height: screenHeight / 2.5,
                  width: screenWidth,
                  decoration: BoxDecoration(
                    color: Color(0xff3f51b5),
                    borderRadius: const BorderRadius.only(
                      bottomRight: Radius.circular(70),
                    ),
                  ),
                  child: Center(
                    child: Icon(
                      Icons.person,
                      color: Colors.white,
                      size: screenWidth / 5,
                    ),
                  ),
                ),
          Container(
            margin: EdgeInsets.only(
              top: screenHeight / 15,
              bottom: screenHeight / 20,
            ),
            child: Text(
              "Login",
              style: TextStyle(
                fontSize: screenWidth / 18,
                fontFamily: "NexaBold",
              ),
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            margin: EdgeInsets.symmetric(
              horizontal: screenWidth / 12,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                fieldTitle("Employee ID"),
                customField(
                    "Enter Your EmployeeID", idController, false, Icons.person),
                fieldTitle("Password"),
                customField("Enter Your password", passController, true,
                    Icons.password_sharp),
                GestureDetector(
                  onTap: LoginEmployee,
                  child: Container(
                    height: 60,
                    width: screenWidth,
                    margin: EdgeInsets.only(top: screenHeight / 40),
                    decoration: BoxDecoration(
                      color: Color(0xff3f51b5),
                      borderRadius: const BorderRadius.all(Radius.circular(30)),
                    ),
                    child: Center(
                      child: Text(
                        "LOGIN",
                        style: TextStyle(
                          fontFamily: "NexaBold",
                          fontSize: screenWidth / 26,
                          color: Colors.white,
                          letterSpacing: 2,
                        ),
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget fieldTitle(String title) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: Text(
        title,
        style: TextStyle(
          fontSize: screenWidth / 26,
          fontFamily: "NexaBold",
        ),
      ),
    );
  }

  Widget customField(String hint, TextEditingController controller,
      bool obscure, IconData icon) {
    return Container(
      width: screenWidth,
      margin: const EdgeInsets.only(bottom: 12),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.all(Radius.circular(12)),
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 10,
            offset: Offset(2, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          SizedBox(
            width: screenWidth / 6,
            child: Icon(
              icon,
              color: Color(0xff3f51b5),
              size: screenWidth / 15,
            ),
          ),
          Expanded(
            child: Padding(
              padding: EdgeInsets.only(right: screenWidth / 12),
              child: TextFormField(
                controller: controller,
                enableSuggestions: false,
                autocorrect: false,
                decoration: InputDecoration(
                  contentPadding: EdgeInsets.symmetric(
                    vertical: screenHeight / 35,
                  ),
                  border: InputBorder.none,
                  hintText: hint,
                ),
                maxLines: 1,
                obscureText: obscure,
              ),
            ),
          )
        ],
      ),
    );
  }
}
