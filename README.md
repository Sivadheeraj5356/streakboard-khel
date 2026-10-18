# StreakBoard

A small gamified sports-activity tracker, built as a proof project for the Khel Club FDE Intern application (Oct 2026). Log sessions, earn XP with a streak multiplier, level up, and unlock badges. Data stays in localStorage.

- Plain HTML/CSS/JS, no build step: open `index.html`.
- Logic lives in `engine.js` (pure functions, tested): `node test.js`.
- XP = minutes x 2, +10% per consecutive streak day (capped at +60%). Level every 200 XP.

Not affiliated with Khel Club; a stand-alone sketch of the kind of feature loop an app that gamifies sports might use.
