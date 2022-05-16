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
