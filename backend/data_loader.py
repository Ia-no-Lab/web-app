import json
from pathlib import Path
from typing import List
from models import Element

def load_elements() -> List[Element]:
    json_path = Path("PeriodicTableJSON.json")
    with open(json_path, encoding="utf-8") as file:
        data = json.load(file)
    return [Element(**el) for el in data["elements"]]
