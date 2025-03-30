# Objetivo.
- Adapter, novos formatos de conteúdo de forma eficiente.
- Refatore em flexível, sustentável, simples e organizado.
- Flag de segurança, ache.
- Adicione suporte ao provisionamento de `texto`.


## Riscos ##



## Melhorias ##

1. Refatoração no Codigo

- Para evitar hardcoded na lógica um novo modulo `content-types` foi criado para administrar agora os tipos de contents.
- Fiquei em dúvida sobre utilizar um banco de dados NoSQL, como o MongoDB, neste novo módulo. A vantagem seria que não seria necessário atualizar o código e realizar migrações caso um novo tipo de conteúdo não se encaixasse nos campos atuais. (Mas como não é fluxo grande de entrada de tipos, achei melhor usar o postgree mesmo e utilizar os relacionamentos).