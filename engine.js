(function (root) {
  var XP_PER_MIN = 2, LEVEL_STEP = 200;
  function dayNum(iso) { var p = iso.split('-'); return Math.floor(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000); }
  function sessionXp(mins, streakDay) { return Math.round(mins * XP_PER_MIN * (1 + Math.min(streakDay - 1, 6) * 0.1)); }
  function streakOf(dates, today) {
    var set = {}; dates.forEach(function (d) { set[dayNum(d)] = 1; });
    var t = dayNum(today), n = set[t] ? t : t - 1, c = 0;
    while (set[n]) { c++; n--; }
    return c;
  }
  function level(xp) { return Math.floor(xp / LEVEL_STEP) + 1; }
  function validate(s) {
    if (!s.sport) return 'Pick a sport.';
    if (!(s.mins >= 5 && s.mins <= 300)) return 'Minutes must be between 5 and 300.';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s.date)) return 'Pick a date.';
    return '';
  }
  function summarize(sessions, today) {
    var ordered = sessions.slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    var xp = 0, run = 0, prev = null;
    ordered.forEach(function (s) {
      var d = dayNum(s.date);
      if (prev === null || d - prev > 1) run = 1; else if (d - prev === 1) run++;
      prev = d; xp += sessionXp(s.mins, run);
    });
    var dates = ordered.map(function (s) { return s.date; });
    var sports = {}; sessions.forEach(function (s) { sports[s.sport] = 1; });
    var streak = streakOf(dates, today), badges = [];
    if (sessions.length >= 1) badges.push('First session');
    if (streak >= 3) badges.push('3-day streak');
    if (streak >= 7) badges.push('7-day streak');
    if (Object.keys(sports).length >= 3) badges.push('Multi-sport');
    if (xp >= 1000) badges.push('1000 XP');
    return { xp: xp, level: level(xp), streak: streak, badges: badges, toNext: LEVEL_STEP - (xp % LEVEL_STEP), pct: (xp % LEVEL_STEP) / LEVEL_STEP * 100 };
  }
  var api = { summarize: summarize, validate: validate, streakOf: streakOf, sessionXp: sessionXp, level: level };
  if (typeof module !== 'undefined') module.exports = api; else root.Engine = api;
})(this);
