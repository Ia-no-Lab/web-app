export default async function NovoExperimento({ params, }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <div>Experimento {slug} </div>
}
