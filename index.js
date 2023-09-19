const express = require('express');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from proxy server');
    });

app.get('/proxy', (req, res) => {

    try {
        // Get the client IP address
  const proxyPass =  req.query.proxyPass;

  // Set the client IP address as a header
  req.headers['X-Forwarded-For'] = "105.109.108.111";

  proxy.web(req, res, { target: proxyPass });
    } catch (error) {
        res.send(error.toString());
    }

});

app.listen(8080, () => {
  console.log('Proxy server listening on port 8080');
});