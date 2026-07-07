import QuizCard from "./QuizCard";

export type Quiz = {
  id: string;
  title: string;
  description?: string | null;
  questions: {
    id: string;
  }[];
  createdAt: string;
};

type Props = {
  quizzes: Quiz[];
};

export function QuizList({ quizzes }: Props) {
  if (quizzes.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No quizzes created yet
      </div>
    );
  }

  console.log(quizzes);

  return (
    <div className="flex gap-2 px-5 py-5">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
}
