import { createHash } from "../../src/utils/index.js"
import { describe, it } from "mocha"
import { expect } from "chai"

describe(">>> Pruebas: UTILS: CreateHash", () => {

    // after, before, etc... ¿los necesito?

    it("* UTILS / Metodo CreateHash: Si se envia un string al metodo, el resultado es diferente del valor enviado?", async () => {
        let password = "Coder123"
        let resultado = await createHash(password)

        expect(resultado).not.to.be.eq(password)
    })

    it("* UTILS / Metodo CreateHash: El metodo devuelve un hash con codificacin bcrypt?", async () => {
        //$2b$
        let password = "prueba123"
        let resultado = await createHash(password)
        //console.log(resultado.slice(0, 3))
        expect(resultado.slice(0, 4)).to.be.eq('$2b$')
    })
})