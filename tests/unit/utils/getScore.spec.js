import getScore from "../../../src/utils/getScore"

test('getScore from 1', () => {
    expect(getScore(1)).toBe(12);
})

test('getScore from 2', () => {
    expect(getScore(2)).toBe(0);
})
