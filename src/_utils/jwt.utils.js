const jwt = require("jsonwebtoken");

 function verifyJwt(token) {
        const data = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return false
            }
            return decoded;
        });
        return data;
    }


module.exports = {
    verifyJwt
}
