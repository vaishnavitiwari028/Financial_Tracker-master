import "./App.css";
import { useState } from "react";

function App() {
  const [expenses, setExpenses] = useState("");
  const [amount, setAmount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [editId, setEditId] = useState();

  const addTransaction = (e) => {
    e.preventDefault();
    if (editId) {
      const newTransaction = transactions.map((t) =>
        t.id === editId ? { id: editId, expenses, amount } : t
      );

      setTransactions(newTransaction);
      setEditId(null);
    } else {
      setTransactions([...transactions, { id: Date.now(), expenses, amount }]);
    }
    setExpenses("");
    setAmount(0);
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setExpenses(t.expenses);
    setAmount(t.amount);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className="tracker_content">
        <h1>EXPENSES TRACKER</h1>
        <h4>Add Your Transactions</h4>
        <form onSubmit={addTransaction}>
          <div className="label_class">
            <label>Expenses:</label>
            <input
              type="text"
              placeholder="Type your expenses"
              onChange={(e) => setExpenses(e.target.value)}
              value={expenses}
            />
            <label>Amount:</label>
            <input
              type="number"
              placeholder="Type your amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </div>
          <button className="add_button">ADD EXPENSES</button>
        </form>
        <h2 className="record_details">Transaction Records:</h2>
        <table className="table">
          <thead className="thead">
            <th>EXPENSES</th>
            <th>AMOUNT</th>
            <th>ACTIONS</th>
          </thead>

          <tbody className="tbody">
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="td">{t.expenses}</td>
                <td className="td">{t.amount}</td>
                <td className="td">
                  <button
                    className="edit_button"
                    onClick={(e) => {
                      handleEdit(t);
                    }}
                  >
                    Edit
                  </button>
                  <button className="delete_button" onClick={(e) => handleDelete(t.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
