import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string
    amount: number
}
export default function AmountDisplay({label,amount}:AmountDisplayProps) {
  return (
        <p className="text-2xl text-blue-600 font-bold">
            {label&&`${label}: `}
            <span className="text-black font-black">{formatCurrency( amount)}</span>
        </p>
)
}
