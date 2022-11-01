import { useBudgets } from "../components/Budgets"
import Budget from "./Budget"
import swal from "sweetalert"


export default function Total() {
  const { expenses, budgets } = useBudgets()
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const max = budgets.reduce((total, budget) => total + budget.max, 0)

  
  if (max === 0) return null
  if (amount>=max) swal("Oh No !"," You reached the limit !!","warning")

  return (
<>
  <Budget amount={amount} name="Total" gray max={max} hideButtons />  
</>
  )
}

