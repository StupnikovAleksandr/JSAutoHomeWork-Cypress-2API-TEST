const newUser = require("../fixtures/newUser.json");       // Загружаем JSON-данные для нового пользователя
const updateUser = require("../fixtures/updateUser.json"); // Загружаем JSON-данные для обновления (если нужно)

describe('User API tests', () => {

  it("creates user", () => {
    cy.request("POST", "/user", newUser).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.eql(newUser.id.toString());
    });
  });

  it("gets user username", () => {
    cy.request("GET", `/user/${newUser.username}`).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.username).to.equal(newUser.username);
    });
  });

  it("updates user name", () => {
    cy.request("PUT", `/user/${newUser.username}`, updateUser).then((updateRes) => {
      expect(updateRes.status).to.equal(200);
    });

    cy.request("GET", `/user/${updateUser.username}`).then((checkRes) => {
      expect(checkRes.status).to.equal(200);
      expect(checkRes.body.username).to.equal(updateUser.username);
    });
  });

  it("deletes user", () => {
    cy.request("DELETE", `/user/${updateUser.username}`).then((deleteRes) => {
      expect(deleteRes.status).to.equal(200);
    });

    cy.request({
      method: "GET",
      url: `/user/${updateUser.username}`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal("User not found");
    });
  });
});
