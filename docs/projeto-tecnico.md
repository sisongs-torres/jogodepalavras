# Documento de Projeto Técnico

## 1. Objetivo

Implementar uma versão web responsiva do jogo casual de adivinhação de palavras, seguindo o PRD e o protótipo selecionado. A solução deve funcionar em navegadores modernos, priorizar mobile-first e manter a lógica de jogo diária sem depender de backend.

## 2. Escopo

### MVP
- tela inicial com apresentação do jogo e tema do dia
- tela de partida com categoria, tamanho da palavra e palpite
- lógica de validação da tentativa
- feedback por letra (verde, amarelo, cinza)
- limite de 6 tentativas
- tela de resultado com mensagem final
- estatísticas básicas em localStorage
- compartilhamento de resultado por botão de cópia ou Web Share API
- suporte a teclado físico e teclado virtual

## 3. Arquitetura

### Estrutura de arquivos

- `index.html`: estrutura principal da aplicação
- `styles.css`: estilos responsivos e design visual
- `script.js`: lógica do jogo, dados e armazenamento local
- `mockups/index.html`: protótipos em navegador
- `docs/plans/`: PRD e planos do projeto

### Modelo de execução

A aplicação será um SPA estática em HTML, CSS e JavaScript. A lógica será executada no navegador do cliente, sem servidor de aplicação, o que reduz custo e acelera o desenvolvimento do MVP.

## 4. Regras de negócio e lógica do jogo

### Word of the day
- A palavra do dia é definida a partir da data atual do usuário.
- A categoria também varia pela data.
- A seleção é determinística e idempotente para uma mesma data.

### Tentativas
- O jogador pode fazer até 6 tentativas.
- Cada tentativa deve ter o mesmo tamanho da palavra diária.
- Tentativas duplicadas geram aviso.
- Palavras fora do banco permitido geram mensagem de validação.

### Feedback
Cada letra recebe um estado:
- `correct`: na posição correta
- `present`: letra existe, mas está em outra posição
- `absent`: não está na palavra

A lógica deve tratar letras repetidas de forma consistente, priorizando a posição correta e evitando marcações contraditórias.

## 5. Dados e persistência

### Banco de palavras
Um conjunto estático de palavras por categoria será mantido em JavaScript.

Categorias do MVP:
- animais
- comida
- ciência
- esportes

### Armazenamento local
Use `localStorage` para armazenar:
- streak atual
- melhor streak
- total de partidas
- vitórias
- última palavra resolvida
- última data jogada
- estado da partida atual

Esses dados permitem manter progresso sem cadastro e sem backend.

## 6. Acessibilidade

- contraste mínimo de cores adequado
- botões com área de toque mínima de 44x44px
- suporte a teclado com foco visível
- `aria-live` para mensagens de status e validação
- `prefers-reduced-motion` para reduzir animações
- uso de texto e ícones em conjunto para feedback, evitando dependência exclusiva de cor

## 7. UX e design visual

O protótipo escolhido é o conceito de “Jardim das Palavras”, por ser acolhedor, legível e muito adequado ao público jovem, com feedback visual claro e pouca curva de aprendizado.

### Paleta
- verde escuro: profundidade e calmaria
- verde claro/lima: destaque e energia
- coral: atenção em erros ou ações secundárias
- amarelo: pistas visuais e avisos suaves
- creme: fundo principal para leitura confortável

### Componentes
- cards de categorias
- grade de letras
- teclado virtual
- painel de estatísticas
- botão principal destacado
- variações de estado em cores consistentes

## 8. Implementação em JavaScript

### Estruturas principais
- `getDailyChallenge()`: retorna a palavra do dia e categoria
- `validateGuess()`: verifica tamanho, repetição e palavra válida
- `evaluateGuess()`: calcula os estados das letras
- `renderBoard()`: atualiza as tentativas na interface
- `updateStats()`: salva estatísticas
- `shareResult()`: copia o resultado ou usa a API de compartilhamento

### Fluxos principais
- entrada na aplicação
- início da partida
- tentativas sucessivas
- vitória/derrota
- retorno à tela inicial

## 9. Testes e validação

### Validação funcional
- palavra do dia consistente pela data
- categoria correta para o dia
- feedback por letra calculado corretamente
- tentativas inválidas bloqueadas
- vitória e derrota finais registradas
- streak atualizado corretamente

### Validação UX
- interface clara em mobile
- tempo até primeira ação inferior a 10 segundos
- mensagem de regras legível
- ações grandes e acessíveis

### Validação de acessibilidade
- contraste aceitável
- foco visível em todos os elementos interativos
- suporte a leitores de tela com texto verbal e aria-live

## 10. Riscos e mitigação

### Risco: excesso de complexidade visual
Mitigação: manter o layout em uma única coluna em mobile e priorizar legibilidade.

### Risco: dependência da cor
Mitigação: usar texto e ícones para indicar status.

### Risco: perda de progresso
Mitigação: persistir estado e estatísticas em `localStorage`.

### Risco: regras pouco claras
Mitigação: explicar a mecânica em tela inicial e manter a linguagem breve.

## 11. Próximos passos

1. validar protótipo em browser
2. implementar a versão final
3. testar requisitos e acessibilidade
4. revisar código
5. preparar documentação de deploy e uso
