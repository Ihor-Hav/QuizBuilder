"use client";

import { useEffect, useState } from "react";
import { QuizList } from "@/components/quiz/QuizList";
import type { Quiz } from "@/components/quiz/QuizList";

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getQuizzes() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/quizzes`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch quizzes");
        }

        const data = await res.json();
        console.log(data);

        setQuizzes(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getQuizzes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <QuizList quizzes={quizzes} />
    </div>
  );
}
