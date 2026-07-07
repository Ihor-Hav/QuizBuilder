import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { QuizFormSchema } from "@/schemas/quiz.schema";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import QuestionBlock from "./QuestionBlock";
import type { QuizFormData } from "@/schemas/quiz.schema";
import { useNavigate } from "react-router-dom";

export default function QuizCreationForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      questions: [],
    },
    resolver: zodResolver(QuizFormSchema),
  });

  const navigate = useNavigate();

  const questionArray = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const handleSubmit = async (data: QuizFormData) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + "/api/quizzes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        console.log(res);
        throw new Error("Failed to create quiz");
      }

      const result = await res.json();
      navigate("/create");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl">Create Quiz Form</h2>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <Input id={field.name} {...field} />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea id={field.name} {...field} />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        {questionArray.fields.map((field, idx) => (
          <div className="relative" key={field.id}>
            <QuestionBlock questionIndex={idx} control={form.control} />

            <Button
              className="absolute right-5 top-3"
              onClick={() => questionArray.remove(idx)}
            >
              X
            </Button>
          </div>
        ))}

        <Button
          variant={"outline"}
          onClick={() =>
            questionArray.append({
              text: "",
              type: "SINGLE_CHOICE",
              order: questionArray.fields.length + 1,
              points: 1,
              options: [
                {
                  text: "",
                  isCorrect: false,
                  order: 1,
                },
              ],
            })
          }
        >
          Add question
        </Button>
      </FieldGroup>
      <div className="flex justify-center max-w-5xl my-5  mx-auto">
        <Button className={"w-full"} type="submit">
          Create Quiz
        </Button>
      </div>
    </form>
  );
}
