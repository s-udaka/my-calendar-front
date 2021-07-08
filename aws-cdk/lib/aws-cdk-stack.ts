import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const app = new cdk.App();
    const stack = new cdk.Stack(app, id);

    // AppRunnerからDynamoDBへアクセスできるIAMロールを作成
    new iam.Role(stack, 'AppRunnerForDynamoDBRole', {
      assumedBy: new iam.ServicePrincipal('tasks.apprunner.amazonaws.com'),
      managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName(
              'AmazonDynamoDBFullAccess',
          ),
      ],
    });
  }
}
