/* ==========================================================================
   nap — js/views/settings.js
   Settings view for the secondary column, laid out as a grouped row list.

     renderSettings();            // targets .col-secondary
     renderSettings(someElement); // or an explicit column element

   Renders a sticky .col-head with a back button plus a .col-body of rows,
   so it replaces the whole column, not just its body.

   Classes are all existing ones from layout.css / components.css:
   .col-head, .col-head-row, .col-head-title, .col-head-spacer, .col-body,
   .menu-label, .menu-item, .menu-sep, .chip, .btn-icon, .icon.

   Needs two new <symbol>s in the sprite: #i-arrow-left, #i-chevron-right.
   ========================================================================== */

/* A settings row: icon, label, current value, chevron. */
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

    ${row('user', 'Not signed in', 'Connect a signer')}

    <div class="menu-sep"></div>

    <div class="menu-label">General</div>
    ${row('moon', 'Theme', 'System')}
    ${row('settings', 'Language', 'English')}

    <div class="menu-sep"></div>

    <div class="menu-label">Ledger</div>
    ${row('book', 'Default unit', 'BTC')}
    ${row('chart', 'Amount scale', '8')}
    ${row('tree', 'Account codes', 'Shown')}

    <div class="menu-sep"></div>

    <div class="menu-label">Network</div>
    ${row('relay', 'Relays', '2 connected')}
    ${row('paperclip', 'Media server', 'Not set')}

    <div class="menu-sep"></div>

    <div class="menu-label">Data</div>
    ${row('ledger', 'Export ledger', '')}
    ${row('key', 'Signer', 'None')}

    <div class="menu-sep"></div>

    <div class="menu-label">nap 0.1.0 · NUD fan · kinds 7701 · 7702 · 37701</div>

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
