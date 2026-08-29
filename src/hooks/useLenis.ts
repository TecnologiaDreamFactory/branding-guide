import { useEffect, useRef, type RefObject } from "react"
import Lenis from "lenis"

/**
 * Lenis num container próprio — a página não rola, os dois painéis rolam.
 * O wrapper precisa de `overflow: auto` e de UM filho direto (o conteúdo).
 */
export function useLenis(wrapperRef: RefObject<HTMLElement | null>) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        const wrapper = wrapperRef.current
        const content = wrapper?.firstElementChild as HTMLElement | undefined
        if (!wrapper || !content) return

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
    }, [wrapperRef])

    return lenisRef
}
