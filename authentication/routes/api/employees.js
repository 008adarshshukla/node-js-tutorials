const express = require("express")
const router = express.Router()
const { route } = require("../subdirRoutes")
const employeesController = require('../../controllers/employeesController')

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee)

router.route("/:id").get(employeesController.getEmployee)

module.exports = router
