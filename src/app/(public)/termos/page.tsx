import { Calendar } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mt-16 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-text mb-6">Termos de Serviço</h1>
        <div className="flex items-center gap-2 text-text-foreground">
          <Calendar className="w-4 h-4" />
          <p>Data efetiva: Janeiro, 2025</p>
        </div>

        <div className="flex justify-center items-center py-6">
          <span className="w-full border-t border-border/50" />
        </div>

        <div className="prose prose-lg max-w-none text-text">
          <p className="mb-6">
            Estes Termos de Serviço do Site (&quot;Termos&quot;) regem o uso do
            https://mobbin.com (o &quot;Site&quot;) e qualquer software
            relacionado da Mobbin (o &quot;Software&quot;) ou serviços
            (coletivamente, os &quot;Serviços&quot;) fornecidos pela Mobbin Pte.
            Ltd. e suas subsidiárias, representantes e afiliadas (coletivamente,
            &quot;Mobbin&quot;, &quot;nós&quot;, &quot;nos&quot; ou
            &quot;nosso&quot;) independentemente de você, o cliente ou usuário,
            ser um usuário pago ou um visitante não pagante.
          </p>

          <p className="mb-6">
            Por favor, leia também a Política de Privacidade da Mobbin, que
            explica como coletamos e usamos suas informações pessoais, nossa
            Política de Uso Aceitável e Política de Cookies, que descrevem suas
            responsabilidades ao usar nosso Site e Serviços.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              1. Sobre Nós e Nossos Serviços
            </h2>
            <p className="mb-4 text-text-foreground">
              Somos a Mobbin Pte. Ltd., uma empresa registrada em Singapura,
              operando como Mobbin. Nosso Número de Entidade Único é 202105940R
              e nosso escritório registrado está localizado em 75 Ayer Rajah
              Crescent, #02-02, Singapura 139953.
            </p>
            <p className="mb-4 text-text-foreground">
              A Mobbin é uma biblioteca abrangente e curada por especialistas de
              interfaces dos melhores produtos digitais. Ajudamos designers de
              produto a encontrar inspiração e referências de design relevantes
              com significativamente menos tempo e esforço.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              2. Aceitação
            </h2>
            <p className="mb-4 text-text-foreground">
              A Mobbin possui ou detém os direitos relevantes do Site e/ou
              Software e concederá uma licença não exclusiva ao Cliente, de
              acordo com os termos deste Acordo, permitindo o uso do Site e/ou
              Software.
            </p>
            <div className="pl-6">
              <p className="mb-2">
                Ao acessar e/ou usar o Site e/ou Software, você:
              </p>
              <ul className="list-disc mb-4">
                <li>garante que revisou este Acordo</li>
                <li>
                  garante que possui capacidade legal para celebrar um acordo
                  juridicamente vinculativo
                </li>
                <li>concorda em usar os Serviços de acordo com este Acordo</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              3. Limitações de Uso
            </h2>
            <p className="mb-4 text-text-foreground">
              Por favor, leia as seguintes limitações e restrições
              cuidadosamente. Qualquer violação das limitações e/ou restrições
              estabelecidas nestes Termos pode resultar, a critério exclusivo da
              Mobbin, na rescisão do seu acesso ao Site e/ou Software, e você
              poderá estar sujeito a responsabilidade civil e/ou criminal.
            </p>
          </section>

          {/* Continue with additional sections translated to Portuguese... */}
        </div>
      </div>
    </div>
  );
}
