import React, { useContext } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"
import swal from 'sweetalert'


const Budgets = React.createContext()

export const other_budget = "Uncategorized"

export function useBudgets() {
  return useContext(Budgets)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", [])
  const [expenses, setExpenses] = useLocalStorage("expenses", [])

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }
  function addExpense({ description, amount, budgetId }) {
    setExpenses(prevExpenses => {
      swal({
        title: " Done!",
        text: `Done! You added " ${description} " as your new expense`,
        icon: "success",
      });
      

      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
    })
  }
  function addBudget({ name, max }) {
    swal({
      title: " Done!",
      text: `Done! You added " ${name} " as your new budget`,
      icon: "success",
    });
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        swal({
          title: " Oops!",
          text: ` ${name} already exists`,
          icon: "warning",
        });
        return prevBudgets
      }
    

      return [...prevBudgets, { id: uuidV4(), name, max }]
    })
  }
  function deleteBudget({ id,name }) {
    
    setExpenses(prevExpenses => {
      swal({
        title: " Poof!",
        text: ` You just deleted " ${name} " from your budget !!`,
        icon: "warning",
      });
      return prevExpenses.map(expense => {
        if (expense.budgetId !== id) return expense
        
        return { ...expense, budgetId: other_budget }
        
      })
    })

    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }
  function deleteExpense({ id ,description}) {
    
    setExpenses(prevExpenses => {
      swal({
        title: " Poof!",
        text: ` You just deleted " ${description} " from your expenses !!`,
        icon: "warning",
      });
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }

  return (
    <Budgets.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </Budgets.Provider>
  )
}
