# Quiz Builder

Quiz Builder is a full-stack application for creating, managing, and viewing quizzes.

## Installation

Clone the repository:

```bash
git clone https://github.com/Ihor-Hav/QuizBuilder.git
cd QuizBuilder
```
## Backend
```bash
cd backend
npm install
```
#### In .env file you need to configure your own PostgreSQL connection string.
```bash
PORT=5000
DATABASE_URL=postgres://postgres:123@localhost:5432/quiz_builder
```

```bash
npx prisma migrate dev
npx prisma generate
npm run dev
```
## Frontend
```bash

cd frontend
npm install
npm run dev
```

## BACKEND ROUTES
METHOD: GET /api/quizzes
METHOD: POST /api/quizzes
METHOD: GET /api/quizzes/:id
METHOD: DELETE /api/quizzes/:id

##FRONTEND URLS
/create
/quizzes
/quizzes/:id

## ADDITIONAL INFORMATION

<img width="1543" height="934" alt="Quiz Builder Screenshot" src="https://github.com/user-attachments/assets/03b666bf-af50-4ee4-87c7-291692459685" />

## Current Limitations

Known limitations:

- Form validation covers only basic cases.
- Error handling and user feedback are currently limited.
- Each quiz requires:
  - At least 1 question.
  - At least 2 options per question.
- TEXT question type is partially implemented:
  - Users can create TEXT questions.
  - Answer validation and checking logic for text-based answers is not implemented yet.
- SINGLE_CHOICE and MULTIPLE_CHOICE question types are supported, but validation rules can be improved.

Possible improvements:

- Improve form validation and error messages.
- Add authentication and user-owned quizzes.
- Add quiz passing mode with score calculation.
- Improve TEXT question handling.
- Add loading states and better UI feedback.
- Mobile responsiveness.
