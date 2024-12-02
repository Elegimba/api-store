# API Products

## Recuperación de todos los productos

- Método: GET
- Url: /api/products
- Body: X
- Headers: X
- Response: Un array con todos los productos

### ¿Qué probamos?

- Si retorna status 200
- Si retorna la cabevera Content-Type: application/json
- Si retorna un array con productos

## Creación de productos

- Método: POST
- Url: /api/products
- Body: name, description, price, department, stock, available
- Headers: X
- Response: El nuevo producto creado

### ¿Qué probamos?

- Que la URL funcione y nos retorne JSON
- Si en el body recupero el identificador

## Actualización de productos

- Método: PUT
- Url: /api/products/{IDPRODUCT}
- Body: los campos que queramos modificar
- Headers: X
- Response: El producto actualizado

### ¿Qué probamos?

- Que la URL funcione y nos retorne JSON
- Que los cambios enviados se vean en la BD


## Recuperar producto por ID

- Método: GET
- URL: /api/products/{PRODUCTOID}
- Respuesta: Un único producto

- findOne - findById


## Filtro por precio

- GET /api/products/price/{MIN}/{MAX}


## Recuperar todos los productos activos

- GET /api/products/actives

- Los productos activos son los que están disponibles y su stock es mayor de 10


## Registro de usuarios

- POST /api/users/register

- User.create


##