const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  //TODO: 1. Testing GET /cafes devuelve un status code 200 y el tipo de dato recibidoes un
  //todo *** arreglo con por lo menos 1 objeto.
  
  it("Ruta->GET /cafes devuelve status = 200", async () => {
    const response = await request(server).get("/cafes").send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).not.toBe(0);
  });

  //TODO: 2. Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe

  it("Obtener código 404 al intentar eliminar un café con un id que no existe", async () => {
    const id = 6;
    const response = await request(server)
      .delete(`/cafes/:${id}`)
      .set("Authorization", "token")
      .send();
    expect(response.statusCode).toBe(404);
  });

  //TODO: 3. Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.

  it("La ruta-> POST /cafes agrega un nuevo café y devuelve un código 201.", async () => {
    const nuevoCafe = { id: 5, nombre: "Machiatto" };
    const response = await request(server).post("/cafes").send(nuevoCafe);
    expect(response.statusCode).toBe(201);
    expect(response.body).toContainEqual(nuevoCafe);
  });

  //TODO: 4. Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un
  //todo café enviando un id en los parámetros que sea diferente al id dentro del payload.

  it("la ruta PUT /cafes devuelve un status code 400 si :id != payload.id", async () => {
    const cafe = { id: 4, nombre: "Machiatto" };
    const id = 6;
    const response = await request(server).delete(`/cafes/:${id}`).send(cafe);
    expect(response.statusCode).toBe(400);
  });
});
