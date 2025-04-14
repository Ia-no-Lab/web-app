# Backend

O backend deste projeto é construído com FastAPI, um framework moderno e de alto desempenho para construção de APIs com Python.

## Tecnologias Principais

- **FastAPI**: Framework web assíncrono para Python
- **Pydantic**: Validação de dados e configurações
- **CORS Middleware**: Para permitir requisições cross-origin do frontend

## Estrutura do Backend

```mermaid
graph TB
    Main("main.py") --> FastAPI("FastAPI App")
    FastAPI --> Middleware("CORS Middleware")
    FastAPI --> Endpoints("Endpoints")
    Endpoints --> RootEndpoint("/")
    Endpoints --> ItemsEndpoint("/items/{item_id}")

    classDef module fill:#3c6b22,stroke:#24201b,stroke-width:2px,color:#f4f4f4;
    classDef component fill:#c0d684,stroke:#24201b,stroke-width:1px,color:#24201b;
    classDef endpoint fill:#cbeaa6,stroke:#24201b,stroke-width:1px,color:#24201b;

    class Main module;
    class FastAPI,Middleware,Endpoints component;
    class RootEndpoint,ItemsEndpoint endpoint;
```

## Endpoints da API

Atualmente, a API possui os seguintes endpoints:

### Endpoint Raiz (`/`)

```python
@app.get("/")
def read_root():
    return {"Hello": "World"}
```

Este endpoint retorna uma simples mensagem de boas-vindas.

### Endpoint de Itens (`/items/{item_id}`)

```python
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
```

Este endpoint aceita um ID de item como parte da URL e um parâmetro de consulta opcional `q`.

## Fluxo de Requisição

```mermaid
sequenceDiagram
    actor C as Cliente
    participant M as CORS Middleware
    participant F as FastAPI
    participant E as Endpoint

    C->>+M: Requisição HTTP
    M->>+F: Requisição validada
    F->>+E: Roteamento para endpoint
    E-->>-F: Resposta JSON
    F-->>-M: Resposta processada
    M-->>-C: Resposta HTTP
```

## Configuração CORS

O backend está configurado para aceitar requisições do frontend que está rodando em `http://localhost:3000`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ou ["*"] para desenvolvimento
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Expansão da API

Para adicionar novos endpoints à API, siga o padrão de decoradores do FastAPI:

```mermaid
graph LR
    A("@app.método('/rota')") -->|"Decorador"| B("def nome_função(parâmetros)")
    B -->|"Processamento"| C("return resposta_json")

    style A fill:#f96,stroke:#333,stroke-width:2px
    style B fill:#69f,stroke:#333,stroke-width:2px
    style C fill:#6f9,stroke:#333,stroke-width:2px
```

Onde:

- `método` pode ser `get`, `post`, `put`, `delete`, etc.
- `/rota` é o caminho do endpoint
- `parâmetros` são os parâmetros da função, que podem vir da URL, query, body, etc.

## Execução do Backend

Para executar o backend localmente, você precisa ter o Python instalado e as dependências listadas em `requirements.txt`. Execute:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

O servidor estará disponível em `http://localhost:8000` por padrão.
