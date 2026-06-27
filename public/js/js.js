const styleSwitcher = document.getElementById("styleSwitcher")
const settingsBackdrop = document.getElementById("settingsBackdrop")
const settingsFab = document.getElementById("settingsFab")
const settingsClose = document.getElementById("settingsClose")
const darkModeToggle = document.getElementById("darkModeToggle")

function openSettings() {
    if (!styleSwitcher) return

    const aside = document.querySelector(".asid")
    const navTogglerBtn = document.getElementById("navToggler")
    if (aside && aside.classList.contains("open") && typeof window.closeNavMenu === "function") {
        window.closeNavMenu()
    } else if (aside && aside.classList.contains("open")) {
        aside.classList.remove("open")
        navTogglerBtn?.classList.remove("open")
    }

    styleSwitcher.classList.add("is-open")
    settingsBackdrop.classList.add("is-open")
    styleSwitcher.setAttribute("aria-hidden", "false")
    settingsBackdrop.setAttribute("aria-hidden", "false")
    document.body.classList.add("settings-panel-open")
    settingsFab.classList.add("is-active")
}

function closeSettings() {
    if (!styleSwitcher) return
    styleSwitcher.classList.remove("is-open")
    settingsBackdrop.classList.remove("is-open")
    styleSwitcher.setAttribute("aria-hidden", "true")
    settingsBackdrop.setAttribute("aria-hidden", "true")
    document.body.classList.remove("settings-panel-open")
    settingsFab.classList.remove("is-active")
}

function toggleSettings() {
    if (styleSwitcher.classList.contains("is-open")) {
        closeSettings()
    } else {
        openSettings()
    }
}

function change(elment) {
    const f = elment.classList
    const colorStart = f[0].indexOf("[#") + 2
    const colorEnd = f[0].indexOf("]")
    const colorValue = f[0].substring(colorStart, colorEnd)
    document.documentElement.style.setProperty("--main-color", `#${colorValue}`)
}

function updateDarkModeIcon() {
    if (!darkModeToggle) return
    const icon = darkModeToggle.querySelector("i")
    const isDark = document.body.classList.contains("dark-mode")
    icon.classList.toggle("fa-moon", !isDark)
    icon.classList.toggle("fa-sun", isDark)
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode")
    localStorage.setItem(
        "portfolio-theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
    )
    updateDarkModeIcon()
}

function initDarkMode() {
    if (localStorage.getItem("portfolio-theme") === "dark") {
        document.body.classList.add("dark-mode")
    }
    updateDarkModeIcon()
}

if (settingsFab) {
    settingsFab.addEventListener("click", toggleSettings)
}

if (settingsClose) {
    settingsClose.addEventListener("click", closeSettings)
}

if (settingsBackdrop) {
    settingsBackdrop.addEventListener("click", closeSettings)
}

if (styleSwitcher) {
    styleSwitcher.addEventListener("click", (e) => e.stopPropagation())
}

if (darkModeToggle) {
    darkModeToggle.addEventListener("click", toggleDarkMode)
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && styleSwitcher && styleSwitcher.classList.contains("is-open")) {
        closeSettings()
    }
})

document.addEventListener("DOMContentLoaded", initDarkMode)

window.closeSettings = closeSettings
window.openSettings = openSettings
