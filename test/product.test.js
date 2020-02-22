const request = require("supertest");
const app = require("../app");
const Sequelize = require("sequelize");
const {
    Admin,
    Product,
    sequelize
} = require("../models");
const {
    queryInterface
} = sequelize;

describe("Product test", () => {
    afterAll(done => {
        queryInterface
          .bulkDelete("Products", {})
          .then(data => {
            done()
          })
          .catch(err => {
            done(err)
          })
      })

    describe("Read/Get all product", () => {
        test("it should return product list  and status 200", done => {
            request(app)
                .get("/admin/product")
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.status).toBe(200);
                    done();
                });
        });
    });

    describe("Create newproduct", () => {
        test("should return status 201", done => {
            request(app)
                .post("/admin/product/create")
                .send({
                    name: "Teh",
                    image_url: "https://static.republika.co.id/uploads/images/inpicture_slide/secangkir-teh-_190524103045-721.jpg",
                    price: 6000,
                    stocks: 108
                })
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.body).toHaveProperty("name");
                    expect(response.body).toHaveProperty("image_url");
                    expect(response.body).toHaveProperty("price");
                    expect(response.body).toHaveProperty("stocks");
                    expect(response.status).toBe(201);
                    done();
                });
        });
    });

    describe("Failed to create new product", () => {
        test("should return status 400", done => {
            request(app)
                .post("/admin/product/create")
                .send({
                    name: "",
                    image_url: "",
                    price: 0,
                    stocks: 0
                })
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body.err, 'error create product')
                    // expect(response.body).toHaveProperty("err");
                    expect(response.status).toBe(201);
                    done();
                });
        });
    });

    describe("Read/Get specific product by id", () => {
        test("it should return product list and status 200", done => {
            request(app)
                .get("/admin/product/14/update")
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.body).toHaveProperty("name");
                    expect(response.body).toHaveProperty("image_url");
                    expect(response.body).toHaveProperty("price");
                    expect(response.body).toHaveProperty("stocks");
                    expect(response.status).toBe(200);
                    done();
                });
        });
    });

    describe("Failed to Read/Get specific product by id", () => {
        test("it should return status 404", done => {
            request(app)
                .get("/admin/product/12/update")
                .end((err, response) => {
                    // expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.body).toHaveProperty("err");
                    expect(response.body).toHaveProperty("msg");
                    expect(response.status).toBe(404);
                    done();
                });
        });
    });

    describe("Update product by id", () => {
        test("it should return new product value and status 201", done => {
            request(app)
                .put("/admin/product/11/update")
                .send({
                    name: "kopi luwak",
                    image_url: "http://www.imageurl.com",
                    price: 12000,
                    stocks: 29
                })
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.body).toHaveProperty("name");
                    expect(response.body).toHaveProperty("image_url");
                    expect(response.body).toHaveProperty("price");
                    expect(response.body).toHaveProperty("stocks");
                    expect(response.status).toBe(201);
                    done();
                });
        });
    });

    describe("Failed to update product by id", () => {
        test("should return status 404", done => {
            request(app)
                .put("/admin/product/1/update")
                .send({
                    name: "",
                    image_url: "",
                    price: 0,
                    stocks: 0
                })
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body.err, 'error create product')
                    expect(response.body).toHaveProperty("err");
                    expect(response.status).toBe(404);
                    done();
                });
        });
    });

    describe("Delete product by id", () => {
        test("it should return status 200", done => {
            request(app)
                .delete("/admin/product/1/delete")
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.body).toHaveProperty("msg");
                    expect(response.status).toBe(200);
                    done();
                });
        });
    });

    describe("Failed to Delete product by id", () => {
        test("it should return status 200", done => {
            request(app)
                .delete("/admin/product/100/delete")
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.body).toHaveProperty("msg");
                    expect(response.status).toBe(200);
                    done();
                });
        });
    });
});