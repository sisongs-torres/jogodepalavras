# Requisitos de acessibilidade — PRD do jogo de palavras

## Escopo e premissas

Este documento acrescenta requisitos de acessibilidade ao PRD do jogo casual mobile-first, voltado a crianças e jovens. O repositório não contém o PRD original nem os três mockups; portanto, as recomendações abaixo usam como referência três fluxos comuns de um jogo de palavras: (1) início e escolha de partida, (2) tela de jogo, (3) resultado e progressão. Validar os nomes e os componentes com os protótipos reais antes de fechar o escopo.

A meta é conformidade WCAG 2.2 nível AA, com decisões de interação apropriadas para toque e teclado. A acessibilidade deve ser testada com usuários e tecnologias assistivas, não apenas por ferramentas automáticas.

## Requisitos transversais e critérios de aceite

### Contraste, cor e apresentação
- Texto normal deve ter contraste mínimo de 4,5:1; texto grande (pelo menos 24 CSS px, ou 18,66 CSS px em negrito) deve ter 3:1. Componentes de interface, limites necessários para identificar controles e indicadores visuais de estado devem ter 3:1 em relação às cores adjacentes.
- Não comunicar estado, categoria, acerto ou erro somente por cor. Combinar cor com texto, ícone ou forma distinguível.
- Disponibilizar estados legíveis para foco, seleção, acerto, erro, desabilitado e carregamento, inclusive em temas de alto contraste do sistema. Não remover o contorno de foco sem substituto de contraste equivalente.
- Permitir ampliação de texto até 200% e zoom/reflow até 400% sem perda de conteúdo ou funcionalidade, rolagem horizontal da página para o conteúdo comum ou sobreposição de controles. Respeitar orientação retrato e paisagem, salvo se uma orientação for essencial e justificada.

### Foco, teclado e entrada
- Toda ação deve ser operável por teclado, sem armadilhas, e por leitor de tela. Suportar Tab/Shift+Tab para navegação, Enter/Espaço para ativar controles e Escape para fechar diálogos quando aplicável. Letras do jogo não podem depender exclusivamente de pressionar teclas; oferecer controles equivalentes na tela.
- A ordem de foco deve acompanhar a ordem visual e lógica. O foco deve ser sempre visível, não encoberto por cabeçalhos, teclados virtuais, banners ou modais; ao abrir e fechar diálogo, mover e devolver o foco de modo previsível.
- No toque, usar alvos de pelo menos 44 × 44 CSS px como padrão recomendado para o público e o contexto mobile; manter espaçamento entre controles e evitar ações que dependam de gestos complexos. Gestos devem ter alternativa simples de toque.
- Não exigir arrastar, sacudir ou movimentos precisos para ações essenciais. Permitir desfazer ou confirmar ações potencialmente destrutivas.

### Leitura, conteúdo e tempo
- Usar frases curtas, instruções concretas e vocabulário adequado à faixa etária. Explicar ícones, regras, abreviações e termos do jogo; manter rótulos e instruções consistentes entre telas.
- Usar títulos e regiões semânticas em hierarquia lógica; evitar texto incorporado apenas em imagens. Fornecer idioma da página e marcar corretamente mudanças de idioma.
- Não depender de limite de tempo para concluir ações essenciais. Se houver cronômetro, oferecer modo sem tempo ou ajustável, avisos compreensíveis e opção para pausar; não encerrar partida sem aviso e oportunidade de continuar.
- Respeitar `prefers-reduced-motion`; evitar flashes (nunca mais de três por segundo), movimento decorativo persistente e animações que impeçam a leitura. Oferecer controle para reduzir/desativar animações e sons. Não iniciar áudio automaticamente.

### Leitores de tela e feedback
- Implementar com HTML semântico e controles nativos sempre que possível. Todo controle deve ter nome acessível, função, estado e valor compreensíveis; elementos decorativos devem ser ignorados pela tecnologia assistiva.
- Garantir leitura e operação com VoiceOver (iOS), TalkBack (Android) e ao menos NVDA (Windows). A ordem de leitura deve corresponder à ordem do fluxo visual.
- Anunciar mudanças importantes de forma concisa (por exemplo, palavra aceita, tentativa inválida, tempo pausado, pontuação atualizada) usando regiões vivas apropriadas; não anunciar cada tecla ou atualização visual repetidamente. Erros devem indicar o problema e como corrigi-lo, sem depender apenas de áudio, cor ou vibração.
- Fornecer feedback redundante visual e textual; áudio e vibração são complementares, opcionais e controláveis. Evitar sons repentinos ou punitivos.

### Compatibilidade e validação
- Oferecer suporte às duas versões estáveis mais recentes de Chrome e Edge (Windows/Android), Firefox (desktop) e Safari (macOS/iOS), incluindo Safari iOS e Chrome Android em dispositivos reais. Não bloquear acesso por navegador apenas por causa de recursos não essenciais.
- Usar HTML/CSS/JavaScript padrão e melhorias progressivas; assegurar que controles, texto, foco e fluxo principal continuem utilizáveis sem animações ou efeitos visuais. Tratar teclado virtual móvel sem ocultar o campo ativo nem ações principais.
- Aceite: validar contraste por ferramenta e inspeção; testar teclado apenas; zoom/reflow; orientação; preferência por movimento reduzido/alto contraste; e combinações de leitores de tela/dispositivos acima. Registrar problemas e bloquear lançamento se qualquer fluxo essencial não puder ser concluído.

## Recomendações por protótipo

### Protótipo 1 — início, navegação e escolha de partida
- Dar nomes explícitos aos botões (por exemplo, “Começar uma partida”, “Como jogar”, “Configurações”); não usar apenas ícones ou rótulos vagos como “Jogar” quando a ação puder ser mais específica.
- Organizar a página em título, instrução breve e ações principais. Colocar iniciar partida em posição previsível, com alvos amplos e espaçados; manter configurações e ajuda acessíveis sem competir visualmente com a ação principal.
- Se houver seleção de tema, dificuldade ou perfil, usar controles com rótulos e estado selecionado anunciável. Apresentar a seleção atual também por texto/ícone, não apenas por cor.
- Explicar as regras em passos curtos, com opção de rever ajuda durante a partida. Incluir configurações para reduzir movimento, silenciar sons, ajustar tamanho de texto/contraste e escolher modo sem cronômetro.
- Em diálogo de ajuda ou configurações, anunciar o título, conter o foco enquanto aberto e devolvê-lo ao acionador ao fechar; permitir fechar por botão claramente rotulado e Escape.

### Protótipo 2 — partida e interação com palavras
- Garantir que letras, tabuleiro, dicas e controles sejam lidos em ordem útil. Identificar cada letra/célula e seu estado (disponível, escolhida, correta/incorreta) sem despejar atualizações redundantes. Oferecer uma forma textual equivalente de consultar o tabuleiro/estado da palavra.
- Fornecer entrada por teclado, controles táteis acessíveis e alternativa para quem não consegue arrastar ou fazer gestos. Manter o foco visível durante seleção de letras; fornecer ação clara de apagar/desfazer, limpar, confirmar e pedir dica, quando existirem.
- Dar instruções claras de como formar e enviar uma palavra. Comunicar erros junto ao campo/ação com texto que explique a correção; não apagar a resposta automaticamente após erro.
- Atualizar pontuação, tentativas e tempo com rótulos acessíveis. Anunciar apenas alterações importantes; permitir pausar cronômetro e jogo, bem como jogar sem tempo. O cronômetro não deve ser a única indicação de urgência.
- Manter botões essenciais fora da área encoberta pelo teclado virtual e permitir rolagem até o foco. Restringir animações de acerto/erro a efeitos breves, não piscantes e compatíveis com redução de movimento.

### Protótipo 3 — resultado, próxima ação e progressão
- Apresentar o resultado como texto explícito (por exemplo, “Partida concluída”, pontuação, palavras encontradas e tempo), sem depender de confete, medalhas visuais ou cor. Descrever medalhas/ícones de progresso com nomes acessíveis.
- Anunciar uma única vez a conclusão e o resultado principal para leitores de tela; não anunciar animações, contadores incrementais ou cada item da tela como alertas.
- Oferecer ações claramente rotuladas e em ordem: “Jogar novamente”, “Próxima fase” (quando disponível) e “Voltar ao início”. Indicar se uma ação está indisponível e por quê. Manter o foco no contexto adequado após a transição.
- Permitir revisar palavras/erros e consultar ajuda sem penalidade. Se houver compartilhamento, ranking ou progresso salvo, explicar em linguagem simples o que será enviado/salvo e pedir ação explícita.
- Respeitar redução de movimento e oferecer alternativa textual às animações de celebração. Nenhum resultado ou recompensa deve ser comunicado apenas por som, cor ou movimento.

## Fora do escopo visual, mas necessário para aceite

Incluir pelo menos uma rodada de teste de usabilidade com crianças/jovens com deficiência e responsáveis, com consentimento e proteção de dados adequados à idade. Testar tarefas completas nos três protótipos com diferentes combinações de leitor de tela, teclado, toque e ampliação; registrar barreiras e retestar após correções.
