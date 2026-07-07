"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Quiz = {
  id: string;
  title: string;
  description?: string | null;
  createdAt: string;
  questions: {
    id: string;
    text: string;
    type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "TEXT";
    order: number;
    points: number;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      order: number;
    }[];
  }[];
};

export default function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getQuiz() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/quizzes/${id}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch quiz");
        }

        const data = await res.json();

        setQuiz(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getQuiz();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!quiz) {
    return <p>Quiz not found</p>;
  }

  return (
    <main className="max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{quiz.title}</CardTitle>
          <CardDescription>
            {quiz.description || "No description"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Created: {new Date(quiz.createdAt).toLocaleDateString()}
          </p>

          <div className="space-y-4">
            {quiz.questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {index + 1}. {question.text}
                  </CardTitle>
                  <CardDescription>
                    Type: {question.type} • Points: {question.points}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {question.options.map((option) => (
                      <li
                        key={option.id}
                        className="rounded-md border p-2 text-sm"
                      >
                        {option.text}
                        {option.isCorrect && (
                          <span className="ml-2 text-green-600">correct</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
