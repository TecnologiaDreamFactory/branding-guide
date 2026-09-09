import { useEffect, useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { useLenis } from "../hooks/useLenis"
import { GROUPS, type Brand } from "../data/brands"

/**
 * Painel "wireframe" que abre do centro para a direita.
 * - Abertura: clip-path + brackets desenhados via strokeDashoffset (pathLength=1,
 *   então nada de plugin pago pra DrawSVG).
 * - Troca de marca com o painel já aberto: só o conteúdo re-anima (swap), a
 *   moldura fica parada. Reabrir a moldura a cada clique parece glitch.
 * - Lenis roda no corpo do painel, não na página: a página não rola.
 */

interface Props {
    brand: Brand | null
    index: number
    total: number
    onClose: () => void
}

/** título quebrado em chars pro stagger, preservando as palavras */
function SplitTitle({ text }: { text: string }) {
    return (
        <h1 className="pn-title" aria-label={text}>
            {text.split(" ").map((word, w) => (
                <span className="pn-word" key={w}>
                    {word.split("").map((ch, i) => (
                        <span className="pn-char" key={i}>
                            {ch}
                        </span>
                    ))}
                </span>
            ))}
        </h1>
    )
}

export default function BrandPanel({ brand, index, total, onClose }: Props) {
    const rootRef = useRef<HTMLElement>(null)
    const bodyRef = useRef<HTMLDivElement>(null)
    const wasOpen = useRef(false)
    const lenisRef = useLenis(bodyRef)

    /* animação de entrada / swap */
    useLayoutEffect(() => {
        const root = rootRef.current
        if (!root || !brand) return

        lenisRef.current?.scrollTo(0, { immediate: true })

        const opening = !wasOpen.current
        wasOpen.current = true

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "expo.out", duration: 1 },
            })

            if (opening) {
                /* abertura em dois tempos: uma faixa fina corre pra direita e
                 * só então desdobra na vertical, parando exatamente na borda
                 * do painel. Sem x/scale — qualquer deslocamento faria o
                 * quadro passar da linha e depois voltar. */
                tl.fromTo(
                    root,
                    { clipPath: "inset(47% 0% 47% 92%)", opacity: 0 },
                    {
                        clipPath: "inset(47% 0% 47% 0%)",
                        opacity: 1,
                        duration: 0.55,
                        ease: "power3.inOut",
                    }
                )
                    .to(root, {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 0.9,
                        ease: "expo.out",
                    })
                    .fromTo(
                        ".pn-bracket path",
                        { strokeDashoffset: 1 },
                        { strokeDashoffset: 0, duration: 0.9, stagger: 0.06 },
                        0.7
                    )
            }

            tl.fromTo(
                ".pn-rule",
                { scaleX: 0 },
                { scaleX: 1, duration: 0.9, stagger: 0.05 },
                opening ? 0.68 : 0
            )
                .fromTo(
                    ".pn-kicker span",
                    { yPercent: 120, opacity: 0 },
                    { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.04 },
                    opening ? 0.74 : 0.02
                )
                .fromTo(
                    ".pn-char",
                    { yPercent: 110, opacity: 0, rotate: 4 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        rotate: 0,
                        duration: 0.9,
                        stagger: 0.022,
                    },
                    opening ? 0.82 : 0.06
                )
                .fromTo(
                    ".pn-reveal",
                    { y: 26, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9, stagger: 0.07 },
                    opening ? 0.94 : 0.16
                )
                .fromTo(
                    ".pn-swatch",
                    { scaleY: 0, opacity: 0 },
                    { scaleY: 1, opacity: 1, duration: 0.6, stagger: 0.05 },
                    "-=0.5"
                )
        }, root)

        return () => ctx.revert()
    }, [brand])

    /* ESC fecha */
    useEffect(() => {
        if (!brand) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [brand, onClose])

    if (!brand) {
        wasOpen.current = false
        return (
            <aside className="pn pn--empty" aria-hidden="true">
                <div className="pn-empty-inner">
                    <span className="pn-empty-mark" />
                </div>
            </aside>
        )
    }

    const num = String(index + 1).padStart(2, "0")
    const tot = String(total).padStart(2, "0")

    return (
        <aside
            className="pn"
            ref={rootRef}
            style={{ ["--accent" as string]: brand.accent }}
        >
            <svg
                className="pn-bracket"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path pathLength={1} d="M 0 12 L 0 0 L 14 0" />
                <path pathLength={1} d="M 86 0 L 100 0 L 100 12" />
                <path pathLength={1} d="M 100 88 L 100 100 L 86 100" />
                <path pathLength={1} d="M 14 100 L 0 100 L 0 88" />
            </svg>

            <header className="pn-head">
                <div className="pn-kicker">
                    <span>{brand.group.toUpperCase()}</span>
                    <span className="pn-dim">
                        {num} / {tot}
                    </span>
                    <span className="pn-dim">{brand.code}</span>
                </div>
                <button className="pn-close" onClick={onClose} aria-label="Fechar painel">
                    <span />
                    <span />
                </button>
            </header>

            <div className="pn-rule" />

            <div className="pn-body" ref={bodyRef}>
                <div className="pn-scroll">
                    <SplitTitle text={brand.name} />

                    <p className="pn-tagline pn-reveal">{brand.tagline}</p>

                    <div className="pn-rule pn-rule--thin" />

                    <dl className="pn-meta pn-reveal">
                        <div>
                            <dt>Setor</dt>
                            <dd>{brand.sector}</dd>
                        </div>
                        <div>
                            <dt>Grupo</dt>
                            <dd>{GROUPS.find((g) => g.id === brand.group)?.label}</dd>
                        </div>
                    </dl>

                    <div className="pn-rule pn-rule--thin" />

                    <div className="pn-history">
                        <span className="pn-label pn-reveal">Breve história</span>
                        {brand.history.map((p, i) => (
                            <p className="pn-reveal" key={i}>
                                {p}
                            </p>
                        ))}
                    </div>

                    <div className="pn-palette pn-reveal">
                        <span className="pn-label">Paleta</span>
                        <div className="pn-swatches">
                            {brand.palette.map((c) => (
                                <div
                                    className="pn-swatch"
                                    key={c}
                                    style={{ background: c }}
                                >
                                    <span>{c}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <a
                        className="pn-cta pn-reveal"
                        href={brand.guideUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>Abrir Branding Guide</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                    </a>

                    <a
                        className="pn-cta pn-reveal"
                        href={brand.photosUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>Fotos</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                    </a>
                </div>
            </div>
        </aside>
    )
}
