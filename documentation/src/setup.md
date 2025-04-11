# Setup

Esta seção tratará de instruir novos desenvolvedores a configurar uma nova máquina para contribuir com o projeto, alguns passos são diferentes dependendo do seu sistema operacional, mas de forma geral são semelhantes.

Antes de desenvolver você precisará instalar as seguintes ferramentas/pacotes:

- Node
- Pnpm
- Python
- Pip
- Git
- Github Desktop (Opicional)
- IDE (Recomendadas: Vscode ou Pycharm)

Após instalar as ferramentas você deverá se conectar a codebase, podendo ser feito localmente (clonando o repositório) ou pela nuvem (Por ssm ou ssh). Quando se conectar você terá que criar um ambiente virtual do python, o ativar, instalar as dependências do python(backend), instalar as dependências do frontend. Segue o tutorial via terminal.

## Unix
```
git clone https://github.com/Ia-no-Lab/web-app.git
cd backend
python -m venv venv
source venv/bin.activate // usando bash ou zsh
pip install -r requirements.txt
cd ..
cd frontend
pnpm install
```

## Windows
```
git clone https://github.com/Ia-no-Lab/web-app.git
cd backend
python -m venv venv
source .\venv\Scripts\activate  // usando powershell
pip install -r requirements.txt
cd ..
cd frontend
pnpm install
```

<details>
  <summary>Usuários do Pycharm</summary>
    No pycharm, um passo do setup, o ambiente virtual do python pode ser feito de forma manual com os seguintes passos:

    - Apertar CTRL+ALT+S
    - Ir em Projeto
    - Ir em Python Interpreter
    - Ir em Add Interpreter
    - Ir em Add Local Interpreter
    - Trocar o diretório para a pasta backend (escreva antes de .venv " backend\ "
    - Apertar em OK
</details>

Pronto, agora o ambiente de desenvolvimento está 100% pronto.