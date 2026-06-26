from pydantic import BaseModel


class EvaluationRequest(BaseModel):

    question: str

    answer: str


class EvaluationResponse(BaseModel):

    confidence: int

    communication: int

    correctness: int

    finalScore: int

    feedback: str