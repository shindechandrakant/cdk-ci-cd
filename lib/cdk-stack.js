const { Stack, CfnOutput } = require("aws-cdk-lib");
const { Construct } = require("constructs");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const lambda = require("@aws-cdk/aws-lambda");

const apiGateWay = require("aws-cdk-lib/aws-apigateway");
const path = require("path");

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const addition = new lambda.Function(this, "AdditionLambdaFunction", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "addition.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../lambda")),
    });

    const subtractions = new lambda.Function(
      this,
      "SubtractionLambdaFunction",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "subtraction.handler",
        code: lambda.Code.fromAsset(path.join(__dirname, "../lambda")),
      }
    );

    const api = new apiGateWay.LambdaRestApi(this, "ApiGateway");
    const add = api.root.addResource("addition");
    add.addMethod("POST", new apiGateWay.LambdaIntegration(addition));

    // add function to gateway
    const subtraction = api.root.addResource("subtraction");
    subtraction.addMethod(
      "POST",
      new apiGateWay.LambdaIntegration(subtractions)
    );

    new CfnOutput(this, "API Gateway URL", {
      value: api.url,
    });
  }
}

module.exports = { CdkStack };
