const chalk = require("chalk");
require("./jsutils")();

// console.log(chalk.blue("hi"));

describe("`sort` Function", () => {
	test("Sort Base Case", () => {
		let arr = [3, 1, 2, 4];
		sort(arr);
		expect(arr).toStrictEqual([1, 2, 3, 4]);
	});
});
describe("`sorted` Function", () => {
	test("Sorted Check Result", () => {
		let arr = [3, 1, 2, 4];
		expect(sorted(arr)).toStrictEqual([1, 2, 3, 4]);
	});
	test("Sorted Check Keep Original", () => {
		let arr = [3, 1, 2, 4];
		expect(arr).toStrictEqual([3, 1, 2, 4]);
	});
});
// test("Testing length of emojis", () => {
// 	expect(len("😀123")).toBe(4);
// });
