'use babel';

import AtomTexSymbolsView from './atom-tex-symbols-view';
import { CompositeDisposable } from 'atom';

let texSymbols = {
  Downarrow: "⇓",
  nwarrow: "↖",
  downarrow: "↓",
  Rightarrow: "⇒",
  rightarrow: "→",
  mapsto: "↦",
  searrow: "↘",
  swarrow: "↙",
  leftarrow: "←",
  uparrow: "↑",
  Leftarrow: "⇐",
  longrightarrow: "−",
  Uparrow: "⇑",
  Leftrightarrow: "⇔",
  updownarrow: "↕",
  leftrightarrow: "↔",
  nearrow: "↗",
  Updownarrow: "⇕",
  aleph: "א",
  prime: "′",
  emptyset: "∅",
  nabla: "∇",
  diamondsuit: "♦",
  spadesuit: "♠",
  clubsuit: "♣",
  heartsuit: "♥",
  sharp: "♯",
  flat: "♭",
  natural: "♮",
  surd: "√",
  neg: "¬",
  triangle: "△",
  forall: "∀",
  exists: "∃",
  infty: "∞",
  circ: "∘",
  alpha: "α",
  theta: "θ",
  tau: "τ",
  beta: "β",
  vartheta: "θ",
  pi: "π",
  upsilon: "υ",
  gamma: "γ",
  varpi: "π",
  phi: "φ",
  delta: "δ",
  kappa: "κ",
  rho: "ρ",
  varphi: "φ",
  epsilon: "ε",
  lambda: "λ",
  varrho: "ρ",
  chi: "χ",
  varepsilon: "ε",
  mu: "μ",
  sigma: "σ",
  psi: "ψ",
  zeta: "ζ",
  nu: "ν",
  varsigma: "ς",
  omega: "ω",
  eta: "η",
  xi: "ξ",
  iota: "ι",
  Gamma: "Γ",
  Lambda: "Λ",
  Sigma: "Σ",
  Psi: "Ψ",
  Delta: "Δ",
  Xi: "Ξ",
  Upsilon: "Υ",
  Omega: "Ω",
  Theta: "Θ",
  Pi: "Π",
  Phi: "Φ",
  pm: "±",
  cap: "∩",
  diamond: "◇",
  oplus: "⊕",
  mp: "∓",
  cup: "∪",
  bigtriangleup: "△",
  ominus: "⊖",
  times: "×",
  uplus: "⊎",
  bigtriangledown: "▽",
  otimes: "⊗",
  div: "÷",
  sqcap: "⊓",
  triangleright: "▹",
  oslash: "⊘",
  ast: "∗",
  sqcup: "⊔",
  vee: "∨",
  wedge: "∧",
  triangleleft: "◃",
  odot: "⊙",
  star: "★",
  dagger: "†",
  bullet: "•",
  ddagger: "‡",
  wr: "≀",
  amalg: "⨿",
  leq: "≤",
  geq: "≥",
  equiv: "≡",
  models: "⊨",
  prec: "≺",
  succ: "≻",
  precdot: "⋖",
  succdot: "⋗",
  sim: "∼",
  perp: "⊥",
  bot: "⊥",
  top: "⊤",
  preceq: "≼",
  succeq: "≽",
  simeq: "≃",
  ll: "≪",
  gg: "≫",
  asymp: "≍",
  parallel: "∥",
  subset: "⊂",
  supset: "⊃",
  approx: "≈",
  bowtie: "⋈",
  subseteq: "⊆",
  supseteq: "⊇",
  cong: "≌",
  sqsubsetb: "⊏",
  sqsupsetb: "⊐",
  neq: "≠",
  smile: "⌣",
  sqsubseteq: "⊑",
  sqsupseteq: "⊒",
  doteq: "≐",
  frown: "⌢",
  in: "∈",
  ni: "∋",
  notin: "∉",
  propto: "∝",
  vdash: "⊢",
  dashv: "⊣",
  cdot: "·",
  sum: "∑",
  prod: "∏",
  coprod: "∐",
  int: "∫",
  oint: "∮",
  sqrt: "√",
  skull: "☠",
  smiley: "☺",
  blacksmiley: "☻",
  frownie: "☹",
  S: "§",
  l: "ł",
  newpage: "^L",
  vdots: "⋮",
  ddots: "⋱",
  cdots: "⋯",
  hdots: "⋯",
  langle: "⟨",
  rangle: "⟩",
};

export default {

  subscriptions: null,

  activate(state) {
    console.log('tex-symbols activated')

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-tex-symbols:replaceSymbol': () => this.replaceSymbol()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    //throw new Error("buh?");
  },

  replaceSymbol() {
    console.log('AtomTexSymbols trying to replace');
    let editor = atom.workspace.getActiveTextEditor();
    if (!editor) return;

    let point = editor.getCursorBufferPosition();
    let line = editor.lineTextForBufferRow(point.row);

    console.log(point);
    console.log(`line = ${line}`)

    for (let i = point.column - 1; i >= 0; i --) {
      let c = line[i];
      console.log(`line[${i}] = ${line[i]}`)

      if ((c < 'a' || c > 'z') && (c < 'A' || c > 'Z')) {
        console.log('not letter');

          // if it's not a \, ignore and return
          if (c === '\\') {
            let symbol_name = line.slice(i + 1, point.column - i + 2);
            console.log(`breaking, symname = ${symbol_name}`);
            if (!texSymbols.hasOwnProperty(symbol_name)) return;

            editor.setTextInBufferRange([[point.row, i], [point.row, point.column]], texSymbols[symbol_name]);
          }
      }
    }
  }

};
