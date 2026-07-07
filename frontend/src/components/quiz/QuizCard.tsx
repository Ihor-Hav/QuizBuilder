import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Trash, Info } from "lucide-react";

type QuizCardProps = {
  quiz: {
    id: string;
    title: string;
    description?: string | null;
    questions: {
      id: string;
    }[];
    createdAt: string;
  };
};

export default function QuizCard({ quiz }: QuizCardProps) {
  const handleDelete = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + `/api/quizzes/${quiz.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete quiz!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>

        <CardDescription>
          {quiz.description || "No description"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2 text-sm">
          <p>Questions: {quiz.questions?.length}</p>

          <p>Created: {new Date(quiz.createdAt).toLocaleDateString()}</p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button className="flex-1" size="default" asChild>
          <Link
            to={`/quizzes/${quiz.id}`}
            className="flex items-center justify-center gap-2 w-full h-full"
          >
            <Info className="size-4" />
            Detail
          </Link>
        </Button>
        <Button
          className="flex-1 cursor-pointer"
          onClick={handleDelete}
          size="default"
        >
          <Trash />
        </Button>
      </CardFooter>
    </Card>
  );
}
