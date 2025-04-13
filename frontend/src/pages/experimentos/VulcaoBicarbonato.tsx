import { Button } from "@/src/components/ui/button"
import React from "react";


const VulcaoBicarbonato = () => {
  return (
    <div className="p-10 max-w-4xl mx-auto text-eerie-black">
      <h1 className="text-4xl font-bold mb-6">Vulcão de Bicarbonato</h1>

      <p className="text-lg mb-6">
        Esse experimento simula uma erupção vulcânica usando uma reação química simples.
      </p>

      <ol className="space-y-10">
        <li>
          <h2 className="text-xl font-semibold mb-2">1. Materiais</h2>
          <p className="text-neutral-700">
            Vinagre, bicarbonato de sódio, corante alimentício, recipiente e um prato.
          </p>
          <div className="bg-neutral-100 min-h-[150px] rounded mt-3 flex items-center justify-center text-neutral-400">
            [Ilustração aqui]
          </div>
        </li>

        <li>
          <h2 className="text-xl font-semibold mt-8 mb-2">2. Preparação</h2>
          <p className="text-neutral-700">
            Coloque o bicarbonato no recipiente e o recipiente no prato. Adicione corante.
          </p>
          <div className="bg-neutral-100 min-h-[150px] rounded mt-3 flex items-center justify-center text-neutral-400">
            [Ilustração aqui]
          </div>
        </li>

        <li>
          <h2 className="text-xl font-semibold mt-8 mb-2">3. A Reação</h2>
          <p className="text-neutral-700">
            Despeje o vinagre e veja a "erupção" acontecer!
          </p>
          <div className="bg-neutral-100 min-h-[150px] rounded mt-3 flex items-center justify-center text-neutral-400">
            [Ilustração aqui]
          </div>
        </li>
      </ol>


    </div>
  )
}

export default VulcaoBicarbonato
