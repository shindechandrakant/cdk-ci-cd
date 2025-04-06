exports.handler = async (event) => {
  try {
    const body =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    const { num1, num2 } = body;
    const result = num1 + num2;
    return {
      statusCode: 200,
      body: JSON.stringify({
        result: `Addtion is ${result} of ${{ num1, num2 }}`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: "Something went wrong in addtion",
      message: error.message,
    };
  }
};
