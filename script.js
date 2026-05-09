const claimButton = document.getElementById("claimButton");
const pageTitle = document.getElementById("page-title");
const favicon = document.getElementById("favicon");

const variants = {
  hu: {
    bodyClass: "is-hungary",
    title: "Ingyen Robux",
    button: "Megszerz\u00e9s",
    path: "/ingyenrobux/",
    favicon: "https://raw.githubusercontent.com/NexivoidOfficial/ingyenrobux/refs/heads/main/elemek/fav.png",
  },
  global: {
    bodyClass: "is-global",
    title: "Locara",
    button: "Visit",
    path: "/locara/",
    favicon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%2306101c'/%3E%3Ctext x='32' y='43' text-anchor='middle' font-size='34' font-family='Arial' font-weight='900' fill='%2335f2d0'%3EL%3C/text%3E%3C/svg%3E",
  },
};

let activeVariant = variants.global;

function applyVariant(variant) {
  activeVariant = variant;
  document.body.classList.remove("is-hungary", "is-global");
  document.body.classList.add(variant.bodyClass);
  document.title = variant.title;
  pageTitle.textContent = variant.title;
  claimButton.textContent = variant.button;
  favicon.href = variant.favicon;
}

async function detectCountry() {
  try {
    const response = await fetch("https://ipapi.co/json/");

    if (!response.ok) {
      throw new Error("Country lookup failed");
    }

    const data = await response.json();
    const countryCode = String(data.country_code || "").toUpperCase();

    applyVariant(countryCode === "HU" ? variants.hu : variants.global);
  } catch (error) {
    applyVariant(variants.global);
  }
}

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("selectstart", (event) => {
  event.preventDefault();
});

claimButton.addEventListener("click", () => {
  window.location.href = activeVariant.path;
});

applyVariant(variants.global);
detectCountry();



