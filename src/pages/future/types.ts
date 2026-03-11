export interface Stat {
    label: string;
    value: string;
    color: string;
}

export interface Phase {
    id: string;
    title: string;
    years: string;
    content: string;
    tag: string;
    tagColor: string;
}

export interface SectorItem {
    id: string;
    sector: string;
    title: string;
    content: string;
}

export interface Chapter {
    id: string;
    title: string;
    desc: string;
    image: string;
    summary?: string;
    stats?: Stat[];
    phases?: Phase[];
    items?: SectorItem[];
    isForm?: boolean;
}
