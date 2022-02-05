import { render } from "preact"

const App = ({
  domain,
  cookies,
}: {
  domain: string
  cookies: chrome.cookies.Cookie[]
}) => {
  return (
    <>
      <div class="cookie-domain">{domain}'s cookie</div>
      <ul class="cookie-list">
        {cookies.map((cookie, index) => (
          <li
            key={index}
            class="cookie-item"
            onClick={() => navigator.clipboard.writeText(cookie.value)}
          >
            <div class="cookie-item__name">{cookie.name}</div>
            <div class="cookie-item__value">{cookie.value}</div>
          </li>
        ))}
      </ul>
    </>
  )
}

!(async () => {
  const root = document.querySelector("#root")
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  if (root && tab.url) {
    const domain = new URL(tab.url).hostname
    const cookies = await chrome.cookies.getAll({ url: tab.url })
    render(<App domain={domain} cookies={cookies} />, root)
  }
})()
