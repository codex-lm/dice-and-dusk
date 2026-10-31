# Dice & Dusk

A candlelit dice roguelite about reading enemy intents and choosing when to strike, guard or hex. Built with Kimi for Kimi Games.

## Play

The committed `index.html` is self-contained. Serve it through any static HTTP server; no account, service or runtime dependency is required.

```sh
python -m http.server 8080
```

Then open `http://localhost:8080`. No build is needed on this static-export branch.

## Rules

- Each turn, assign all three dice to **Strike**, **Guard** and **Hex**.
- Strike deals its die + 2, reduced by enemy armor. Guard blocks its die against the current attack. Hex adds poison, which ignores armor, damages immediately and fades by one after each turn.
- Three consecutive dice form a **Straight**, granting +3 to every action. Three equal dice form a **Triad**, granting +9 Strike.
- Select an unassigned die to reroll it. Rerolls are limited per encounter. Click a filled action to free its die.
- Enemy intents are always visible. Win four encounters, choose a boon after each, then defeat the Bell Warden’s two phases.

Click or tap to play. **1/2/3** select dice, **Space** ends a complete turn, **M** toggles sound and **Escape** opens or closes help.

English is the default; French and Spanish are included. Preferences and the best score are stored locally when available. `?seed=12345` fixes the random sequence. `?demo=1&seed=12345` enables a documented autoplayer that uses the ordinary reroll, assignment, combat and boon rules without cheats.

## Files and development

- `src/index.template.html`, `src/styles.css`, `src/game.js`: editable sources retained in the export.
- `index.html`: generated playable file.
- `art/cover.png`: original cover.
- `LOB7-GAME.json`, `LOB7-ATTRIBUTION.json`: LOB7 metadata.
- `CREDITS.md`, `LICENSE`: provenance and permissions.

The [`development` branch](https://github.com/codex-lm/dice-and-dusk/tree/development) also contains `build.py`, which rebuilds the entrypoint, and `art/render_cover.py`, the optional Pillow cover generator. This export corresponds to development commit [`b9b212754aa9ba1266d68697a569d643b4fb1c6a`](https://github.com/codex-lm/dice-and-dusk/commit/b9b212754aa9ba1266d68697a569d643b4fb1c6a).

## Licence

Code and original artwork are released under the MIT License. See `LICENSE` and `CREDITS.md`.
