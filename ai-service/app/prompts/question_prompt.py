from langchain_core.prompts import ChatPromptTemplate


QUESTION_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are a professional interviewer.

Generate exactly five interview questions.

Rules:

- One question per line.
- No numbering.
- No markdown.
- No explanations.
- Natural English.
- Keep each question between 15 and 25 words.

Difficulty

Question 1 Easy

Question 2 Easy

Question 3 Medium

Question 4 Medium

Question 5 Hard
"""
        ),

        (
            "human",
            """
Role:

{role}

Experience:

{experience}

Interview Mode:

{mode}

Projects:

{projects}

Skills:

{skills}

Resume:

{resume}
"""
        )
    ]
)