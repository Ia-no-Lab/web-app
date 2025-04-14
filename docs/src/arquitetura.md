# Arquitetura do Projeto

Este projeto segue uma arquitetura moderna de aplicação web, com separação clara entre frontend e backend. Esta abordagem permite o desenvolvimento independente de cada parte, facilitando a manutenção e escalabilidade.

## Visão Geral

```mermaid
graph LR
    U((Usuário)) --> F[Frontend]
    F <-->|API Requests| B[Backend]
    B <-->|Dados| D[(Banco de Dados)]

    %% Aplicando a nova paleta de cores
    %% Cores: fern-green (#3c6b22), eerie-black (#24201b), white (#f4f4f4), tea-green (#cbeaa6), pistachio (#c0d684)

    style U fill:#f4f4f4,stroke:#24201b,stroke-width:2px,color:#24201b
    style F fill:#3c6b22,stroke:#24201b,stroke-width:2px,color:#f4f4f4
    style B fill:#c0d684,stroke:#24201b,stroke-width:2px,color:#24201b
    style D fill:#cbeaa6,stroke:#24201b,stroke-width:2px,color:#24201b
```

## Estrutura de Diretórios

O projeto está organizado nos seguintes diretórios principais:

```mermaid
graph TB
    Root["web-app/"] --> Frontend["frontend/"]
    Root --> Backend["backend/"]
    Root --> Docs["docs/"]

    Frontend --> FrontSrc["src/"]
    FrontSrc --> Components["components/"]
    FrontSrc --> Pages["pages/"]
    FrontSrc --> Routes["routes/"]
    FrontSrc --> Utils["utils/"]

    Backend --> MainPy["main.py"]
    Backend --> Requirements["requirements.txt"]

    Docs --> DocsSrc["src/"]

    %% Aplicando a nova paleta de cores
    %% Cores: fern-green (#3c6b22), eerie-black (#24201b), white (#f4f4f4), tea-green (#cbeaa6), pistachio (#c0d684)

    classDef root fill:#3c6b22,stroke:#24201b,stroke-width:2px,color:#f4f4f4;
    classDef dir fill:#c0d684,stroke:#24201b,stroke-width:1px,color:#24201b;
    classDef file fill:#cbeaa6,stroke:#24201b,stroke-width:1px,color:#24201b;

    class Root root;
    class Frontend,Backend,Docs,FrontSrc,Components,Pages,Routes,Utils,DocsSrc dir;
    class MainPy,Requirements file;
```

## Tecnologias Utilizadas

### Backend

- **FastAPI**: Framework moderno para construção de APIs com Python
- **Pydantic**: Validação de dados e configurações
- **CORS Middleware**: Para permitir requisições do frontend

### Frontend

- **React**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **TanStack Router**: Gerenciamento de rotas
- **Tailwind CSS**: Framework CSS utilitário
- **Radix UI**: Componentes acessíveis e sem estilo
- **Rspack**: Bundler de alta performance

## Fluxo de Dados

```mermaid
sequenceDiagram
    %% Aplicando a nova paleta de cores
    %% Cores: fern-green (#3c6b22), eerie-black (#24201b), white (#f4f4f4), tea-green (#cbeaa6), pistachio (#c0d684)

    actor U as Usuário
    participant F as Frontend
    participant B as Backend
    participant D as Banco de Dados

    %% Definindo cores para os participantes
    rect rgb(244, 244, 244)
    note right of U: Usuário
    end
    rect rgb(60, 107, 34)
    note right of F: Frontend
    end
    rect rgb(192, 214, 132)
    note right of B: Backend
    end
    rect rgb(203, 234, 166)
    note right of D: Banco de Dados
    end

    U->>+F: Interage com a interface
    F->>+B: Envia requisição HTTP
    B->>+D: Consulta/Atualiza dados
    D-->>-B: Retorna dados
    B-->>-F: Responde com JSON
    F-->>-U: Atualiza interface
```

## Comunicação entre Frontend e Backend

A comunicação entre o frontend e o backend é realizada através de requisições HTTP. O backend expõe endpoints REST que o frontend consome.

```mermaid
graph LR
    subgraph Frontend
        R[React] --> HC[HTTP Client]
    end

    subgraph Backend
        FA[FastAPI] --> EP[Endpoints]
    end

    HC <-->|JSON| EP

    %% Aplicando a nova paleta de cores
    %% Cores: fern-green (#3c6b22), eerie-black (#24201b), white (#f4f4f4), tea-green (#cbeaa6), pistachio (#c0d684)

    style R fill:#3c6b22,stroke:#24201b,stroke-width:1px,color:#f4f4f4
    style HC fill:#c0d684,stroke:#24201b,stroke-width:1px,color:#24201b
    style FA fill:#3c6b22,stroke:#24201b,stroke-width:1px,color:#f4f4f4
    style EP fill:#cbeaa6,stroke:#24201b,stroke-width:1px,color:#24201b

    %% Estilo dos subgráficos
    style Frontend fill:#f4f4f4,stroke:#24201b,stroke-width:1px,color:#24201b
    style Backend fill:#f4f4f4,stroke:#24201b,stroke-width:1px,color:#24201b
```

Esta arquitetura permite que o frontend e o backend sejam desenvolvidos e implantados independentemente, facilitando a manutenção e a escalabilidade do projeto.
