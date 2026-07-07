import express, { type Express } from "express";
import quizRouter from "./routes/quiz.route";
import cors from "cors";

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/quizzes", quizRouter);

export default app;
