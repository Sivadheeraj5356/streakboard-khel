(function () {
  var KEY = 'streakboard.v1', $ = function (id) { return document.getElementById(id); };
  var sessions = JSON.parse(localStorage.getItem(KEY) || '[]');
  function today() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  $('date').value = today();
  function render() {
    var s = Engine.summarize(sessions, today());
    $('level').textContent = s.level; $('xp').textContent = s.xp; $('streak').textContent = s.streak;
    $('progress').style.width = s.pct + '%'; $('next').textContent = s.toNext + ' XP to level ' + (s.level + 1);
    $('badges').innerHTML = s.badges.length ? s.badges.map(function (b) { return '<li>' + b + '</li>'; }).join('') : '<li class="none">No badges yet</li>';
    var h = $('history'); h.innerHTML = '';
    sessions.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }).forEach(function (x) {
      var li = document.createElement('li'); li.textContent = x.date + ' - ' + x.sport + ', ' + x.mins + ' min'; h.appendChild(li);
    });
  }
  $('log').addEventListener('submit', function (e) {
    e.preventDefault();
    var s = { sport: $('sport').value, mins: Number($('mins').value), date: $('date').value };
    var err = Engine.validate(s); $('err').textContent = err; if (err) return;
    sessions.push(s); localStorage.setItem(KEY, JSON.stringify(sessions)); render();
  });
  $('reset').addEventListener('click', function () { if (confirm('Delete all sessions?')) { sessions = []; localStorage.removeItem(KEY); render(); } });
  render();
})();
