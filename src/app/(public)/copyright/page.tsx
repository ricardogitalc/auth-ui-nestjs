import { Calendar } from "lucide-react";

export default function CopyrightPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mt-16 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-text mb-6">Copyright</h1>
        <div className="flex items-center gap-2 text-text-foreground">
          <Calendar className="w-4 h-4" />
          <p>Data efetiva: Janeiro, 2025</p>
        </div>

        <div className="flex justify-center items-center py-6">
          <span className="w-full border-t border-border/50" />
        </div>

        <div className="prose prose-lg max-w-none text-text">
          <p className="mb-6">
            Mobbin respeita os direitos de propriedade intelectual de terceiros
            e esperamos que as pessoas na Mobbin façam o mesmo.
          </p>

          <p className="mb-6">
            É nossa política em circunstâncias apropriadas e a nosso
            critério—desativar ou encerrar as contas de pessoas que
            repetidamente infringem ou são repetidamente acusadas de infringir
            direitos autorais ou outros direitos de propriedade intelectual.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
            DMCA e Denúncias de Copyright
          </h2>
          <p className="mb-4 text-text-foreground">
            De acordo com o Digital Millennium Copyright Act, que você pode ler
            no site do US Copyright Office, responderemos rapidamente às
            reivindicações de violação de direitos autorais na Mobbin que nos
            forem relatadas. Se você é um proprietário de direitos autorais ou
            está autorizado a agir em nome de um, você pode denunciar supostas
            violações de direitos autorais na Mobbin preenchendo o Aviso DMCA de
            Suposta Violação e enviando-o ao nosso agente de direitos autorais
            designado.
          </p>

          <p className="mb-4 text-text-foreground">
            Quando recebermos seu aviso DMCA, tomaremos as medidas que
            considerarmos apropriadas, o que pode incluir a remoção do conteúdo
            denunciado da Mobbin.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
            Como Enviar uma Denúncia de Copyright
          </h2>
          <p className="mb-4 text-text-foreground">
            Se você acredita que qualquer material na Mobbin infringe seus
            direitos autorais, encaminhe as seguintes informações por escrito ao
            nosso Agente de Direitos Autorais:
          </p>

          <ul className="list-disc pl-6 mb-4 text-text-foreground">
            <li>
              Seu nome, endereço, número de telefone e (se disponível) endereço
              de e-mail;
            </li>
            <li>
              Uma descrição do trabalho protegido por direitos autorais que você
              alega ter sido violado;
            </li>
            <li>
              A URL exata ou uma descrição de cada local onde o material
              supostamente infrator está localizado;
            </li>
            <li>
              Uma declaração sua de que você tem uma crença de boa fé de que o
              uso contestado não foi autorizado por você, seu agente ou pela
              lei;
            </li>
            <li>
              Sua assinatura eletrônica ou física ou a assinatura eletrônica ou
              física da pessoa autorizada a agir em seu nome;
            </li>
            <li>
              Uma declaração sua de que as informações em seu aviso são precisas
              e, sob pena de perjúrio, que você está autorizado a agir em nome
              do proprietário de um direito exclusivo que está supostamente
              sendo violado.
            </li>
          </ul>

          <p className="mb-4 text-text-foreground">
            Envie seu aviso DMCA completo para: Mobbin Pte. Ltd., 75 Ayer Rajah
            Crescent, #02-02, Singapore 139953, ou via e-mail para
            support@mobbin.com.
          </p>

          <p className="mt-6 text-sm text-text-foreground italic">
            Nota: A propriedade intelectual referenciada nas imagens encontradas
            na Mobbin, se houver, pertence a seus respectivos proprietários.
          </p>
        </div>
      </div>
    </div>
  );
}
