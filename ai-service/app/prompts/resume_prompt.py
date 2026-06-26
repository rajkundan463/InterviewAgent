from langchain_core.prompts import ChatPromptTemplate

RESUME_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are an expert technical recruiter.

Extract structured information from the resume.

Rules:

- Return only requested information.
- Do not guess.
- Use "Fresher" if experience is not mentioned.
- Return empty list when projects or skills are missing.
""",
        ),
        (
            "human",
            """
Resume:

{resume}
""",
        ),
    ]
)