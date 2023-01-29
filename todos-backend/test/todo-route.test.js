const request = require("supertest");
const express = require("express");
const todoRoute = require("../app/route/todo.route");
const authRoute = require("../app/route/auth.route");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/v1/todos", todoRoute);

describe("Auth Route Testing : /todos", () => {
  describe("GET /token", () => {
    let tokenData;
    it("Initialize", async () => {
      await request(app)
        .post("/signup")
        .set("Content-Type", "application/json")
        .set("Accept", /json/)
        .send({
          username: "prashant1k99",
          email: "mala@gmail.com",
          password: "test",
        });

      tokenData = await request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .set("Accept", /json/)
        .send({
          username: "prashant1k99",
          email: "mala@gmail.com",
          password: "test",
        });
    });

    // console.log(todoRoute(), "routes");
    console.log(tokenData, "token");

    it("Without Auth Token in Header", async () => {
      const res = await request(app)
        .get("/")
        .set("Content-Type", "application/json");
      expect(res.statusCode).toEqual(404);
    });

    it("With Auth Token", async () => {
      const res = await request(app)
        .get("/")
        .set("x-access-token", `${tokenData.body.accessToken}`);
      expect(res.statusCode).toEqual(404);
      expect(Array.isArray(res.body)).toBeFalsy();
    });
  });

  describe("POST /todo", () => {
    let tokenData;
    it("Initialize", async () => {
      await request(app)
        .post("/signup")
        .set("Content-Type", "application/json")
        .set("Accept", /json/)
        .send({
          username: "prashant1k99",
          email: "mala@gmail.com",
          password: "test",
        });

      tokenData = await request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .set("Accept", /json/)
        .send({
          username: "prashant1k99",
          email: "mala@gmail.com",
          password: "test",
        });
    });

    it("Without Auth Token in Header", async () => {
      const res = await request(app)
        .post("/")
        .set("Content-Type", "application/json")
        .set("Accept", /json/)
        .send({ title: "Some of my funny stories." });
      expect(res.statusCode).toEqual(404);
      // expect(res.text).toEqual("No Auth header");
    });

    it("With Auth Token, Without Id", async () => {
      const res = await request(app)
        .post("/")
        .set("x-access-token", `${tokenData.body.accessToken}`);
      expect(res.statusCode).toEqual(404);
      // expect(res.text).toEqual("Title missing.");
    });
  });
});
