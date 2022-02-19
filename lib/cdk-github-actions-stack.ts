import { lambda_layer_awscli, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class CdkGithubActionsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset('src/'),
      handler: 'lambda/hello.handler'
    });

    new apigw.LambdaRestApi(this, 'Endpoit', {
      handler: hello,
      endpointTypes: [ apigw.EndpointType.EDGE ],
    });
  }
}
