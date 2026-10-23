# Rebranding OMAI

Atualização de identidade aplicada sobre o código existente do site Digital Foundation, recuperado do projeto Sites `appgprj_6a5d98af4e008191a9a736c110b0c9eb`. Base: commit `930fc94f0540e17d2878a8b8d7bfddb56d112d29`.

## Arquivos alterados

| Arquivo | Alteração |
| --- | --- |
| `app/globals.css` | Paleta, tokens de destaque, superfícies, gradientes, brilhos, bordas, sombras, foco e matiz das imagens existentes. O texto CSS “DF” do celular demonstrativo passou a “OMAI”. |
| `app/layout.tsx` | Título, descrição, palavras-chave, autoria, nome da aplicação, Open Graph, Twitter, alt da imagem de compartilhamento e cor do navegador. |
| `app/page.tsx` | Nome da empresa no hero, depoimento existente e descrição acessível do carrossel. |
| `app/servicos/page.tsx` | Nome da empresa na apresentação. |
| `app/contato/page.tsx` | Nome da empresa no botão de contato. |
| `app/briefing/page.tsx` | Marca na descrição SEO. |
| `app/briefing/BriefingForm.tsx` | Marca em perguntas, consentimento, cabeçalho do PDF, resumo, assunto do e-mail e mensagens. |
| `components/SiteChrome.tsx` | Marca textual e nome acessível do cabeçalho. |
| `components/PagePieces.tsx` | Marca no CTA final compartilhado. |
| `components/site-data.ts` | Marca na mensagem pronta do WhatsApp; número e destino preservados. |
| `public/site.webmanifest` | Nome da aplicação e cores de fundo/tema. |
| `public/favicon.svg` | Nome acessível e cores; desenho original preservado. |
| `public/apple-touch-icon.svg` | Nome acessível e cores; desenho original preservado. |
| `README.md` | Nome da empresa e exemplo da mensagem pronta. |
| `serve-static.mjs` | Nome exibido no log do preview local. |

Este relatório é um arquivo adicional de documentação, sem criar uma página no site.

## Paleta aplicada

- Preto estrutural: `#0B0B0D`.
- Superfícies e profundidade: `#141417`, `#18181C`, `#242429`.
- Amarelo principal: `#F5C518`; variações `#D9A900` e `#FFE08A`.
- Azul secundário: `#3B82F6`, em detalhes gráficos selecionados.
- Texto claro: `#F5F5F7`; texto secundário: `#BDBDC7`.

As cores de destaque estão centralizadas nos tokens `--accent`, `--accent-strong`, `--accent-soft` e `--accent-rgb`, integrados aos tokens existentes. As imagens originais recebem somente ajuste de matiz em CSS; os arquivos PNG não foram recriados.

## Preservação do site

Continuam existindo as mesmas oito páginas: `/`, `/por-que-ter-um-site`, `/servicos`, `/projetos`, `/como-funciona`, `/briefing`, `/duvidas` e `/contato`.

A comparação da árvore CSS conferiu 5.318 seletores, declarações e regras originais: os valores não cromáticos foram preservados. Permanecem iguais dimensões, espaçamentos, fontes, tamanhos, breakpoints, keyframes, transformações, transições e suas durações. As adições de CSS se limitam a tokens de cor, cor dos contornos de foco e ajuste de matiz.

Nos nove arquivos TS/TSX alterados, a comparação com a base confirmou exclusivamente trocas de marca e da cor do tema. JSX, componentes, eventos, lógica, integrações e identificadores permanecem iguais.

Foram preservados `package.json`, `package-lock.json`, configuração Next.js/TypeScript, manifesto de hospedagem, domínios, e-mails, endpoints, caminhos dos assets, chave de rascunho local, robots e sitemap. Nenhuma dependência foi adicionada ou atualizada. Não havia rodapé ou copyright no código original; nenhum foi criado.

## Verificações realizadas

- Instalação das dependências existentes com `npm ci`, mantendo o lockfile.
- Build original e build final de produção do Next.js, incluindo verificação de tipos e exportação das oito páginas.
- `git diff --check` e comparação estrutural do CSS e dos arquivos TS/TSX.
- Navegador: oito páginas em desktop de 1.440 px e celular de 390 px; conferência adicional da home em tablet de 768 px.
- Nenhuma imagem quebrada ou referência textual à marca antiga encontrada nas páginas renderizadas. Nomes técnicos em URLs e caminhos foram preservados.
- Menu mobile abriu com oito links e fechou depois da navegação. FAQ abriu a resposta. O briefing trocou de etapa e destacou a seleção. O foco de teclado do formulário foi conferido.
- CTAs principais com texto preto e fundo amarelo; estados hover/active/disabled e respectivas durações foram revisados no CSS, preservando os comportamentos existentes.
- Contraste calculado das cores-base: preto/amarelo **12,06:1**; texto secundário/grafite elevado **8,29:1**; texto claro/grafite **16,26:1**. Esses valores se referem às cores sólidas, não a todos os pontos dos gradientes.
- Nenhum erro ou aviso foi registrado no console do navegador durante a revisão.

Não foi feito envio real do formulário por e-mail ou de mensagens pelo WhatsApp. A lógica de envio e a geração do PDF permaneceram intactas, com somente a marca textual substituída. O projeto não possui script de testes automatizados.

## Pendências e problemas preexistentes

- A pendência do monograma DF foi resolvida em 23/10/2026 com a logo enviada pelo proprietário em PNG. O arquivo foi incorporado sem redesenho ao asset SVG `public/assets/omai-logo.svg`, com ajuste de contraste para o fundo escuro. Cabeçalho, favicon e ícone de instalação usam a arte OMAI. Não foi anexado um PDF nesta atualização.
- O endereço com a marca passa a ser `https://omai-agencia.vercel.app`. O domínio curto `omai.vercel.app` está atribuído a outro projeto. Os endereços antigos continuam funcionando no mesmo projeto Vercel e no mesmo repositório GitHub. URL canônica, Open Graph, robots e sitemap foram atualizados para o endereço OMAI.
- Na home original em 1.440 px, o hero já começava em **x = -84 px**, com largura de documento de **1.520 px**, causando corte à esquerda e overflow. No tablet de 768 px, a largura original também já chegava a **774 px**. A comparação antes/depois confirmou esses problemas, que não foram corrigidos por estarem fora do escopo.
- A instalação apontou **sete vulnerabilidades preexistentes: seis altas e uma crítica**. Nenhuma atualização de dependências foi feita, conforme o briefing.

As permissões de acesso do projeto foram preservadas. A adição do endereço OMAI e a troca do logo foram solicitadas pelo proprietário depois do rebranding inicial.
