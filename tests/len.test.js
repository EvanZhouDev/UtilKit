const chalk = require("chalk");
require("../utilkit")();

describe("Strings", () => {
	// Applies only to tests in this describe block
	test("Base Case", () => {
		expect(len("Hello, World")).toBe("Hello, World".length);
	});

	test("Emojis", () => {
		expect(len("😀⌘123")).toBe(5);
	});

	test("Color Sequences/Escape Codes", () => {
		expect(len(chalk.blue("Hello, World"))).toBe("Hello, World".length);
	});

	test("Emojis and Color Sequences", () => {
		expect(len(chalk.blue("😀⌘123"))).toBe(5);
	});
});
describe("Arrays", () => {
	test("Array Length", () => {
		expect(len([1, 2, "Hello", "World"])).toBe(4);
	});
});
describe("Objects", () => {
	test("JSON Length", () => {
		expect(
			len({
				hello: "world",
				lorum: "ipsum",
				testing: 123,
			})
		).toBe(3);
	});
	test("Object Length", () => {
		// Arbitrary Class
		class myClass {
			constructor(a, b, c) {
				this.a = a;
				this.b = b;
				this.c = c;
			}
			sum() {
				return this.a + this.b + this.c;
			}
		}

		// Doesn't include functions
		expect(len(new myClass())).toBe(3);
	});
});
describe("Miscellaneous", () => {
	describe("No length", () => {
		test("True", () => {
			expect(() => len(true)).toThrow("boolean has no len()");
		});
		test("False", () => {
			expect(() => len(false)).toThrow("boolean has no len()");
		});
		test("Null", () => {
			expect(() => len(null)).toThrow("null has no len()");
		});
		test("Undefined", () => {
			expect(() => len(undefined)).toThrow("undefined has no len()");
		});
		test("Symbols", () => {
			expect(() => len(Symbol("foo"))).toThrow("symbol has no len()");
		});
	});

	describe("Functions", () => {
		test("Standard Function", () => {
			expect(() => len(function () {})).toThrow("function has no len()");
		});
		test("Arrow Functions", () => {
			expect(() => len(() => "foo")).toThrow("function has no len()");
		});
	});
	describe("Number types", () => {
		test("Float", () => {
			expect(len(123.4)).toBe(5);
		});
		test("Integer", () => {
			expect(len(123)).toBe(3);
		});
		test("BigInt", () => {
			expect(
				len(BigInt("0b11111111111111111111111111111111111111111111111111111"))
			).toBe("9007199254740991".length);
		});
	});
});
