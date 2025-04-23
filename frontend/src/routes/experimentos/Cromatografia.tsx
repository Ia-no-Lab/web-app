import React from "react"


const Cromatografia = () => {
  return (
    <div className="p-10 max-w-4xl mx-auto text-eerie-black">
      <h1 className="text-4xl font-bold mb-6">Cromatografia com Canetinha</h1>
      <p className="text-lg mb-6">Descubra as cores escondidas em tintas usando papel e água.</p>

      <ol className="space-y-10">
        <li>
          <h2 className="text-xl font-semibold mb-2">1. Materiais</h2>
          <p>Papel filtro, canetinhas, copo com água, fita adesiva.</p>
          <div className="bg-neutral-100 min-h-[150px] rounded flex items-center justify-center text-neutral-400">[Ilustração aqui]</div>
        </li>
        <li>
          <h2 className="text-xl font-semibold mb-2">2. Execução</h2>
          <p>Desenhe com canetinha, mergulhe o papel na água e observe a separação das cores.</p>
          <div className="bg-neutral-100 min-h-[150px] rounded flex items-center justify-center text-neutral-400">[Ilustração aqui]</div>
        </li>
      </ol>

    </div>
  )
}

export default Cromatografia
