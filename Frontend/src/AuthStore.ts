import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


interface BearState {
  token: string
  setToken: (by: string) => void
}

const TokenStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (data) => set(() => ({ token:data})),
      }),
      {
        name: 'Token-storage',
      },
    ),
  ),
)
export default TokenStore