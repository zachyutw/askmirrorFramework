export const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export function validateEmail (email) {
	var re = emailReg;
	return re.test(email);
}

const validater = { validateEmail };

export default validater;
