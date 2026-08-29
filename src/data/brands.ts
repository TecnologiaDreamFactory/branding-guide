/**
 * Fonte única de verdade do site.
 * Trocar aqui = trocar o menu e o painel. Nada mais precisa mudar.
 */

export type Group = "holding" | "eventos" | "verticais"

export interface Brand {
    id: string
    /** sigla curta usada no rótulo técnico do painel */
    code: string
    name: string
    group: Group
    tagline: string
    sector: string
    /** breve história — 1 a 3 parágrafos */
    history: string[]
    /** link do branding guide (PDF, Figma, Notion, o que for) */
    guideUrl: string
    /** cor de acento: pinta o botão do menu e a moldura do painel */
    accent: string
    /** paleta exibida no rodapé do painel */
    palette: string[]
}

/** placeholders únicos enquanto os textos reais não chegam */
const LOREM =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum est quam, id egestas metus imperdiet a. Etiam varius justo id vestibulum sollicitudin. Maecenas lectus ante, ultrices sit amet elementum."

const TAGLINE = "Placeholder — linha de apoio da marca."

export const GROUPS: { id: Group; label: string }[] = [
    { id: "holding", label: "Holding" },
    { id: "eventos", label: "Eventos" },
    { id: "verticais", label: "Verticais" },
]

export const BRANDS: Brand[] = [
    {
        id: "holding",
        code: "HD",
        name: "Holding",
        group: "holding",
        tagline: TAGLINE,
        sector: "Holding · Comunicação e Grandes Eventos",
        history: [LOREM],
        guideUrl: "#",
        accent: "#8AB4FF",
        palette: ["#8AB4FF", "#0B0D14", "#F2F4F8", "#3A5BAF"],
    },
    {
        id: "maratona-do-rio",
        code: "MR",
        name: "Maratona do Rio",
        group: "eventos",
        tagline: TAGLINE,
        sector: "Evento · Rio de Janeiro",
        history: [LOREM],
        guideUrl: "#",
        accent: "#FF6B4A",
        palette: ["#FF6B4A", "#1A0F0C", "#FFD9CE", "#B33D22"],
    },
    {
        id: "carnaval",
        code: "CA",
        name: "Carnaval",
        group: "eventos",
        tagline: TAGLINE,
        sector: "Evento · Rio de Janeiro",
        history: [LOREM],
        guideUrl: "#",
        accent: "#16C79A",
        palette: ["#16C79A", "#07140F", "#C9F5E6", "#0B7A5E"],
    },
    {
        id: "arte-rio",
        code: "AR",
        name: "Arte Rio",
        group: "eventos",
        tagline: TAGLINE,
        sector: "Evento · Rio de Janeiro",
        history: [LOREM],
        guideUrl: "#",
        accent: "#B15CFF",
        palette: ["#B15CFF", "#120A1C", "#E9D8FF", "#6E2FB0"],
    },
    {
        id: "arvore-do-rio",
        code: "AV",
        name: "Árvore do Rio",
        group: "eventos",
        tagline: TAGLINE,
        sector: "Evento · Rio de Janeiro",
        history: [LOREM],
        guideUrl: "#",
        accent: "#FF4D7E",
        palette: ["#FF4D7E", "#1B060E", "#FFD3E0", "#B01E4C"],
    },
    {
        id: "natal-na-lagoa",
        code: "NL",
        name: "Natal na Lagoa",
        group: "eventos",
        tagline: TAGLINE,
        sector: "Evento · Rio de Janeiro",
        history: [LOREM],
        guideUrl: "#",
        accent: "#4DD0E1",
        palette: ["#4DD0E1", "#05171A", "#CFF6FB", "#1B7C8A"],
    },
    {
        id: "semana-de-arte-do-rio",
        code: "SA",
        name: "Semana de Arte do Rio",
        group: "eventos",
        tagline: TAGLINE,
        sector: "Evento · Rio de Janeiro",
        history: [LOREM],
        guideUrl: "#",
        accent: "#FFC53D",
        palette: ["#FFC53D", "#1A1405", "#FFEFC2", "#B3860F"],
    },
    {
        id: "corrida-da-ponte",
        code: "CP",
        name: "Corrida da Ponte",
        group: "eventos",
        tagline: TAGLINE,
        sector: "Evento · Rio de Janeiro",
        history: [LOREM],
        guideUrl: "#",
        accent: "#E152D8",
        palette: ["#E152D8", "#180618", "#FAD5F6", "#8E2B88"],
    },
    {
        id: "spiridon",
        code: "SP",
        name: "Spiridon",
        group: "verticais",
        tagline: TAGLINE,
        sector: "Vertical · Grupo Dream",
        history: [LOREM],
        guideUrl: "#",
        accent: "#FF7A00",
        palette: ["#FF7A00", "#1A0E00", "#FFE0BF", "#B35500"],
    },
    {
        id: "lochub",
        code: "LH",
        name: "Lochub",
        group: "verticais",
        tagline: TAGLINE,
        sector: "Vertical · Grupo Dream",
        history: [LOREM],
        guideUrl: "#",
        accent: "#A3E635",
        palette: ["#A3E635", "#111A05", "#E8FAC6", "#6A9B1E"],
    },
    {
        id: "bex",
        code: "BX",
        name: "Bex",
        group: "verticais",
        tagline: TAGLINE,
        sector: "Vertical · Grupo Dream",
        history: [LOREM],
        guideUrl: "#",
        accent: "#6366F1",
        palette: ["#6366F1", "#0B0C1F", "#D9DAFB", "#3A3CA8"],
    },
    {
        id: "go-dream",
        code: "GD",
        name: "Go Dream",
        group: "verticais",
        tagline: TAGLINE,
        sector: "Vertical · Grupo Dream",
        history: [LOREM],
        guideUrl: "#",
        accent: "#14B8A6",
        palette: ["#14B8A6", "#041614", "#C6F3EE", "#0A7A6E"],
    },
]
