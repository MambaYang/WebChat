import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../store"
import { debounce } from "loadsh"
import { useRef } from "react"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useMyDebounce = (fun, wait, options = {}) => {
    const myRef = useRef()
    if (!myRef.current) {
        myRef.current = debounce(fun, wait, options)
    }
    return myRef.current
}
export const useGetUrlFromLocal = (filename: string) => {
    const friendAvatarList = JSON.parse(
        localStorage.getItem("friendAvatarList")
    )
    return friendAvatarList[filename]
}
