export const updateObject=(oldObj, updatedProperties)=>{
	return {
		...oldObj,
		...updatedProperties,
	};
};


export const checkValidity = (value, rules) => {
	let isValid = false;
	if (rules.required) {
		isValid = value.trim() !== '';
	}
	if (rules.minLength && isValid) {
		isValid = value.length >= rules.minLength;
	}
	if (rules.maxLength && isValid) {
		isValid = value.length <= rules.maxLength;
	}
	return isValid;
};
