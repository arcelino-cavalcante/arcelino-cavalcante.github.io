// @ts-ignore
import cookieConsentScript from "./scripts/cookieconsent.inline"
import styles from "./styles/cookieconsent.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const CookieConsent: QuartzComponent = () => {
    const privacyUrl = "/Politica-de-Privacidade"

    return (
        <div id="cookie-consent-banner" class="hidden">
            <span class="cookie-icon">🍪</span>
            <p class="cookie-text">
                Este site utiliza cookies e o Google Analytics para melhorar sua experiência.
                Ao continuar navegando, você concorda com nossa{" "}
                <a href={privacyUrl}>Política de Privacidade</a>.
            </p>
            <div class="cookie-buttons">
                <button id="cookie-reject">Rejeitar</button>
                <button id="cookie-accept">Aceitar</button>
            </div>
        </div>
    )
}

CookieConsent.afterDOMLoaded = cookieConsentScript
CookieConsent.css = styles

export default (() => CookieConsent) satisfies QuartzComponentConstructor
