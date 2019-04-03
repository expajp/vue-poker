import getDifferenceArrays from '@/utils/getDifferenceArrays'

test('正常系', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [2, 3, 4]
    const subject = getDifferenceArrays(arr1, arr2)

    expect(subject).toContain(1)
    expect(subject).toHaveLength(1)
})