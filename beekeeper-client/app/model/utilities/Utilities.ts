export function getArrayOfEnum(myEnum) {
	const enumArray = [];
	Object.keys(myEnum)
		.filter(v => isNaN(parseInt(v, 10)))
		.forEach(v => enumArray.push(v));
	return enumArray;
}