from pydantic import BaseModel, Field


class ResumeResponse(BaseModel):
    role: str = Field(..., description="Target job role")

    experience: str = Field(
        ...,
        description="Candidate experience level"
    )

    projects: list[str] = Field(..., description="List of projects")

    skills: list[str] = Field(..., description="List of skills")