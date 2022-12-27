import { App, CfnOutput, RemovalPolicy, Stack } from '@aws-cdk/core';
import { IntegTest } from '@aws-cdk/integ-tests';
import { UserPool, UserPoolEmail } from '../lib';

const app = new App();
const stack = new Stack(app, 'integ-user-ses-email');

const userpool = new UserPool(stack, 'myuserpool', {
  removalPolicy: RemovalPolicy.DESTROY,
  userPoolName: 'MyUserPool',
  email: UserPoolEmail.withSES({
    sesRegion: 'us-east-1',
    fromEmail: 'noreply@example.com',
    fromName: 'myname@mycompany.com',
    replyTo: 'support@example.com',
    sesVerifiedDomain: 'example.com',
  }),
});

new CfnOutput(stack, 'user-pool-id', {
  value: userpool.userPoolId,
});

new IntegTest(app, 'IntegTest', { testCases: [stack] });
