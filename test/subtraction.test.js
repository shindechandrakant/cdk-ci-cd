const { handler } = require("../lambda/subtraction");

describe("Subtraction Lambda", () => {
  test("Should subtract two numbers correctly", async () => {
    const event = {
      body: JSON.stringify({ num1: 20, num2: 10 }),
    };

    const response = await handler(event);
    console.log(response);
    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body.result).toBe("Subtraction is 10");
  });
});
