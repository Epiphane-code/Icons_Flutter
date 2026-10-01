const icons = [
  // Navigation
  ["home", "Navigation"], ["menu", "Navigation"], ["close", "Navigation"],
  ["arrow_back", "Navigation"], ["arrow_forward", "Navigation"], ["arrow_upward", "Navigation"],
  ["arrow_downward", "Navigation"], ["chevron_left", "Navigation"], ["chevron_right", "Navigation"],
  ["expand_more", "Navigation"], ["expand_less", "Navigation"], ["more_vert", "Navigation"],
  ["more_horiz", "Navigation"], ["refresh", "Navigation"], ["login", "Navigation"],
  ["logout", "Navigation"], ["open_in_new", "Navigation"], ["arrow_back_ios", "Navigation"],

  // Communication
  ["email", "Communication"], ["mail", "Communication"], ["chat", "Communication"],
  ["message", "Communication"], ["send", "Communication"], ["call", "Communication"],
  ["phone", "Communication"], ["notifications", "Communication"], ["notifications_none", "Communication"],
  ["forum", "Communication"], ["sms", "Communication"], ["contact_mail", "Communication"],
  ["alternate_email", "Communication"],

  // People
  ["person", "People"], ["person_outline", "People"], ["people", "People"],
  ["group", "People"], ["groups", "People"], ["face", "People"],
  ["account_circle", "People"], ["supervisor_account", "People"], ["person_add", "People"],
  ["manage_accounts", "People"], ["badge", "People"],

  // Media
  ["play_arrow", "Media"], ["pause", "Media"], ["stop", "Media"],
  ["play_circle", "Media"], ["play_circle_outline", "Media"], ["skip_next", "Media"],
  ["skip_previous", "Media"], ["volume_up", "Media"], ["volume_off", "Media"],
  ["mic", "Media"], ["mic_off", "Media"], ["music_note", "Media"],
  ["movie", "Media"], ["videocam", "Media"], ["photo_camera", "Media"],
  ["image", "Media"], ["photo", "Media"],

  // Actions
  ["add", "Actions"], ["remove", "Actions"], ["delete", "Actions"],
  ["edit", "Actions"], ["save", "Actions"], ["download", "Actions"],
  ["upload", "Actions"], ["share", "Actions"], ["search", "Actions"],
  ["filter_list", "Actions"], ["sort", "Actions"], ["check", "Actions"],
  ["done", "Actions"], ["clear", "Actions"], ["settings", "Actions"],
  ["build", "Actions"], ["lock", "Actions"], ["lock_open", "Actions"],

  // Places
  ["location_on", "Places"], ["location_off", "Places"], ["map", "Places"],
  ["place", "Places"], ["navigation", "Places"], ["near_me", "Places"],
  ["my_location", "Places"], ["public", "Places"], ["home_work", "Places"],
  ["business", "Places"], ["store", "Places"], ["restaurant", "Places"],
  ["local_hospital", "Places"], ["local_pharmacy", "Places"], ["school", "Places"],
  ["account_balance", "Places"], ["local_atm", "Places"], ["hotel", "Places"],

  // Objects
  ["favorite", "Objects"], ["favorite_border", "Objects"], ["star", "Objects"],
  ["star_border", "Objects"], ["bookmark", "Objects"], ["bookmark_border", "Objects"],
  ["shopping_cart", "Objects"], ["work", "Objects"], ["folder", "Objects"],
  ["folder_open", "Objects"], ["file_copy", "Objects"], ["description", "Objects"],
  ["calendar_today", "Objects"], ["event", "Objects"], ["access_time", "Objects"],
  ["alarm", "Objects"], ["visibility", "Objects"], ["visibility_off", "Objects"],
  ["key", "Objects"], ["language", "Objects"], ["wifi", "Objects"],

  // Status
  ["check_circle", "Status"], ["cancel", "Status"], ["error", "Status"],
  ["warning", "Status"], ["info", "Status"], ["help", "Status"],
  ["block", "Status"], ["verified", "Status"], ["priority_high", "Status"],
  ["security", "Status"], ["report", "Status"],

  // Code / Tech
  ["code", "Tech"], ["terminal", "Tech"], ["computer", "Tech"],
  ["smartphone", "Tech"], ["tablet", "Tech"], ["developer_mode", "Tech"],
  ["cloud", "Tech"], ["cloud_upload", "Tech"], ["cloud_download", "Tech"],
  ["storage", "Tech"], ["database", "Tech"], ["api", "Tech"],
  ["bug_report", "Tech"], ["memory", "Tech"], ["dns", "Tech"],

  // Files
  ["insert_drive_file", "Files"], ["picture_as_pdf", "Files"], ["attach_file", "Files"],
  ["create_new_folder", "Files"], ["text_snippet", "Files"], ["folder_shared", "Files"],
  ["content_copy", "Files"], ["content_paste", "Files"], ["print", "Files"],
  ["link", "Files"], ["link_off", "Files"]
];

const grid = document.getElementById("iconGrid");
const searchInput = document.getElementById("searchInput");
const categories = document.getElementById("categories");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const sortSelect = document.getElementById("sortSelect");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

let selectedCategory = "Toutes";

const categoryNames = ["Toutes", ...new Set(icons.map(icon => icon[1]))];

function renderCategories() {
  categories.innerHTML = categoryNames.map(category => `
    <button class="category ${category === selectedCategory ? "active" : ""}"
            onclick="selectCategory('${category}')">
      ${category}
    </button>
  `).join("");
}

function selectCategory(category) {
  selectedCategory = category;
  renderCategories();
  renderIcons();
}

function renderIcons() {
  const query = searchInput.value.trim().toLowerCase();

  let filtered = icons.filter(([name, category]) => {
    const matchesSearch = name.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === "Toutes" || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortSelect.value === "name") {
    filtered.sort((a, b) => a[0].localeCompare(b[0]));
  } else {
    filtered.sort((a, b) => a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]));
  }

  resultCount.textContent = filtered.length;
  emptyState.classList.toggle("hidden", filtered.length !== 0);
  grid.innerHTML = filtered.map(([name, category]) => `
    <article class="icon-card" onclick="copyIcon('${name}')">
      <span class="material-icons-round icon-preview">${name}</span>
      <div>
        <div class="icon-name">${name}</div>
        <div class="icon-category">${category}</div>
      </div>
      <button class="copy-code" onclick="event.stopPropagation(); copyIcon('${name}')">
        Copier&nbsp; · &nbsp;Icons.${name}
      </button>
    </article>
  `).join("");
}

async function copyIcon(name) {
  const code = `Icons.${name}`;

  try {
    await navigator.clipboard.writeText(code);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  toastText.textContent = `${code} copié !`;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

searchInput.addEventListener("input", renderIcons);
sortSelect.addEventListener("change", renderIcons);

document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

renderCategories();
renderIcons();
