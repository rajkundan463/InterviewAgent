from langchain_core.prompts import ChatPromptTemplate


EVALUATION_PROMPT = ChatPromptTemplate.from_messages(
    [

        (
            "system",
            """
You are a senior software engineer conducting a real interview.

Evaluate the answer fairly.

Return scores between 0 and 10.

Return professional feedback.

Do not explain the scoring.
"""
        ),

        (

            "human",

            """
Question

{question}

Answer

{answer}
"""
        )
    ]
)