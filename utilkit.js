const len = (obj) => {
	if (obj === null) throw new TypeError("null has no len()");
	switch (typeof obj) {
		case "string":
			obj = obj.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			return [
				...obj.replace(
					/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
					""
				),
			].length;
		case "object":
			return Object.keys(obj).length;
		case "bigint":
		case "number":
			return (obj + "").length;
		default:
			throw new TypeError(`${typeof obj} has no len()`);
	}
};

const sin = (rad) => {
	piCount = (rad / Math.PI) % 2;
	switch (true) {
		case piCount == 0:
			return 0;
		case piCount == 1 / 2:
			return 1;
		case piCount == 1:
			return 0;
		case piCount == 3 / 2:
			return -1;
		default:
			return Math.sin(rad);
	}
};
const cos = (rad) => {
	piCount = (rad / Math.PI) % 2;
	switch (true) {
		case piCount == 0:
			return 1;
		case piCount == 1 / 2:
			return 0;
		case piCount == 1:
			return -1;
		case piCount == 3 / 2:
			return 0;
		default:
			return Math.cos(rad);
	}
};
const tan = (rad) => {
	piCount = (rad / Math.PI) % 2;
	switch (true) {
		case piCount == 0:
			return 0;
		case piCount == 1 / 4:
			return 1;
		case piCount == 1 / 2:
			throw new Error("Cannot take tangent of pi/2.");
		case piCount == 3 / 4:
			return -1;
		case piCount == 1:
			return 0;
		case piCount == 5 / 4:
			return 1;
		case piCount == 3 / 2:
			throw new Error("Cannot take tangent of 3pi/2.");
		case piCount == 7 / 4:
			return -1;
		default:
			return Math.tan(rad);
	}
};
const reversed = (obj) => {
	if (obj === null) throw new TypeError("null is not reversible");
	if (Array.isArray(obj)) return [...obj].reverse();
	switch (typeof obj) {
		case "string":
			return obj.split("").reverse().join("");
		case "bigint":
		case "number":
			return parseFloat((obj + "").split("").reverse().join(""));
		default:
			throw new TypeError(`${typeof obj} is not reversible`);
	}
};
const reverse = (obj) => {
	if (Array.isArray(obj)) return obj.reverse();
	obj = reversed(obj);
	return obj;
};

// const defaultSort = (a, b) => {
// 	let res;
// 	let curA = a,
// 		curB = b;
// 	if (typeof a === "number") {
// 		curA = [a];
// 	}
// 	if (typeof b === "number") {
// 		curB = [b];
// 	}
// 	if (typeof a !== "object" || typeof b !== "object") {
// 		return a.toString().localeCompare(b.toString());
// 	}
// 	curA.flat().map((_, i) => {
// 		res ||= curA[i] - curB[i];
// 	});
// 	return res;
// };
// const sort = (arr, compareFn = (a, b) => defaultSort(a, b)) => {
// 	arr.sort(compareFn);
// 	return arr;
// };
// const sorted = (arr, compareFn = (a, b) => defaultSort(a, b)) => {
// 	return [...arr].sort(compareFn);
// };

module.exports = function (target) {
	if (target === undefined)
		return {
			len: (obj) => len(obj),
			reverse: (obj) => reverse(obj),
			reversed: (obj) => reversed(obj),
			sin: (rad) => sin(rad),
			cos: (rad) => cos(rad),
			tan: (rad) => tan(rad),
		};
	target.len = (obj) => len(obj);
	target.reverse = (obj) => reverse(obj);
	target.reversed = (obj) => reversed(obj);
	// this.sort = (arr, compareFn = (a, b) => a - b) => sort(arr);
	// this.sorted = (arr, compareFn = (a, b) => a - b) => sorted(arr);
	target.sin = (rad) => sin(rad);
	target.cos = (rad) => cos(rad);
	target.tan = (rad) => tan(rad);
	//etc
};
