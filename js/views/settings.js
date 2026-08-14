function row(icon, label, value) {
  return `
    <button class="menu-item" type="button">
      <svg class="icon icon-sm" aria-hidden="true"><use href="#i-${icon}"/></svg>
      <span>${label}</span>
      <span class="col-head-spacer"></span>
      ${value ? `<span class="chip">${value}</span>` : ''}
      <svg class="icon icon-sm" aria-hidden="true"><use href="#i-chevron-right"/></svg>
    </button>`;
}

var MARKUP = `
  <header class="col-head">
    <div class="col-head-row">
      <button class="btn-icon" type="button" data-settings-back aria-label="Back">
        <svg class="icon" aria-hidden="true"><use href="#i-arrow-left"/></svg>
      </button>
      <h2 class="col-head-title">Settings</h2>
    </div>
  </header>

  <div class="col-body">

    <div class="menu-sep"></div>

    <div class="menu-label">Preferences</div>
    ${row('settings', 'General', '')}
    ${row('moon', 'Appearance', '')}

    <div class="menu-sep"></div>

    <div class="menu-label">About</div>
    ${row('book', 'Tbd', '')}

  </div>`;

/* Whatever the column held before settings was opened, so back can put it
   back. Stores markup only — listeners on restored nodes are not restored.
   Swap this for a re-render call once the other views exist. */
var previousMarkup = null;

function renderSettings(container) {
  var col = container || document.querySelector('.col-secondary');
  if (!col) return;

  previousMarkup = col.innerHTML;
  col.innerHTML = MARKUP;

  col.querySelector('[data-settings-back]').addEventListener('click', function () {
    col.innerHTML = previousMarkup !== null
      ? previousMarkup
      : '<div class="col-body"></div>';
    previousMarkup = null;
  });
}
