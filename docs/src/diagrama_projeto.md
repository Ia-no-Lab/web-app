# Diagrama do Projeto

Esta seção apresenta uma visão geral visual da estrutura do projeto Ia no Lab, mostrando como os diferentes componentes se relacionam.

## Diagrama Geral

```mermaid
graph TB
    Frontend("Frontend") --> React("React")
    Frontend --> TanStack("TanStack Router")
    Frontend --> ComponentesUI("Componentes UI")
    ComponentesUI --> Header("Header")
    ComponentesUI --> Footer("Footer")
    ComponentesUI --> Paginas("Páginas")

    Backend("Backend") --> FastAPI("FastAPI App")
    Backend --> Endpoints("Endpoints API")
    Endpoints --> RootEndpoint("/")
    Endpoints --> ItemsEndpoint("/items/{item_id}")

    Frontend --- Backend

    classDef module fill:#3c6b22,stroke:#24201b,stroke-width:2px,color:#f4f4f4;
    classDef component fill:#c0d684,stroke:#24201b,stroke-width:1px,color:#24201b;
    classDef endpoint fill:#cbeaa6,stroke:#24201b,stroke-width:1px,color:#24201b;

    class Frontend,Backend module;
    class React,TanStack,ComponentesUI,FastAPI,Endpoints component;
    class Header,Footer,Paginas,RootEndpoint,ItemsEndpoint endpoint;
```

Este diagrama ilustra a estrutura principal do projeto, mostrando a separação entre o frontend e o backend, bem como os principais componentes de cada parte do sistema.
