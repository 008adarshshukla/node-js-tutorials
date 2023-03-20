const express = require("express")
const router = express.Router()
const { route } = require("../subdirRoutes")
const employeesController = require('../../controllers/employeesController')

router
  .route("/")
  //if only wanted in get route we can put it in the specific route.
  //it will go through the middleware first then it will through getEmployees.
  //this is useful only when we want ot protect the selected routes.
  // .get(verifyJWT, employeesController.getAllEmployees)
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee)

router.route("/:id").get(employeesController.getEmployee)

module.exports = router
