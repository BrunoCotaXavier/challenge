# Objetivo.
- Adapter, novos formatos de conteúdo de forma eficiente.
- Refatore em flexível, sustentável, simples e organizado.
- Flag de segurança, ache.
- Adicione suporte ao provisionamento de `texto`.


## Melhorias ##

1. Refatoração no Codigo

- Um novo modulo `content-types` foi criado para administrar agora os tipos de contents.
- Fiquei em dúvida sobre utilizar um banco de dados NoSQL, como o MongoDB, neste novo módulo. A vantagem seria que não seria necessário atualizar o código e realizar migrações caso um novo tipo de conteúdo não se encaixasse nos campos atuais.
- Na correria não consegui contemplar todos os requistos, então foquei na solução dos tipos, sendo criado um novo tipo `text` a partir de uma seed ao invez de implementar mutations também.