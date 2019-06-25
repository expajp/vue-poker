import isEqualCards from "@/utils/isEqualCards";

describe("一致する", () => {
  const card_a = { number: 1, suit: "spade" };
  const card_b = { number: 1, suit: "spade" };

  it("trueを返す", () => {
    expect(isEqualCards(card_a, card_b)).toBeTruthy;
  });
});

describe("スートが異なる", () => {
  const card_a = { number: 1, suit: "spade" };
  const card_b = { number: 1, suit: "heart" };

  it("trueを返す", () => {
    expect(isEqualCards(card_a, card_b)).toBeFalsy;
  });
});

describe("数字が異なる", () => {
  const card_a = { number: 1, suit: "spade" };
  const card_b = { number: 2, suit: "spade" };

  it("trueを返す", () => {
    expect(isEqualCards(card_a, card_b)).toBeFalsy;
  });
});
