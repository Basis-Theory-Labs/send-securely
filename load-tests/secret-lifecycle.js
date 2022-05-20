import {Trend} from 'k6/metrics';
import http from 'k6/http'

export const options = {
  vus: 10,
  iterations: 100,
  thresholds: {
    http_req_failed: ['rate<0.01'],
    create_duration: ["avg<500"],
    get_duration: ["avg<200"],
    delete_duration: ["avg<200"]
  }
};

const createSecretRequest = {
  data: "my secret",
  ttl: 600
};

const createTrend = new Trend("create_duration");
const getTrend = new Trend("get_duration");

export default function main(data) {
  const createResponse = http.post(
    `${__ENV.API_URL}/api/secrets`,
    JSON.stringify(createSecretRequest),
    {headers: {"Content-Type": "application/json"}}
  );
  createTrend.add(createResponse.timings.duration);

  const secretId = createResponse.json()['id'];

  const getResponse = http.get(
    `${__ENV.API_URL}/api/secrets/${secretId}`
  );
  getTrend.add(getResponse.timings.duration);
}
