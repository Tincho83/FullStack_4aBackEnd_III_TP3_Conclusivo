import { expect } from "chai"
import { describe, it } from "mocha"
import mongoose, { isValidObjectId } from "mongoose"
import supertest from "supertest"
import fs from "fs"

await mongoose.connect("mongodb+srv://tincho83:Codin33Codin33@cluster0.hhucv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=adoptmeDev")

const requester = supertest("http://localhost:8080");

// npx mocha .\test\routes\adoption.router.test.js --exit
let AdoptionID_NotFound = "6765f2cb316e540ecd5ed90c";
let AdoptionID_InvalidID = "6765f2cb316e540ecd5ed90cc";

let UserID_NotFound = "675ce371995b6f225a0df6d3";
let UserID_InvalidID = "675ce371995b6f225a0df6d33";

let PetID_NotFound = "6765ed36759fb673ddd5f824";
let PetID_InvalidID = "6765ed36759fb673ddd5f8244";


describe(">>> Pruebas: A.Router Adoptions: Post", async function () {

    this.timeout(7600);

    before(async () => {
        let existep = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        if (!existep) {
            await mongoose.connection.collection("pets").insertOne({
                name: "Tino",
                specie: "Morsa",
                birthDate: new Date().toUTCString(),
            })
        } else {
        }

        let existeu = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        if (!existeu) {
            await mongoose.connection.collection("users").insertOne({
                first_name: "test",
                last_name: "test",
                email: "test@test.com",
                password: "$2b$Coder123"
            })
        }

    });

    beforeEach(async () => { // Acciones antes de cada prueba it
    });

    afterEach(async () => { // Acciones despues de cada prueba it 

        // Blanqueo usuarios de prueba
        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();
        let putPet = { name: "Tino", specie: "Morsa", birthDate: new Date().toUTCString(), adopted: false };
        let procp = await requester.put(`/api/pets/${petId}`).send(putPet)

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();
        let putUser = { first_name: "test", last_name: "test", email: "test@test.com", password: "$2b$Coder123", pets: [] };
        let procu = await requester.put(`/api/users/${userId}`).send(putUser)


    });

    after(async () => { // Acciones despues de todas las pruebas
        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();
        await mongoose.connection.collection("adoptions").deleteMany({ owner: mongoose.Types.ObjectId(userId) });
        //await mongoose.disconnect(); // Cierra la conexión a MongoDB 
    });


    it("* Router Adoptions / Metodo POST: 1.Registra una adopcion (usuario: test@test.com, mascota: 'Tino') y devuelve codigo de estado 200?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ "email": "test@test.com" });
        const userId = usertest._id.toString();

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { body, headers, status } = await requester.post(`/api/adoptions/${userId}/${petId}`)

        expect(status).to.exist
        expect(status).to.be.eq(200);

    });


    it("* Router Adoptions / Metodo POST: 2.Registra una adopcion (usuario: test@test.com, mascota: 'Tino') y NO devuelve codigo de estado diferente a 200?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ "email": "test@test.com" });
        const userId = usertest._id.toString();

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { body, headers, status } = await requester.post(`/api/adoptions/${userId}/${petId}`)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

    });


    it("* Router Adoptions / Metodo POST: 3.Registra una adopcion (usuario: test@test.com, mascota: 'Tino') y devuelve la propiedad 'status' igual a 'success'?", async () => {
        let usertest = await mongoose.connection.collection("users").findOne({ "email": "test@test.com" });
        const userId = usertest._id.toString();

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { body, headers, status } = await requester.post(`/api/adoptions/${userId}/${petId}`)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

    });


    it("* Router Adoptions / Metodo POST: 4.Registra una adopcion (usuario: test@test.com, mascota: 'Tino') y devuelve la existencia de la propiedad 'message' igual a 'Pet adopted'?", async () => {
        let usertest = await mongoose.connection.collection("users").findOne({ "email": "test@test.com" });
        const userId = usertest._id.toString();

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { body, headers, status } = await requester.post(`/api/adoptions/${userId}/${petId}`)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.message).to.be.ok
        expect(body.message).to.exist
        expect(body.message).to.be.eq("Pet adopted");
        expect(body).to.have.property("message", "Pet adopted");

    });


    it("* Router Adoptions / Metodo POST: 5.Registra una adopcion (usuario: test@test.com, mascota: 'Tino') y devuelve de PetID la propiedad adopted en true'?", async () => {
        let usertest = await mongoose.connection.collection("users").findOne({ "email": "test@test.com" });
        const userId = usertest._id.toString();

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let { body, headers, status } = await requester.post(`/api/adoptions/${userId}/${petId}`)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.message).to.be.ok
        expect(body.message).to.exist
        expect(body.message).to.be.eq("Pet adopted");
        expect(body).to.have.property("message", "Pet adopted");

        pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        let adoptedPettest = pettest.adopted.toString();

        expect(adoptedPettest).to.be.ok
        expect(adoptedPettest).to.exist
        expect(adoptedPettest).to.be.eq("true");

    });


    it("* Router Adoptions / Metodo POST: 6.Registra una adopcion (usuario: test@test.com, mascota: 'Tino') y devuelve de UserID si el array pets tiene el PetID adoptado'?", async () => {
        let usertest = await mongoose.connection.collection("users").findOne({ "email": "test@test.com" });
        let userId = usertest._id.toString();

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        let petId = pettest._id.toString();

        let { body, headers, status } = await requester.post(`/api/adoptions/${userId}/${petId}`)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.message).to.be.ok
        expect(body.message).to.exist
        expect(body.message).to.be.eq("Pet adopted");
        expect(body).to.have.property("message", "Pet adopted");

        pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        petId = pettest._id.toString();
        let adoptedPettest = pettest.adopted.toString();

        expect(adoptedPettest).to.be.ok
        expect(adoptedPettest).to.exist
        expect(adoptedPettest).to.be.eq("true");
        expect(pettest.adopted).to.be.true;


        usertest = await mongoose.connection.collection("users").findOne({ "email": "test@test.com" });
        //usertest = await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(userId) });
        userId = usertest._id.toString();

        expect(usertest).to.exist;
        expect(usertest.pets).to.be.an("array", "Se esperaba que 'pets' fuera un array");
        expect(usertest.pets.length).to.be.greaterThan(0, "El array 'pets' deberia contener al menos un elemento");

        const petIds = usertest.pets.map(pet => pet._id.toString());
        expect(petIds).to.include(petId, "El array 'pets' no contiene el PetID adoptado");

    });


    it("* Router Adoptions / Metodo POST: 7.Registra una adopcion (usuario: test@test.com, mascota: 'Tino') y devuelve AdoptionID para comprobar userID y petID?", async () => {
        let usertest = await mongoose.connection.collection("users").findOne({ "email": "test@test.com" });
        let userId = usertest._id.toString();

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        let petId = pettest._id.toString();

        let { body, headers, status } = await requester.post(`/api/adoptions/${userId}/${petId}`)

        expect(status).to.exist
        expect(status).to.be.eq(200, "Se esperaba un código de estado 200, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.message).to.be.ok
        expect(body.message).to.exist
        expect(body.message).to.be.eq("Pet adopted");
        expect(body).to.have.property("message", "Pet adopted");

        pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        petId = pettest._id.toString();
        let adoptedPettest = pettest.adopted.toString();

        expect(adoptedPettest).to.be.ok
        expect(adoptedPettest).to.exist
        expect(adoptedPettest).to.be.eq("true");
        expect(pettest.adopted).to.be.true;


        usertest = await mongoose.connection.collection("users").findOne({ "email": "test@test.com" });
        //usertest = await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(userId) });
        userId = usertest._id.toString();

        expect(usertest).to.exist;
        expect(usertest.pets).to.be.an("array", "Se esperaba que 'pets' fuera un array");
        expect(usertest.pets.length).to.be.greaterThan(0, "El array 'pets' deberia contener al menos un elemento");

        const petIds = usertest.pets.map(pet => pet._id.toString());
        expect(petIds).to.include(petId, "El array 'pets' no contiene el PetID adoptado");

        const adoption = await mongoose.connection.collection("adoptions").findOne({ owner: mongoose.Types.ObjectId(userId), pet: mongoose.Types.ObjectId(petId) });

        expect(adoption).to.exist;
        expect(adoption.owner.toString()).to.be.eq(userId, "El owner en la adopción no coincide con el userID");
        expect(adoption.pet.toString()).to.be.eq(petId, "El pet en la adopción no coincide con el petID");

    });


    it("* Router Adoptions / Metodo POST: 8.Registra una adopcion (Usuario: No Regitrado) y Provoca Error 404?", async () => {
        let userId = UserID_NotFound;

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        let petId = pettest._id.toString();

        let { body, headers, status } = await requester.post(`/api/adoptions/${userId}/${petId}`)

        expect(status).to.exist
        expect(status).to.be.eq(404, "Se esperaba un código de estado 404, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("User Not Found: User not found.***")
        expect(body).to.have.property("error", "User Not Found: User not found.***");

    });

    it("* Router Adoptions / Metodo POST: 9.Registra una adopcion (Mascota: No Regitrada) y Provoca Error 404?", async () => {
        let usertest = await mongoose.connection.collection("users").findOne({ "email": "test@test.com" });
        let userId = usertest._id.toString();

        let petId = PetID_NotFound;

        let { body, headers, status } = await requester.post(`/api/adoptions/${userId}/${petId}`)

        expect(status).to.exist
        expect(status).to.be.eq(404, "Se esperaba un código de estado 404, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("Pet not found: Pet not found.***")
        expect(body).to.have.property("error", "Pet not found: Pet not found.***");

    });

    it("* Router Adoptions / Metodo POST: 10.Registra una adopcion (Usuario: Incorrecto) y Provoca Error 400?", async () => {
        let userId = UserID_InvalidID;

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        let petId = pettest._id.toString();

        let { body, headers, status } = await requester.post(`/api/adoptions/${userId}/${petId}`)

        expect(status).to.exist
        expect(status).to.be.eq(400, "Se esperaba un código de estado 400, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("User ID Error: Invalid ID User.***")
        expect(body).to.have.property("error", "User ID Error: Invalid ID User.***");

    });

    it("* Router Adoptions / Metodo POST: 11.Registra una adopcion (Mascota: Incorrecto) y Provoca Error 400?", async () => {
        let usertest = await mongoose.connection.collection("users").findOne({ "email": "test@test.com" });
        let userId = usertest._id.toString();

        let petId = PetID_InvalidID;

        let { body, headers, status } = await requester.post(`/api/adoptions/${userId}/${petId}`)

        expect(status).to.exist
        expect(status).to.be.eq(400, "Se esperaba un código de estado 400, pero se recibió " + status)

        expect(body).to.exist;

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("Pet ID Error: Invalid ID Pet.***")
        expect(body).to.have.property("error", "Pet ID Error: Invalid ID Pet.***");

    });


});


describe(">>> Pruebas: B.Router Adoptions: Get", async function () {

    this.timeout(7600);

    before(async () => {
        let existep = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        if (!existep) {
            await mongoose.connection.collection("pets").insertOne({
                name: "Tino",
                specie: "Morsa",
                birthDate: new Date().toUTCString(),
            })
        }

        let existeu = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        if (!existeu) {
            await mongoose.connection.collection("users").insertOne({
                first_name: "test",
                last_name: "test",
                email: "test@test.com",
                password: "$2b$Coder123"
            })
        }

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" });
        const userId = usertest._id.toString();

        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();

        let existea = await mongoose.connection.collection("adoptions").findOne({ owner: new mongoose.Types.ObjectId(userId) })
        if (!existea) {
            let adopt= await requester.post(`/api/adoptions/${userId}/${petId}`)
        }

       

    });

    beforeEach(async () => { // Acciones antes de cada prueba it
    });

    afterEach(async () => { // Acciones despues de cada prueba it
        let pettest = await mongoose.connection.collection("pets").findOne({ name: "Tino" })
        const petId = pettest._id.toString();
        let putPet = { name: "Tino", specie: "Morsa", birthDate: new Date().toUTCString(), adopted: false };
        let procp = await requester.put(`/api/pets/${petId}`).send(putPet)

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        const userId = usertest._id.toString();
        let putUser = { first_name: "test", last_name: "test", email: "test@test.com", password: "$2b$Coder123", pets: [] };
        let procu = await requester.put(`/api/users/${userId}`).send(putUser)
    });

    after(async () => { // Acciones despues de todas las pruebas 

        //await mongoose.connection.collection("users").deleteMany({ email: "test@test.com" });
        //await mongoose.connection.collection("pets").deleteMany({ name: "Tino" });

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" });
        const userId = usertest._id.toString();
        
        let adoptiontest = await mongoose.connection.collection("adoptions").findOne({ owner: mongoose.Types.ObjectId(userId) })
        const adoptionId = adoptiontest._id.toString();

        let stat = await requester.delete(`/api/pets/${adoptionId}`);
        

        //await mongoose.disconnect(); // Cierra la conexión a MongoDB   
    });

    this.timeout(7600);

    it("* Router Adoptions / Metodo GET: 1.Devuelve codigo de estado 200?", async () => {
        let { status } = await requester.get("/api/adoptions");

        expect(status).to.be.eq(200);
    });


    it("* Router Adoptions / Metodo GET: 2.No Devuelve codigo de estado diferente a 200?", async () => {
        let { status } = await requester.get("/api/adoptions");

        expect(status).to.equal(200, "Se esperaba un código de estado 200, pero se recibió " + status);
    });


    it("* Router Adoptions / Metodo GET: 3.Devuelve la propiedad 'status' igual a 'sucess'?", async () => {
        let { status, body } = await requester.get("/api/adoptions");

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");
    });


    it("* Router Adoptions / Metodo GET: 4.Devuelve la existencia de la propiedad 'payload'?", async () => {
        let { status, body } = await requester.get("/api/adoptions");

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");
    });


    it("* Router Adoptions / Metodo GET: 5.La propiedad 'payload' es un array?", async () => {
        let { status, body } = await requester.get("/api/adoptions");

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


    it("* Router Adoptions / Metodo GET: 6.La propiedad 'payload' es un array con al menos un elemento?", async () => {
        let { status, body } = await requester.get("/api/adoptions");

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


    it("* Router Adoptions / Metodo GET: 7.El primero elemento del array 'payload' contiene el campo '_id'?", async () => {
        let { status, body } = await requester.get("/api/adoptions");

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


    it("* Router Adoptions / Metodo GET: 8.El primero elemento del array 'payload' contiene el campo '_id' con un valor de Id valido?", async () => {
        let { status, body } = await requester.get("/api/adoptions");

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


    it("* Router Adoptions / Metodo GET: 9.El primero elemento del array 'payload' contiene los campos 'owner (string)', 'pet (string)' con valores validos?", async () => {
        let { status, body } = await requester.get("/api/adoptions");

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

        expect(payload[0]).to.have.property("owner").that.is.a("string").and.is.not.empty;
        expect(payload[0]).to.have.property("pet").that.is.a("string").and.is.not.empty;

    });


    it("* Router Adoptions / Metodo GET con AdoptionID: 10.Devuelve codigo de estado 200?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" });
        const userId = usertest._id.toString();
        
        let adoptiontest = await mongoose.connection.collection("adoptions").findOne({ owner: mongoose.Types.ObjectId(userId) })
        const adoptionId = adoptiontest._id.toString();

        const { status } = await requester.get(`/api/adoptions/${adoptionId}`);

        expect(status).to.be.eq(200);

    });


    it("* Router Adoptions / Metodo GET con AdoptionID: 11.No Devuelve codigo de estado diferente a 200?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" });
        const userId = usertest._id.toString();
        
        let adoptiontest = await mongoose.connection.collection("adoptions").findOne({ owner: mongoose.Types.ObjectId(userId) })
        const adoptionId = adoptiontest._id.toString();

        const { status } = await requester.get(`/api/adoptions/${adoptionId}`);

        expect(status).to.equal(200, "Se esperaba un código de estado 200, pero se recibió " + status);

    });


    it("* Router Adoptions / Metodo GET con AdoptionID: 12.Devuelve la propiedad 'status' igual a 'sucess'?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" });
        const userId = usertest._id.toString();
        
        let adoptiontest = await mongoose.connection.collection("adoptions").findOne({ owner: mongoose.Types.ObjectId(userId) })
        const adoptionId = adoptiontest._id.toString();

        const { status, body } = await requester.get(`/api/adoptions/${adoptionId}`);

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

    });


    it("* Router Adoptions / Metodo GET con AdoptionID: 13.Devuelve la existencia de la propiedad 'payload'?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" });
        const userId = usertest._id.toString();
        
        let adoptiontest = await mongoose.connection.collection("adoptions").findOne({ owner: mongoose.Types.ObjectId(userId) })
        const adoptionId = adoptiontest._id.toString();

        const { status, body } = await requester.get(`/api/adoptions/${adoptionId}`);

        expect(status).to.be.eq(200)

        expect(body).to.exist;

        expect(body.status).to.be.ok
        expect(body.status).to.exist
        expect(body.status).to.be.eq("success")
        expect(body).to.have.property("status", "success");

        expect(body.payload).to.exist
        expect(body).to.have.property("payload");

    });


    it("* Router Adoptions / Metodo GET con AdoptionID: 14.La propiedad 'payload' es un objeto?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" });
        const userId = usertest._id.toString();
        
        let adoptiontest = await mongoose.connection.collection("adoptions").findOne({ owner: mongoose.Types.ObjectId(userId) })
        const adoptionId = adoptiontest._id.toString();

        const { status, body } = await requester.get(`/api/adoptions/${adoptionId}`);

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


    it("* Router Adoptions / Metodo GET con AdoptionID: 15.La propiedad 'payload' es un objeto con al menos un elemento?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" });
        const userId = usertest._id.toString();
        
        let adoptiontest = await mongoose.connection.collection("adoptions").findOne({ owner: mongoose.Types.ObjectId(userId) })
        const adoptionId = adoptiontest._id.toString();

        const { status, body } = await requester.get(`/api/adoptions/${adoptionId}`);

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


    it("* Router Adoptions / Metodo GET con AdoptionID: 16.El primero elemento del objeto 'payload' contiene el campo '_id'?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" });
        const userId = usertest._id.toString();
        
        let adoptiontest = await mongoose.connection.collection("adoptions").findOne({ owner: mongoose.Types.ObjectId(userId) })
        const adoptionId = adoptiontest._id.toString();

        const { status, body } = await requester.get(`/api/adoptions/${adoptionId}`);

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


    it("* Router Adoptions / Metodo GET con AdoptionID: 17.El primero elemento del objeto 'payload' contiene el campo '_id' con un valor de Id valido?", async () => {
        
        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" });
        const userId = usertest._id.toString();
        
        let adoptiontest = await mongoose.connection.collection("adoptions").findOne({ owner: mongoose.Types.ObjectId(userId) })
        const adoptionId = adoptiontest._id.toString();

        const { status, body } = await requester.get(`/api/adoptions/${adoptionId}`);

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
        expect(body.payload._id).to.be.eq(adoptionId);

    });


    it("* Router Adoptions / Metodo GET con AdoptionID: 18.El primero elemento del objeto 'payload' contiene los campos 'owner (string)', 'pet (string)' con valores validos?", async () => {

        let usertest = await mongoose.connection.collection("users").findOne({ email: "test@test.com" });
        const userId = usertest._id.toString();
        
        let adoptiontest = await mongoose.connection.collection("adoptions").findOne({ owner: mongoose.Types.ObjectId(userId) })
        const adoptionId = adoptiontest._id.toString();

        const { status, body } = await requester.get(`/api/adoptions/${adoptionId}`);

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
        expect(body.payload._id).to.be.eq(adoptionId);

        expect(payload).to.have.property("owner").that.is.a("string").and.is.not.empty;
        expect(payload).to.have.property("pet").that.is.a("string").and.is.not.empty;

    });


    it("* Router Adoptions / Metodo GET con AdoptionID (No Registrado): 19.Devuelve codigo de estado 404?", async () => {

        const adoptionId = AdoptionID_NotFound;

        const { status } = await requester.get(`/api/adoptions/${adoptionId}`);

        expect(status).to.be.eq(404);

    });



    it("* Router Adoptions / Metodo GET con AdoptionID (No Registrado): 20.No Devuelve codigo de estado diferente a 404?", async () => {

        const adoptionId = AdoptionID_NotFound;

        const { status } = await requester.get(`/api/adoptions/${adoptionId}`);

        expect(status).to.equal(404, "Se esperaba un código de estado 404, pero se recibió " + status);

    });



    it("* Router Adoptions / Metodo GET con AdoptionID (No Registrado): 21.Devuelve mensaje de error 'Adoption not found.: Adoption not found.***'?", async () => {

        const adoptionId = AdoptionID_NotFound;

        const { status, body } = await requester.get(`/api/adoptions/${adoptionId}`);

        expect(status).to.equal(404, "Se esperaba un código de estado 404, pero se recibió " + status);

        expect(body).to.exist;

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("Adoption not found.: Adoption not found.***")
        expect(body).to.have.property("error", "Adoption not found.: Adoption not found.***");
        expect(body.error).to.equal("Adoption not found.: Adoption not found.***", "Se esperaba el mensaje 'Adoption not found.: Adoption not found.***', pero se recibio:' " + body.error);

    });


    it("* Router Adoptions / Metodo GET con AdoptionID (Incorrecto): 22.Devuelve codigo de estado 400?", async () => {

        const adoptionId = AdoptionID_InvalidID;

        const { status } = await requester.get(`/api/adoptions/${adoptionId}`);

        expect(status).to.be.eq(400);

    });


    it("* Router Adoptions / Metodo GET con AdoptionID (Incorrecto): 23.No Devuelve codigo de estado diferente a 400?", async () => {

        const adoptionId = AdoptionID_InvalidID;

        const { status } = await requester.get(`/api/adoptions/${adoptionId}`);

        expect(status).to.equal(400, "Se esperaba un código de estado 400, pero se recibió " + status);

    });


    it("* Router Adoptions / Metodo GET con AdoptionID (Incorrecto): 24.Devuelve mensaje de error 'Pet ID Error: Invalid ID Pet.***'?", async () => {

        const adoptionId = AdoptionID_InvalidID;

        const { status, body } = await requester.get(`/api/adoptions/${adoptionId}`);

        expect(status).to.equal(400, "Se esperaba un código de estado 400, pero se recibió " + status);

        expect(body).to.exist;

        expect(body.error).to.be.ok
        expect(body.error).to.exist
        expect(body.error).to.be.eq("Adoption ID Error: Invalid ID Adoption.***")
        expect(body).to.have.property("error", "Adoption ID Error: Invalid ID Adoption.***");
        expect(body.error).to.equal("Adoption ID Error: Invalid ID Adoption.***", "Se esperaba el mensaje 'Adoption ID Error: Invalid ID Adoption.***', pero se recibio:' " + body.error);

    });
    /*
    */

});






