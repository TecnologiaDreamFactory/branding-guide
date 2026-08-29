import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import BrandPanel from "./components/BrandPanel"
import { useLenis } from "./hooks/useLenis"
import { BRANDS, GROUPS } from "./data/brands"
import "./App.css"

type Theme = "dark" | "light"

/* localStorage estoura em aba privativa do Safari — tema não vale um crash */
const readTheme = (): Theme => {
    try {
        const saved = localStorage.getItem("theme")
        if (saved === "dark" || saved === "light") return saved
    } catch {
        /* segue com a preferência do sistema */
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark"
}

export default function App() {
    const [theme, setTheme] = useState<Theme>(readTheme)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const shellRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    useLenis(listRef)

    const selectedIndex = BRANDS.findIndex((b) => b.id === selectedId)
    const selected = selectedIndex >= 0 ? BRANDS[selectedIndex] : null

    const close = useCallback(() => setSelectedId(null), [])

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        try {
            localStorage.setItem("theme", theme)
        } catch {
            /* sem persistência, o tema vale só nesta sessão */
        }
    }, [theme])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } })
                .fromTo(
                    ".intro-line",
                    { yPercent: 120, opacity: 0 },
                    { yPercent: 0, opacity: 1, stagger: 0.08 }
                )
                .fromTo(
                    ".mn-topic",
                    { x: -14, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
                    0.25
                )
                .fromTo(
                    ".mn-btn",
                    { x: -22, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.9, stagger: 0.045 },
                    0.32
                )
        }, shellRef)
        return () => ctx.revert()
    }, [])

    return (
        <div className="shell" ref={shellRef}>
            <div className="grid-bg" aria-hidden="true" />
            <div className="vignette" aria-hidden="true" />

            <section className="menu">
                <header className="intro">
                    <h1 className="intro-mask intro-h1">
                        <span className="intro-line">Branding Guides</span>
                    </h1>
                    <h1 className="intro-mask intro-h1">
                        <span className="intro-line">Sistema Dream Factory</span>
                    </h1>
                    <p className="intro-mask">
                        <span className="intro-line intro-sub">
                            <span>{BRANDS.length} marcas. Clique para abrir.</span>
                            <span className="theme-seg">
                                {(["dark", "light"] as Theme[]).map((t) => (
                                    <button
                                        key={t}
                                        className={theme === t ? "is-on" : ""}
                                        onClick={() => setTheme(t)}
                                        aria-pressed={theme === t}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </span>
                        </span>
                    </p>
                </header>

                <div className="mn-list" ref={listRef}>
                    <div className="mn-scroll">
                        {GROUPS.map((g) => (
                            <section className="mn-group" key={g.id}>
                                <h2 className="mn-topic">{g.label}</h2>
                                {BRANDS.filter((b) => b.group === g.id).map((b) => (
                                    <button
                                        key={b.id}
                                        className={`mn-btn${b.id === selectedId ? " is-active" : ""}`}
                                        style={{ ["--accent" as string]: b.accent }}
                                        onClick={() => setSelectedId(b.id)}
                                    >
                                        <span>{b.name}</span>
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M7 17 17 7M9 7h8v8" />
                                        </svg>
                                    </button>
                                ))}
                            </section>
                        ))}
                    </div>
                </div>
            </section>

            <BrandPanel
                brand={selected}
                index={Math.max(0, selectedIndex)}
                total={BRANDS.length}
                onClose={close}
            />
        </div>
    )
}
