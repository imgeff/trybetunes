
# Boas vindas ao repositório do projeto TrybeTunes

---

# Habilidades

Neste projeto, foi verificado a capacidade de:

* Fazer requisições e consumir dados vindos de uma `API`;

* Utilizar os ciclos de vida de um componente React;

* Utilizar a função `setState` de forma a garantir que um determinado código só é executado após o estado ser atualizado
  
* Utilizar o componente `BrowserRouter` corretamente;

* Criar rotas, mapeando o caminho da URL com o componente correspondente, via `Route`;

* Utilizar o `Switch` do `React Router`

* Usar o componente `Redirect` pra redirecionar para uma rota específica;

* Criar links de navegação na aplicação com o componente `Link`;

---

## O que foi desenvolvido

Neste projeto foi criado uma aplicação capaz de reproduzir músicas das mais variadas bandas e artistas, criar uma lista de músicas favoritas e editar o perfil da pessoa usuária logada. Essa aplicação é capaz de:

* Fazer login;
* Pesquisar por uma banda ou artista;
* Listar os álbuns disponíveis dessa banda ou artista;
* Visualizar as músicas de um álbum selecionado;
* Reproduzir uma prévia das músicas deste álbum;
* Favoritar e desfavoritar músicas;
* Ver a lista de músicas favoritas;
* Ver o perfil da pessoa logada;
* Editar o perfil da pessoa logada;

## Desenvolvimento

## Como instalar localmente

1. Clone o repositório

* `git clone git@github.com:imgeff/trybetunes.git`.
* Entre na pasta do repositório que você acabou de clonar:
  * `cd trybetunes`

2. Instale as dependências e inicialize o projeto

* Instale as dependências:
  * `npm install`
* Inicialize o projeto:
  * `npm start` (uma nova página deve abrir no seu navegador com um texto simples)

## Para contribuir

3. Crie uma branch a partir da branch `main`

* Verifique que você está na branch `main`
  * Exemplo: `git branch`
* Se não estiver, mude para a branch `main`
  * Exemplo: `git checkout main`
* Agora, crie uma branch onde você vai guardar os commits do seu projeto
  * Exemplo: `git checkout -b nome-da-sua-branch`

---

## ESLint e Stylelint

Para garantir a qualidade do código, foi utilizado neste projeto os linters `ESLint` e `Stylelint`.
Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível e de fácil manutenção! Para rodá-los localmente no projeto, execute os comandos abaixo:

```bash
npm run lint
npm run lint:styles
```
