# BlackGold Ecosystem

Portal institucional, editorial e comercial do ecossistema BlackGold.

## O portal nao e uma pagina de links

Ele tem quatro responsabilidades:

1. destacar o ativo comercial do momento;
2. publicar novidades e marcos do portfólio;
3. apresentar produtos, apps e publicações;
4. abrir o Ecossistema oficial, onde o usuario escolhe o destino.

## Conteudo inicial

- Destaque: BlackGold Course Translator
- Publicado: SEU SERVIÇO TEM PREÇO
- Próximo lançamento: Orçamento no Ponto
- Ativo existente: AppEvidex
- Pipeline preparado para o próximo ativo BlackGold

## Atualização sem editar HTML

Adicionar novidade:

powershell -ExecutionPolicy Bypass -File ".\08_SCRIPTS\Add-BlackGoldNews.ps1"

Trocar ativo em destaque:

powershell -ExecutionPolicy Bypass -File ".\08_SCRIPTS\Set-BlackGoldFeatured.ps1"

Adicionar novo ativo:

powershell -ExecutionPolicy Bypass -File ".\08_SCRIPTS\Add-BlackGoldAsset.ps1"

## Site público previsto

https://projetoscosanostra.github.io/blackgold-ecosystem/

## Contato

projetoscosanostra@gmail.com
## GitHub Pages

O site publico e publicado a partir de /docs, porque GitHub Pages aceita / ou /docs como source em branch deployment.

Os scripts de conteudo atualizam docs/data/content.json.