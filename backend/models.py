from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ExperimentBase(BaseModel):
    name: str
    description: str
    items: List[str]

class ExperimentCreate(ExperimentBase):
    pass

class Experiment(ExperimentBase):
    id: int
    
    class Config:
        orm_mode = True

class ChatInteractionBase(BaseModel):
    user_id: str
    user_message: str
    ai_response: str
    
class ChatInteractionCreate(ChatInteractionBase):
    pass

class ChatInteraction(ChatInteractionBase):
    id: int
    timestamp: datetime
    
    class Config:
        orm_mode = True

class Element(BaseModel):
    atomic_number: int
    symbol: str
    name: str
    atomic_mass: float
    category: str
    group: Optional[int] = None
    period: int
    block: str
    electron_configuration: str
    description: Optional[str] = None
    state_at_room_temp: str
    melting_point: Optional[float] = None
    boiling_point: Optional[float] = None
    density: Optional[float] = None
    electronegativity: Optional[float] = None
    discovered_by: Optional[str] = None
    year_discovered: Optional[int] = None
    
    class Config:
        orm_mode = True