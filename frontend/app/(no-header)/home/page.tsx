export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="text-eerie-black space-y-6 max-w-4xl mx-auto text-center py-10">
        <h1 className="text-4xl font-bold">Bem-vindo à Home!</h1>
        <p className="text-lg text-muted-foreground">
          Aqui você pode acessar todas as funcionalidades do Ia no Lab:
          visualizar a tabela periódica, explorar experimentos e conversar
          com a IA.
        </p>
        <p className="text-base">
          Use o menu lateral para navegar entre as seções e aproveitar a
          plataforma.
        </p>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
      </div>
    </div>
  );
}
