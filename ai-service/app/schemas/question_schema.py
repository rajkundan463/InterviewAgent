from pydantic import BaseModel, Field


class QuestionRequest(BaseModel):
    role: str

    experience: str

    mode: str

    resumeText: str

    projects: list[str]

    skills: list[str]


class QuestionResponse(BaseModel):
    questions: list[str] = Field(
        description="List of interview questions"
    )