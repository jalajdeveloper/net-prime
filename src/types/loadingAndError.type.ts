import { JSX } from "react"

export interface loadingAndErrorType {
    loading?: boolean | any,
    error?: boolean | any,
    status?: string | any 
    children: JSX.Element | JSX.Element[],
    page: number
}