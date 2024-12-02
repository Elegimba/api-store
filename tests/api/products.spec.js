const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Product = require('../../src/models/products.model');

describe('API de products', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/store');
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    describe('GET /api/products', () => {

        let response; // sacamos el response como variable global
        beforeAll(async () => { //este código se ejecuta ANTES que TODAS las pruebas
            response = await request(app).get('/api/products').send();
        });

        it('debería retornar status 200', () => {
            /* const response = await request(app).get('/api/products').send(); */ //esta ya no hace falta
            expect(response.status).toBe(200);
        });

        it('debería responder con un JSON', () => {
            expect(response.headers['content-type']).toContain('application/json'); //devuelve el 'application/json + otra cosa, por lo tanto cambiamos el .toBe por .toContain'
        });

        it('debería devolver un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });
        
    });

    describe('POST /api/products', () => { 
        
        let response;
        const body = { name: 'Lápiz verde', description: 'Pinta muy bien en verde', price: 3, department: 'test', stock: 100, available: true };
        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body);
        });

        afterAll(async () => {
            await Product.deleteMany({ department: 'test' });
        });

        it('debería responder correctamente la url', () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('debería insertar el nuevo producto', () => {
            expect(response.body._id).toBeDefined();
        });

        it('debería ver la parte del body en la base de datos', () => {
            expect(response.body.name).toBe(body.name);
            expect(response.body.description).toBe(body.description);
            expect(response.body.price).toBe(body.price);
            expect(response.body.department).toBe(body.department);
            expect(response.body.stock).toBe(body.stock);
            expect(response.body.avaliable).toBe(body.avaliable);
        });

    });

    describe('PUT /api/products/PRODUCTID', () => {

        let response;
        let product;
        const body = { name: 'Lápiz verde', description: 'Pinta muy bien en verde', price: 3, department: 'test', stock: 100, available: true };
        beforeAll(async () => {
            //Creao un producto en la base de datos
            product = await Product.create(body);
            //Luego lanzo la petición
            response = await request(app).put(`/api/products/${product._id}`).send({ stock: 30, available: false });
        });

        afterAll(async () => {
            await Product.findByIdAndDelete(product._id);
        });

        it('debería responder correctamente la url', () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('debería responder con el producto actualizado', () => {
            expect(response.body.stock).toBe(30);
            expect(response.body.available).toBe(false);
        })

    })

    describe('DELETE /api/products/PRODUCTID', () => {

        let response;
        let product;
        const body = { name: 'Lápiz verde', description: 'Pinta muy bien en verde', price: 3, department: 'test', stock: 100, available: true };
        beforeAll(async () => {
            
            product = await Product.create(body);
           
            response = await request(app).delete(`/api/products/${product._id}`).send();
        });

        it('debería responder correctamente la url', () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('el producto no deberías estar en la base de datos', async () => {
            const prod = await Product.findById(product._id);
            expect(prod).toBeNull();
        });

        //findByIdAndDelete

    });

});