import { describe, it } from "mocha"
import { should, expect } from "chai"
import supertest from "supertest"
import mongoose, { isValidObjectId } from "mongoose"
import fs from "fs"

should();

await mongoose.connect("mongodb+srv://tincho83:Codin33Codin33@cluster0.hhucv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=adoptmeDev")

// let prueba=false
// expect(prueba).to.be.eq(true)
// prueba.should.to.be.eq(true)

const requester = supertest("http://localhost:8080")

describe(">>> Pruebas: DAO Pets: Get Post Put Delete", function () {
    this.timeout(7600)

    describe(">>>>>> Pruebas: Router Pets: Get Post Put Delete", () => {

        // analizar si corresponde before, after, etc. 
        after(async () => {
            await mongoose.connection.collection("pets").deleteMany({ specie: "test" })
        })

        it("* Router Pets / Metodo POST [/api/pets]: Registra (y Comprueba) nueva mascota (name, specie, birthDate) en la Base de Datos?", async () => {
            let petMock = { name: "Roger", specie: "test", birthDate: new Date().toUTCString() }

            // let respuesta=await requester.post("/api/pets").send(petMock)
            // console.log(respuesta)
            let { _body, body, headers, status } = await requester.post("/api/pets").send(petMock)

            // console.log(body)
            // console.log(_body)

            expect(status).to.be.eq(200)
            expect(body.payload._id).to.exist
            expect(body.payload.name).to.be.eq(petMock.name)
        })

        it("* Router Pets / Metodo GET [/api/pets]: Devuelve un array de mascotas", async () => {
            let { status, body } = await requester.get("/api/pets")

            //console.log(status, body)

            expect(status).to.be.eq(200)
            expect(body.status).to.be.ok
            expect(body.status).to.exist
            expect(body.status).to.be.eq("success")
            expect(body.payload).to.exist
            expect(Array.isArray(body.payload)).to.be.true
        })


    })

    describe("Pruebas avanzadas router pets", () => {
        // si corresponden after, etc.
        after(async () => {
            await mongoose.connection.collection("pets").deleteMany({ specie: "test" })
        })

        it("La ruta /api/pets/withimage acepta una imagen, y la carga en el proyecto", async () => {
            let petMock = { name: "Roger", specie: "test", birthDate: new Date().toUTCString() }

            let { body, status } = await requester.post("/api/pets/withimage")
                .field("name", petMock.name)
                .field("specie", petMock.specie)
                .field("birthDate", petMock.birthDate)
                .attach("image", "./test/img/pets/image.jpg")

            // console.log(body, status)
            expect(body.status).to.exist
            expect(body.status).to.be.eq("success")
            expect(body.payload._id).to.exist
            expect(isValidObjectId(body.payload._id)).to.be.true
            expect(fs.existsSync(body.payload.image)).to.be.true
        })
    })
})




