import getUniqueArray from "@/utils/getUniqueArray";

describe("重複した値がある", () => {
  const arr = [1, 1, 2, 3];

  it("重複した値が消える", () => {
    expect(getUniqueArray(arr)).toEqual([1, 2, 3]);
  });
});

describe("重複した値がない", () => {
  const arr = [1, 2, 3];

  it("配列の値はそのまま", () => {
    expect(getUniqueArray(arr)).toEqual([1, 2, 3]);
  });
});
