import axios from "axios";
import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database"


describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto', async ()=>{
    const body = {
      title: "notebook",
      url: "https://www.lenovo.com/br/pt/laptops/lenovo/serie-v/Lenovo-V14-G2-ITLBrazil/p/82NMS00100?cid=br:sem|se|google|jussi_google_commercial-notebook_pmax|||pt_BR82NMS00100|18004393355|||pmax||commercial&gclid=Cj0KCQjwmouZBhDSARIsALYcouq6WaTFn9RrzUng64d7JF7gjRf25N7nN30Ejc6Yh6L75BLdFSz4nREaAuJ_EALw_wcB",
      description: "Isso é um notebook",
      amount: 1
    };

    const resultado = await supertest(app).post("/items").send(body);
    const status = resultado.status;

    const itemCriado = await prisma.items.findUnique({
      where: { title: body.title }
    });

    expect(status).toEqual(201);
    expect(itemCriado).not.toBeNull();
  });

  it('Deve retornar 409, ao tentar cadastrar um item que exista', async ()=>{
    const body = {
      title: "notebook",
      url: "https://www.lenovo.com/br/pt/laptops/lenovo/serie-v/Lenovo-V14-G2-ITLBrazil/p/82NMS00100?cid=br:sem|se|google|jussi_google_commercial-notebook_pmax|||pt_BR82NMS00100|18004393355|||pmax||commercial&gclid=Cj0KCQjwmouZBhDSARIsALYcouq6WaTFn9RrzUng64d7JF7gjRf25N7nN30Ejc6Yh6L75BLdFSz4nREaAuJ_EALw_wcB",
      description: "Isso é um notebook",
      amount: 1
    };

    const resultado = await supertest(app).post("/items").send(body);
    const status = resultado.status;

    expect(status).toEqual(409);
  });
});

describe('Testa GET /items ', () => {
  it.todo('Deve retornar status 200 e o body no formato de Array');
});

describe('Testa GET /items/:id ', () => {
  it.todo('Deve retornar status 200 e um objeto igual a o item cadastrado');
  it.todo('Deve retornar status 404 caso não exista um item com esse id');
});