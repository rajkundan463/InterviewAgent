from fastapi import FastAPI, Response

from app.exceptions.handlers import register_exception_handlers
from app.api.interview_routers import router

app = FastAPI(
    title="Interview AI Service",
    version="1.0.0",
)

app.include_router(router)


@app.get("/")
async def root():
    return {"message": "Interview AI Service Running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.head("/health")
async def health_head():
    return Response(status_code=200)


register_exception_handlers(app)