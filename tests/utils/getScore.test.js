import getScore from "../../src/utils/getScore"

test('getScore from 1', () => {
    expect(getScore(1)).toBe(12);
});
