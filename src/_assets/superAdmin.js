const bcrypt = require("bcrypt");

// hsash password
const salt =  bcrypt.genSaltSync(10);
// const hash1 =  bcrypt.hashSync(process.env.SUPER_ADMIN1_PASSWORD, salt);
const hash2 =  bcrypt.hashSync(process.env.SUPER_ADMIN2_PASSWORD, salt);


// module.exports.SUPER_ADMIN1 = {
//     username: process.env.SUPER_ADMIN1_USERNAME,
//     email: process.env.SUPER_ADMIN1_EMAIL,
//     password: hash1,
//     role: process.env.SUPER_ADMIN1_ROLE,
//     status:true,
//     can_write: true
// }

module.exports.SUPER_ADMIN2 = {
    username: process.env.SUPER_ADMIN2_USERNAME,
    email: process.env.SUPER_ADMIN2_EMAIL,
    password: hash2,
    role: process.env.SUPER_ADMIN2_ROLE,
    status:true,
    can_write: true
}
