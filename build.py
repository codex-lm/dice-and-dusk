from pathlib import Path

root = Path(__file__).resolve().parent
source = root / "src"
template = (source / "index.template.html").read_text(encoding="utf-8")
styles = (source / "styles.css").read_text(encoding="utf-8")
game = (source / "game.js").read_text(encoding="utf-8")
if "/*__STYLES__*/" not in template or "/*__GAME__*/" not in template:
    raise SystemExit("Build markers are missing from src/index.template.html")
output = template.replace("/*__STYLES__*/", styles).replace("/*__GAME__*/", game)
(root / "index.html").write_text(output, encoding="utf-8", newline="\n")
print(f"Built index.html ({len(output.encode('utf-8'))} bytes)")
