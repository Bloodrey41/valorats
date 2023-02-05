import { create } from 'zustand'

type RoleState = {
    selectedRole: string
    setSelectedRole: (role: string) => void
}

const useRoleStore = create<RoleState>(set => ({
    selectedRole: '',
    setSelectedRole: (role: string) => set({ selectedRole: role })
}))

export default useRoleStore
