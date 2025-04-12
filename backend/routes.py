from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from datetime import datetime
from . import models, database
import openai
import os
import python_dotenv

from groq import Groq

python_dotenv.load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

experiment_router = APIRouter(
    prefix="/experiments",
    tags=["experiments"],
    description="Endpoints para gerenciamento de experimentos científicos"
)
periodic_table_router = APIRouter(
    prefix="/periodic-table",
    tags=["periodic-table"],
    description="Endpoints para acesso aos dados da tabela periódica"
)
chat_router = APIRouter(
    prefix="/chat",
    tags=["chat"],
    description="Endpoints para interação com o chat científico"
)


@experiment_router.get("/", response_model=List[models.Experiment])
async def get_all_experiments():
    return database.get_experiments()

@experiment_router.get("/{experiment_id}", response_model=models.Experiment)
async def get_experiment_by_id(experiment_id: int):
    experiment = database.get_experiment(experiment_id)
    if not experiment:
        raise HTTPException(status_code=404, detail="Experiment not found")
    return experiment

@experiment_router.post("/", response_model=models.Experiment)
async def create_new_experiment(experiment: models.ExperimentCreate):
    return database.create_experiment(experiment.dict())

@experiment_router.post("/recommend", response_model=List[dict])
async def recommend_experiments(items: List[str]):
    recommendations = database.find_experiments_by_items(items)
    return recommendations

@periodic_table_router.get("/elements", response_model=List[models.Element])
async def get_all_elements():
    response = requests.get("https://periodic-table-elements-info.herokuapp.com/elements")
    if response.status_code == 200:
        return response.json()
    raise HTTPException(status_code=500, detail="Failed to fetch elements")

@periodic_table_router.get("/elements/{atomic_number}", response_model=models.Element)
async def get_element_by_atomic_number(atomic_number: int):
    response = requests.get(f"https://periodic-table-elements-info.herokuapp.com/elements/{atomic_number}")
    if response.status_code == 200:
        return response.json()
    raise HTTPException(status_code=404, detail="Element not found")

@periodic_table_router.get("/elements/symbol/{symbol}", response_model=models.Element)
async def get_element_by_symbol(symbol: str):
    response = requests.get(f"https://periodic-table-elements-info.herokuapp.com/elements/symbol/{symbol}")
    if response.status_code == 200:
        return response.json()
    raise HTTPException(status_code=404, detail="Element not found")


@chat_router.post("/", response_model=dict)
async def chat_with_ai(chat_request: dict):
    try:
        user_message = chat_request.get("user_message")
        user_id = chat_request.get("user_id")
        
        if not user_message or not user_id:
            raise HTTPException(status_code=400, detail="Missing user_message or user_id in request")
        completion = client.chat.completions.create(
            model="mixtral-8x7b-32768",
            messages=[
                {"role": "system", "content": "You are a helpful assistant specializing in scientific education. Provide accurate, educational responses about science topics."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=500
        )
        
        ai_response = completion.choices[0].message.content
        interaction_data = {
            "user_id": user_id,
            "user_message": user_message,
            "ai_response": ai_response,
            "timestamp": datetime.now().isoformat()
        }
        database.save_chat_interaction(interaction_data)
        
        return {"response": ai_response}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@chat_router.get("/history/{user_id}", response_model=List[models.ChatInteraction])
async def get_chat_history(user_id: str):
    return database.get_user_chat_history(user_id)