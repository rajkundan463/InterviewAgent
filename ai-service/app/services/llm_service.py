from langchain_openai import ChatOpenAI

from app.core.config import settings


class LLMService:

    def __init__(self):

        self._model = ChatOpenAI(
            model=settings.MODEL,
            api_key=settings.OPENROUTER_API_KEY,
            base_url="https://openrouter.ai/api/v1",
            temperature=0.4,
            max_retries=2,
        )

    @property
    def model(self):
        return self._model

    def structured(self, schema):
        return self._model.with_structured_output(schema)


llm_service = LLMService()