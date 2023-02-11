const len = (input) => {
	if (input === null) throw new TypeError("null has no len()");
	switch (typeof input) {
		case "string":
			return [
				...input.replace(
					/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
					""
				),
			].length;
		case "object":
			return Object.keys(input).length;
		case "bigint":
		case "number":
			return (input + "").length;
		default:
			throw new TypeError(`${typeof input} has no len()`);
	}
};
const sort = (arr, compareFn = (a, b) => a - b) => {
	arr.sort(compareFn);
	return arr;
};
const sorted = (arr, compareFn = (a, b) => a - b) => {
	return [...arr].sort(compareFn);
};

module.exports = function () {
	this.len = (input) => len(input);
	this.sort = (arr, compareFn = (a, b) => a - b) => sort(arr);
	this.sorted = (arr, compareFn = (a, b) => a - b) => sorted(arr);
	//etc
};
