import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import experiment_router, periodic_table_router, chat_router

app = FastAPI(
    title="Science Education Platform API",
    description="API for interactive science education platform with experiments, periodic table, and AI chat",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",  
    "http://localhost:4173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(experiment_router)
app.include_router(periodic_table_router)
app.include_router(chat_router)

@app.get("/")
async def root():
    return {"message": "Bem-vindo à API da Ia no Lab"}

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)