from app.core.logger import get_logger

from app.prompts.evaluation_prompt import (
    EVALUATION_PROMPT,
)

from app.schemas.evaluation_schema import (
    EvaluationRequest,
    EvaluationResponse,
)

from app.services.llm_service import llm_service


logger = get_logger(__name__)


class EvaluationService:

    def __init__(self):

        self.llm = llm_service

    async def evaluate_answer(
        self,
        request: EvaluationRequest,
    ):

        logger.info("Evaluating answer.")

        chain = (
            EVALUATION_PROMPT
            | self.llm.structured(
                EvaluationResponse
            )
        )

        response = chain.invoke(
            {
                "question": request.question,
                "answer": request.answer,
            }
        )

        logger.info("Evaluation completed.")

        return response


evaluation_service = EvaluationService()