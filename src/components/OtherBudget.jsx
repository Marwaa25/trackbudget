import { other_budget, useBudgets } from "../components/Budgets"
import Budget from "./Budget"

export default function OtherBudget(props) {
  const { getBudgetExpenses } = useBudgets()
  const amount = getBudgetExpenses(other_budget).reduce(
    (total, expense) => total + expense.amount,
    0
  )
  if (amount === 0) return null

  return <Budget amount={amount} name="Other" gray {...props} />
}
