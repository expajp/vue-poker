import deepcopyArray from "@/utils/deepcopyArray.js";
import getUniqueArray from "@/utils/getUniqueArray.js";
import pickCard from "@/utils/pickCard.js";

// 52枚カードを引く
let deck = [];
for (let i = 0; i < 26; i++) deck.push(pickCard(true));
for (let i = 0; i < 26; i++) deck.push(pickCard(false));

describe("数字とスートを持ったカードを引く", () => {
  const card = deck[0];

  it("数字とスートはともにundefinedでない", () => {
    expect(card.number).not.toBeUndefined;
    expect(card.suit).not.toBeUndefined;
  });
});

describe("カードは52枚", () => {
  it("52枚カードを引いたあとにpickCard()するとundefined", () => {
    expect(pickCard()).toBeUndefined;
  });
});

describe("カードに重複なし", () => {
  it("スペードのカードは重複なしの13枚", () => {
    const spades = getUniqueArray(
      deepcopyArray(deck)
        .filter(card => {
          return card.suit === "spade";
        })
        .map(card => {
          return card.number;
        })
    );

    expect(spades.length).toBe(13);
    expect(Math.min(...spades)).toBe(1);
    expect(Math.max(...spades)).toBe(13);
  });
  it("ハートのカードは重複なしの13枚", () => {
    const hearts = getUniqueArray(
      deepcopyArray(deck)
        .filter(card => {
          return card.suit === "heart";
        })
        .map(card => {
          return card.number;
        })
    );

    expect(hearts.length).toBe(13);
    expect(Math.min(...hearts)).toBe(1);
    expect(Math.max(...hearts)).toBe(13);
  });
  it("ダイヤのカードは重複なしの13枚", () => {
    const diamonds = getUniqueArray(
      deepcopyArray(deck)
        .filter(card => {
          return card.suit === "diamond";
        })
        .map(card => {
          return card.number;
        })
    );

    expect(diamonds.length).toBe(13);
    expect(Math.min(...diamonds)).toBe(1);
    expect(Math.max(...diamonds)).toBe(13);
  });
  it("クラブのカードは重複なしの13枚", () => {
    const clubs = getUniqueArray(
      deepcopyArray(deck)
        .filter(card => {
          return card.suit === "club";
        })
        .map(card => {
          return card.number;
        })
    );

    expect(clubs.length).toBe(13);
    expect(Math.min(...clubs)).toBe(1);
    expect(Math.max(...clubs)).toBe(13);
  });
});

describe("指定したselectedに従ったcardが出てくる", () => {
  it("trueを指定するとselected: true", () => {
    expect(deck[0].selected).toBeTruthy;
  });
  it("falseを指定するとselected: false", () => {
    expect(deck[0].selected).toBeFalsy;
  });
});
