import {useContext} from 'react';
import { BudgetContext } from '../context/BudgetContext';
export const useBudget=()=>{
const context=useContext(BudgetContext)
if (!context){
    throw new Error('useBudget must be used within a BudgetProvider') // error que se produce cuando en un componente que NO está dentro de BudgetProvider
}
return context
}