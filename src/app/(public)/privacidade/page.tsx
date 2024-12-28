import { Calendar } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mt-16 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-text mb-6">
          Política de privacidade
        </h1>
        <div className="flex items-center gap-2 text-text-foreground">
          <Calendar className="w-4 h-4" />
          <p>Data efetiva: Janeiro, 2025</p>
        </div>

        <div className="flex justify-center items-center py-6">
          <span className="w-full border-t border-border/50" />
        </div>

        <div className="prose prose-lg max-w-none text-text">
          <p className="mb-6">
            Sua privacidade é importante para nós. É política da Mobbin
            respeitar a sua privacidade e cumprir qualquer lei e regulamento
            aplicável em relação a qualquer informação pessoal que possamos
            coletar sobre você, inclusive em nosso site mobbin.com e outros
            sites que possuímos e operamos.
          </p>

          {/* Main sections */}
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
            1. Informações que coletamos
          </h2>
          <p className="mb-4 text-text-foreground">
            As informações que coletamos se enquadram em uma de duas categorias:
            informações “fornecidas voluntariamente” e informações “coletadas
            automaticamente”. Informações “fornecidas voluntariamente”
            referem-se a qualquer informação que você nos fornece de forma
            consciente e ativa ao usar ou participar de qualquer um de nossos
            serviços e promoções. Informações “coletadas automaticamente”
            referem-se a qualquer informação enviada automaticamente por seus
            dispositivos durante o acesso aos nossos produtos e serviços.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
            2. Dados de registro
          </h2>
          <p className="mb-4 text-text-foreground">
            Quando você visita nosso site, nossos servidores podem registrar
            automaticamente os dados padrão fornecidos pelo seu navegador. Pode
            incluir o endereço IP (Internet Protocol) do seu dispositivo, o tipo
            e versão do seu navegador, as páginas que você visita, a hora e a
            data da sua visita, o tempo gasto em cada página e outros detalhes
            sobre a sua visita. Além disso, se você encontrar determinados erros
            ao usar o site, poderemos coletar automaticamente dados sobre o erro
            e as circunstâncias que cercam sua ocorrência. Esses dados podem
            incluir detalhes técnicos sobre o seu dispositivo, o que você estava
            tentando fazer quando o erro ocorreu e outras informações técnicas
            relacionadas ao problema. Você pode ou não receber notificação de
            tais erros, mesmo no momento em que ocorrem, quando ocorreram ou
            qual é a natureza do erro. Esteja ciente de que, embora essas
            informações possam não ser de identificação pessoal por si só, pode
            ser possível combiná-las com outros dados para identificar
            pessoalmente pessoas individuais.
          </p>

          {/* Continue with other sections similarly */}
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
            3. Dados do dispositivo
          </h2>
          <div className="mb-4 text-text-foreground">
            <p className="mb-2">
              Quando você visita nosso site ou interage com nossos serviços,
              podemos coletar automaticamente dados sobre seu dispositivo, como:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Tipo de dispositivo</li>
              <li>Sistema operacional</li>
              <li>Identificadores exclusivos de dispositivos</li>
              <li>Configurações do dispositivo</li>
              <li>Dados de geolocalização</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
