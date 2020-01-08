import { sum } from '../src/js/num';

test("sum函数", () => {
    expect(sum(12, 5)).toBe(11);
    expect(sum(1, 5)).toBe(6);
    expect(sum(16, 5)).toBe(21);
});