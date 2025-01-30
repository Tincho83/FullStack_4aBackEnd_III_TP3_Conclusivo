import { expect } from "chai"
import { describe, it } from "mocha"
import mongoose, { isValidObjectId } from "mongoose"
import supertest from "supertest"
import fs from "fs"

await mongoose.connect("mongodb+srv://tincho83:Codin33Codin33@cluster0.hhucv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=adoptmeDev")

const requester = supertest("http://localhost:8080");

// npx mocha .\test\routes\sessions.router.test.js --exit


describe(">>> Pruebas: A.Router Sessions: Post (Register)", async function () {

    this.timeout(7600);

    before(async () => {
        let existe = await mongoose.connection.collection("users").deleteOne({ email: "prueba@prueba.com" })
    });

    beforeEach(async () => {
    });

    afterEach(async () => {
        let existe = await mongoose.connection.collection("users").deleteOne({ email: "prueba@prueba.com" })
    });

    after(async () => {
    });


    it("* Router Sessions / Metodo POST: 1.Registra un usuario (usuario: prueba@prueba.com) y devuelve codigo de estado 200?", async () => {

        let userMock = { first_name: "Prueba", last_name: "Testing", email: "prueba@prueba.com", password: "Coder123" }

        let { body, headers, status } = await requester.post("/api/sessions/register").send(userMock)

        expect(status).to.exist
        expect(status).to.be.eq(200);

    });


    it("* Router Sessions / Metodo POST: 2.Registra un usuario (usuario: prueba@prueba.com) y NO devuelve codigo de estado diferente a 200?", async () => {

        let userMock = { first_name: "Prueba", last_name: "Testing", email: "prueba@prueba.com", password: "Coder123" }

        let { body, headers, status } = await requester.post("/api/sessions/register").send(userMock)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

    });


    it("* Router Sessions / Metodo POST: 3.Registra un usuario (usuario: prueba@prueba.com) y devuelve la propiedad 'status' igual a 'success'?", async () => {
        let userMock = { first_name: "Prueba", last_name: "Testing", email: "prueba@prueba.com", password: "Coder123" }

        let { body, headers, status } = await requester.post("/api/sessions/register").send(userMock)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

    });


    it("* Router Sessions / Metodo POST: 4.Registra un usuario (usuario: prueba@prueba.com) y devuelve la existencia de la propiedad 'payload'?", async () => {
        let userMock = { first_name: "Prueba", last_name: "Testing", email: "prueba@prueba.com", password: "Coder123" }

        let { body, headers, status } = await requester.post("/api/sessions/register").send(userMock)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.be.ok
        expect(body.payload).to.exist


    });


    it("* Router Sessions / Metodo POST: 5.Registra un usuario (usuario: prueba@prueba.com) y devuelve la existencia de la propiedad 'payload' con Id DB valido?", async () => {
        let userMock = { first_name: "Prueba", last_name: "Testing", email: "prueba@prueba.com", password: "Coder123" }

        let { body, headers, status } = await requester.post("/api/users").send(userMock)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.be.ok
        expect(body.payload).to.exist

        expect(isValidObjectId(body.payload._id)).to.be.true;

    });

    it("* Router Sessions / Metodo POST: 6.Registra un usuario (usuario: prueba@prueba.com). Provoca error 400 con campo no valido (emaiil)?", async () => {
        let userMock = { first_name: "Prueba", last_name: "Testing", emaiil: "prueba@prueba.com", password: "Coder123" }

        let { body, headers, status } = await requester.post("/api/sessions/register").send(userMock)

        expect(status).to.exist
        expect(status).to.be.eq(400, "Se esperaba un código de estado 400, pero se recibió " + status)
    });

    it("* Router Sessions / Metodo POST: 7.Registra un usuario (usuario: prueba@prueba.com). Provoca error 409 con usuario ya existente?", async () => {
        let userMock = { first_name: "Prueba", last_name: "Testing", email: "prueba@prueba.com", password: "Coder123" }
        let userAlready = await requester.post("/api/sessions/register").send(userMock)

        let { body, headers, status } = await requester.post("/api/sessions/register").send(userMock)

        expect(status).to.exist
        expect(status).to.be.eq(409, "Se esperaba un código de estado 409, pero se recibió " + status)
    });

});

describe(">>> Pruebas: B.Router Sessions: Post (Login)", async function () {

    this.timeout(7600);

    let cookie;
    let userMock = { email: "prueba@prueba.com", password: "Coder123"  }
    let userMockErrorU = { email: "pprueba@prueba.com", password: "Coder123"  }
    let userMockErrorP = { email: "prueba@prueba.com", password: "Coder1233"  }
    let userMockInvalid = { email: "prueba@prueba.com", passsword: "Coder123"  }

    before(async () => {
        let userMock = { first_name: "Prueba", last_name: "Testing", email: "prueba@prueba.com", password: "Coder123" }

        let { body, headers, status } = await requester.post("/api/sessions/register").send(userMock)
    });

    beforeEach(async () => {
    });

    afterEach(async () => {

    });

    after(async () => {
    });



    it("* Router Sessions / Metodo POST: 1.Inicia Sesion de usuario (usuario: prueba@prueba.com) y devuelve codigo de estado 200?", async () => {
        let { body, header, status } = await requester.post("/api/sessions/login").send(userMock)

        let cookies = header["set-cookie"]
        cookie = header["set-cookie"][0]
        let nombreCookie = cookies[0].split("=")[0]

        expect(body.status).to.be.ok
        expect(nombreCookie).to.be.eq("coderCookie")

        expect(status).to.exist
        expect(status).to.be.eq(200);

    });

    it("* Router Sessions / Metodo POST: 2.Inicia Sesion de usuario (usuario: prueba@prueba.com) y NO devuelve codigo de estado diferente a 200?", async () => {
        let { body, header, status } = await requester.post("/api/sessions/login").send(userMock)

        let cookies = header["set-cookie"]
        cookie = header["set-cookie"][0]
        let nombreCookie = cookies[0].split("=")[0]

        expect(body.status).to.be.ok
        expect(nombreCookie).to.be.eq("coderCookie")

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)


    });

    it("* Router Sessions / Metodo POST: 3.Inicia Sesion de usuario (usuario: prueba@prueba.com) y NO devuelve codigo de estado diferente a 200?", async () => {
        let { body, header, status } = await requester.post("/api/sessions/login").send(userMock)

        let cookies = header["set-cookie"]
        cookie = header["set-cookie"][0]
        let nombreCookie = cookies[0].split("=")[0]

        expect(body.status).to.be.ok
        expect(nombreCookie).to.be.eq("coderCookie")

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)


    });

    it("* Router Sessions / Metodo POST: 4.Inicia Sesion de usuario (usuario: prueba@prueba.com) y devuelve la propiedad 'status' igual a 'success'?", async () => {
        let { body, header, status } = await requester.post("/api/sessions/login").send(userMock)

        let cookies = header["set-cookie"]
        cookie = header["set-cookie"][0]
        let nombreCookie = cookies[0].split("=")[0]

        expect(body.status).to.be.ok
        expect(nombreCookie).to.be.eq("coderCookie")

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");


    });

    it("* Router Sessions / Metodo POST: 5.Inicia Sesion de usuario (usuario: prueba@prueba.com) y devuelve la existencia de la propiedad 'message' igual a 'Logged in'?", async () => {
        let { body, header, status } = await requester.post("/api/sessions/login").send(userMock)

        let cookies = header["set-cookie"]
        cookie = header["set-cookie"][0]
        let nombreCookie = cookies[0].split("=")[0]

        expect(body.status).to.be.ok
        expect(nombreCookie).to.be.eq("coderCookie")

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.message).to.be.ok
        expect(body.message).to.exist
        expect(body.message).to.be.eq("Logged in");
        expect(body).to.have.property("message", "Logged in");
        

    });

    it("* Router Sessions / Metodo POST: 6.Inicia Sesion de usuario (usuario: prueba@prueba.com) y devuelve token valido?", async () => {
        let { body, header, status } = await requester.post("/api/sessions/login").send(userMock)

        let cookies = header["set-cookie"]
        cookie = header["set-cookie"][0]
        let nombreCookie = cookies[0].split("=")[0]

        expect(body.status).to.be.ok
        expect(nombreCookie).to.be.eq("coderCookie")

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.message).to.be.ok
        expect(body.message).to.exist
        expect(body.message).to.be.eq("Logged in");
        expect(body).to.have.property("message", "Logged in");

        let token = await requester.get("/api/sessions/current").set("Cookie", cookie)
        expect(token.status).to.be.ok
        expect(token._body.payload.email).to.be.eq(userMock.email)

    });


    it("* Router Sessions / Metodo POST: 7.Inicia Sesion de usuario erroneo (usuario: pprueba@prueba.com) y NO devuelve codigo de estado diferente a 404?", async () => {
        let { body, header, status } = await requester.post("/api/sessions/login").send(userMockErrorU)

        let cookies = header["set-cookie"]

        expect(status).to.exist
        expect(status).to.be.eq(404, "Se esperaba un código de estado 404, pero se recibió " + status)

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("Login User Error: User not found.***");
        expect(body).to.have.property("error", "Login User Error: User not found.***");

    });

    it("* Router Sessions / Metodo POST: 8.Inicia Sesion de usuario con pass erroneo (usuario: prueba@prueba.com) y NO devuelve codigo de estado diferente a 400?", async () => {
        let { body, header, status } = await requester.post("/api/sessions/login").send(userMockErrorP)

        let cookies = header["set-cookie"]

        expect(status).to.exist
        expect(status).to.be.eq(400, "Se esperaba un código de estado 400, pero se recibió " + status)

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("Login User Error: Invalid Credentials.***");
        expect(body).to.have.property("error", "Login User Error: Invalid Credentials.***");


    });


    it("* Router Sessions / Metodo POST: 9.Inicia Sesion de usuario (usuario: prueba@prueba.com) con campo erroneo 'emaiil' y NO devuelve codigo de estado diferente a 400?", async () => {
        let { body, header, status } = await requester.post("/api/sessions/login").send(userMockInvalid)

        let cookies = header["set-cookie"]

        expect(status).to.exist
        expect(status).to.be.eq(400, "Se esperaba un código de estado 400, pero se recibió " + status)

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("Login User Error: Fields need to be completed.***");
        expect(body).to.have.property("error", "Login User Error: Fields need to be completed.***");


    });
   


});