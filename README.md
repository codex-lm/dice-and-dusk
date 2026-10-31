# Dice & Dusk

A candlelit dice roguelite about reading enemy intents and choosing when to strike, guard or hex. Built with Kimi for Kimi Games.

## Play

The committed `index.html` is self-contained. Serve it through any static HTTP server; no account, service or runtime dependency is required.

```sh
python -m http.server 8080
```

Then open `http://localhost:8080`. On the `development` branch, edit `src/` and run `python build.py` to regenerate the entrypoint.

## Rules

- Each turn, assign all three dice to **Strike**, **Guard** and **Hex**.
- Strike deals its die + 2, reduced by enemy armor. Guard blocks its die against the current attack. Hex adds poison, which ignores armor, damages immediately and fades by one after each turn.
- Three consecutive dice form a **Straight**, granting +3 to every action. Three equal dice form a **Triad**, granting +9 Strike.
- Select an unassigned die to reroll it. Rerolls are limited per encounter. Click a filled action to free its die.
- Enemy intents are always visible. Win four encounters, choose a boon after each, then defeat the Bell Warden’s two phases.

Click or tap to play. **1/2/3** select dice, **Space** ends a complete turn, **M** toggles sound and **Escape** opens or closes help.

English is the default; French and Spanish are included. Preferences and the best score are stored locally when available. `?seed=12345` fixes the random sequence. `?demo=1&seed=12345` enables a documented autoplayer that uses the ordinary reroll, assignment, combat and boon rules without cheats.

## Files

- `src/index.template.html`, `src/styles.css`, `src/game.js`: editable sources.
- `build.py`: standard-library static export builder on the development branch.
- `index.html`: generated playable file.
- `art/cover.png` and `art/render_cover.py`: original cover and its optional Pillow generator.
- `LOB7-GAME.json`, `LOB7-ATTRIBUTION.json`: LOB7 metadata.
- `CREDITS.md`, `LICENSE`: provenance and permissions.

## Licence

Code and original artwork are released under the MIT License. See `LICENSE` and `CREDITS.md`.
