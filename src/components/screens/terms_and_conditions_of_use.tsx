import React from 'react'
import { Box, Typography, ScrollView } from 'src/components/atoms'
import { BackHeader } from 'src/components/molecules'

const TermsAndConditionsOfUse: React.FC = () => {
  return (
    <>
      <BackHeader title="Termos e condições de uso" />
      <ScrollView>
        <Box p={2}>
          <Typography mb={1}>
            A Equipe Alagou construiu o aplicativo Alagou como um aplicativo
            gratuito. Este SERVIÇO é fornecido pela Equipe Alagou sem nenhum
            custo e deve ser usado como tal.
          </Typography>
          <Typography mb={1}>
            Esta página é usada para informar os visitantes do site sobre nossos
            termos com a coleta, uso e divulgação de informações pessoais, se
            alguém decidir usar o nosso serviço.
          </Typography>
          <Typography mb={1}>
            Se você optar por usar o nosso serviço, você concorda com a coleta e
            uso de informações em relação a esta política. As informações
            pessoais que nós coleto são usados para fornecer e melhorar o
            serviço. Nós não vamos usar ou compartilhar suas informações com
            qualquer pessoa, exceto conforme descrito nestes Termos e Condições
            de Uso.
          </Typography>
          <Typography fontWeight="bold" mb={1}>
            Coleta e Uso de Informações
          </Typography>
          <Typography mb={1}>
            Para uma melhor experiência ao usar nosso serviço, podemos solicitar
            que você nos forneça certas informações de identificação pessoal,
            incluindo, mas não se limitando a nome de usuário, endereço,
            localização e fotos. A informação que nós solicito será retido por
            nós e usado conforme descrito nestes Termos e Condições de Uso.
          </Typography>
          <Typography fontWeight="bold" mb={1}>
            Log dos Dados
          </Typography>
          <Typography mb={1}>
            Queremos informar que sempre que você usar o nosso serviço, em caso
            de erro no aplicativo nós coleto dados e informações (por meio de
            produtos de terceiros) no snós telefone chamado logs. Estes dados de
            registro podem incluir informações como como o endereço de protocolo
            da Internet (&quot;IP&quot;) de snóss dispositivos, nome do
            dispositivo, operação versão do sistema, configuração do aplicativo
            ao utilizar nosso serviço, o hora e data de uso do Serviço e outras
            estatísticas.
          </Typography>
          <Typography fontWeight="bold" mb={1}>
            Segurança
          </Typography>
          <Typography mb={1}>
            Nós valorizamos sua confiança em nos fornecer suas informações
            pessoais, portanto, estamos nos esforçando para usar meios
            comercialmente aceitáveis de protegê-las. Mas lembre-se de que
            nenhum método de transmissão pela internet, ou método de o
            armazenamento eletrônico é 100% seguro e confiável, e não podemos
            garantir sua segurança absoluta.
          </Typography>
          <Typography fontWeight="bold" mb={1}>
            Privacidade das crianças
          </Typography>
          <Typography mb={1}>
            Estes Serviços não se dirigem a menores de 13 anos. Não
            intencionalmente coletamos informações pessoais identificáveis de
            crianças menores de 13 anos. Caso nós descubramos que uma criança
            menor de 13 anos me fornecnós suas informações, nós imediatamente
            excluirei isso do nosso servidor. Se você é um pai ou responsável e
            você está ciente de que snós filho nos fornecnós informações
            pessoais, entre em contato conosco para que nós possamos tomar as
            ações necessárias.
          </Typography>
          <Typography fontWeight="bold" mb={1}>
            Mudanças nestes Termos e Condições de Uso
          </Typography>
          <Typography mb={1}>
            Podemos atualizar nosses Termos e Condições de Uso de tempos em
            tempos. Assim, você é aconselhado para revisar esta página
            periodicamente para quaisquer alterações. Vamos notificá-lo de
            qualquer alterações postando os novos Termos e Condições de Uso
            nesta página. Essas mudanças entram em vigor imediatamente, após
            serem publicadas nesta página.
          </Typography>

          <Typography fontWeight="bold" mb={1}>
            Contato
          </Typography>
          <Typography>
            Se você tiver alguma dúvida ou sugestão sobre nossos Termos e
            Condições de Uso, não hesite em nos contatar.
          </Typography>
        </Box>
      </ScrollView>
    </>
  )
}

export default TermsAndConditionsOfUse
