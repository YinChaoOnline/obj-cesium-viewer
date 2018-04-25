const http = require('http');
const assert = require('assert');
const server = require('../server.js');



describe('HTTP Server Test', function () {
    // The function passed to before() is called before running the test cases.
    before(function () {
        server.listen(8989);
    });

    // The function passed to after() is called after running the test cases.
    after(function () {
        server.close();
    });

    describe('/', function () {
        it('mocha server test', function (done) {
            http.get('http://127.0.0.1:8989/', function (response) {

                // Assert the status code.
                assert.equal(response.statusCode, 200);

                let body = '';
                response.on('data', function (d) {
                    body += d;
                });

                // FIXME: test with mocha
                response.on('end', function () {

                    // Let's wait until we read the response, and then assert the body
                    //assert.equal(body,'Hello, Mocha!');
                    done();
                });
            });
        });
    });
});