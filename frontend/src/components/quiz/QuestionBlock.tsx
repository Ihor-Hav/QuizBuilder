import { type Control, useFieldArray, Controller } from "react-hook-form";
import { FieldGroup, Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import type { QuizFormData } from "@/schemas/quiz.schema";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = {
  questionIndex: number;
  control: Control<QuizFormData>;
};

export default function QuestionBlock({ questionIndex, control }: Props) {
  const fieldName = `questions.${questionIndex}.type` as const;

  const optionsArray = useFieldArray({
    control,
    name: `questions.${questionIndex}.options` as const,
  });

  return (
    <Card className="w-full max-w-full mx-auto">
      <CardHeader>
        Question №{questionIndex + 1}
        <div>
          <Controller
            name={`questions.${questionIndex}.text` as const}
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Question text</FieldLabel>
                <Input
                  placeholder="What's the capital of great Britain?"
                  {...field}
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name={`questions.${questionIndex}.type` as const}
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Question type</FieldLabel>
                <select {...field} className="border rounded-md px-3 py-2">
                  <option value="SINGLE_CHOICE">Single choice</option>
                  <option value="MULTIPLE_CHOICE">Multiple choice</option>
                  <option value="TEXT">Text</option>
                </select>
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name={`questions.${questionIndex}.points` as const}
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Points</FieldLabel>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
        </div>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          {optionsArray.fields.map((option, idx) => (
            <>
              <div className="flex items-center gap-2 h-25">
                <Controller
                  key={option.id}
                  name={
                    `questions.${questionIndex}.options.${idx}.text` as const
                  }
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="h-full">
                      <FieldLabel>Option №{idx + 1}</FieldLabel>
                      <Input placeholder="London..." {...field} />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  key={option.id}
                  name={
                    `questions.${questionIndex}.options.${idx}.isCorrect` as const
                  }
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="h-full">
                      <FieldLabel>Is Correct?</FieldLabel>

                      <select
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={String(field.value)}
                        onChange={(e) =>
                          field.onChange(e.target.value === "true")
                        }
                        className="border rounded-md px-3 py-2"
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>

                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <div className="flex items-center h-full">
                  <Button onClick={() => optionsArray.remove(idx)}>
                    Remove
                  </Button>
                </div>
              </div>
            </>
          ))}
          <Button
            variant={"outline"}
            onClick={() =>
              optionsArray.append({
                text: "",
                isCorrect: false,
                order: optionsArray.fields.length + 1,
              })
            }
          >
            Add Option
          </Button>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
