from pydantic import BaseModel
from typing import Optional, List

class Element(BaseModel):
    name: str
    appearance: Optional[str]
    atomic_mass: float
    boil: Optional[float]
    category: str
    color: Optional[str]
    density: Optional[float]
    discovered_by: Optional[str]
    melt: Optional[float]
    molar_heat: Optional[float]
    named_by: Optional[str]
    number: int
    period: int
    phase: str
    source: str
    spectral_img: Optional[str]
    summary: str
    symbol: str
    xpos: int
    ypos: int
    shells: List[int]
    electron_configuration: str
    electron_affinity: Optional[float]
    electronegativity_pauling: Optional[float]
    ionization_energies: List[float]
