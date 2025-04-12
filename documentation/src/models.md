# Modelos de Dados

## 🔬 Modelos Principais

### Experimento Científico

`ExperimentBase`

- **Campos:**
  - `title`: Título do experimento (obrigatório)
  - `description`: Descrição detalhada
  - `items`: Lista de materiais necessários
  - `difficulty`: Nível de dificuldade (1-5)

```python
class ExperimentBase:
    name: str        # Nome do experimento
    description: str # Descrição detalhada do experimento
    items: List[str] # Lista de itens necessários
```

### Experiment

```python
class Experiment(ExperimentBase):
    id: int         # Identificador único do experimento
```

## Interação de Chat

### ChatInteractionBase

```python
class ChatInteractionBase:
    user_id: str      # Identificador único do usuário
    user_message: str # Mensagem enviada pelo usuário
    ai_response: str  # Resposta gerada pela IA
```

### ChatInteraction

```python
class ChatInteraction(ChatInteractionBase):
    id: int           # Identificador único da interação
    timestamp: datetime # Data e hora da interação
```

## 🧪 Elementos Químicos

### Estrutura `Element`

- **Propriedades:**
  - `atomic_number`: Número atômico
  - `symbol`: Símbolo químico
  - `name`: Nome completo
  - `atomic_mass`: Massa atômica
  - `category`: Categoria na tabela periódica

```python
class Element:
    atomic_number: int          # Número atômico
    symbol: str                 # Símbolo químico
    name: str                   # Nome do elemento
    atomic_mass: float          # Massa atômica
    category: str               # Categoria do elemento
    group: Optional[int]        # Grupo na tabela periódica
    period: int                 # Período na tabela periódica
    block: str                  # Bloco (s, p, d, f)
    electron_configuration: str # Configuração eletrônica
    description: Optional[str]  # Descrição do elemento
    state_at_room_temp: str    # Estado físico à temperatura ambiente
    melting_point: Optional[float]     # Ponto de fusão
    boiling_point: Optional[float]     # Ponto de ebulição
    density: Optional[float]           # Densidade
    electronegativity: Optional[float] # Eletronegatividade
    discovered_by: Optional[str]       # Descobridor
    year_discovered: Optional[int]     # Ano de descoberta
```
