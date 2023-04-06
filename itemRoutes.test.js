const request = require("supertest");

const app = require("./app");
let  { items } = require("./fakeDb");

const pretzels = { name: "pretzels", price: 1.55 };
const apple = { name: "apple", price: 15.99 };
const bacon = { name: "bacon", price: 4.53 };



beforeEach(function () {
    items.push(pretzels);
    items.push(apple);
});

afterEach(function () {
    items.splice(0, items.length);
});




describe("GET /items", function () {
    it("Gets a list of all items", async function () {
        const resp = await request(app).get(`/items`);

        expect(resp.body).toEqual({ items: items });
    });
});


describe("GET /items/:name", function () {
    it("Gets a single item by name", async function () {
        const resp = await request(app).get(`/items/apple`);
        console.log(items);

        expect(resp.body).toEqual( apple );
    });

    it("Responds with 404 if name invalid", async function () {
        const resp = await request(app).get(`/items/not-here`);
        expect(resp.statusCode).toEqual(404);
    });
});


/** POST /cats - create cat from data; return `{cat: cat}` */

describe("POST /items", function () {
    it("Creates a new item", async function () {
        const resp = await request(app)
            .post(`/items`)
            .send(bacon);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({ added: bacon });
    });
});
// end

/** PATCH /cats/[name] - update cat; return `{cat: cat}` */

describe("PATCH /items/:name", function () {
    it("Updates a single item", async function () {
        const resp = await request(app)
            .patch(`/items/${apple.name}`)
            .send({
                name: "banana",
                price: 1.09,
            });
        expect(resp.body).toEqual({
            updated: { name: "banana", price: 1.09 }
        });
    });

    it("Responds with 404 if name invalid", async function () {
        const resp = await request(app).patch(`/items/not-here`);
        expect(resp.statusCode).toEqual(404);
    });
});
// end

/** DELETE /cats/[name] - delete cat,
 *  return `{message: "Cat deleted"}` */

describe("DELETE /items/:name", function () {
    it("Deletes a single a item", async function () {
        const resp = await request(app)
            .delete(`/items/pretzels`);

        expect(resp.body).toEqual({ message: "Deleted" });
        expect(items.length).toEqual(1);
    });

    it("Responds with 404 if name invalid", async function () {
        const resp = await request(app).delete(`/items/not-here`);
        expect(resp.statusCode).toEqual(404);
    });
});
// end
