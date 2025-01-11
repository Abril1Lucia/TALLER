import app from "../app.js";
import { userModel } from "../src/models/users.model.js";
import supertest from "supertest";
import mongoose from "mongoose";


describe('probar controladores de usuarios :)',()=>{

    beforeEach(async()=>{
        await userModel.deleteMany({})
    })

    afterAll(async()=>{
        await mongoose.connection.close()
    })

    const testUser = {
        fullName: 'Luna Lighty',
        email: 'Lazaro@gmail.com',
        password: 'ElQueMeHackeeVaPreso'
    }

    describe('POST',()=>{
    
        it('crear user correctamente', async()=>{ //el /crear sale del router
            const res = await supertest(app).post('/usuarios/crear').send(testUser)

            expect(res.statusCode).toBe(201)
        })

        //segundo caso de prueba

        it('error si falta un campo', async()=>{ //el /crear sale del router
            const res = await supertest(app).post('/usuarios/crear').send({email:testUser.email})

            expect(res.body).toHaveProperty('mensaje', 'tas muy feo para darte un User we')
        })

    })

    describe('GET',()=>{
    
        it('mostrar que no hay users', async()=>{ //el /usuarios sale del app
            const res = await supertest(app).get('/usuarios/mostrar')

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('mensaje','No hay usuarios... tamos solos...')
        })

    })
})
