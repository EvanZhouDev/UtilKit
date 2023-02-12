require("../utilkit")();
let pi = Math.PI;
describe("Trigonometric Functions", () => {
	describe("`sin` Function", () => {
		test("Sine of 0°", () => {
			expect(sin(0)).toBe(0);
		});
		test("Sine of 90°", () => {
			expect(sin(pi / 2)).toBe(1);
		});
		test("Sine of 180°", () => {
			expect(sin(pi)).toBe(0);
		});
		test("Sine of 270°", () => {
			expect(sin((pi / 2) * 3)).toBe(-1);
		});
		test("Sine of 360", () => {
			expect(sin(2 * pi)).toBe(0);
		});
		test("Sine of Multiple of pi", () => {
			expect(sin(100 * pi)).toBe(0);
		});
		test("Sine of Large Multiple of pi", () => {
			expect(sin(13412351234 * pi)).toBe(0);
		});
		test("Sine of Arbitrary Angle", () => {
			expect(sin(4)).toBe(Math.sin(4));
		});
	});
	describe("`cos` Function", () => {
		test("Cosine of 0°", () => {
			expect(cos(0)).toBe(1);
		});
		test("Cosine of 90°", () => {
			expect(cos(pi / 2)).toBe(0);
		});
		test("Cosine of 180°", () => {
			expect(cos(pi)).toBe(-1);
		});
		test("Cosine of 270°", () => {
			expect(cos((pi / 2) * 3)).toBe(0);
		});
		test("Cosine of 360", () => {
			expect(cos(2 * pi)).toBe(1);
		});
		test("Cosine of Multiple of pi", () => {
			expect(cos(100 * pi)).toBe(1);
		});
		test("Cosine of Large Multiple of pi", () => {
			expect(cos(13412351234 * pi)).toBe(1);
		});
		test("Cosine of Arbitrary Angle", () => {
			expect(cos(4)).toBe(Math.cos(4));
		});
	});
	describe("`tan` Function", () => {
		test("Tangent of 0°", () => {
			expect(tan(0)).toBe(0);
		});
		test("Tangent of 90°", () => {
			expect(() => {
				tan(pi / 2);
			}).toThrow(Error);
		});
		test("Tangent of 180°", () => {
			expect(tan(pi)).toBe(0);
		});
		test("Tangent of 270°", () => {
			expect(() => {
				tan((3 * pi) / 2);
			}).toThrow(Error);
		});
		test("Tangent of 360°", () => {
			expect(tan(2 * pi)).toBe(0);
		});
		test("Tangent of large multiple of pi", () => {
			expect(tan(13341234134132 * pi)).toBe(0);
		});

		test("Tangent of 45°", () => {
			expect(tan(pi / 4)).toBe(1);
		});
		test("Tangent of 135°", () => {
			expect(tan((pi / 4) * 3)).toBe(-1);
		});
		test("Tangent of 225°", () => {
			expect(tan((pi / 4) * 5)).toBe(1);
		});
		test("Tangent of 315°", () => {
			expect(tan((pi / 4) * 7)).toBe(-1);
		});
		test("Tangent of Large Multiple of pi/4", () => {
			expect(tan((pi / 4) * 100000000000001)).toBe(1);
		});
	});
});
