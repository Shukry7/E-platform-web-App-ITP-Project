const Salary = require("../Models/SalaryModel");
const HttpError = require("../Models/http-error");

const createSalary = async (req, res, next) => {
  const { employee, date, status, net } = req.body;

  try {
    const latestSalary = await Salary.find({ employee: employee }).sort({ date: -1 }).limit(1);
    let salary;

    if (latestSalary.length !== 0 && latestSalary[0].date.getMonth() === new Date(date).getMonth()) {
      // If there's an existing salary for the same month, update it
      salary = latestSalary[0];
      salary.status = status;
      salary.net = net;
      await salary.save();
    } else {
      // If no salary exists for the same month, create a new one
      salary = await Salary.create({
        employee: employee,
        date: date,
        status: status,
        net: net
      });
    }

    return res.status(201).json(salary);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listSalary = async (req, res) => {
  try {
    const salaries = await Salary.find({})
      .populate('employee')
      .sort({ _id: -1 });

    return res.status(200).json(salaries);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.createSalary = createSalary;
exports.listSalary = listSalary;
