(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const ui = {
    menu: $("menuScreen"), game: $("gameScreen"), runLabel: $("runLabel"), modal: $("modal"), modalCard: $("modalCard"),
    playerHpText: $("playerHpText"), playerHpFill: $("playerHpFill"), poisonPlayer: $("poisonPlayer"), rerollStock: $("rerollStock"),
    enemyCard: $("enemyCard"), enemyKind: $("enemyKind"), enemyName: $("enemyName"), enemyArmor: $("enemyArmor"), enemyArt: $("enemyArt"),
    enemyHpText: $("enemyHpText"), enemyHpFill: $("enemyHpFill"), enemyPoison: $("enemyPoison"), intent: $("intent"), intentText: $("intentText"),
    instruction: $("instruction"), comboBadge: $("comboBadge"), diceTray: $("diceTray"), rerollButton: $("rerollButton"), rerollCount: $("rerollCount"),
    endTurn: $("endTurnButton"), combatLog: $("combatLog"), boonsSummary: $("boonsSummary"), seedLabel: $("seedLabel"),
    language: $("languageSelect"), sound: $("soundButton"), toast: $("toast"),
    slots: [$("slot0"), $("slot1"), $("slot2")], actions: Array.from(document.querySelectorAll("[data-action]"))
  };

  const messages = {
    en: {
      kicker: "A CANDLELIT GAME OF NERVE", tagline: "Three dice. Three choices. One last bell.",
      menuCopy: "Read your enemy. Spend your dice on steel, safety or sorcery. Every pip is a small promise.",
      begin: "ENTER THE DUNGEON", strike: "STRIKE", guard: "GUARD", hex: "HEX",
      strikeRule: "Deal the die + 2. Armor softens the blow.", guardRule: "Block this turn’s attack with the die.", hexRule: "Stack poison. It ignores armor.",
      menuNote: "Five encounters · visible intents · a boon after every victory", wanderer: "THE WANDERER", intent: "INTENT",
      yourRoll: "YOUR ROLL", reroll: "REROLL", endTurn: "END TURN", noBoons: "No boons yet",
      instruction: "Choose a die, then an action.", selectFirst: "Select a die first", noRerolls: "No rerolls left", rerolled: "The die tumbles…",
      strikePreview: "Die + {bonus} damage", guardPreview: "Block the die{bonus}", hexPreview: "Stack the die as poison{bonus}",
      rerollChip: "↻ {count} rerolls", poisonChip: "✦ {count} poison", armorChip: "⬡ {count} armor", enemyPoison: "✦ {count}",
      straight: "STRAIGHT · +3 TO ALL", triad: "TRIAD · +9 STRIKE", filledSlot: "Assigned die {value}",
      firstStep: "THE FIRST STEP", secondStep: "THE DAMP CHAPEL", thirdStep: "THE BRASS GATE", fourthStep: "THE REFLECTION", finalStep: "THE LAST BELL",
      batName: "Candle Bat", monkName: "Mire Monk", gargoyleName: "Brass Gargoyle", witchName: "Mirror Witch", bossName: "The Bell Warden",
      attackIntent: "Attack · {amount}", poisonIntent: "Attack {amount} · poison +{poison}", healIntent: "Mend · {amount} HP",
      curseIntent: "Hex · −{amount} strike next turn", drainIntent: "Attack {amount} · steal a reroll", pierceIntent: "Piercing bell · {amount}",
      attackType: "attack", healType: "mend", poisonType: "poison", curseType: "hex",
      turnStrike: "You deal {damage}. Your guard holds {guard}; your hex adds {hex} poison.",
      poisonTicks: "Poison seeps through {name} for {damage}.", armorBlocks: "Armor absorbs {amount} of the strike.",
      enemyAttacks: "{name} attacks for {damage} damage.", enemyHeals: "{name} mends {amount} HP.", enemyPoisons: "You take {amount} poison.",
      enemyCurses: "Your next strike loses {amount} damage.", enemyDrains: "A reroll is stolen.", playerPoisonTicks: "Your poison deals {damage}.",
      thorns: "Your thorns answer for {damage}.", phaseTwo: "The Warden breaks its chains. The last bell quickens!",
      bossPhase: "SECOND PHASE", rewardKicker: "A MOMENT BY THE FIRE", rewardTitle: "Choose what the dark taught you.",
      rewardText: "Victory restores 4 HP. Take one boon before the next door.", continue: "CONTINUE",
      whetstoneName: "Honed Edge", whetstoneDesc: "Every Strike deals +2 damage.", oakName: "Oak Oath", oakDesc: "Every Guard blocks +2.",
      venomName: "Venom Ink", venomDesc: "Every Hex adds +2 poison.", heartName: "Giant’s Heart", heartDesc: "+6 maximum HP and heal 10.",
      rerollName: "Loaded Luck", rerollDesc: "+2 rerolls at every new encounter.", thornsName: "Briar Mail", thornsDesc: "Reflect 2 damage when attacked.",
      bloodName: "Crimson Cup", bloodDesc: "Heal 4 after every victory.", luckyName: "Three in a Row", luckyDesc: "Straights grant +2 more to every action.",
      victoryKicker: "THE BELL IS SILENT", victoryTitle: "Dawn, at last.", victoryText: "The Warden kneels. Beyond the gate, the sky is neither plum nor ink — it is gold.",
      defeatKicker: "THE CANDLE DIES", defeatTitle: "The dark keeps your dice.", defeatText: "A different roll, a sharper choice. The dungeon will remember you.",
      score: "SCORE", best: "BEST", turns: "TURNS", playAgain: "ROLL AGAIN", home: "BACK TO THE COVER", newBest: "A new legend in the margin!",
      helpTitle: "How to survive the dusk", helpIntro: "Every turn, assign all three dice. Read the enemy’s intent before committing.",
      helpStrike: "Strike deals its die + 2, minus armor.", helpGuard: "Guard blocks its die from the current attack. Unused guard fades.",
      helpHex: "Hex adds poison equal to its die. Poison damages immediately and after each following turn, then fades by one. It ignores armor.",
      helpCombo: "Three consecutive dice form a Straight: +3 to every action. Three equal dice form a Triad: +9 Strike.",
      helpReroll: "Select an unassigned die to reroll it. Rerolls are limited per encounter. Click a filled action to free its die.",
      helpClose: "I’M READY", seed: "SEED", soundOn: "Sound on", soundOff: "Sound muted",
      logStart: "{name} blocks the corridor. Read its intent.", boons: "Boons", none: "—"
    },
    fr: {
      kicker: "UN JEU DE NERF À LA CHANDELLE", tagline: "Trois dés. Trois choix. Une dernière cloche.",
      menuCopy: "Lis ton ennemi. Dépense tes dés en acier, en prudence ou en sorcellerie. Chaque point est une petite promesse.",
      begin: "ENTRER DANS LE DONJON", strike: "FRAPPE", guard: "GARDE", hex: "MALÉDICTION",
      strikeRule: "Inflige le dé + 2. L’armure adoucit le coup.", guardRule: "Bloque l’attaque de ce tour avec le dé.", hexRule: "Empile du poison. Il ignore l’armure.",
      menuNote: "Cinq rencontres · intentions visibles · un don après chaque victoire", wanderer: "LE VOYAGEUR", intent: "INTENTION",
      yourRoll: "TON TIRAGE", reroll: "RELANCER", endTurn: "FINIR LE TOUR", noBoons: "Aucun don pour l’instant",
      instruction: "Choisis un dé, puis une action.", selectFirst: "Choisis d’abord un dé", noRerolls: "Plus aucune relance", rerolled: "Le dé roule…",
      strikePreview: "Dé + {bonus} dégâts", guardPreview: "Bloque la valeur du dé{bonus}", hexPreview: "Empile le dé en poison{bonus}",
      rerollChip: "↻ {count} relances", poisonChip: "✦ {count} poison", armorChip: "⬡ {count} armure", enemyPoison: "✦ {count}",
      straight: "SUITE · +3 À TOUT", triad: "TRINITÉ · +9 FRAPPE", filledSlot: "Dé assigné {value}",
      firstStep: "LE PREMIER PAS", secondStep: "LA CHAPELLE HUMIDE", thirdStep: "LA PORTE DE LAITON", fourthStep: "LE REFLET", finalStep: "LA DERNIÈRE CLOCHE",
      batName: "Chauve-chandelle", monkName: "Moine des fondrières", gargoyleName: "Gargouille de laiton", witchName: "Sorcière-miroir", bossName: "Le Veilleur de cloche",
      attackIntent: "Attaque · {amount}", poisonIntent: "Attaque {amount} · poison +{poison}", healIntent: "Soin · {amount} PV",
      curseIntent: "Maléfice · −{amount} frappe au tour suivant", drainIntent: "Attaque {amount} · vole une relance", pierceIntent: "Cloche perforante · {amount}",
      attackType: "attaque", healType: "soin", poisonType: "poison", curseType: "maléfice",
      turnStrike: "Tu infliges {damage}. Ta garde tient {guard} ; ta malédiction ajoute {hex} poison.",
      poisonTicks: "Le poison ronge {name} et inflige {damage}.", armorBlocks: "L’armure absorbe {amount} de la frappe.",
      enemyAttacks: "{name} attaque et inflige {damage} dégâts.", enemyHeals: "{name} récupère {amount} PV.", enemyPoisons: "Tu reçois {amount} poison.",
      enemyCurses: "Ta prochaine frappe perd {amount} dégâts.", enemyDrains: "Une relance est volée.", playerPoisonTicks: "Ton poison inflige {damage}.",
      thorns: "Tes ronces répondent avec {damage}.", phaseTwo: "Le Veilleur brise ses chaînes. La dernière cloche s’affole !",
      bossPhase: "DEUXIÈME PHASE", rewardKicker: "UN INSTANT PRÈS DU FEU", rewardTitle: "Choisis ce que l’ombre t’a appris.",
      rewardText: "La victoire restaure 4 PV. Prends un don avant la prochaine porte.", continue: "CONTINUER",
      whetstoneName: "Fil affûté", whetstoneDesc: "Chaque Frappe inflige +2 dégâts.", oakName: "Serment de chêne", oakDesc: "Chaque Garde bloque +2.",
      venomName: "Encre venimeuse", venomDesc: "Chaque Malédiction ajoute +2 poison.", heartName: "Cœur de géant", heartDesc: "+6 PV maximum et soigne 10.",
      rerollName: "Chance pipée", rerollDesc: "+2 relances à chaque nouvelle rencontre.", thornsName: "Cotte de ronces", thornsDesc: "Renvoie 2 dégâts quand on t’attaque.",
      bloodName: "Coupe cramoisie", bloodDesc: "Soigne 4 après chaque victoire.", luckyName: "Trois à la suite", luckyDesc: "Les Suites donnent +2 de plus à chaque action.",
      victoryKicker: "LA CLOCHE SE TAIT", victoryTitle: "Enfin, l’aube.", victoryText: "Le Veilleur s’agenouille. Au-delà de la porte, le ciel n’est ni prune ni encre : il est d’or.",
      defeatKicker: "LA CHANDELLE S’ÉTEINT", defeatTitle: "L’ombre garde tes dés.", defeatText: "Un autre tirage, un choix plus fin. Le donjon se souviendra de toi.",
      score: "SCORE", best: "RECORD", turns: "TOURS", playAgain: "REJOUER", home: "RETOUR À LA COUVERTURE", newBest: "Une nouvelle légende dans la marge !",
      helpTitle: "Comment survivre à la nuit", helpIntro: "À chaque tour, assigne les trois dés. Lis l’intention de l’ennemi avant de les engager.",
      helpStrike: "La Frappe inflige son dé + 2, moins l’armure.", helpGuard: "La Garde bloque son dé contre l’attaque actuelle. La garde inutilisée disparaît.",
      helpHex: "La Malédiction ajoute autant de poison que son dé. Le poison frappe aussitôt puis après chaque tour, et diminue d’un point. Il ignore l’armure.",
      helpCombo: "Trois dés consécutifs forment une Suite : +3 à chaque action. Trois dés identiques forment une Trinité : +9 Frappe.",
      helpReroll: "Sélectionne un dé non assigné pour le relancer. Les relances sont limitées par rencontre. Clique une action remplie pour libérer son dé.",
      helpClose: "JE SUIS PRÊT", seed: "GRAINE", soundOn: "Son activé", soundOff: "Son coupé",
      logStart: "{name} bloque le couloir. Lis son intention.", boons: "Dons", none: "—"
    },
    es: {
      kicker: "UN JUEGO DE VALENTÍA A LA LUZ DE UNA VELA", tagline: "Tres dados. Tres decisiones. Una última campana.",
      menuCopy: "Lee a tu enemigo. Gasta tus dados en acero, defensa o hechicería. Cada punto es una pequeña promesa.",
      begin: "ENTRAR EN LA MAZMORRA", strike: "GOLPE", guard: "GUARDIA", hex: "HECHIZO",
      strikeRule: "Inflige el dado + 2. La armadura reduce el golpe.", guardRule: "Bloquea el ataque de este turno con el dado.", hexRule: "Acumula veneno. Ignora la armadura.",
      menuNote: "Cinco encuentros · intenciones visibles · un don tras cada victoria", wanderer: "EL CAMINANTE", intent: "INTENCIÓN",
      yourRoll: "TU TIRADA", reroll: "RELANZAR", endTurn: "TERMINAR TURNO", noBoons: "Aún no tienes dones",
      instruction: "Elige un dado y después una acción.", selectFirst: "Elige primero un dado", noRerolls: "No quedan relanzamientos", rerolled: "El dado gira…",
      strikePreview: "Dado + {bonus} de daño", guardPreview: "Bloquea el valor del dado{bonus}", hexPreview: "Acumula el dado como veneno{bonus}",
      rerollChip: "↻ {count} relanzamientos", poisonChip: "✦ {count} veneno", armorChip: "⬡ {count} armadura", enemyPoison: "✦ {count}",
      straight: "ESCALERA · +3 A TODO", triad: "TRÍADA · +9 GOLPE", filledSlot: "Dado asignado {value}",
      firstStep: "EL PRIMER PASO", secondStep: "LA CAPILLA HÚMEDA", thirdStep: "LA PUERTA DE LATÓN", fourthStep: "EL REFLEJO", finalStep: "LA ÚLTIMA CAMPANA",
      batName: "Murciélago de vela", monkName: "Monje del lodazal", gargoyleName: "Gárgola de latón", witchName: "Bruja del espejo", bossName: "El Guardián de la campana",
      attackIntent: "Ataque · {amount}", poisonIntent: "Ataque {amount} · veneno +{poison}", healIntent: "Curación · {amount} PV",
      curseIntent: "Maleficio · −{amount} golpe el próximo turno", drainIntent: "Ataque {amount} · roba un relanzamiento", pierceIntent: "Campana perforante · {amount}",
      attackType: "ataque", healType: "curación", poisonType: "veneno", curseType: "maleficio",
      turnStrike: "Infliges {damage}. Tu guardia bloquea {guard}; tu hechizo añade {hex} veneno.",
      poisonTicks: "El veneno corroe a {name} e inflige {damage}.", armorBlocks: "La armadura absorbe {amount} del golpe.",
      enemyAttacks: "{name} ataca e inflige {damage} de daño.", enemyHeals: "{name} recupera {amount} PV.", enemyPoisons: "Recibes {amount} de veneno.",
      enemyCurses: "Tu próximo golpe pierde {amount} de daño.", enemyDrains: "Te roban un relanzamiento.", playerPoisonTicks: "Tu veneno inflige {damage}.",
      thorns: "Tus espinas responden con {damage}.", phaseTwo: "¡El Guardián rompe sus cadenas! ¡La última campana se acelera!",
      bossPhase: "SEGUNDA FASE", rewardKicker: "UN MOMENTO JUNTO AL FUEGO", rewardTitle: "Elige lo que te enseñó la oscuridad.",
      rewardText: "La victoria restaura 4 PV. Toma un don antes de la siguiente puerta.", continue: "CONTINUAR",
      whetstoneName: "Filo afilado", whetstoneDesc: "Cada Golpe inflige +2 de daño.", oakName: "Juramento de roble", oakDesc: "Cada Guardia bloquea +2.",
      venomName: "Tinta venenosa", venomDesc: "Cada Hechizo añade +2 de veneno.", heartName: "Corazón de gigante", heartDesc: "+6 PV máximos y cura 10.",
      rerollName: "Suerte cargada", rerollDesc: "+2 relanzamientos en cada nuevo encuentro.", thornsName: "Cota de espinos", thornsDesc: "Devuelve 2 de daño cuando te atacan.",
      bloodName: "Copa carmesí", bloodDesc: "Cura 4 después de cada victoria.", luckyName: "Tres seguidos", luckyDesc: "Las Escaleras dan +2 más a cada acción.",
      victoryKicker: "LA CAMPANA CALLA", victoryTitle: "Por fin, el alba.", victoryText: "El Guardián se arrodilla. Más allá de la puerta, el cielo no es ciruela ni tinta: es oro.",
      defeatKicker: "LA VELA SE APAGA", defeatTitle: "La oscuridad se queda tus dados.", defeatText: "Otra tirada, una decisión más astuta. La mazmorra te recordará.",
      score: "PUNTOS", best: "RÉCORD", turns: "TURNOS", playAgain: "TIRAR OTRA VEZ", home: "VOLVER A LA PORTADA", newBest: "¡Una nueva leyenda en el margen!",
      helpTitle: "Cómo sobrevivir a la noche", helpIntro: "En cada turno, asigna los tres dados. Lee la intención del enemigo antes de comprometerte.",
      helpStrike: "El Golpe inflige su dado + 2, menos la armadura.", helpGuard: "La Guardia bloquea su dado contra el ataque actual. La guardia no usada desaparece.",
      helpHex: "El Hechizo añade veneno igual a su dado. El veneno daña de inmediato y después de cada turno, luego se reduce en uno. Ignora la armadura.",
      helpCombo: "Tres dados consecutivos forman una Escalera: +3 a cada acción. Tres iguales forman una Tríada: +9 Golpe.",
      helpReroll: "Selecciona un dado sin asignar para relanzarlo. Los relanzamientos son limitados por encuentro. Pulsa una acción ocupada para liberar su dado.",
      helpClose: "ESTOY LISTO", seed: "SEMILLA", soundOn: "Sonido activado", soundOff: "Sonido silenciado",
      logStart: "{name} bloquea el pasillo. Lee su intención.", boons: "Dones", none: "—"
    }
  };

  const enemyData = [
    { key: "bat", kind: "firstStep", hp: 18, armor: 0, pattern: [{ type: "attack", amount: 4 }, { type: "attack", amount: 6 }, { type: "drain", amount: 4 }] },
    { key: "monk", kind: "secondStep", hp: 25, armor: 0, pattern: [{ type: "attack", amount: 6 }, { type: "poison", amount: 3, poison: 2 }, { type: "attack", amount: 5 }, { type: "heal", amount: 4 }] },
    { key: "gargoyle", kind: "thirdStep", hp: 34, armor: 2, pattern: [{ type: "attack", amount: 7 }, { type: "attack", amount: 7 }, { type: "attack", amount: 11 }] },
    { key: "witch", kind: "fourthStep", hp: 31, armor: 0, pattern: [{ type: "attack", amount: 6 }, { type: "curse", amount: 2 }, { type: "heal", amount: 5 }, { type: "attack", amount: 9 }] },
    { key: "boss", kind: "finalStep", hp: 54, armor: 1, pattern: [{ type: "attack", amount: 8 }, { type: "poison", amount: 6, poison: 2 }, { type: "attack", amount: 11 }], phasePattern: [{ type: "attack", amount: 12 }, { type: "pierce", amount: 8 }, { type: "attack", amount: 14 }] }
  ];

  const boonData = [
    { id: "whetstone", icon: "⚔" }, { id: "oak", icon: "⬡" }, { id: "venom", icon: "✦" },
    { id: "heart", icon: "♥" }, { id: "reroll", icon: "↻" }, { id: "thorns", icon: "♧" },
    { id: "blood", icon: "♢" }, { id: "lucky", icon: "⚅" }
  ];

  let language = "en";
  let muted = false;
  let game = null;
  let modalType = null;
  let toastTimer = null;
  let bestScore = 0;
  const query = new URLSearchParams(location.search);
  const querySeed = query.get("seed");
  const demoMode = query.get("demo") === "1";
  let seed = Number(querySeed) || ((Date.now() ^ (Math.random() * 0xffffffff)) >>> 0);
  let randomState = seed >>> 0;
  try {
    const saved = localStorage.getItem("dusk-language");
    if (["en", "fr", "es"].includes(saved)) language = saved;
    muted = localStorage.getItem("dusk-muted") === "true";
    bestScore = Number(localStorage.getItem("dusk-best")) || 0;
  } catch (_) {}

  const random = () => {
    randomState = (randomState + 0x6d2b79f5) >>> 0;
    let n = randomState;
    n = Math.imul(n ^ (n >>> 15), n | 1);
    n ^= n + Math.imul(n ^ (n >>> 7), n | 61);
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
  };
  const t = (key, vars = {}) => {
    let text = (messages[language] && messages[language][key]) || messages.en[key] || key;
    for (const [name, value] of Object.entries(vars)) text = text.replaceAll(`{${name}}`, String(value));
    return text;
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  class DuskAudio {
    constructor() { this.context = null; this.master = null; }
    init() {
      if (!this.context) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        this.context = new AudioContext();
        this.master = this.context.createGain();
        this.master.gain.value = muted ? 0 : 0.42;
        this.master.connect(this.context.destination);
      }
      if (this.context.state === "suspended") this.context.resume().catch(() => {});
    }
    setMuted(value) { if (this.master && this.context) this.master.gain.setTargetAtTime(value ? 0 : 0.42, this.context.currentTime, 0.03); }
    tone(frequency, duration, type = "sine", volume = 0.08, delay = 0, end = null) {
      if (!this.context || muted) return;
      const now = this.context.currentTime + delay;
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now);
      if (end) oscillator.frequency.exponentialRampToValueAtTime(end, now + duration);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(gain); gain.connect(this.master);
      oscillator.start(now); oscillator.stop(now + duration + 0.03);
    }
    click() { this.tone(260, 0.07, "triangle", 0.04); }
    dice() { this.tone(180, 0.08, "square", 0.035); this.tone(240, 0.08, "square", 0.025, 0.06); }
    strike() { this.tone(150, 0.18, "sawtooth", 0.08, 0, 65); }
    guard() { this.tone(340, 0.22, "triangle", 0.05, 0, 220); }
    hex() { this.tone(290, 0.28, "sine", 0.055, 0, 540); }
    reward() { [330, 440, 554].forEach((note, i) => this.tone(note, 0.32, "sine", 0.05, i * 0.1)); }
    victory() { [262, 330, 392, 523, 659].forEach((note, i) => this.tone(note, 0.55, "sine", 0.06, i * 0.14)); }
    defeat() { [220, 185, 147].forEach((note, i) => this.tone(note, 0.45, "triangle", 0.055, i * 0.18)); }
  }
  const audio = new DuskAudio();

  function translate() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((element) => { element.innerHTML = t(element.dataset.i18n); });
    ui.language.value = language;
    ui.sound.textContent = muted ? "♩" : "♪";
    ui.sound.setAttribute("aria-label", muted ? t("soundOff") : t("soundOn"));
    if (game) render();
    if (modalType) renderModal();
  }

  function toggleSound() {
    muted = !muted;
    audio.init(); audio.setMuted(muted);
    try { localStorage.setItem("dusk-muted", String(muted)); } catch (_) {}
    translate();
    if (!muted) audio.click();
  }

  function toast(text) {
    ui.toast.textContent = text;
    ui.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => ui.toast.classList.remove("show"), 1400);
  }

  function artFor(key, phase = 1) {
    if (key === "bat") return `<svg viewBox="0 0 260 220"><path class="body" d="M130 66c-25-33-62-37-91-25 19 14 21 33 15 53-15 2-26 12-34 28 33-5 54 8 69 30 12 26 27 38 41 38s29-12 41-38c15-22 36-35 69-30-8-16-19-26-34-28-6-20-4-39 15-53-29-12-66-8-91 25Z"/><path class="shade" d="M99 127q31-29 62 0l-12 49H111Z"/><path class="light" d="M108 83q22-26 44 0l-6 43h-32Z"/><circle class="eye" cx="119" cy="98" r="5"/><circle class="eye" cx="141" cy="98" r="5"/><path class="line" d="M120 118l5 8 5-8 5 8 5-8M103 177l-8 22M157 177l8 22"/></svg>`;
    if (key === "monk") return `<svg viewBox="0 0 260 240"><path class="body" d="M130 25c-35 0-58 28-58 63 0 18-24 49-39 74-12 21 1 49 27 49h140c26 0 39-28 27-49-15-25-39-56-39-74 0-35-23-63-58-63Z"/><path class="shade" d="M73 92q57-42 114 0l-18 78H91Z"/><path class="light" d="M99 70q31-31 62 0l-9 43h-44Z"/><path class="shade" d="M111 83h38l-5 22h-28Z"/><circle class="eye" cx="120" cy="91" r="4"/><circle class="eye" cx="140" cy="91" r="4"/><path class="line" d="M83 158q47 25 94 0M130 172v38M72 208h-25v-72h17"/><circle class="accent" cx="55" cy="124" r="13"/><path class="line" d="M45 126q10-22 20 0"/></svg>`;
    if (key === "gargoyle") return `<svg viewBox="0 0 260 240"><path class="body" d="M73 70L46 26l48 24q36-19 72 0l48-24-27 44 18 58-26 73H81l-26-73Z"/><path class="shade" d="M83 77l47-23 47 23-13 102-34 25-34-25Z"/><path class="body" d="M59 104L20 86l18 65 49 30M201 104l39-18-18 65-49 30"/><path class="light" d="M101 91l20 5-8 12-17-4ZM159 91l-20 5 8 12 17-4Z"/><path class="line" d="M107 137l23 11 23-11M130 153v22M78 63l-8-24M182 63l8-24"/><circle class="accent" cx="130" cy="121" r="7"/></svg>`;
    if (key === "witch") return `<svg viewBox="0 0 260 240"><path class="body" d="M130 24c-37 0-65 31-65 68v104l36-19 29 34 29-34 36 19V92c0-37-28-68-65-68Z"/><path class="shade" d="M75 86q55-58 110 0l-15 93-40 31-40-31Z"/><path class="light" d="M98 65q32-26 64 0l-5 59-27 22-27-22Z"/><path class="shade" d="M102 75l25-13 31 8-6 13-21-7-26 11Z"/><circle class="eye" cx="118" cy="91" r="5"/><circle class="eye" cx="143" cy="91" r="5"/><path class="line" d="M118 114q12 9 24 0M58 193L32 219M202 193l26 26M198 55l23-28M212 61l29-8"/><circle class="accent" cx="222" cy="24" r="8"/></svg>`;
    return `<svg viewBox="0 0 260 250"><path class="body" d="M130 18 83 47 63 97 43 128l24 91 63 23 63-23 24-91-20-31-20-50Z"/><path class="shade" d="M87 60h86l18 61-23 83-38 20-38-20-23-83Z"/><path class="body" d="M67 99 25 69l12 83 42 42M193 99l42-30-12 83-42 42"/><path class="light" d="M105 78h50l12 45-37 32-37-32Z"/><path class="shade" d="M111 88h38l5 28-24 20-24-20Z"/><circle class="eye" cx="120" cy="102" r="5"/><circle class="eye" cx="141" cy="102" r="5"/><path class="line" d="M104 156h52M130 157v43M90 52l-9-31M170 52l9-31M112 36l-7-27M148 36l7-27"/><path class="accent" d="M130 164c-18 0-30 12-30 28h60c0-16-12-28-30-28Z"/>${phase === 2 ? `<path class="line" d="M72 72l-25-24M188 72l25-24M67 189l-30 15M193 189l30 15"/>` : ""}</svg>`;
  }

  function showMenu() {
    game = null;
    closeModal();
    ui.menu.classList.remove("hidden");
    ui.game.classList.add("hidden");
    ui.runLabel.classList.add("hidden");
  }

  function startRun() {
    audio.init(); audio.click();
    seed = Number(querySeed) || ((Date.now() ^ (Math.random() * 0xffffffff)) >>> 0);
    randomState = seed >>> 0;
    game = {
      scene: "battle", encounter: 0, maxHp: 42, playerHp: 42, playerPoison: 0,
      score: 0, totalTurns: 0, boons: [], strikeBonus: 0, guardBonus: 0, hexBonus: 0,
      rerollBonus: 0, thorns: 0, healOnKill: 0, straightBonus: 3, newBest: false,
      enemyHp: 0, enemyPoison: 0, phase: 1, round: 0, dice: [], assignments: [null, null, null],
      selected: null, rerolls: 0, curse: 0, intent: null, log: [], rewards: []
    };
    ui.menu.classList.add("hidden");
    ui.game.classList.remove("hidden");
    ui.runLabel.classList.remove("hidden");
    closeModal();
    startEncounter(0);
  }

  function currentEnemy() { return enemyData[game.encounter]; }
  function enemyName() { return t(`${currentEnemy().key}Name`); }

  function startEncounter(index) {
    game.encounter = index;
    game.enemyHp = currentEnemy().hp;
    game.enemyPoison = 0;
    game.playerPoison = 0;
    game.phase = 1;
    game.round = 0;
    game.curse = 0;
    game.rerolls = 2 + game.rerollBonus;
    game.log = [t("logStart", { name: enemyName() })];
    game.scene = "battle";
    closeModal();
    startRound();
  }

  function startRound() {
    game.round += 1;
    game.totalTurns += 1;
    game.dice = Array.from({ length: 3 }, (_, id) => ({ id, value: 1 + Math.floor(random() * 6), assigned: null, rerolled: false }));
    game.assignments = [null, null, null];
    game.selected = null;
    const pattern = game.phase === 2 ? currentEnemy().phasePattern : currentEnemy().pattern;
    game.intent = pattern[(game.round - 1) % pattern.length];
    game.scene = "battle";
    render();
    if (demoMode) demoTurn();
  }

  function selectDie(index) {
    if (!game || game.scene !== "battle" || modalType) return;
    const die = game.dice[index];
    if (!die || die.assigned !== null) return;
    game.selected = game.selected === index ? null : index;
    audio.click();
    renderDiceAndActions();
  }

  function assignAction(action) {
    if (!game || game.scene !== "battle" || modalType) return;
    if (game.assignments[action] !== null && game.selected === null) {
      const dieIndex = game.assignments[action];
      game.dice[dieIndex].assigned = null;
      game.assignments[action] = null;
      audio.click();
      renderDiceAndActions();
      return;
    }
    if (game.selected === null) { toast(t("selectFirst")); return; }
    const previous = game.assignments[action];
    if (previous !== null) game.dice[previous].assigned = null;
    const dieIndex = game.selected;
    game.assignments[action] = dieIndex;
    game.dice[dieIndex].assigned = action;
    game.selected = null;
    audio.click();
    renderDiceAndActions();
  }

  function rerollDie() {
    if (!game || game.scene !== "battle" || modalType) return;
    if (game.selected === null) { toast(t("selectFirst")); return; }
    if (game.rerolls <= 0) { toast(t("noRerolls")); return; }
    const die = game.dice[game.selected];
    if (!die || die.assigned !== null) return;
    game.rerolls -= 1;
    die.value = 1 + Math.floor(random() * 6);
    die.rerolled = true;
    audio.dice();
    render();
  }

  function combo() {
    const values = game.dice.map((die) => die.value);
    if (values.every((value) => value === values[0])) return "triad";
    const sorted = [...values].sort((a, b) => a - b);
    if (sorted[1] === sorted[0] + 1 && sorted[2] === sorted[1] + 1) return "straight";
    return null;
  }

  function effects() {
    const values = game.assignments.map((index) => game.dice[index].value);
    const comboType = combo();
    const comboBonus = comboType === "straight" ? game.straightBonus : 0;
    return {
      strike: Math.max(0, values[0] + 2 + game.strikeBonus + comboBonus + (comboType === "triad" ? 9 : 0) - game.curse),
      guard: values[1] + game.guardBonus + comboBonus,
      hex: values[2] + game.hexBonus + comboBonus,
      comboType
    };
  }

  function addLog(text) {
    game.log.push(text);
    if (game.log.length > 3) game.log.shift();
  }

  function endTurn() {
    if (!game || game.scene !== "battle" || modalType || game.assignments.some((value) => value === null)) return;
    game.scene = "resolving";
    const effect = effects();
    const enemy = currentEnemy();
    game.curse = 0;
    const damage = Math.max(0, effect.strike - enemy.armor);
    game.enemyHp = Math.max(0, game.enemyHp - damage);
    game.enemyPoison += effect.hex;
    addLog(t("turnStrike", { damage, guard: effect.guard, hex: effect.hex }));
    if (enemy.armor > 0 && effect.strike > 0) addLog(t("armorBlocks", { amount: Math.min(enemy.armor, effect.strike) }));
    audio.strike();
    if (effect.guard > 0) audio.guard();
    if (effect.hex > 0) audio.hex();
    if (game.enemyPoison > 0) {
      const poisonDamage = game.enemyPoison;
      game.enemyHp = Math.max(0, game.enemyHp - poisonDamage);
      game.enemyPoison = Math.max(0, game.enemyPoison - 1);
      addLog(t("poisonTicks", { name: enemyName(), damage: poisonDamage }));
    }
    if (game.enemyHp <= 0) { render(); winEncounter(); return; }
    if (enemy.key === "boss" && game.phase === 1 && game.enemyHp <= enemy.hp / 2) {
      game.phase = 2;
      addLog(t("phaseTwo"));
    }
    resolveIntent(effect.guard);
    if (game.enemyHp <= 0) { render(); winEncounter(); return; }
    if (game.playerPoison > 0) {
      const poisonDamage = game.playerPoison;
      game.playerHp = Math.max(0, game.playerHp - poisonDamage);
      game.playerPoison = Math.max(0, game.playerPoison - 1);
      addLog(t("playerPoisonTicks", { damage: poisonDamage }));
    }
    if (game.playerHp <= 0) { render(); loseRun(); return; }
    startRound();
  }

  function resolveIntent(guard) {
    const intent = game.intent;
    if (["attack", "poison", "drain", "pierce"].includes(intent.type)) {
      const blocked = intent.type === "pierce" ? 0 : guard;
      const damage = Math.max(0, intent.amount - blocked);
      game.playerHp = Math.max(0, game.playerHp - damage);
      addLog(t("enemyAttacks", { name: enemyName(), damage }));
      if (game.thorns > 0) {
        game.enemyHp = Math.max(0, game.enemyHp - game.thorns);
        addLog(t("thorns", { damage: game.thorns }));
      }
    }
    if (intent.type === "poison") {
      game.playerPoison += intent.poison;
      addLog(t("enemyPoisons", { amount: intent.poison }));
    } else if (intent.type === "heal") {
      game.enemyHp = Math.min(currentEnemy().hp, game.enemyHp + intent.amount);
      addLog(t("enemyHeals", { name: enemyName(), amount: intent.amount }));
    } else if (intent.type === "curse") {
      game.curse = intent.amount;
      addLog(t("enemyCurses", { amount: intent.amount }));
    } else if (intent.type === "drain") {
      game.rerolls = Math.max(0, game.rerolls - 1);
      addLog(t("enemyDrains"));
    }
  }

  function winEncounter() {
    const enemy = currentEnemy();
    game.score += enemy.hp * 10 + game.playerHp * 5 + Math.max(20, 110 - game.round * 8);
    if (game.healOnKill > 0) game.playerHp = Math.min(game.maxHp, game.playerHp + game.healOnKill);
    if (game.encounter === enemyData.length - 1) {
      game.scene = "victory";
      game.score += 500;
      if (game.score > bestScore) {
        bestScore = game.score;
        game.newBest = true;
        try { localStorage.setItem("dusk-best", String(bestScore)); } catch (_) {}
      }
      audio.victory();
      openModal("victory");
      return;
    }
    game.scene = "reward";
    game.playerHp = Math.min(game.maxHp, game.playerHp + 4);
    game.rewards = shuffle([...boonData]).slice(0, 3);
    audio.reward();
    openModal("reward");
    if (demoMode) {
      const priority = ["heart", "whetstone", "venom", "oak", "lucky", "thorns", "blood", "reroll"];
      const choice = priority.map((id) => game.rewards.find((boon) => boon.id === id)).find(Boolean);
      if (choice) chooseBoon(choice.id);
    }
  }

  function loseRun() {
    game.scene = "gameover";
    audio.defeat();
    openModal("gameover");
  }

  function shuffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  function chooseBoon(id) {
    if (!game || game.scene !== "reward") return;
    game.boons.push(id);
    if (id === "whetstone") game.strikeBonus += 2;
    else if (id === "oak") game.guardBonus += 2;
    else if (id === "venom") game.hexBonus += 2;
    else if (id === "heart") { game.maxHp += 6; game.playerHp = Math.min(game.maxHp, game.playerHp + 10); }
    else if (id === "reroll") game.rerollBonus += 2;
    else if (id === "thorns") game.thorns += 2;
    else if (id === "blood") game.healOnKill += 4;
    else if (id === "lucky") game.straightBonus += 2;
    audio.reward();
    startEncounter(game.encounter + 1);
  }

  function describeIntent() {
    const intent = game.intent;
    if (intent.type === "attack") return t("attackIntent", { amount: intent.amount });
    if (intent.type === "poison") return t("poisonIntent", { amount: intent.amount, poison: intent.poison });
    if (intent.type === "heal") return t("healIntent", { amount: intent.amount });
    if (intent.type === "curse") return t("curseIntent", { amount: intent.amount });
    if (intent.type === "drain") return t("drainIntent", { amount: intent.amount });
    return t("pierceIntent", { amount: intent.amount });
  }

  function pips(value) {
    const patterns = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
    return Array.from({ length: 9 }, (_, index) => `<span class="pip ${patterns[value].includes(index) ? "" : "empty"}"></span>`).join("");
  }

  function renderDiceAndActions() {
    ui.diceTray.innerHTML = game.dice.map((die) => `<button class="die ${game.selected === die.id ? "selected" : ""} ${die.assigned !== null ? "assigned" : ""}" data-die="${die.id}" ${die.assigned !== null ? "disabled" : ""} aria-label="Die ${die.value}" style="animation-delay:${die.id * 0.06}s">${pips(die.value)}${die.rerolled ? `<span class="die-rerolled">↻</span>` : ""}</button>`).join("");
    ui.diceTray.querySelectorAll("[data-die]").forEach((button) => button.addEventListener("click", () => selectDie(Number(button.dataset.die))));
    ui.actions.forEach((button, action) => {
      const assigned = game.assignments[action];
      button.classList.toggle("available", game.selected !== null);
      button.classList.toggle("filled", assigned !== null);
      ui.slots[action].textContent = assigned === null ? "+" : game.dice[assigned].value;
      ui.slots[action].setAttribute("aria-label", assigned === null ? "+" : t("filledSlot", { value: game.dice[assigned].value }));
    });
    const allAssigned = game.assignments.every((value) => value !== null);
    ui.endTurn.disabled = !allAssigned || game.scene !== "battle";
    ui.rerollButton.disabled = game.selected === null || game.rerolls <= 0 || game.scene !== "battle";
    ui.rerollCount.textContent = game.rerolls;
    ui.comboBadge.classList.toggle("hidden", !allAssigned || !combo());
    if (allAssigned && combo()) ui.comboBadge.textContent = t(combo());
  }

  function render() {
    if (!game) return;
    const enemy = currentEnemy();
    ui.runLabel.textContent = `${["I", "II", "III", "IV", "V"][game.encounter]} / V`;
    ui.playerHpText.textContent = `${game.playerHp} / ${game.maxHp}`;
    ui.playerHpFill.style.width = `${100 * game.playerHp / game.maxHp}%`;
    ui.poisonPlayer.classList.toggle("hidden", game.playerPoison <= 0);
    ui.poisonPlayer.textContent = t("poisonChip", { count: game.playerPoison });
    ui.rerollStock.textContent = t("rerollChip", { count: game.rerolls });
    ui.enemyKind.textContent = `${["I", "II", "III", "IV", "V"][game.encounter]} · ${t(enemy.kind)}${game.phase === 2 ? ` · ${t("bossPhase")}` : ""}`;
    ui.enemyName.textContent = enemyName();
    ui.enemyArmor.classList.toggle("hidden", enemy.armor <= 0);
    ui.enemyArmor.textContent = t("armorChip", { count: enemy.armor });
    ui.enemyArt.innerHTML = artFor(enemy.key, game.phase);
    ui.enemyHpText.textContent = `${game.enemyHp} / ${enemy.hp}`;
    ui.enemyHpFill.style.width = `${100 * game.enemyHp / enemy.hp}%`;
    ui.enemyPoison.classList.toggle("hidden", game.enemyPoison <= 0);
    ui.enemyPoison.textContent = t("enemyPoison", { count: game.enemyPoison });
    ui.intentText.textContent = describeIntent();
    const intentIcon = game.intent.type === "heal" ? "♥" : game.intent.type === "poison" || game.intent.type === "curse" ? "✦" : "⚔";
    ui.intent.querySelector(".intent-icon").textContent = intentIcon;
    ui.instruction.textContent = t("instruction");
    $("strikePreview").textContent = t("strikePreview", { bonus: 2 + game.strikeBonus });
    $("guardPreview").textContent = t("guardPreview", { bonus: game.guardBonus ? ` + ${game.guardBonus}` : "" });
    $("hexPreview").textContent = t("hexPreview", { bonus: game.hexBonus ? ` + ${game.hexBonus}` : "" });
    ui.combatLog.innerHTML = game.log.map((line) => `<p>${line}</p>`).join("");
    ui.boonsSummary.textContent = game.boons.length ? `${t("boons")}: ${game.boons.map((id) => t(`${id}Name`)).join(" · ")}` : t("noBoons");
    ui.seedLabel.textContent = `${t("seed")} ${seed.toString(36).toUpperCase()}`;
    renderDiceAndActions();
  }

  function openModal(type) {
    modalType = type;
    renderModal();
    ui.modal.classList.remove("hidden");
  }

  function closeModal() {
    modalType = null;
    ui.modal.classList.add("hidden");
  }

  function renderModal() {
    if (!modalType) return;
    let html = "";
    if (modalType === "help") {
      html = `<span class="sigil">⚄</span><p class="eyebrow">${t("kicker")}</p><h2>${t("helpTitle")}</h2><p>${t("helpIntro")}</p><div class="help-list"><p><strong>${t("strike")}:</strong> ${t("helpStrike")}</p><p><strong>${t("guard")}:</strong> ${t("helpGuard")}</p><p><strong>${t("hex")}:</strong> ${t("helpHex")}</p><p>${t("helpCombo")}</p><p>${t("helpReroll")}</p></div><div class="modal-actions"><button class="primary-button" data-modal-action="close"><span>${t("helpClose")}</span><b>→</b></button></div>`;
    } else if (modalType === "reward") {
      html = `<span class="sigil">♢</span><p class="eyebrow">${t("rewardKicker")}</p><h2>${t("rewardTitle")}</h2><p>${t("rewardText")}</p><div class="reward-grid">${game.rewards.map((boon) => `<button class="reward-card" data-boon="${boon.id}"><span class="reward-icon">${boon.icon}</span><strong>${t(`${boon.id}Name`)}</strong><p>${t(`${boon.id}Desc`)}</p></button>`).join("")}</div>`;
    } else if (modalType === "victory" || modalType === "gameover") {
      const victory = modalType === "victory";
      html = `<span class="sigil">${victory ? "☼" : "♧"}</span><p class="eyebrow">${t(victory ? "victoryKicker" : "defeatKicker")}</p><h2>${t(victory ? "victoryTitle" : "defeatTitle")}</h2><p>${t(victory ? "victoryText" : "defeatText")}</p><div class="result-grid"><div><small>${t("score")}</small><strong>${game.score}</strong></div><div><small>${t("best")}</small><strong>${Math.max(bestScore, game.score)}</strong></div><div><small>${t("turns")}</small><strong>${game.totalTurns}</strong></div></div>${game.newBest ? `<p class="eyebrow">${t("newBest")}</p>` : ""}<div class="modal-actions"><button class="primary-button" data-modal-action="restart"><span>${t("playAgain")}</span><b>↻</b></button><button class="secondary-button" data-modal-action="home">${t("home")}</button></div>`;
    }
    ui.modalCard.innerHTML = html;
    ui.modalCard.querySelectorAll("[data-boon]").forEach((button) => button.addEventListener("click", () => chooseBoon(button.dataset.boon)));
    ui.modalCard.querySelectorAll("[data-modal-action]").forEach((button) => button.addEventListener("click", () => {
      const action = button.dataset.modalAction;
      if (action === "close") closeModal();
      else if (action === "restart") startRun();
      else if (action === "home") showMenu();
    }));
  }

  function demoTurn() {
    if (!demoMode || !game || game.scene !== "battle") return;
    for (const die of game.dice) {
      if (die.value === 1 && game.rerolls > 0) {
        game.selected = die.id;
        rerollDie();
      }
    }
    const order = [...game.dice].sort((a, b) => b.value - a.value).map((die) => die.id);
    const armor = currentEnemy().armor;
    const incoming = game.intent.amount || 0;
    let actions;
    if (incoming >= 8 || game.playerHp <= 13) actions = [order[1], order[0], order[2]];
    else if (armor >= 2) actions = [order[1], order[2], order[0]];
    else actions = [order[0], order[2], order[1]];
    for (let action = 0; action < 3; action++) {
      game.selected = actions[action];
      assignAction(action);
    }
    endTurn();
  }

  $("startButton").addEventListener("click", startRun);
  $("homeButton").addEventListener("click", showMenu);
  $("helpButton").addEventListener("click", () => openModal("help"));
  ui.sound.addEventListener("click", toggleSound);
  ui.language.addEventListener("change", () => {
    language = ui.language.value;
    try { localStorage.setItem("dusk-language", language); } catch (_) {}
    translate();
  });
  ui.actions.forEach((button) => button.addEventListener("click", () => assignAction(Number(button.dataset.action))));
  ui.rerollButton.addEventListener("click", rerollDie);
  ui.endTurn.addEventListener("click", endTurn);
  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modalType === "help") closeModal();
    else if (event.code === "Escape" && game && game.scene === "battle") openModal("help");
    if (event.code === "KeyM") toggleSound();
    if (event.code === "Enter" && !game) startRun();
    if (event.code === "KeyR" && modalType === "gameover") startRun();
    if (event.code === "Space" && game && game.scene === "battle" && !modalType) { event.preventDefault(); endTurn(); }
    if (["Digit1", "Digit2", "Digit3"].includes(event.code) && game && game.scene === "battle" && !modalType) selectDie(Number(event.code.slice(-1)) - 1);
  });

  translate();
})();
