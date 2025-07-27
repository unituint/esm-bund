import { getMessage } from "./message.js"

export function renderApp() {
  const el = document.getElementById('app')
  el.innerHTML = `<h1>${getMessage()}</h1>`
}

renderApp()
