// Client-side search, type filter, and column sorting for the tool table.
const table = document.getElementById("tools");
const tbody = table.tBodies[0];
const rows = Array.from(tbody.rows);
const search = document.getElementById("search");
const typeFilter = document.getElementById("type-filter");
const count = document.getElementById("count");
const empty = document.getElementById("empty");

function applyFilter() {
  const terms = search.value.toLowerCase().split(/\s+/).filter(Boolean);
  const type = typeFilter.value;
  let visible = 0;
  for (const row of rows) {
    const text = row.textContent.toLowerCase();
    const match =
      (!type || row.dataset.type === type) &&
      terms.every((term) => text.includes(term));
    row.hidden = !match;
    if (match) visible++;
  }
  count.textContent = `${visible} of ${rows.length}`;
  empty.hidden = visible > 0;
}

function sortBy(th) {
  const index = th.cellIndex;
  const numeric = th.dataset.sort === "num";
  const ascending = th.getAttribute("aria-sort") !== "ascending";
  for (const other of table.tHead.rows[0].cells) other.removeAttribute("aria-sort");
  th.setAttribute("aria-sort", ascending ? "ascending" : "descending");

  const value = (row) => row.cells[index].dataset.value;
  rows.sort((a, b) => {
    const cmp = numeric
      ? parseFloat(value(a)) - parseFloat(value(b))
      : value(a).localeCompare(value(b));
    return ascending ? cmp : -cmp;
  });
  tbody.append(...rows);
}

for (const th of table.tHead.rows[0].cells) {
  th.querySelector("button").addEventListener("click", () => sortBy(th));
}

// Make the whole row clickable, without hijacking clicks on real links.
tbody.addEventListener("click", (e) => {
  if (e.target.closest("a")) return;
  const row = e.target.closest("tr");
  if (row) window.location.href = row.dataset.href;
});

search.addEventListener("input", applyFilter);
typeFilter.addEventListener("change", applyFilter);
applyFilter();
