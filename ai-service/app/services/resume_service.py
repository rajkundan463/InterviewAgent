from app.core.logger import get_logger
from app.prompts.resume_prompt import RESUME_PROMPT
from app.schemas.resume_schema import ResumeResponse
from app.services.llm_service import llm_service
from app.utils.pdf_reader import PDFReader

logger = get_logger(__name__)


class ResumeService:

    def __init__(self):
        self.llm = llm_service

    async def analyze_resume(
        self,
        file_bytes: bytes
    ) -> dict:

        logger.info("Extracting resume text.")

        resume_text = PDFReader.extract_text(file_bytes)

        logger.info("Calling LLM.")

        chain = (
            RESUME_PROMPT
            | self.llm.structured(ResumeResponse)
        )

        response = chain.invoke(
            {
                "resume": resume_text
            }
        )

        logger.info("Resume analyzed successfully.")

        return {
            "role": response.role,
            "experience": response.experience,
            "projects": response.projects,
            "skills": response.skills,
            "resumeText": resume_text,
        }


resume_service = ResumeService()