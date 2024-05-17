const HttpError = require("../Models/http-error");
const EmployeeLoginModel = require("../Models/EmployeeLoginModel");

const EmployeeLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const employee = await EmployeeLoginModel.findOne({ username: username });
        if (employee && employee.password === password) {
            res.json({
                message: 'Success',
                employeeId: employee._id
            });
        } else {
            res.status(401).json("Invalid username/password");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Unable to process request, please try again later");
    }
}

exports.EmployeeLogin = EmployeeLogin;
