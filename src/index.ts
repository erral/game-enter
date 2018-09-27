import "./assets/chessground.css";
import "./assets/theme.css";
import "./style.css";

var chess_js = require("chess.js");
import { Chessground } from "chessground";
//import { toDests, playOtherSide } from "./utils";
//var Chessground = require("chessground");
//import Chessground from "chessground";

import { Api } from "chessground/api";

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
    chess.move({ from: orig, to: dest });
    document.getElementById("pgn").innerHTML = chess.pgn();
    cg.set({
      turnColor: toColor(chess),
      movable: {
        color: toColor(chess),
        dests: toDests(chess)
      }
    });
  };
}

export function writePGN(cg: Api, chess) {
  console.log("writePGN");
}

export function doThingsAfterMove(cg: Api, chess) {
  return (orig, dest) => {
    playOtherSide(cg, chess);
    writePGN(cg, chess);
  };
}

var el = document.getElementById("ground1");

const chess = new chess_js();

const cg = Chessground(el, {
  movable: {
    color: "white",
    free: false,
    dests: toDests(chess)
  }
});
cg.set({
  movable: { events: { after: playOtherSide(cg, chess) } }
});
