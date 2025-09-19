import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const users = new SharedArray('users', function() {
    return papaparse.parse(open('./users.csv'), { header: true }).data;
});

export const options = {
    vus: 20,
    duration: '1m',
    thresholds: {
        'http_req_duration': ['p(95)<1500'],
        'http_req_failed': ['rate<0.03']
    }
};

export default function () {
    const user = users[Math.floor(Math.random() * users.length)];
    const payload = JSON.stringify({
        username: user.user,
        password: user.passwd
    });

    const params = { headers: { 'Content-Type': 'application/json' } };

    const res = http.post('https://fakestoreapi.com/auth/login', payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time < 1.5s': (r) => r.timings.duration < 1500
    });

    sleep(1);
}