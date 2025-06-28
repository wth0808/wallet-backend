import express from "express";

import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionSummary,
} from "../controllers/transactionController.js";
const transactionRouter = express.Router();

transactionRouter.get("/:userId", getTransactionById);

transactionRouter.post("/", createTransaction);

transactionRouter.delete("/:id", deleteTransaction); //delete transaction by id (not user id)

transactionRouter.get("/summary/:userId", getTransactionSummary);

export default transactionRouter;
