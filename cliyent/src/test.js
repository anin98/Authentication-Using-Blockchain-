const sha256 = require('sha256');





    const dataAsString = `03{'id': '453d428bf71c4d059dfde27c6a30d1d5', 'name': 'coffee', 'email': 'coffee@gmail.com', 'password': 'coffee', 'timestamp': 1669219630530}`

    var hash = sha256(dataAsString)
    console.log(dataAsString)


console.log(hash)
