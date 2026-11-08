# Configuração do AdMob

O app usa um banner na tela inicial e um intersticial após a pessoa concluir o
cálculo da divisão. Em builds de desenvolvimento, os anúncios usam os IDs de
teste oficiais do Google. Em produção, cada formato só é solicitado quando o
ID do app e o ID da unidade desse formato estão configurados para a plataforma.

1. Crie o app Android e o app iOS no AdMob e configure as mensagens de
   privacidade e consentimento em **Privacidade e mensagens**.
2. Copie `.env.example` para `.env` e preencha os seis valores com os IDs do
   AdMob. Os IDs são identificadores públicos, não chaves secretas.
3. Para builds EAS, cadastre as mesmas variáveis no ambiente usado pelo perfil
   de build.
4. Gere um novo development build ou build de produção. O módulo nativo não
   funciona no Expo Go, e alterações no plugin exigem rebuild.

O app atualiza o consentimento UMP antes de inicializar o SDK. Se a configuração
de consentimento não permitir solicitações, os anúncios não são carregados.
Quando a mensagem do AdMob exigir uma entrada de opções de privacidade, a tela
inicial exibe um botão para reabrir essas opções. O intersticial é pré-carregado
depois do consentimento e, se ainda não estiver pronto ao concluir o cálculo, o
app continua diretamente para o resultado.
