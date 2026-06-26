from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.resume_service import resume_service
from app.schemas.question_schema import (QuestionRequest)
from app.services.question_service import (question_service)
from app.schemas.evaluation_schema import (EvaluationRequest)
from app.services.evaluation_service import (evaluation_service)

router = APIRouter(
    prefix="/api/interview",
    tags=["Interview"],
)


@router.post("/resume")
async def analyze_resume(
    resume: UploadFile = File(...)
):
    if resume.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_bytes = await resume.read()

    return await resume_service.analyze_resume(
        file_bytes
    )


@router.post("/generate-questions")
async def generate_questions(
    request: QuestionRequest,
):

    return await question_service.generate_questions(
        request
    )


@router.post("/submit-answer")
async def submit_answer(
    request: EvaluationRequest,
):

    return await evaluation_service.evaluate_answer(request)