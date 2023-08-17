import http from 'k6/http';
import { sleep, check } from 'k6';

const url = 'http://localhost:3000/';

export const options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '5s', target: 50 },
      ],
  };

export default async function () {

    let loginPayload = {
        username: 'joystone',
        password: 'password'
    };
    let headers = { 'Content-Type': 'application/json' };

    const loginResponse = await http.asyncRequest('POST', `${url}users/login`,JSON.stringify(loginPayload), { headers });

    check(loginResponse, {
        'Logged in successfully': (resp) => resp.status === 200
    });

    const authToken = loginResponse.json('data.token');
   
    const res = http.get(`${url}projects`, { headers: { 'token': authToken } });

    check(res, { 'Gets Projects Successfully': (r) => r.status === 200 });

    sleep(1);
}
