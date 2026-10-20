# PRD — Jogo Casual de Adivinhação de Palavras

## 1. Visão geral do produto

Produto: jogo casual diário de adivinhação de palavras
Plataforma: web responsiva mobile-first
Público: crianças e jovens de 8 a 18 anos
Mecânica principal: desafio diário com palavra por tema
Estratégia: retenção diária e crescimento orgânico
Monetização: sem monetização no MVP

O produto é uma experiência de jogo rápida, acessível e visualmente direta, em que o jogador tenta descobrir uma palavra secreta em até 6 tentativas. O objetivo é incentivar o hábito diário, gerar sensação de progresso e manter a interação simples, sem exigir cadastro.

## 2. Problema a ser resolvido

Jogos casuais de palavras têm grande potencial de engajamento, mas muitas experiências falham por causa de:

- regras pouco claras
- onboarding pesado
- baixa recorrência
- frustração por dificuldade excessiva
- ausência de ritual diário
- feedback visual pouco legível

O jogo resolve isso com uma estrutura simples, boas mensagens de retorno, temas diários e ritual de compartilhamento leve.

## 3. Objetivo do produto

### Objetivo principal
- aumentar a recorrência diária e manter streak de jogadas

### Objetivos secundários
- tornar o jogo acessível para crianças e jovens
- ensinar palavras por tema de forma leve e divertida
- criar sensação de progresso sem cadastro
- favorecer compartilhamento orgânico sem expor a solução

## 4. Público-alvo

Público principal: crianças e jovens.

Necessidades:
- entender a regra em segundos
- gastar pouco tempo por rodada
- receber retorno imediato
- sentir progresso
- manter rotina diária sem esforço

## 5. Persona principal

Nome: Ana, 12 anos.

Perfil:
- usa o celular todos os dias
- gosta de desafios rápidos e coloridos
- responde bem a feedback visual
- se interessa por temas e novidades
- gosta de compartilhar pequenas conquistas

## 6. Proposta de valor

- uma partida por dia
- até 6 tentativas
- feedback visual claro por letra
- ritual diário e sequência de jogos
- categorias temáticas por dia
- compartilhamento leve sem revelar a resposta

## 7. Core loop

1. usuário abre a tela inicial
2. visualiza a categoria e o tamanho da palavra
3. tenta adivinhar a palavra
4. recebe feedback por letra
5. ajusta a próxima tentativa
6. acerta ou esgota as tentativas
7. vê o resultado final
8. acessa estatísticas básicas
9. compartilha o resultado sem revelar a solução

## 8. Regras do jogo

- uma palavra por dia por usuário
- a palavra é selecionada automaticamente pela data
- a palavra pertence a uma categoria temática
- o jogador tem até 6 tentativas
- cada palavra tem tamanho fixo
- letras recebem feedback por cor:
  - verde: correta na posição correta
  - amarelo: correta em outra posição
  - cinza: ausente na palavra
- o sistema não revela a resposta antes do fim
- compartilhamento mostra só o resultado final, sem expor a solução

## 9. Estrutura das categorias

Temas incluídos no MVP:
- animais
- comida
- ciência
- esportes

## 10. Funcionalidades do MVP

### 10.1 Tela inicial
- nome do jogo
- botão para iniciar
- explicação curta de como funciona
- indicação do tema do dia

### 10.2 Tela de partida
- categoria do tema
- número de letras
- campo de tentativa
- feedback por tentativa
- botão de envio
- opção de voltar ao início

### 10.3 Feedback visual
- letras com status visuais
- verde, amarelo e cinza bem diferenciados
- destaque claro para facilitar leitura

### 10.4 Tela de resultado
- mensagem de vitória ou derrota
- quantidade de tentativas usadas
- palavra correta revelada ao final
- botão para reiniciar ou aguardar o próximo dia

### 10.5 Estatísticas
- streak atual
- melhor streak
- total de vitórias
- total de partidas
- última palavra resolvida
- percentual de acerto

### 10.6 Compartilhamento
- botão para copiar resultado
- botão para compartilhar em redes sociais
- mensagem sem revelar a solução

## 11. Requisitos funcionais

- O sistema deve gerar uma palavra do dia com base na data.
- O sistema deve associar a palavra a uma categoria.
- O sistema deve validar se a tentativa é uma palavra válida.
- O sistema deve calcular feedback por letra.
- O sistema deve limitar o número de tentativas.
- O sistema deve registrar o resultado da partida.
- O sistema deve manter sequência diária do usuário.
- O sistema deve armazenar histórico básico de jogadas.
- O sistema deve exibir estatísticas simples.
- O sistema deve permitir compartilhamento de resultado.
- O sistema deve funcionar em mobile e desktop responsivos.
- O sistema deve aceitar entrada por teclado e teclado virtual.
- O sistema deve usar palavras adequadas à faixa etária.

## 12. Requisitos não funcionais

- interface clara e de leitura simples
- carregamento rápido
- layout responsivo
- boa legibilidade em telas pequenas
- alta acessibilidade visual
- baixo consumo de dados
- sem cadastro obrigatório
- desempenho consistente em navegadores modernos
- suporte básico para acessibilidade visual

## 13. Regras de negócio

- a palavra do dia é a mesma para todos os usuários daquela data
- a palavra deve estar em um banco de palavras permitidas
- as palavras devem respeitar o tema do dia
- o usuário não pode repetir uma tentativa já feita
- palavras inválidas devem gerar aviso claro
- o sistema deve registrar a partida do dia como concluída ou não
- o sistema deve atualizar o streak quando o usuário joga e volta no dia seguinte
- o sistema deve respeitar um jogo por dia no MVP

## 14. Fluxo principal do usuário

1. abrir o jogo
2. ver categoria e quantidade de letras
3. inserir a primeira tentativa
4. receber feedback
5. ajustar a próxima tentativa
6. repetir até resolver
7. ver o resultado
8. consultar estatísticas
9. compartilhar

## 15. Histórias de usuário

- Como jogador casual, quero entender a regra em poucos segundos para começar sem esforço.
- Como usuário, quero receber feedback visual por letra para saber como me aproximo da solução.
- Como jogador, quero continuar meu streak diário para manter a rotina.
- Como usuário, quero compartilhar um resultado sem expor a solução.
- Como jogador jovem, quero ter uma interface simples, divertida e clara em celular.

## 16. Painel de agentes especialistas

Para desenvolver o produto, o trabalho será coordenado por:

- UX Designer: foco em clareza, fluxo, retenção diária e facilidade de uso.
- Especialista em Acessibilidade Web: foco em contraste, foco de teclado, leitura e navegação sem dependência de cor.
- Especialista em Design Visual: foco em identidade visual, paleta e consistência do sistema de feedback.

## 17. Critérios de sucesso do MVP

- o jogo funciona em mobile e desktop sem instruções longas
- o jogador entende regras em menos de 10 segundos
- o fluxo da partida é coerente e sem erro de navegação
- as estatísticas e streak são registradas corretamente
- a experiência é acessível para pessoas com baixa visão ou dificuldade visual
- a sensação de progresso incentiva retorno no próximo dia

## 18. Protótipos a serem avaliados

Serão criados três mockups diferentes e comparados por:

- clareza da regra
- legibilidade
- feedback visual
- sensação de diversão
- adequação ao público alvo
- adequação ao uso em mobile

O conceito escolhido será usado como base para a implementação final do jogo.
