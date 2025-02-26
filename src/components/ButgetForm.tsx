import React, { useMemo } from 'react'
import { useState } from 'react'
import { useBudget } from '../hooks/useBudget'

export default function ButgetForm() {
    const [budget, setBudget] = useState(0)
    const {dispatch}=useBudget()// hace uso de dispatch

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.valueAsNumber)
        setBudget(e.target.valueAsNumber)
    }
    const isValid=useMemo(()=>{
        return isNaN(budget) || budget<=0
    },[budget])

    const handelSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log('enviando presupuesto')
        dispatch({type:'add-budget',payload:{budget}})// activa el reducer
    }

  return (
        <form className='space-y-5' onSubmit={handelSubmit}>
            <div className='flex flex-col space-y-5'>
                <label htmlFor="budget" className='text-4xl text-blue-600 font-bold text-center'>
                    Definir Presupuesto
                </label>

                <input type="number" className='w-full bg-white border border-gray-200 p-2'
                placeholder='Define presupuesto' name="budget" id='budgetID' value={budget} onChange={handleChange}/>
            </div>

            <input type="submit" value='Definir presupuesto' className='bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white
            font-black uppercase disabled:opacity-40' disabled={isValid}/>

        </form>    
)
}
