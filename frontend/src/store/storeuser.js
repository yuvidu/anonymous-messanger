import {create} from 'zustand'

const storeuser = create((set)=>({
    user : null,
    setuser : (data) => set({user:data})
}))

export default storeuser