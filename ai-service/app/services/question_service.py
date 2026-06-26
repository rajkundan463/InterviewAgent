from app.core.logger import get_logger
from app.prompts.question_prompt import QUESTION_PROMPT
from app.schemas.question_schema import (
    QuestionRequest,
    QuestionResponse,
)
from app.services.llm_service import llm_service

logger = get_logger(__name__)


class QuestionService:

    def __init__(self):
        self.llm = llm_service

    async def generate_questions(
        self,
        request: QuestionRequest,
    ):

        logger.info("Generating interview questions.")

        chain = (
            QUESTION_PROMPT
            | self.llm.structured(
                QuestionResponse
            )
        )

        response = chain.invoke(
            {
                "role": request.role,
                "experience": request.experience,
                "mode": request.mode,
                "projects": ", ".join(request.projects),
                "skills": ", ".join(request.skills),
                "resume": request.resumeText,
            }
        )

        logger.info("Questions generated successfully.")

        return response


question_service = QuestionService()