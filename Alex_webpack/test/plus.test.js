import { plus } from '../src/js/plus';

test("plus", () => {
    expect(plus(12, 5)).toBe(17);
    expect(plus(1, 5)).toBe(6);
    expect(plus(16, 5)).toBe(21);
});