import { useReducer,createContext,Dispatch, ReactNode, useMemo} from "react"
import { budgetReducer,initialState,BugetState, BudegetActions } from "../reducers/budget-reducer"
type BudgetContextProps={
    state:BugetState
    dispatch: Dispatch<BudegetActions>
    totalExpenses:number
    remainingBudget:number
}
type BudgetProviderProps={
    children:ReactNode  
}
export const BudgetContext = createContext<BudgetContextProps>({}as BudgetContextProps)// definicion de contexto tipado 

export const BudgetProvider=({children}:BudgetProviderProps)=>{//Todo componente dentro de BudgetProvider podrá acceder a las variables de Provider
    const [state, dispatch] = useReducer(budgetReducer, initialState)// se  accede al reducer

    const totalExpenses = useMemo(() => state.expenses.reduce((total,expense)=>expense.amount+total,0),[state.expenses] )
    const remainingBudget = state.budget - totalExpenses;
    return(

        <BudgetContext.Provider //comparte la informacion con el contexto
            value={{state,dispatch,totalExpenses,remainingBudget}}>
            {children}
        </BudgetContext.Provider>
    )
}