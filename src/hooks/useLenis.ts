import { useEffect, useRef, useState, type RefObject } from "react"
import Lenis from "lenis"

/** o mesmo ponto de corte do @media do App.css */
const WIDE = "(min-width: 1025px)"

/**
 * Lenis num container próprio — no desktop a página não rola, as duas colunas
 * rolam.
 *
 * No mobile o layout empilha e quem rola é a PÁGINA: aí o Lenis tem de sair de
 * cena. Ele captura o wheel do wrapper, e um wrapper que não rola mais engoliria
 * o gesto sem mover nada.
 *
 * O wrapper precisa de `overflow: auto` e de UM filho direto (o conteúdo).
 */
export function useLenis(wrapperRef: RefObject<HTMLElement | null>) {
    const lenisRef = useRef<Lenis | null>(null)
    const [wide, setWide] = useState(() => window.matchMedia(WIDE).matches)

    useEffect(() => {
        const mq = window.matchMedia(WIDE)
        const onChange = () => setWide(mq.matches)
        mq.addEventListener("change", onChange)
        return () => mq.removeEventListener("change", onChange)
    }, [])

    useEffect(() => {
        const wrapper = wrapperRef.current
        const content = wrapper?.firstElementChild as HTMLElement | undefined
        if (!wide || !wrapper || !content) return

        const lenis = new Lenis({
            wrapper,
            content,
            lerp: 0.085,
            smoothWheel: true,
            wheelMultiplier: 0.9,
        })
        lenisRef.current = lenis

        let raf = 0
        const tick = (t: number) => {
            lenis.raf(t)
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            lenis.destroy()
            lenisRef.current = null
        }
    }, [wide, wrapperRef])

    return lenisRef
}
