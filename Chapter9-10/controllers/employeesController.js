const { get } = require("http");

const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees.length
      ? parseInt(data.employees[data.employees.length - 1].id) + 1
      : 1,

    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last name are required." });
  }
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

// controllers/employeesController.js

const updateEmployee = (req, res) => {
  // Düzeltme: emp.id'yi de sayıya çeviriyoruz
  const employee = data.employees.find(
    (emp) => parseInt(emp.id) === req.body.id
  );
  if (!employee) {
    return res
      .status(404)
      .json({ message: `Employee ID  ${req.body.id} not found ` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  // Düzeltme: "lastName" değil "lastname" olmalı
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter(
    // Düzeltme: emp.id'yi de sayıya çeviriyoruz
    (emp) => parseInt(emp.id) !== req.body.id
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  // Düzeltme: emp.id'yi de sayıya çeviriyoruz
  const employee = data.employees.find(
    (emp) => parseInt(emp.id) === req.body.id
  );
  if (!employee) {
    return res
      .status(404)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  // Düzeltme: emp.id'yi de sayıya çeviriyoruz
  const filteredArray = data.employees.filter(
    (emp) => parseInt(emp.id) !== req.body.id
  );
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  // Düzeltme: emp.id'yi de sayıya çeviriyoruz
  const employee = data.employees.find(
    (emp) => parseInt(emp.id) === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(404)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
