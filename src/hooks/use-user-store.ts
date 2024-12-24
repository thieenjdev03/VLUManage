import { create } from 'zustand'
import type { User } from 'src/apis/types'

interface useUserStoreState {
    userSelected: User | null
    isOpen: boolean
    isOpenAdd: boolean
}

interface useUserStoreActions {
    setUserSelected: (user: User | null) => void
    setIsOpen: (isOpen: boolean) => void
    setIsOpenAdd: (isOpenAdd: boolean) => void
}

export const useUserStore = create<useUserStoreState & useUserStoreActions>((set) => ({
    userSelected: null,
    setUserSelected: (userSelected) => set({ userSelected }),
    setIsOpen: (isOpen) => set({ isOpen }),
    isOpen: false,
    setIsOpenAdd: (isOpenAdd) => set({ isOpenAdd }),
    isOpenAdd: false
}))
