const axios = require("axios");
const fs = require("fs");

const image = fs.readFileSync("thumb.jpg", {
    encoding: "base64"
});

axios({
    method: "POST",
    url: "https://classify.roboflow.com/wagyu/2",
    params: {
        api_key: "fcUZokY1zF9aKAnCbDYA"
    },
    data: image,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
.then(function(response) {
    console.log(response.data);
})
.catch(function(error) {
    console.log(error.message);
});