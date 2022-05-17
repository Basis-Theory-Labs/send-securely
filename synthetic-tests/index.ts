import * as datadog from '@pulumi/datadog';

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
    monitorPriority: 2,
    tickEvery: 300, // seconds
    monitorOptions: {
      renotifyInterval: 60, // minutes
    },
    retry: {
      count: 3,
      interval: 60000, // milliseconds
    },
  },
});

// api check
const apiCheckName = 'sendsecurely-api-check';
const sendSecurelyApiCheck = new datadog.SyntheticsTest(apiCheckName, {
  name: apiCheckName,
  status: 'live',
  type: 'api',
  subtype: 'multi',
  apiSteps: [
    {
      assertions: [
        {
          operator: 'is',
          target: '200',
          type: 'statusCode',
        },
      ],
      name: 'Create secret',
      requestDefinition: {
        method: 'POST',
        url: 'https://sendsecure.ly/api/secrets',
        timeout: 5,
        body: '{ "data": "synthetic testing secret!", "ttl": 30 }',
      },
      requestHeaders: {
        'Content-Type': 'application/json',
      },
      subtype: 'http',
      extractedValues: [
        {
          name: 'SECRET_ID',
          type: 'http_body',
          parser: {
            type: 'json_path',
            value: 'id',
          },
        },
      ],
    },
    {
      assertions: [
        {
          operator: 'is',
          target: '200',
          type: 'statusCode',
        },
      ],
      name: 'Get secret details',
      requestDefinition: {
        method: 'GET',
        url: 'https://sendsecure.ly/api/secrets/{{ SECRET_ID }}/details',
        timeout: 5,
      },
      requestHeaders: {
        'Content-Type': 'application/json',
      },
      subtype: 'http',
    },
    {
      assertions: [
        {
          operator: 'is',
          target: '200',
          type: 'statusCode',
        },
      ],
      name: 'Read secret',
      requestDefinition: {
        method: 'GET',
        url: 'https://sendsecure.ly/api/secrets/{{ SECRET_ID }}',
        timeout: 5,
      },
      requestHeaders: {
        'Content-Type': 'application/json',
      },
      subtype: 'http',
    },
  ],
  message: '@pagerduty-engineering SendSecurely APICheck Failure',
  locations: [
    'aws:sa-east-1',
    'aws:us-east-2',
    'aws:us-west-2',
    'aws:us-west-1',
  ],
  optionsList: {
    followRedirects: true,
    minLocationFailed: 2,
    monitorName: apiCheckName,
    monitorPriority: 2,
    tickEvery: 300, // seconds
    monitorOptions: {
      renotifyInterval: 60, // minutes
    },
    retry: {
      count: 3,
      interval: 60000, // milliseconds
    },
  },
});

// there are outstanding issues creating browser tests via code https://github.com/DataDog/terraform-provider-datadog/issues/1433
// // browser check
// const browserCheckName = 'sendsecurely-browser-check';
// const sendSecurelyBrowserCheck = new datadog.SyntheticsTest(browserCheckName, {
//   name: browserCheckName,
//   status: 'live',
//   type: 'browser',
//   requestDefinition: {
//     method: 'GET',
//     url: 'https://sendsecure.ly',
//   },
//   browserSteps: [
//     {
//       name: 'Check current url',
//       params: {
//         check: 'contains',
//         value: 'sendsecure',
//       },
//       type: 'assertCurrentUrl',
//     },
//     {
//       name: 'Type secret',
//       params: {
//         elementUserLocator: {
//           value: {
//             value: '#secret-data',
//           },
//           failTestOnCannotLocate: true,
//         },
//         value: 'synthetic testing secret!',
//       },
//       type: 'typeText',
//     },
//     {
//       name: 'Click on "Create Link"',
//       params: {
//         elementUserLocator: {
//           value: {
//             value: '#create-link-button',
//           },
//           failTestOnCannotLocate: true,
//         },
//       },
//       type: 'click',
//     },
//     {
//       name: 'Test that "Copy" button exists',
//       params: {
//         elementUserLocator: {
//           value: {
//             value: '#copy-secret-link-button',
//           },
//           failTestOnCannotLocate: true,
//         },
//       },
//       type: 'assertElementPresent',
//     },
//   ],
//   deviceIds: ['laptop_large'],
//   message: '@pagerduty-engineering SendSecurely BrowserCheck Failure',
//   locations: [
//     'aws:sa-east-1',
//     'aws:us-east-2',
//     'aws:us-west-2',
//     'aws:us-west-1',
//   ],
//   optionsList: {
//     followRedirects: true,
//     minLocationFailed: 2,
//     monitorName: browserCheckName,
//     monitorPriority: 2,
//     tickEvery: 300,
//     monitorOptions: {
//       renotifyInterval: 120,
//     },
//     retry: {
//       count: 3,
//       interval: 60,
//     },
//   },
// });
