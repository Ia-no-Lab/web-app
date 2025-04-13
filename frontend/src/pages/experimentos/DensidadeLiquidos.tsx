import React from "react"


const DensidadeLiquidos = () => {
  return (
    <div className="p-10 max-w-4xl mx-auto text-eerie-black">
      <h1 className="text-4xl font-bold mb-6">Densidade dos Líquidos</h1>
      <p className="text-lg mb-6">Veja líquidos se separarem em camadas de acordo com sua densidade.</p>

      <ol className="space-y-10">
        <li>
          <h2 className="text-xl font-semibold mb-2">1. Materiais</h2>
          <p>Água, mel, óleo, corantes, copo transparente.</p>
          <div className="bg-neutral-100 min-h-[150px] rounded flex items-center justify-center text-neutral-400">[Ilustração aqui]</div>
        </li>
        <li>
          <h2 className="text-xl font-semibold mb-2">2. Execução</h2>
          <p>Despeje os líquidos cuidadosamente em camadas.</p>
          <div className="bg-neutral-100 min-h-[150px] rounded flex items-center justify-center text-neutral-400">[Ilustração aqui]</div>
        </li>
      </ol>

    </div>
  )
}

export default DensidadeLiquidos
