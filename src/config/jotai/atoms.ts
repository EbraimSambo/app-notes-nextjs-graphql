import { atom, useAtom } from "jotai";

export type Tab = {title: string,tag: "notes" | "trash" | "remembers"}
export const tabsAtom = atom<Tab>({
    title: "Notas",
    tag: "notes",
})

export function useTabs(){
    return useAtom(tabsAtom)
}

const menuAtom = atom(true)

export function useMenu(){
    return useAtom(menuAtom)
}