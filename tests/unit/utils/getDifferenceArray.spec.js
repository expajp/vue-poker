import getDifferenceArray from '../../../src/utils/getDifferenceArray.js'

describe('正常系', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [2, 3, 4]

    expect(getDifferenceArray(arr1, arr2)).toBe([1])
})