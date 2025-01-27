import Users from "../../src/dao/Users.dao.js";
import mongoose, { isValidObjectId } from "mongoose";
import { expect } from "chai";
import { describe, it } from "mocha"

const connection = await mongoose.connect('mongodb+srv://tincho83:Codin33Codin33@cluster0.hhucv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=adoptmeDev');

const usersDAO = new Users();

describe(">>> Pruebas: DAO Users: Get Post Put Delete", async function () {

    this.timeout(7600);

    before(async () => {
        // Acciones antes de iniciar las pruebas:
        let existe = await mongoose.connection.collection("users").findOne({ email: "test@test.com" })
        if (!existe) {
            await mongoose.connection.collection("users").insertOne({
                first_name: "test",
                last_name: "test",
                email: "test@test.com",
                password: "Coder123"
            })
        }
    });

    beforeEach(async () => {
        // Acciones antes de cada prueba it
    });

    afterEach(async () => {
        // Acciones despues de cada prueba it
        await mongoose.connection.collection("users").deleteMany({ email: "marcospaez.prueba@test.com" });
    });

    after(async () => {
        // Acciones despues de todas las pruebas
        await mongoose.disconnect(); // Cierra la conexión a MongoDB
    });

    it("* Router Users / Metodo GET: Retorna un array de usuarios?", async () => {
        let resultado = await usersDAO.get();

        // Verifica que sea un array
        expect(Array.isArray(resultado)).to.be.true
        expect(Array.isArray(resultado)).to.be.eq(true)
    });

    it("* Router Users / Metodo GET: Primer elemento del array de usuarios contiene _id, first_name, last_name, email, password, role?", async () => {
        let resultado = await usersDAO.get();

        // Verifica que sea un array
        expect(Array.isArray(resultado)).to.be.true
        expect(Array.isArray(resultado)).to.be.eq(true)

        if (Array.isArray(resultado) && resultado.length > 0) {
            // [0] para acceder al primer elemento

            expect(resultado[0]._id).to.be.ok
            expect(resultado[0]._id).to.exist

            expect(resultado[0].first_name).to.be.ok
            expect(resultado[0].first_name).to.exist

            expect(resultado[0].last_name).to.be.ok
            expect(resultado[0].last_name).to.exist

            expect(resultado[0].email).to.be.ok
            expect(resultado[0].email).to.exist

            expect(resultado[0].password).to.be.ok
            expect(resultado[0].password).to.exist
  
            expect(resultado[0].role).to.be.ok
            expect(resultado[0].role).to.exist
        }
    });

    it("* Router Users / Metodo GET: Primer elemento del array de usuarios contiene _id MongoDB valido?", async () => {
        let resultado = await usersDAO.get();

        // Verifica que sea un array
        expect(Array.isArray(resultado)).to.be.true
        expect(Array.isArray(resultado)).to.be.eq(true)
        if (Array.isArray(resultado) && resultado.length > 0) {
            // [0] para acceder al primer elemento

            // Verificar registro con el campo "email"
            const e_mail = resultado[0].email;

            let prueba = await mongoose.connection.collection("users").findOne({ email: e_mail })
            expect(isValidObjectId(prueba._id)).to.be.equal(true)
            expect(isValidObjectId(prueba._id)).to.be.true
        }
    });

    it("* Router Users / Metodo GET: Cada elemento del array de usuarios contiene role con user o admin?", async () => {
        let resultado = await usersDAO.get();

        // Verifica que sea un array
        expect(Array.isArray(resultado)).to.be.true
        expect(Array.isArray(resultado)).to.be.eq(true)
        expect(resultado).to.be.an("array");

        if (Array.isArray(resultado) && resultado.length > 0) {
            // [0] para acceder al primer elemento
            // Verificar el campo "role"
            const role = resultado[0].role;


          
            expect(role).to.exist.and.to.not.be.empty; // El campo "role" debe existir y no estar vacío
         
            expect(role).to.match(/^(user|admin)$/, "El campo 'role' debe ser 'user' o 'admin'");
        }
    });

    it("* Router Users / Metodo GET: Cada elemento del array de usuarios contiene email con @ (arroba)?", async () => {
        let resultado = await usersDAO.get();

         // Verifica que sea un array
        expect(Array.isArray(resultado)).to.be.true
        expect(Array.isArray(resultado)).to.be.eq(true)
        expect(resultado).to.be.an("array");

        if (Array.isArray(resultado) && resultado.length > 0) {
            // [0] para acceder al primer elemento
            // Verificar el campo "email"
            const email = resultado[0].email;

          
            expect(email).to.exist.and.to.not.be.empty; // El campo "role" debe existir y no estar vacío


            expect(email).to.exist.and.to.match(/@/, "El campo 'email' debe contener el símbolo '@'");
        } else {
            // Si el array está vacío, falla la prueba con un mensaje
            expect.fail("El array de usuarios está vacío.");
        }
    });

    it("* Router Users / Metodo GET: Usuario de Prueba (marcospaez.prueba@test.com) no debe estar en la Base de Datos?", async () => {

        let userMock = {
            first_name: "Marcos_Prueba",
            last_name: "Paez_Prueba",
            email: "marcospaez.prueba@test.com",
            password: "Coder123"
        }

        let prueba = await mongoose.connection.collection("users").findOne({ email: userMock.email })

      
        expect(prueba).to.be.null;

    });

    it("* Router Users / Metodo POST: Registra (y Comprueba) nuevo usuario (first_name, last_name, email, password) en la Base de Datos?", async () => {

        // Datos de Usuarios Falso
        let userMock = {
            first_name: "Marcos_Prueba",
            last_name: "Paez_Prueba",
            email: "marcospaez.prueba@test.com",
            password: "Coder123"
        }

        // Registrar usuario
        let resultado = await usersDAO.save(userMock)

        // Comprobacion desde el resultado
  
        expect(resultado._id).to.be.ok


        expect(resultado.email).to.be.ok

   
        expect(resultado.email).to.be.equal(userMock.email)

   
        expect(isValidObjectId(resultado._id)).to.be.equal(true)
        expect(isValidObjectId(resultado._id)).to.be.true

        // Comprobacion en la Base de Datos
        let prueba = await mongoose.connection.collection("users").findOne({ email: userMock.email })

     
        expect(prueba._id).to.be.ok

        expect(prueba).to.have.property("email").and.have.lengthOf(userMock.email.length)
        expect(prueba._id.toString()).to.be.ok.and.to.have.lengthOf.greaterThan(3)

      
        expect(prueba.email).to.be.ok

   
        expect(prueba.email).to.be.eq(userMock.email)

    
        expect(isValidObjectId(prueba._id)).to.be.equal(true)
        expect(isValidObjectId(prueba._id)).to.be.true
    });

    it("* Router Users / Metodo POST: No Registrar (y Comprueba) nuevo usuario (first_name, last_name, password) sin campo email en la Base de Datos?", async () => {

        // Datos de Usuarios Falso
        let userMock = {
            first_name: "Marcos_Prueba",
            last_name: "Paez_Prueba",
            password: "Coder123"
        }

        // Registrar usuario y esperar que falle
        try {
            let resultado = await usersDAO.save(userMock);
            expect.fail("No deberia haberse registrado un usuario sin email.");
        } catch (error) {
            // Verificar que se arroja un error adecuado
            // expect(error.message).to.include("email es obligatorio", "El mensaje de error debería indicar que falta el email.");
            expect(error.message).to.include("email");
            expect(error.message).to.include("Path");
            expect(error.message).to.include("required");
        }

    });

    it("* Router Users / Metodo POST: No Registrar (y Comprueba) nuevo usuario (first_name, last_name, password) con campo emaiil en la Base de Datos??", async () => {

        // Datos de Usuarios Falso
        let userMock = {
            first_name: "Marcos_Prueba",
            last_name: "Paez_Prueba",
            emaiil: "marcospaez.prueba@test.com",
            password: "Coder123"
        }

        // Registrar usuario y esperar que falle
        try {
            let resultado = await usersDAO.save(userMock);
            expect.fail("No debería haberse registrado un usuario con un campo 'emaiil'.");
        } catch (error) {
            // Verificar que se arroja un error adecuado
            // expect(error.message).to.include("email es obligatorio", "El mensaje de error debería indicar que falta el email.");
            expect(error.message).to.include("email");
            expect(error.message).to.include("Path");
            expect(error.message).to.include("required");
        }

        // Comprobación en la base de datos (opcional, para asegurarte de que no se insertó el usuario)
        let prueba = await mongoose.connection.collection("users").findOne({ emaiil: userMock.emaiil });
        expect(prueba).to.be.null; // No debería haberse creado un usuario con el campo incorrecto
    });

});