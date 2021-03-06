<template>
  <div class="container-fluid" id="game">
    <dealer ref="dealer" @result="postexec" />
    <div class="centering h4">
      {{ mainMessage }}
    </div>
    <player @stand="stand" :showButtons="showButtons" />
    <div class="centering h4 result" v-bind:class="resultColorClass">
      {{ resultMessage }}
    </div>
    <div class="centering" v-if="!showButtons">
      <button class="btn btn-success" v-on:click="reload">Retry?</button>
    </div>
  </div>
</template>

<style>
.dealer {
  margin: 20px auto;
}
.player {
  margin: 20px auto;
}
.centering {
  display: flex;
  justify-content: center;
}

.win {
  color: #ff3300;
}
.lose {
  color: #0033cc;
}
.draw {
  color: #000000;
}
</style>

<script>
import Dealer from "./Dealer";
import Player from "./Player";

export default {
  name: "game",
  components: { Dealer, Player },
  data() {
    return {
      mainMessage: "Welcome to Poker",
      playersResult: 0,
      dealersResult: 0,
      showButtons: true
    };
  },
  methods: {
    reload() {
      location.reload();
    },
    stand(playersResult) {
      this.playersResult = playersResult;
      this.$refs.dealer.$emit("postexec");
    },
    postexec(dealersResult) {
      this.showButtons = false;
      this.dealersResult = dealersResult;
      this.mainMessage = `Dealer : ${dealersResult.getYakuName()} / Player : ${this.playersResult.getYakuName()}`;
    },
    judgeVictoryOrDefeat(players, dealers) {
      // 両方Noneなら引き分け
      if (players.getYakuName() === "None" && dealers.getYakuName() === "None")
        return "Draw";

      // 役が異なる
      if (players.getYakuRank() > dealers.getYakuRank()) return "You Win";
      if (players.getYakuRank() < dealers.getYakuRank()) return "You Lose";

      // 役が同じ
      // 数字を比較
      if (players.getScore() > dealers.getScore()) return "You Win";
      if (players.getScore() < dealers.getScore()) return "You Lose";

      // ツーペアどうしで、高い方のペアの数字が同じ
      if (players.getYakuName() === "TwoPair") {
        if (players.getSecondScore() > dealers.getSecondScore())
          return "You Win";
        if (players.getSecondScore() < dealers.getSecondScore())
          return "You Lose";
      }

      // 役も数字も同じ
      if (players.getSuit() > dealers.getSuit()) return "You Win";
      if (players.getSuit() < dealers.getSuit()) return "You Lose";

      throw new Error("勝敗が判定できません");
    }
  },
  computed: {
    resultMessage() {
      if (this.showButtons) return "";
      return this.judgeVictoryOrDefeat(this.playersResult, this.dealersResult);
    },
    resultColorClass() {
      switch (this.resultMessage) {
        case "You Win":
          return { win: true };
        case "You Lose":
          return { lose: true };
        default:
          return { draw: true };
      }
    }
  }
};
</script>
