import getDifferenceArrays from "@/utils/getDifferenceArrays";

describe("正常系", () => {
  const arr1 = [1, 2, 3];
  const arr2 = [2, 3, 4];
  const subject = getDifferenceArrays(arr1, arr2);

  it("中身が1のみの配列になる", () => {
    expect(subject).toEqual([1]);
  });
});
