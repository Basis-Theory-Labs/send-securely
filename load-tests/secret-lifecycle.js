import {Trend} from 'k6/metrics';
import http from 'k6/http'

export const options = {
  vus: 20,
  iterations: 200,
  thresholds: {
    http_req_failed: ['rate<0.01'],
    create_duration: ["p(90)<500"],
    retrieve_duration: ["p(90)<1000"]
  }
};

const createSecretRequest = {
  data: "my secret",
  ttl: 600
};

const createTrend = new Trend("create_duration");
const retrieveTrend = new Trend("retrieve_duration");

export default function main(data) {
  const createResponse = http.post(
    `${__ENV.API_URL}/api/secrets`,
    JSON.stringify(createSecretRequest),
    {headers: {"Content-Type": "application/json"}}
  );
  createTrend.add(createResponse.timings.duration);

  const secretId = createResponse.json()['id'];

  const retrieveResponse = http.get(
    `${__ENV.API_URL}/api/secrets/${secretId}`
  );
  retrieveTrend.add(retrieveResponse.timings.duration);
}
