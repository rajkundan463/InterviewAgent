from fastapi import FastAPI

from app.exceptions.handlers import register_exception_handlers
from app.api.interview_routers import router


app = FastAPI(
    title="Interview AI Service",
    version="1.0.0",
)

app.include_router(router)


@app.get("/", tags=["Health"])
async def root():
    return {
        "message": "Interview AI Service Running"
    }


@app.get("/health", tags=["Health"])
async def health():
    return {
        "status": "healthy"
    }

register_exception_handlers(app)