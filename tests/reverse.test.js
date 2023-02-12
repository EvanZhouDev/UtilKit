require("../utilkit")();

describe("`reverse` Function", () => {
	test("String", () => {
		expect(reverse("Hello, World")).toBe("dlroW ,olleH");
	});
	describe("Reversing Array", () => {
		test("Check Reverses", () => {
			let myArr = [3, 2, 1];
			expect(reverse(myArr)).toStrictEqual([1, 2, 3]);
		});
		test("Check Mutation", () => {
			let myArr = [3, 2, 1];
			reverse(myArr);
			expect(myArr).toStrictEqual([1, 2, 3]);
		});
	});
	test("Integer", () => {
		expect(reverse([3, 2, 1])).toStrictEqual([1, 2, 3]);
	});
	test("Float", () => {
		expect(reverse(3.141593)).toStrictEqual(395141.3);
	});
	test("BigInt", () => {
		expect(reverse(BigInt(1111111111102))).toStrictEqual(2011111111111);
	});
	describe("No reverse", () => {
		test("Object", () => {
			expect(() => reverse({ a: 1, b: 2 })).toThrow("object is not reversible");
		});
		test("True", () => {
			expect(() => reverse(true)).toThrow("boolean is not reversible");
		});
		test("False", () => {
			expect(() => reverse(false)).toThrow("boolean is not reversible");
		});
		test("Null", () => {
			expect(() => reverse(null)).toThrow("null is not reversible");
		});
		test("Undefined", () => {
			expect(() => reverse(undefined)).toThrow("undefined is not reversible");
		});
		test("Symbols", () => {
			expect(() => reverse(Symbol("foo"))).toThrow("symbol is not reversible");
		});
	});
});

describe("`reversed` Function", () => {
	test("String", () => {
		expect(reversed("Hello, World")).toBe("dlroW ,olleH");
	});
	describe("Reversing Array", () => {
		test("Check Reverses", () => {
			let myArr = [3, 2, 1];
			expect(reversed(myArr)).toStrictEqual([1, 2, 3]);
		});
		test("Check Non-Mutation", () => {
			let myArr = [3, 2, 1];
			reversed(myArr);
			expect(myArr).toStrictEqual([3, 2, 1]);
		});
	});
	test("Integer", () => {
		expect(reversed([3, 2, 1])).toStrictEqual([1, 2, 3]);
	});
	test("Float", () => {
		expect(reversed(3.141593)).toStrictEqual(395141.3);
	});
	test("BigInt", () => {
		expect(reversed(BigInt(1111111111102))).toStrictEqual(2011111111111);
	});
	describe("No reverse", () => {
		test("Object", () => {
			expect(() => reversed({ a: 1, b: 2 })).toThrow(
				"object is not reversible"
			);
		});
		test("True", () => {
			expect(() => reversed(true)).toThrow("boolean is not reversible");
		});
		test("False", () => {
			expect(() => reversed(false)).toThrow("boolean is not reversible");
		});
		test("Null", () => {
			expect(() => reversed(null)).toThrow("null is not reversible");
		});
		test("Undefined", () => {
			expect(() => reversed(undefined)).toThrow("undefined is not reversible");
		});
		test("Symbols", () => {
			expect(() => reversed(Symbol("foo"))).toThrow("symbol is not reversible");
		});
	});
});
