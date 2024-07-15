import { useState } from "react"

export const useCounter = (initialState = 0) => {
    const [counter, setCounter] = useState(initialState)
    const incrementar = () => setCounter(counter + 1)
    const decrementar = () => {
        if (counter < 1) {
            setCounter(0)
            return
        }
        setCounter(counter - 1)
    }
    return {
        counter,
        incrementar,
        decrementar
    }
}
