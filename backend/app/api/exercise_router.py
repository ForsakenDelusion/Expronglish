from fastapi import APIRouter, HTTPException
from ..services import deepseek_service as ai_service
from pydantic import BaseModel

router = APIRouter()

class EvaluationRequest(BaseModel):
    user_response: str
    exercise_type: str
    scenario: str

@router.get("/exercises/generate")
async def generate_exercise(exercise_type: str):
    try:
        exercise = await ai_service.generate_exercise(exercise_type)
        return exercise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/exercises/evaluate")
async def evaluate_response(request: EvaluationRequest):
    try:
        evaluation = await ai_service.evaluate_response(
            request.user_response,
            request.exercise_type,
            request.scenario
        )
        return evaluation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 