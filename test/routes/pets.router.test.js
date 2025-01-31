import { expect } from "chai"
import { describe, it } from "mocha"
import mongoose, { isValidObjectId } from "mongoose"
import supertest from "supertest"
import fs from "fs"

await mongoose.connect("mongodb+srv://tincho83:Codin33Codin33@cluster0.hhucv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=adoptmeDev")

const requester = supertest("http://localhost:8080");

// npx mocha .\test\routes\pets.router.test.js --exit
let PetID_NotFound = "675cbe964e7fcc2c7dcb90d4";
let PetID_InvalidID = "675cbe964e7fcc2c7dcb90d33";

describe(">>> Pruebas: A.Router Pets: Get", async function () {

    this.timeout(7600);

    before(async () => {

        let existe = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        if (!existe) {
            await mongoose.connection.collection("pets").insertOne({
                name: "Tino",
                specie: "Morsa",
                birthDate: new Date().toUTCString(),
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

    it("* Router Pets / Metodo GET: 1.Devuelve codigo de estado 200?", async () => {
        let { status } = await requester.get("/api/pets");

        expect(status).to.be.eq(200);
    });


    it("* Router Pets / Metodo GET: 2.Devuelve codigo de estado diferente a 200?", async () => {
        let { status } = await requester.get("/api/pets");

        expect(status).to.equal(200, "Se esperaba un código de estado 200, pero se recibió " + status);
    });


    it("* Router Pets / Metodo GET: 3.Devuelve la propiedad 'status' igual a 'sucess'?", async () => {
        let { status, body } = await requester.get("/api/pets");

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");
    });


    it("* Router Pets / Metodo GET: 4.Devuelve la existencia de la propiedad 'payload'?", async () => {
        let { status, body } = await requester.get("/api/pets");

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");
    });



    it("* Router Pets / Metodo GET: 5.La propiedad 'payload' es un array?", async () => {
        let { status, body } = await requester.get("/api/pets");

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



    it("* Router Pets / Metodo GET: 6.La propiedad 'payload' es un array con al menos un elemento?", async () => {
        let { status, body } = await requester.get("/api/pets");

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



    it("* Router Pets / Metodo GET: 7.El primero elemento del array 'payload' contiene el campo '_id'?", async () => {
        let { status, body } = await requester.get("/api/pets");

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



    it("* Router Pets / Metodo GET: 8.El primero elemento del array 'payload' contiene el campo '_id' con un valor de Id valido?", async () => {
        let { status, body } = await requester.get("/api/pets");

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



    it("* Router Pets / Metodo GET: 9.El primero elemento del array 'payload' contiene los campos 'name (string)', 'specie (string)', 'birthDate (string)' con valores validos?", async () => {
        let { status, body } = await requester.get("/api/pets");

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

        expect(payload[0]).to.have.property("name").that.is.a("string").and.is.not.empty;
        expect(payload[0]).to.have.property("specie").that.is.a("string").and.is.not.empty;
        expect(payload[0]).to.have.property("birthDate").that.is.a("string").and.is.not.empty;
        
    });



    it("* Router Pets / Metodo GET con PetID: 10.Devuelve codigo de estado 200?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        const { status } = await requester.get(`/api/pets/${petId}`);

        expect(status).to.be.eq(200);

    });



    it("* Router Pets / Metodo GET con PetID: 11.Devuelve codigo de estado diferente a 200?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        const { status } = await requester.get(`/api/pets/${petId}`);

        expect(status).to.equal(200, "Se esperaba un código de estado 200, pero se recibió " + status);

    });


    it("* Router Pets / Metodo GET con PetID: 12.Devuelve la propiedad 'status' igual a 'sucess'?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { status, body } = await requester.get(`/api/pets/${petId}`);

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

    });


    it("* Router Pets / Metodo GET con PetID: 13.Devuelve la existencia de la propiedad 'payload'?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { status, body } = await requester.get(`/api/pets/${petId}`);

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

    });



    it("* Router Pets / Metodo GET con PetID: 14.La propiedad 'payload' es un objeto?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { status, body } = await requester.get(`/api/pets/${petId}`);

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


    it("* Router Pets / Metodo GET con PetID: 15.La propiedad 'payload' es un objeto con al menos un elemento?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { status, body } = await requester.get(`/api/pets/${petId}`);

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



    it("* Router Pets / Metodo GET con PetID: 16.El primero elemento del objeto 'payload' contiene el campo '_id'?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { status, body } = await requester.get(`/api/pets/${petId}`);

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



    it("* Router Pets / Metodo GET con PetID: 17.El primero elemento del objeto 'payload' contiene el campo '_id' con un valor de Id valido?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { status, body } = await requester.get(`/api/pets/${petId}`);

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
        expect(body.payload._id).to.be.eq(petId);

    });



    it("* Router Pets / Metodo GET con PetID: 18.El primero elemento del objeto 'payload' contiene los campos 'first_name (string)', 'last_name (string)', 'email (string contiene @)', 'password (string contiene $2b$), role (string)' con valores validos?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { status, body } = await requester.get(`/api/pets/${petId}`);

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
        expect(body.payload._id).to.be.eq(petId);

        expect(payload).to.have.property("name").that.is.a("string").and.is.not.empty;
        expect(payload).to.have.property("specie").that.is.a("string").and.is.not.empty;
        expect(payload).to.have.property("birthDate").that.is.a("string").and.is.not.empty;
        
    });



    it("* Router Pets / Metodo GET con PetID (No Registrado): 19.Devuelve codigo de estado 404?", async () => {

        const petId = PetID_NotFound;

        const { status } = await requester.get(`/api/pets/${petId}`);

        expect(status).to.be.eq(404);

    });



    it("* Router Pets / Metodo GET con PetID (No Registrado): 20.Devuelve codigo de estado diferente a 404?", async () => {

        const petId = PetID_NotFound;

        const { status } = await requester.get(`/api/pets/${petId}`);

        expect(status).to.equal(404, "Se esperaba un código de estado 404, pero se recibió " + status);

    });



    it("* Router Pets / Metodo GET con PetID (No Registrado): 21.Devuelve mensaje de error 'Pet not found: Pet not found.***'?", async () => {

        const petId = PetID_NotFound;

        const { status, body } = await requester.get(`/api/pets/${petId}`);

        expect(status).to.equal(404, "Se esperaba un código de estado 404, pero se recibió " + status);

        expect(body).to.exist;

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("Pet not found: Pet not found.***")
        expect(body).to.have.property("error", "Pet not found: Pet not found.***");
        expect(body.error).to.equal("Pet not found: Pet not found.***", "Se esperaba el mensaje 'Pet not found: Pet not found.***', pero se recibio:' " + body.error);

    });


    it("* Router Pets / Metodo GET con PetID (Incorrecto): 22.Devuelve codigo de estado 400?", async () => {

        const petId = PetID_InvalidID;

        const { status } = await requester.get(`/api/pets/${petId}`);

        expect(status).to.be.eq(400);

    });

    it("* Router Pets / Metodo GET con PetID (Incorrecto): 23.Devuelve codigo de estado diferente a 400?", async () => {

        const petId = PetID_InvalidID;

        const { status } = await requester.get(`/api/pets/${petId}`);

        expect(status).to.equal(400, "Se esperaba un código de estado 400, pero se recibió " + status);

    });

    it("* Router Pets / Metodo GET con PetID (Incorrecto): 24.Devuelve mensaje de error 'Pet ID Error: Invalid ID Pet.***'?", async () => {

        const petId = PetID_InvalidID;

        const { status, body } = await requester.get(`/api/pets/${petId}`);

        expect(status).to.equal(400, "Se esperaba un código de estado 400, pero se recibió " + status);

        expect(body).to.exist;

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("Pet ID Error: Invalid ID Pet.***")
        expect(body).to.have.property("error", "Pet ID Error: Invalid ID Pet.***");
        expect(body.error).to.equal("Pet ID Error: Invalid ID Pet.***", "Se esperaba el mensaje 'Pet ID Error: Invalid ID Pet.***', pero se recibio:' " + body.error);

    });

});


describe(">>> Pruebas: B.Router Pets: Put", async function () {

    this.timeout(7600);

    before(async () => {
        let existe = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        if (!existe) {
            await mongoose.connection.collection("pets").insertOne({
                name: "Tino",
                specie: "Morsa",
                birthDate: new Date().toUTCString(),
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

    it("* Router Pets / Metodo PUT con PetID: 1.Actualiza datos de la mascota 'Tino'?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let putPet = { name: "Tin", specie: "Morsa", birthDate: new Date().toUTCString() };

        let { body, headers, status } = await requester.put(`/api/pets/${petId}`).send(putPet)

        putPet = { name: "Tino", specie: "Morsa" };
        let normalizar = await requester.put(`/api/pets/${petId}`).send(putPet)
    });


    it("* Router Pets / Metodo PUT con PetID: 2.Actualiza datos de la mascota 'Tino', Devuelve codigo de estado 200?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let putPet = { name: "Tin", specie: "Morsa", birthDate: new Date().toUTCString() };

        let { body, headers, status } = await requester.put(`/api/pets/${petId}`).send(putPet)

        expect(status).to.exist
        expect(status).to.be.eq(200)

        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")

        expect(body.message).to.exist
        expect(body.message).to.be.eq("pet updated");

        putPet = { name: "Tino", specie: "Morsa" };
        let normalizar = await requester.put(`/api/pets/${petId}`).send(putPet)

    });


    it("* Router Pets / Metodo PUT con PetID: 3.Provoca error 400 si actualizo datos de la mascota 'Tino', con algun campo no valido (namme)?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let putPet = { namme: "Tin", specie: "Morsa", birthDate: new Date().toUTCString() };

        let { body, headers, status } = await requester.put(`/api/pets/${petId}`).send(putPet)

        expect(status).to.exist
        expect(status).to.equal(400, "Se esperaba un código de estado 400, pero se recibió " + status);

        expect(body.error).to.exist
        expect(body.error).to.be.eq("Update Pet Error: Fields need to be completed.***", "Se esperaba un mensaje de error 'Update Pet Error: Fields need to be completed.***', pero se recibió " + status)

    });



    it("* Router Pets / Metodo PUT con PetID (No Registrado): 4.Actualiza datos.Provoca Error 404?", async () => {

        const petId = PetID_NotFound;

        let putPet = { name: "Tin", specie: "Morsa", birthDate: new Date().toUTCString() };

        let { body, headers, status } = await requester.put(`/api/pets/${petId}`).send(putPet)

        expect(status).to.exist
        expect(status).to.equal(404, "Se esperaba un código de estado 404, pero se recibió " + status);

        expect(body.error).to.exist
        expect(body.error).to.be.eq("Pet not found: Pet not found.***", "Se esperaba un mensaje de error 'Pet not found: Pet not found.***', pero se recibió " + status)

    });



    it("* Router Pets / Metodo PUT con PetID (Incorrecto): 5.Actualiza datos.Provoca Error 400?", async () => {

        const petId = PetID_InvalidID;

        let putPet = { name: "Tin", specie: "Morsa", birthDate: new Date().toUTCString() };

        let { body, headers, status } = await requester.put(`/api/pets/${petId}`).send(putPet)

        expect(status).to.exist
        expect(status).to.equal(400, "Se esperaba un código de estado 400, pero se recibió " + status);

        expect(body.error).to.exist
        expect(body.error).to.be.eq("Pet ID Error: Invalid ID Pet.***", "Se esperaba un mensaje de error 'Pet ID Error: Invalid ID Pet.***', pero se recibió " + status)

    });


});


describe(">>> Pruebas: C.Router Pets: Post", async function () {

    this.timeout(7600);

    before(async () => {
        let existe = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        if (!existe) {
            await mongoose.connection.collection("pets").insertOne({
                name: "Tino",
                specie: "Morsa",
                birthDate: new Date().toUTCString(),
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

    let pathImg = "./test/routes/image.jpg";

    it("* Router Pets / Metodo POST: 1.Registra una mascota 'Tini' y devuelve codigo de estado 200?", async () => {
        let petMock = { name: "Tini", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, headers, status } = await requester.post("/api/pets").send(petMock)

        expect(status).to.exist
        expect(status).to.be.eq(200);

    });

    it("* Router Pets / Metodo POST: 2.Registro una mascota 'Tina' y devuelve codigo de estado diferente a 200?", async () => {
        let petMock = { name: "Tina", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, headers, status } = await requester.post("/api/pets").send(petMock)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

    });

    it("* Router Pets / Metodo POST: 3.Registro una mascota 'Sina' y devuelve la propiedad 'status' igual a 'sucess'?", async () => {
        let petMock = { name: "Sina", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, headers, status } = await requester.post("/api/pets").send(petMock)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

    });

    it("* Router Pets / Metodo POST: 4.Registro una mascota 'Sini' y devuelve la existencia de la propiedad 'payload'?", async () => {
        let petMock = { name: "Sini", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, headers, status } = await requester.post("/api/pets").send(petMock)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

    });

    it("* Router Pets / Metodo POST: 5.Registro una mascota 'Sino' y la propiedad 'payload' es un objeto?", async () => {
        let petMock = { name: "Sino", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, headers, status } = await requester.post("/api/pets").send(petMock)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

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

    it("* Router Pets / Metodo POST: 6.Registro una mascota 'Rina' y la propiedad 'payload' es un objeto con al menos un elemento?", async () => {
        let petMock = { name: "Rina", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, headers, status } = await requester.post("/api/pets").send(petMock)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

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

    it("* Router Pets / Metodo POST: 7.Registro una mascota 'Rino' y la propiedad 'payload' contiene el campo '_id'?", async () => {
        let petMock = { name: "Rino", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, headers, status } = await requester.post("/api/pets").send(petMock)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

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

    it("* Router Pets / Metodo POST: 8.Registro una mascota 'Rini' y la propiedad 'payload' contiene el campo '_id' con un valor de Id valido?", async () => {
        let petMock = { name: "Rini", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, headers, status } = await requester.post("/api/pets").send(petMock)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

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

    });

    it("* Router Pets / Metodo POST: 9.Registro una mascota 'Dina' y la propiedad 'payload' contiene los campos 'name (string)', 'specie (string)', 'birthDate (string)' con valores validos?", async () => {
        let petMock = { name: "Dina", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, headers, status } = await requester.post("/api/pets").send(petMock)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

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

        expect(payload).to.have.property("name").that.is.a("string").and.is.not.empty;
        expect(payload).to.have.property("specie").that.is.a("string").and.is.not.empty;
        expect(payload).to.have.property("birthDate").that.is.a("string").and.is.not.empty;
        
    });

    it("* Router Pets / Metodo POST: 10.Registra una mascota 'Dini' y provoca error 400 con campo no valido (namme)?", async () => {
        let petMock = { namme: "Dini", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, headers, status } = await requester.post("/api/pets").send(petMock)

        expect(status).to.exist
        expect(status).to.be.eq(400, "Se esperaba un código de estado 400, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("Create Pet Error: Fields need to be completed.***")
        expect(body).to.have.property("error", "Create Pet Error: Fields need to be completed.***");

    });


    it("* Router Pets / Metodo POST (con Imagen): 11.Registra una mascota 'Bata' y devuelve codigo de estado 200?", async () => {
        let petMock = { name: "Bata", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, status } = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", pathImg);

        expect(status).to.exist
        expect(status).to.be.eq(200);

    });



    it("* Router Pets / Metodo POST (con Imagen): 12.Registro una mascota 'Beta' y devuelve codigo de estado diferente a 200?", async () => {
        let petMock = { name: "Beta", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, status } = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", pathImg);

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

    });


    it("* Router Pets / Metodo POST (con Imagen): 13.Registro una mascota 'Bita' y devuelve la propiedad 'status' igual a 'sucess'?", async () => {
        let petMock = { name: "Bita", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, status } = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", pathImg);

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

    });

  

    it("* Router Pets / Metodo POST (con Imagen): 14.Registro una mascota 'Bota' y devuelve la existencia de la propiedad 'payload'?", async () => {
        let petMock = { name: "Bota", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, status } = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", pathImg);

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

    });



    it("* Router Pets / Metodo POST (con Imagen): 15.Registro una mascota 'Buta' y la propiedad 'payload' es un objeto?", async () => {
        let petMock = { name: "Buta", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, status } = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", pathImg);

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

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



    it("* Router Pets / Metodo POST (con Imagen): 16.Registro una mascota 'Bate' y la propiedad 'payload' es un objeto con al menos un elemento?", async () => {
        let petMock = { name: "Bate", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, status } = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", pathImg);

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

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



    it("* Router Pets / Metodo POST (con Imagen): 17.Registro una mascota 'Bete' y la propiedad 'payload' contiene el campo '_id'?", async () => {
        let petMock = { name: "Bete", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, status } = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", pathImg);

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

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



    it("* Router Pets / Metodo POST (con Imagen): 18.Registro una mascota 'Bite' y la propiedad 'payload' contiene el campo '_id' con un valor de Id valido?", async () => {
        let petMock = { name: "Bite", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, status } = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", pathImg);

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

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

    });



    it("* Router Pets / Metodo POST (con Imagen): 19.Registro una mascota 'Bote' y la propiedad 'payload' contiene los campos 'name (string)', 'specie (string)', 'birthDate (string)' con valores validos?", async () => {
        let petMock = { name: "Bote", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, status } = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", pathImg);

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

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

        expect(payload).to.have.property("name").that.is.a("string").and.is.not.empty;
        expect(payload).to.have.property("specie").that.is.a("string").and.is.not.empty;
        expect(payload).to.have.property("birthDate").that.is.a("string").and.is.not.empty;
        

    });


    it("* Router Pets / Metodo POST (con Imagen): 20.Registra una mascota 'Bute' y provoca error 400 con campo no valido (namme)?", async () => {
        let petMock = { namme: "Bute", specie: "Morsa", birthDate: new Date().toUTCString() }

        let { body, status } = await requester.post("/api/pets/withimage")
            .field("namme", petMock.namme)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", pathImg);

        expect(status).to.exist
        expect(status).to.be.eq(400, "Se esperaba un código de estado 400, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("Create Pet Error: Fields need to be completed.***")
        expect(body).to.have.property("error", "Create Pet Error: Fields need to be completed.***");

    });


});


describe(">>> Pruebas: D.Router Pets: Delete", async function () {

    this.timeout(7600);

    before(async () => {
        let existe = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        if (!existe) {
            await mongoose.connection.collection("pets").insertOne({
                name: "Tino",
                specie: "Morsa",
                birthDate: new Date().toUTCString(),
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

    it("* Router Pets / Metodo DELETE con PetID: 1.Borro mascota 'Tino' y devuelve codigo de estado 200?", async () => {

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { body, headers, status } = await requester.delete(`/api/pets/${petId}`);

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body.status).to.exist
        expect(body.status).to.be.eq("success");

        expect(body.message).to.exist
        expect(body.message).to.be.eq("pet deleted");
    });


    it("* Router Pets / Metodo DELETE con PetID (No Registrado): 4.Borro mascota.Provoca Error 404?", async () => {

        const petId = PetID_NotFound;

        let { body, headers, status } = await requester.delete(`/api/pets/${petId}`);

        expect(status).to.exist
        expect(status).to.equal(404, "Se esperaba un código de estado 404, pero se recibió " + status);

        expect(body.error).to.exist
        expect(body.error).to.be.eq("Pet not found: Pet not found.***", "Se esperaba un mensaje de error 'Pet not found: Pet not found.***', pero se recibió " + status)

    });


    it("* Router Pets / Metodo DELETE con PetID (Incorrecto): 5.Borro mascota.Provoca Error 400?", async () => {

        const petId = PetID_InvalidID;

        let { body, headers, status } = await requester.delete(`/api/pets/${petId}`);

        expect(status).to.exist
        expect(status).to.equal(400, "Se esperaba un código de estado 400, pero se recibió " + status);

        expect(body.error).to.exist
        expect(body.error).to.be.eq("Pet ID Error: Invalid ID Pet.***", "Se esperaba un mensaje de error 'Pet ID Error: Invalid ID Pet.***', pero se recibió " + status)

    });

    it("* Router Pets / Metodo DELETE con PetID: 6.Borrado masivo de mascotas de prueba 'Tina', 'Tini', 'Rino', 'Rina', etc?", async () => {

        let deleteResult = await mongoose.connection.collection("pets").deleteMany({ specie: "Morsa" });

        expect(deleteResult).to.exist;
        expect(deleteResult.deletedCount).to.be.greaterThan(0);


    });

});
