const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function validateEmail (email){
    var re = emailReg;
    return re.test(email);
}

const validater = { validateEmail };
validater.emailReg = emailReg;
module.exports = validater;
