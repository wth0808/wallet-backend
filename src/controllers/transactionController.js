import { sql } from "../config/db.js";

export async function getTransactionById(req, res) {
  try {
    const { userId } = req.params;
    console.log("Fetching transactions for user ID:", userId);
    const transactions = await sql`
        Select * From  transactions where user_id =${userId} ORDER BY created_at DESC;
    `;

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error getting transactions:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function createTransaction(req, res) {
  const { title, amount, category, user_id } = req.body;

  if (!title || !amount || !category || amount === undefined) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const transaction = await sql`
        INSERT INTO transactions (user_id, title, amount, category)
        VALUES (${user_id}, ${title}, ${amount}, ${category})
        RETURNING *;
    `;

    res.status(201).json(transaction[0]);
  } catch (error) {
    console.error("Error inserting transaction:", error);
    res.status(500).json({ error: "Failed to create transaction." });
  }
}
export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid transaction ID." });
    }
    const result = await sql`
        DELETE FROM transactions WHERE id = ${id} RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    res.status(200).json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction." });
  }
}

export async function getTransactionSummary(req, res) {
  try {
    const { userId } = req.params;

    const balance = await sql`
        SELECT coalesce(Sum(amount), 0) AS balance
        FROM transactions
        WHERE user_id = ${userId};
    `;

    const incomeSum = await sql`
        SELECT coalesce(Sum(amount), 0) AS income
        FROM transactions
        WHERE user_id = ${userId} AND amount > 0;
    `;

    const expenseSum = await sql`
        SELECT coalesce(Sum(amount), 0) AS expense
        FROM transactions
        WHERE user_id = ${userId} AND amount < 0;
    `;

    res.status(200).json({
      balance: balance[0].balance,
      income: incomeSum[0].income,
      expense: expenseSum[0].expense,
    });
  } catch (error) {
    console.error("Error getting transaction balance:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
