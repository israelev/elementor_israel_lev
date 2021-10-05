const express = require('express')
const app = express()
const port = 3000;

const http = require("https");

const options = {
    "method": "GET",
    "hostname": "amazon-products1.p.rapidapi.com",
    "port": null,
    "headers": {
        "x-rapidapi-host": "amazon-products1.p.rapidapi.com",
        "x-rapidapi-key": "21ca75659cmshb60c53b1d4bbbc0p141971jsn89b41185f56d",
        "useQueryString": true
    }
};

// CORS HEADERS MIDDLEWARE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Origin", 'http://127.0.0.1:5500');
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});






app.get('/products', (request, response) => {
    /*

    api stop working in free plan
    */

    let queryArr = ['laptop', 'ninga', 'nautica', 'candy', 'mobile'];
    let random = Math.floor(Math.random() * queryArr.length);
    let query = queryArr[random];

    options.path = "/search?country=US&query=" + query + "&page=1";
    const req = http.request(options, function(res) {
        const chunks = [];

        res.on("data", function(chunk) {
            chunks.push(chunk)


        });

        res.on("end", function() {
            const body = Buffer.concat(chunks);
            response.send(body.toString());
        });
    });

    req.end();

})

app.get('/products/:id', (request, response) => {
    let asin = request.params.id;
    let descriptionArr = [{
            "asin": "B087623TMW",
            "description": "CARRIER - This phone is locked to Simple Mobile from Tracfone, which means this device can only be used on the Simple Mobile wireless network."
        },
        {
            "asin": "B07XSQT4Q3",
            "description": "This is an auto-renewed stored value card subscription. A stored value card is what Amazon uses to transmit your monthly service payment to Cricket Wireless. Each month, Amazon automatically charges your preferred payment method to a stored value card, which is then used by Cricket to pay for your wireless service plan. Cancel any time by visiting Your Memberships & Subscriptions. The Cricket Wireless LLC SIM Card Kit and stored value card subscription are offered and sold by Cricket Wireless LLC and the SIM Card Kit is fulfilled by Amazon. See full Cricket Wireless "
        },
        {
            "asin": "B01N2K14U7",
            "description": "Plans - simple Mobile offers a variety of coverage plans, including 30-day unlimited Talk, text & data. No Activation Fees, No Credit Checks, and no Hassles On a Nationwide Lightning-fast Network. For more information or plan options, please visit the Simple Mobile website."
        }
    ];
    let found = descriptionArr.find(item => item.asin == asin);
    response.send(found);



    /*

    api stop working
    options.path = "/product?country=US&asin=" + asin;

    const req = http.request(options, function(res) {
        const chunks = [];

        res.on("data", function(chunk) {
            chunks.push(chunk);
        });

        res.on("end", function() {

            const body = Buffer.concat(chunks);
            response.send(body.toString());
        });
    });

    req.end();
    */

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))