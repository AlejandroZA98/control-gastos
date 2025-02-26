import { categories } from '../data/categoris'
import DatePicker from 'react-date-picker' 
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import React, { ChangeEvent, useEffect, useState } from 'react'
import type { DraftExpense, Value } from '../types'
import ErrorMessage from './ErrorMessage'
import {useBudget} from '../hooks/useBudget'

export default function ExpenseForm() {
    const [expense,setExpense]=useState<DraftExpense>({
        amount:0,
        expenseName:'',
        category:'',
        date:new Date(),
    })
    const [error,setError] = useState('')
    const {dispatch,state,remainingBudget}=useBudget()
    const [previousAmount,setPreviousAmount]=useState(0)

    useEffect(()=>{
        if(state.editingId){
            const editingExpense=state.expenses.filter(currentExpense=>currentExpense.id===state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    },[state.editingId])

    const handleChangeDate=(value:Value)=>{
        console.log(value)
        setExpense({...expense,date:value})
    }
    const handleChange=(e: ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLSelectElement>)=>{
        const {name,value}= e.target
        const isAmountField=['amount'].includes(name)
        console.log(isAmountField)
        setExpense({
            ...expense,
            [name]:isAmountField?+value:value
        })
    }

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(expense)
        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }
        if((expense.amount-previousAmount)>remainingBudget){
            setError('El gasto se sale del presupuesto')
            return
        }
        if(state.editingId){
            dispatch({type:'update-expense',payload:{expense:{id:state.editingId,...expense}}})

        }else{
            dispatch({type:'add-expense',payload:{expense}})

        }
        setExpense({
            amount:0,
            expenseName:'',
            category:'',
            date:new Date(),
        })
        setPreviousAmount(0)

    }
  return (
        <form onSubmit={handleSubmit} className='space-y-5'>
            <legend
            className='uppercase text-center text-2xl font-black border-b-4'>{state.editingId?"Edita Gasto":"Nuevo Gasto"}</legend>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <div className='flex flex-col  gap-2'>
                    <label htmlFor="expenseName"
                    className='text-xl'>Nombre Gasto:</label>
                    <input type="text" id='expenseName' placeholder='Añade nombre del gasto' 
                    className='bg-slate-200 p-2'
                    name='expenseName' 
                    value={expense.expenseName}
                    onChange={handleChange}/>

                </div>
                <div className='flex flex-col  gap-2'>
                    <label htmlFor="amount"
                    className='text-xl'>Cantidad:</label>
                    <input type="number" id='amount' placeholder='Añade la cantidad del gasto' 
                    className='bg-slate-200 p-2'
                    name='amount' 
                    value={expense.amount}
                    onChange={handleChange}/>

                </div>
                <div className='flex flex-col  gap-2'>
                    <label htmlFor="category"
                    className='text-xl'>Categoria:</label>

                    <select 
                    id='category' 
                    className='bg-slate-200 p-2'
                    name='category'
                    value={expense.category} 
                    onChange={handleChange}>
                        <option value="">--Seleccione--</option>
                        {
                            categories.map((category)=>(
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>

                    <div className='flex flex-col  gap-2'>
                    <label htmlFor="amount"
                    className='text-xl'>Fecha Gasto:</label>
                    <DatePicker className='bg-slate-100 p-2 border-0' value={expense.date}
                    onChange={handleChangeDate}></DatePicker>

            </div>

            </div>
            <input type="submit"
            className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase
            font-bold rounded-lg' value={state.editingId?"Guardar Cambio":"Guardar Gasto"} />
        </form>
)
}
