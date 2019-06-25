import deepcopyArray from "@/utils/deepcopyArray";

describe("正常系", () => {
  const arr = [1, 2, 3];
  const subject = deepcopyArray(arr);

  it("中身はすべて同じだがオブジェクトIDは異なる", () => {
    expect(subject).toEqual(arr);
    expect(subject).not.toBe(arr);
  });
});
