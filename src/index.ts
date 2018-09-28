import "./assets/chessground.css";
import "./assets/theme.css";
import "./style.css";
import "./style.scss";

import { Chessground } from "chessground";
import { Api } from "chessground/api";

var chess_js = require("chess.js");

export function toDests(chess: any) {
  const dests = {};
  chess.SQUARES.forEach(s => {
    const ms = chess.moves({ square: s, verbose: true });
    if (ms.length) dests[s] = ms.map(m => m.to);
  });
  return dests;
}

export function toColor(chess: any) {
  return chess.turn() === "w" ? "white" : "black";
}

export function playOtherSide(cg: Api, chess) {
  return (orig, dest) => {
    console.log(chessgr);
    let move = { from: orig, to: dest };

    // Promotion handling
    if (chess.turn() == "w" && dest.endsWith("8")) {
      console.log("show promotion popup for white");
      move["promotion"] = "q";
    } else if (chess.turn() == "b" && dest.endsWith("1")) {
      move["promotion"] = "q";
    }
    chess.move(move);
    chessgr.set({ fen: chess.fen() });
    rewritePgn();
    cg.set({
      turnColor: toColor(chess),
      movable: {
        color: toColor(chess),
        dests: toDests(chess)
      }
    });
  };
}

export function changeBackorNext(cg, chess) {
  rewritePgn();
  cg.set({
    turnColor: toColor(chess),
    movable: {
      color: toColor(chess),
      dests: toDests(chess)
    }
  });
}

export function rewritePgn() {
  document.getElementById("pgn").innerHTML = chess.pgn();
}

var el = document.getElementById("ground1");

const chess = new chess_js();

const mymoves = [];

const chessgr = Chessground(el, {
  movable: {
    color: "white",
    free: false,
    dests: toDests(chess)
  }
});
chessgr.set({
  movable: { events: { after: playOtherSide(chessgr, chess) } }
});

var next = document.getElementById("next");
next.addEventListener("click", function(this, event) {
  console.log("next");
  console.log(chessgr);
  var move = mymoves.pop();
  chess.move(move);
  chessgr.set({ fen: chess.fen() });
  changeBackorNext(chessgr, chess);
  //chessgr.set({ turnColor: chess.turn() });
  //let a = playOtherSide(chessgr, chess);
  let b = 1;
});

var back = document.getElementById("back");
back.addEventListener("click", function(this, event) {
  var move = chess.undo();
  mymoves.push(move);
  chessgr.set({ fen: chess.fen() });
  changeBackorNext(chessgr, chess);
  // rewritePgn();
  // chessgr.set({ turnColor: chess.turn() });
  let b = 1;
});

var restart = document.getElementById("restart");
restart.addEventListener("click", function(this, event) {
  document.location.reload();
});
