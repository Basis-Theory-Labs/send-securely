import * as datadog from '@pulumi/datadog';

// const testBrowser = new datadog.SyntheticsTest("test_browser", {
//     browserSteps: [{
//         name: "Check current url",
//         params: {
//             check: "contains",
//             value: "datadoghq",
//         },
//         type: "assertCurrentUrl",
//     }],
//     browserVariables: [
//         {
//             example: "597",
//             name: "MY_PATTERN_VAR",
//             pattern: "{{numeric(3)}}",
//             type: "text",
//         },
//         {
//             example: "jd8-afe-ydv.4546132139@synthetics.dtdg.co",
//             name: "MY_EMAIL_VAR",
//             pattern: "jd8-afe-ydv.{{ numeric(10) }}@synthetics.dtdg.co",
//             type: "email",
//         },
//         {
//             id: "76636cd1-82e2-4aeb-9cfe-51366a8198a2",
//             name: "MY_GLOBAL_VAR",
//             type: "global",
//         },
//     ],
//     deviceIds: ["laptop_large"],
//     locations: ["aws:eu-central-1"],
//     message: "Notify @qa",
//     name: "A Browser test on example.org",
//     optionsList: {
//         tickEvery: 3600,
//     },
//     requestDefinition: {
//         method: "GET",
//         url: "https://app.datadoghq.com",
//     },
//     status: "paused",
//     tags: [],
//     type: "browser",
// });

// health check
const healthCheckName = 'sendsecurely-health-check';
const sendSecurelyHealthCheck = new datadog.SyntheticsTest(healthCheckName, {
  name: healthCheckName,
  status: 'live',
  type: 'api',
  subtype: 'http',
  requestDefinition: {
    method: 'GET',
    url: 'https://sendsecure.ly/api/healthz',
    timeout: 5,
  },
  assertions: [
    {
      type: 'statusCode',
      operator: 'is',
      target: '200',
    },
  ],
  message: '@pagerduty-engineering SendSecurely HealthCheck Failure',
  locations: [
    'aws:sa-east-1',
    'aws:us-east-2',
    'aws:us-west-2',
    'aws:us-west-1',
  ],
  optionsList: {
    followRedirects: true,
    minLocationFailed: 2,
    monitorName: healthCheckName,
    monitorPriority: 1,
    tickEvery: 300,
    monitorOptions: {
      renotifyInterval: 120,
    },
    retry: {
      count: 3,
      interval: 60,
    },
  },
});
