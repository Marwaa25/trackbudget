import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import AddBudget from "./components/AddBudget"
import AddExpense from "./components/AddExpense"
import ViewExpenses from "./components/ViewExpenses"
import Budget from "./components/Budget"
import OtherBudget from "./components/OtherBudget"
import Total from "./components/Total"
import { useState } from "react"
import { other_budget, useBudgets } from "./components/Budgets"
import LogoImage from './budget.jpg'



function App() {
  const [showAddBudget, setShowAddBudget] = useState(false)
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [viewExpenseBudgetId, setViewExpenseBudgetId] = useState()
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

 

  function openAddExpense(budgetId) {
    setShowAddExpense(true)
    setAddExpenseBudgetId(budgetId)
  }
  var sectionStyle = {
    backgroundImage: `url(${LogoImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%'
}
  return (
    <>
      <Container  style={sectionStyle} className="p-5 bg-light border border-success border-3 shadow p-3 mb-5 bg-body rounded">
        <Stack direction="horizontal" gap="2" className=" d-grid gap-2 col-6 mx-auto shadow p-3 mb-5  rounded bg-light ">
          <h1 className="  text-success text-center">Budget Calculator</h1>
          <Button variant="outline-success fw-bold  border-3 " onClick={() => setShowAddBudget(true)}>
            Add Budget
          </Button>
          <Button variant="outline-warning fw-bold  border-3" onClick={openAddExpense}>
            Add Expense
          </Button>
          
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(600px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
           

          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              
              <Budget
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpense={() => openAddExpense(budget.id)}
                onViewExpenses={() =>
                  setViewExpenseBudgetId(budget.id)
                }
              />
            )
          })}
          <OtherBudget
            onAddExpense={openAddExpense}
            onViewExpenses={() =>
              setViewExpenseBudgetId(other_budget)
            }
          />
          <Total />
          
          
        </div>
      </Container>
      <AddBudget
        show={showAddBudget}
        handleClose={() => setShowAddBudget(false)}
      />
      <AddExpense
        show={showAddExpense}
        defaultBudgetId={addExpenseBudgetId}
        handleClose={() => setShowAddExpense(false)}
      />
      <ViewExpenses
        budgetId={viewExpenseBudgetId}
        handleClose={() => setViewExpenseBudgetId()}
      />
      
    </>
  )
}

export default App
