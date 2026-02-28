document.addEventListener("nav", () => {
    const banner = document.getElementById("cookie-consent-banner")
    const acceptBtn = document.getElementById("cookie-accept")
    const rejectBtn = document.getElementById("cookie-reject")

    if (!banner || !acceptBtn || !rejectBtn) return

    const consent = localStorage.getItem("cookie-consent")

    if (consent) {
        banner.classList.add("hidden")
        return
    }

    banner.classList.remove("hidden")

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted")
        banner.classList.add("hidden")
    }

    const handleReject = () => {
        localStorage.setItem("cookie-consent", "rejected")
        banner.classList.add("hidden")
        // Disable Google Analytics if rejected
        const gaScripts = document.querySelectorAll('script[src*="googletagmanager"]')
        gaScripts.forEach((s) => s.remove())
        // @ts-ignore
        window["ga-disable-G-H1TCB4PYH7"] = true
    }

    acceptBtn.addEventListener("click", handleAccept)
    rejectBtn.addEventListener("click", handleReject)
    window.addCleanup(() => {
        acceptBtn.removeEventListener("click", handleAccept)
        rejectBtn.removeEventListener("click", handleReject)
    })
})
