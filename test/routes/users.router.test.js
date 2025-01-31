import { expect } from "chai"
import { describe, it } from "mocha"
import mongoose, { isValidObjectId } from "mongoose"
import supertest from "supertest"
import fs from "fs"

await mongoose.connect("mongodb+srv://tincho83:Codin33Codin33@cluster0.hhucv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=adoptmeDev")

const requester = supertest("http://localhost:8080");

// npx mocha .\test\routes\users.router.test.js --exit
let UserID_NotFound = "67650536b416987388f08065";
let UserID_InvalidID = "67650536b416987388f080655";

describe(">>> Pruebas: A.Router Users: Get", async function () {

    this.timeout(7600);

    before(async () => {
        let existe = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        if (!existe) {
            await mongoose.connection.collection("users").insertOne({
                first_name: "test",
                last_name: "test",
                email: "test@test.com",
                password: "$2b$Coder123"
            })
        } else {
        }
    });

    beforeEach(async () => { 
    });

    afterEach(async () => { 
    });

    after(async () => {     
    });

    it("* Router Users / Metodo GET: 1.Devuelve codigo de estado 200?", async () => {
        let { status } = await requester.get("/api/users");

        expect(status).to.be.eq(200);
    });

    it("* Router Users / Metodo GET: 2. No Devuelve codigo de estado diferente a 200?", async () => {
        let { status } = await requester.get("/api/users");

        expect(status).to.equal(200, "Se esperaba un código de estado 200, pero se recibió " + status);
    });

    it("* Router Users / Metodo GET: 3.Devuelve la propiedad 'status' igual a 'sucess'?", async () => {
        let { status, body } = await requester.get("/api/users");

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");
    });

    it("* Router Users / Metodo GET: 4.Devuelve la existencia de la propiedad 'payload'?", async () => {
        let { status, body } = await requester.get("/api/users");

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");
    });

    it("* Router Users / Metodo GET: 5.La propiedad 'payload' es un array?", async () => {
        let { status, body } = await requester.get("/api/users");

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

        const payload = body.payload;
        expect(Array.isArray(body.payload)).to.be.true
    });

    it("* Router Users / Metodo GET: 6.La propiedad 'payload' es un array con al menos un elemento?", async () => {
        let { status, body } = await requester.get("/api/users");

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

        const payload = body.payload;
        expect(Array.isArray(body.payload)).to.be.true

        expect(payload.length).to.be.greaterThan(0);
    });

    it("* Router Users / Metodo GET: 7.El primero elemento del array 'payload' contiene el campo '_id'?", async () => {
        let { status, body } = await requester.get("/api/users");

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

        const payload = body.payload;
        expect(Array.isArray(body.payload)).to.be.true

        expect(payload.length).to.be.greaterThan(0);

        expect(payload[0]).to.have.property("_id");
    });

    it("* Router Users / Metodo GET: 8.El primero elemento del array 'payload' contiene el campo '_id' con un valor de Id valido?", async () => {
        let { status, body } = await requester.get("/api/users");

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

        const payload = body.payload;
        expect(Array.isArray(body.payload)).to.be.true

        expect(payload.length).to.be.greaterThan(0);

        expect(payload[0]).to.have.property("_id");

        expect(isValidObjectId(payload[0]._id)).to.be.true;
    });

    it("* Router Users / Metodo GET: 9.El primero elemento del array 'payload' contiene los campos 'first_name (string)', 'last_name (string)', 'email (string contiene @)', 'password (string contiene $2b$), role (string)' con valores validos?", async () => {
        let { status, body } = await requester.get("/api/users");

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

        const payload = body.payload;
        expect(Array.isArray(body.payload)).to.be.true

        expect(payload.length).to.be.greaterThan(0);

        expect(payload[0]).to.have.property("_id");

        expect(isValidObjectId(payload[0]._id)).to.be.true;

        expect(payload[0]).to.have.property("first_name").that.is.a("string").and.is.not.empty;
        expect(payload[0]).to.have.property("last_name").that.is.a("string").and.is.not.empty;
        expect(payload[0]).to.have.property("email").that.is.a("string").and.includes("@");
        expect(payload[0]).to.have.property("password").that.is.a("string").and.is.not.empty;
        expect(payload[0].password.slice(0, 4)).to.be.eq('$2b$');
        expect(payload[0]).to.have.property("role").that.is.a("string").and.is.not.empty;
    });

    it("* Router Users / Metodo GET con UserID: 10.Devuelve codigo de estado 200?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        const { status } = await requester.get(`/api/users/${userId}`);

        expect(status).to.be.eq(200);

    });

    it("* Router Users / Metodo GET con UserID: 11.No Devuelve codigo de estado diferente a 200?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        const { status } = await requester.get(`/api/users/${userId}`);

        expect(status).to.equal(200, "Se esperaba un código de estado 200, pero se recibió " + status);

    });

    it("* Router Users / Metodo GET con UserID: 12.Devuelve la propiedad 'status' igual a 'sucess'?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let { status, body } = await requester.get(`/api/users/${userId}`);

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

    });

    it("* Router Users / Metodo GET con UserID: 13.Devuelve la existencia de la propiedad 'payload'?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let { status, body } = await requester.get(`/api/users/${userId}`);

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

    });

    it("* Router Users / Metodo GET con UserID: 14.La propiedad 'payload' es un objeto?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let { status, body } = await requester.get(`/api/users/${userId}`);

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

        const payload = body.payload;
        expect(body.payload).to.be.an("object");


    });

    it("* Router Users / Metodo GET con UserID: 15.La propiedad 'payload' es un objeto con al menos un elemento?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let { status, body } = await requester.get(`/api/users/${userId}`);

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

        const payload = body.payload;
        expect(body.payload).to.be.an("object");

        expect(Object.keys(payload)).to.have.length.greaterThan(0);

    });

    it("* Router Users / Metodo GET con UserID: 16.El primero elemento del objeto 'payload' contiene el campo '_id'?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let { status, body } = await requester.get(`/api/users/${userId}`);

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

        const payload = body.payload;
        expect(body.payload).to.be.an("object");

        expect(Object.keys(payload)).to.have.length.greaterThan(0);

        expect(payload).to.have.property("_id");

    });

    it("* Router Users / Metodo GET con UserID: 17.El primero elemento del objeto 'payload' contiene el campo '_id' con un valor de Id valido?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let { status, body } = await requester.get(`/api/users/${userId}`);

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

        const payload = body.payload;
        expect(body.payload).to.be.an("object");

        expect(Object.keys(payload)).to.have.length.greaterThan(0);

        expect(payload).to.have.property("_id");

        expect(isValidObjectId(payload._id)).to.be.true;
        expect(body.payload._id).to.be.eq(userId);

    });

    it("* Router Users / Metodo GET con UserID: 18.El primero elemento del objeto 'payload' contiene los campos 'first_name (string)', 'last_name (string)', 'email (string contiene @)', 'password (string contiene $2b$), role (string)' con valores validos?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let { status, body } = await requester.get(`/api/users/${userId}`);

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

        const payload = body.payload;
        expect(body.payload).to.be.an("object");

        expect(Object.keys(payload)).to.have.length.greaterThan(0);

        expect(payload).to.have.property("_id");

        expect(isValidObjectId(payload._id)).to.be.true;
        expect(body.payload._id).to.be.eq(userId);

        expect(payload).to.have.property("first_name").that.is.a("string").and.is.not.empty;
        expect(payload).to.have.property("last_name").that.is.a("string").and.is.not.empty;
        expect(payload).to.have.property("email").that.is.a("string").and.includes("@");
        expect(payload).to.have.property("password").that.is.a("string").and.is.not.empty;
        expect(payload.password.slice(0, 4)).to.be.eq('$2b$');
        expect(payload).to.have.property("role").that.is.a("string").and.is.not.empty;

    });

    it("* Router Users / Metodo GET con UserID (No Registrado): 19.Devuelve codigo de estado 404?", async () => {

        const userId = UserID_NotFound;

        const { status } = await requester.get(`/api/users/${userId}`);

        expect(status).to.be.eq(404);

    });

    it("* Router Users / Metodo GET con UserID (No Registrado): 20.No Devuelve codigo de estado diferente a 404?", async () => {

        const userId = UserID_NotFound;

        const { status } = await requester.get(`/api/users/${userId}`);

        expect(status).to.equal(404, "Se esperaba un código de estado 404, pero se recibió " + status);

    });

    it("* Router Users / Metodo GET con UserID (No Registrado): 21.Devuelve mensaje de error 'User Not Found: User not found.***'?", async () => {

        const userId = UserID_NotFound;

        const { status, body } = await requester.get(`/api/users/${userId}`);

        expect(status).to.equal(404, "Se esperaba un código de estado 404, pero se recibió " + status);

        expect(body).to.exist;

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("User Not Found: User not found.***")
        expect(body).to.have.property("error", "User Not Found: User not found.***");
        expect(body.error).to.equal("User Not Found: User not found.***", "Se esperaba el mensaje 'User Not Found: User not found.***, pero se recibio:' " + body.error);

    });

    it("* Router Users / Metodo GET con UserID (Incorrecto): 22.Devuelve codigo de estado 400?", async () => {

        const userId = UserID_InvalidID;

        const { status } = await requester.get(`/api/users/${userId}`);

        expect(status).to.be.eq(400);

    });

    it("* Router Users / Metodo GET con UserID (Incorrecto): 23.No Devuelve codigo de estado diferente a 400?", async () => {

        const userId = UserID_InvalidID;

        const { status } = await requester.get(`/api/users/${userId}`);

        expect(status).to.equal(400, "Se esperaba un código de estado 400, pero se recibió " + status);

    });

    it("* Router Users / Metodo GET con UserID (Incorrecto): 24.Devuelve mensaje de error 'User ID Error: Invalid ID User.***'?", async () => {

        const userId = UserID_InvalidID;

        const { status, body } = await requester.get(`/api/users/${userId}`);

        expect(status).to.equal(400, "Se esperaba un código de estado 400, pero se recibió " + status);

        expect(body).to.exist;

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("User ID Error: Invalid ID User.***")
        expect(body).to.have.property("error", "User ID Error: Invalid ID User.***");
        expect(body.error).to.equal("User ID Error: Invalid ID User.***", "Se esperaba el mensaje 'User ID Error: Invalid ID User.***, pero se recibio:' " + body.error);

    });

    /*
    */

});

describe(">>> Pruebas: B.Router Users: Put", async function () {

    this.timeout(7600);

    before(async () => {
        let existe = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        if (!existe) {
            await mongoose.connection.collection("users").insertOne({
                first_name: "test",
                last_name: "test",
                email: "test@test.com",
                password: "$2b$Coder123"
            })
        } else {
        }
    });

    beforeEach(async () => { 
    });

    afterEach(async () => {        
    });

    after(async () => {        
    });

    it("* Router Users / Metodo PUT con UserID: 1.Actualiza datos del usuario 'test@test.com'?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let putUser = { first_name: "Marcos", last_name: "Padilla", password: "$2b$Coder123$" };

        let { body, headers, status } = await requester.put(`/api/users/${userId}`).send(putUser)
    });

    it("* Router Users / Metodo PUT con UserID: 2.Actualiza datos del usuario 'test@test.com', Devuelve codigo de estado 200?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let putUser = { first_name: "Marcos", last_name: "Padilla", password: "$2b$Coder123$" };

        let { body, headers, status } = await requester.put(`/api/users/${userId}`).send(putUser)

        expect(status).to.exist
        expect(status).to.be.eq(200)

        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")

        expect(body.message).to.exist
        expect(body.message).to.be.eq("User updated");

    });

    it("* Router Users / Metodo PUT con UserID: 3.Provoca error 400 si actualizo datos del usuario 'test@test.com', con algun campo no valido (passsword)?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let putUser = { first_name: "Marcos", last_name: "Padilla", passsword: "$2b$Coder123$" };

        let { body, headers, status } = await requester.put(`/api/users/${userId}`).send(putUser)

        expect(status).to.exist
        expect(status).to.equal(400, "Se esperaba un código de estado 400, pero se recibió " + status);

        expect(body.error).to.exist
        expect(body.error).to.be.eq("Update User Error: Fields need to be completed.***", "Se esperaba un mensaje de error 'Update User Error: Fields need to be completed.***', pero se recibió " + status)

    });

    it("* Router Users / Metodo PUT con UserID (No Registrado): 4.Actualiza datos.Provoca Error 404?", async () => {

        const userId = UserID_NotFound;

        let putUser = { first_name: "Marcos", last_name: "Padilla", password: "$2b$Coder123$" };

        let { body, headers, status } = await requester.put(`/api/users/${userId}`).send(putUser)

        expect(status).to.exist
        expect(status).to.equal(404, "Se esperaba un código de estado 404, pero se recibió " + status);

        expect(body.error).to.exist
        expect(body.error).to.be.eq("User Not Found: User not found.***", "Se esperaba un mensaje de error 'User Not Found: User not found.***', pero se recibió " + status)

    });

    it("* Router Users / Metodo PUT con UserID (Incorrecto): 5.Actualiza datos.Provoca Error 400?", async () => {

        const userId = UserID_InvalidID;

        let putUser = { first_name: "Marcos", last_name: "Padilla", password: "$2b$Coder123$" };

        let { body, headers, status } = await requester.put(`/api/users/${userId}`).send(putUser)

        expect(status).to.exist
        expect(status).to.equal(400, "Se esperaba un código de estado 400, pero se recibió " + status);

        expect(body.error).to.exist
        expect(body.error).to.be.eq("User ID Error: Invalid ID User.***", "Se esperaba un mensaje de error 'User ID Error: Invalid ID User.***', pero se recibió " + status)

    });

});

describe(">>> Pruebas: C.Router Users: Delete", async function () {

    this.timeout(7600);

    before(async () => {
        let existe = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        if (!existe) {
            await mongoose.connection.collection("users").insertOne({
                first_name: "test",
                last_name: "test",
                email: "test@test.com",
                password: "$2b$Coder123"
            })
        } else {
        }
    });

    beforeEach(async () => { 
    });

    afterEach(async () => {       
    });

    after(async () => {        
        // await mongoose.disconnect();
    });

    it("* Router Users / Metodo DELETE con UserID: 1.Borro usuario 'test@test.com' y devuelve codigo de estado 200?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let { body, headers, status } = await requester.delete(`/api/users/${userId}`);

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body.status).to.exist
        expect(body.status).to.be.eq("success");

        expect(body.message).to.exist
        expect(body.message).to.be.eq("User deleted");
    });

    it("* Router Users / Metodo DELETE con UserID (No Registrado): 4.Borro usuario.Provoca Error 404?", async () => {

        const userId = UserID_NotFound;

        let { body, headers, status } = await requester.delete(`/api/users/${userId}`);

        expect(status).to.exist
        expect(status).to.equal(404, "Se esperaba un código de estado 404, pero se recibió " + status);

        expect(body.error).to.exist
        expect(body.error).to.be.eq("User Not Found: User not found.***", "Se esperaba un mensaje de error 'User Not Found: User not found.***', pero se recibió " + status)

    });

    it("* Router Users / Metodo DELETE con UserID (Incorrecto): 5.Borro usuario.Provoca Error 400?", async () => {

        const userId = UserID_InvalidID;

        let { body, headers, status } = await requester.delete(`/api/users/${userId}`);

        expect(status).to.exist
        expect(status).to.equal(400, "Se esperaba un código de estado 400, pero se recibió " + status);

        expect(body.error).to.exist
        expect(body.error).to.be.eq("User ID Error: Invalid ID User.***", "Se esperaba un mensaje de error 'User ID Error: Invalid ID User.***', pero se recibió " + status)

    });

});



describe(">>> Pruebas: D.Router Users: Post Documents", async function () {

    this.timeout(7600);

    before(async () => {
        let existe = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        if (!existe) {
            await mongoose.connection.collection("users").insertOne({
                first_name: "test",
                last_name: "test",
                email: "test@test.com",
                password: "$2b$Coder123"
            })
        } else {
        }
    });

    beforeEach(async () => {
    });

    afterEach(async () => {
    });

    after(async () => {
    });

    it('* Router Users / Metodo Post con UserID: Subir documento correctamente. codigo 200', async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let pathDoc = "./test/routes/PracticaIntegradora.pdf";

        let { body, status } = await requester.post(`/api/users/${userId}/documents`)
            .field('name', 'Documento de Prueba en testing avanzado')
            .attach('documents', pathDoc);

        expect(status).to.equal(200);

        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property('status', 'success');

        expect(body.payload).to.be.an('array').that.is.not.empty;

        expect(body.payload[0]._id).to.exist
        expect(isValidObjectId(body.payload[0]._id)).to.be.true

        expect(fs.existsSync(body.payload[0].reference)).to.be.true

    });


    it('* Router Users / Metodo Post con UserID: Subir imagen correctamente. codigo 200', async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let pathImg = "./test/routes/image.jpg";

        let { body, status } = await requester.post(`/api/users/${userId}/documents`)
            .field('name', 'Imagen de Prueba en testing avanzado')
            .attach('image', pathImg);

        expect(status).to.equal(200);

        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property('status', 'success');

        expect(body.payload).to.be.an('array').that.is.not.empty;

        expect(body.payload[0]._id).to.exist
        expect(isValidObjectId(body.payload[0]._id)).to.be.true

        expect(fs.existsSync(body.payload[0].reference)).to.be.true

    });


    it('* Router Users / Metodo Post con UserID (No Registrado): Provoca Error 404 al subir imagen', async () => {

        const userId = UserID_NotFound;

        let pathImg = "./test/routes/image.jpg";

        let { body, status } = await requester.post(`/api/users/${userId}/documents`)
            .field('name', 'Imagen de Prueba en testing avanzado')
            .attach('image', pathImg);

        expect(status).to.equal(404);
        expect(body).to.have.property('error').that.includes('User Not Found');
    });



    it('* Router Users / Metodo Post con UserID (Incorrecto): Provoca Error 400 al subir imagen', async () => {

        const userId = UserID_InvalidID;

        let pathImg = "./test/routes/image.jpg";

        let { body, status } = await requester.post(`/api/users/${userId}/documents`)
            .field('name', 'Imagen de Prueba en testing avanzado')
            .attach('image', pathImg);

        expect(status).to.equal(400);
        expect(body).to.have.property('error').that.includes('User ID Error');
    });


    it('* Router Users / Metodo Post con UserID: Provoca Error 400 al subir imagen sin adjuntar archivos', async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();

        let pathImg = "";

        let { body, status } = await requester.post(`/api/users/${userId}/documents`)
            .field('name', 'Imagen de Prueba en testing avanzado')
            .attach('image', pathImg);

        expect(status).to.equal(400);

        expect(body.error).to.exist
        expect(body.error).to.be.eq("File Upload Error: File not found.***")
        expect(body).to.have.property('error', 'File Upload Error: File not found.***');
    });

});