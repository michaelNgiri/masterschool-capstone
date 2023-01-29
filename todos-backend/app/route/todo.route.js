const controller = require("../controller/todo.controller");
const { authJwt } = require("../middleware");

// const router = Router();

// router.get("/", controller.getTodos);
// router.post("/", controller.createTodo);
// router.put("/:id", controller.updateTodo);
// router.delete("/:id", controller.deleteTodo);

// module.exports = router;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/todos", [authJwt.verifyToken], controller.getTodos);
  app.post("/api/v1/todos", [authJwt.verifyToken], controller.createTodo);
  app.put("/api/v1/todos/:id", [authJwt.verifyToken], controller.updateTodo);
  app.delete("/api/v1/todos/:id", [authJwt.verifyToken], controller.deleteTodo);
};
