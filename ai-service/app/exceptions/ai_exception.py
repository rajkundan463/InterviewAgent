class AIServiceException(Exception):
    """Raised when LLM request fails."""

    pass


class PDFExtractionException(Exception):
    """Raised when PDF parsing fails."""

    pass


class PromptException(Exception):
    """Raised when prompt generation fails."""

    pass