# Mês Omnistack

Este repositório contém os códigos utilizados durante o treinamento de Node.js, ReactJS e React Native dado por mim para os alunos da Universidade Federal de Santa Catarina.

O objetivo do treinamento é apresentar aos estudantes esta stack através de uma aplicação completa, utilizando ferramentas modernas e boas práticas de programação.

## A Plataforma

A plataforma construída é chamada **EJEC Quiz**, e consiste em uma ferramenta simples de criação de quizzes, onde um usuário pode criar salas de perguntas e convidar pessoas para respondê-las. A plataforma consiste de três aplicações:

* Uma API Rest construída em [Node.js](https://nodejs.org/en/), onde é possível criar, editar, excluir e visualizar salas de perguntas. A API é construída utilizando a arquitetura MVC (sem as *views*), possui rotas de controle de salas e para a adição de novas respostas à uma sala existente, e se conecta à um banco de dados não-relacional.
* Uma aplicação web construída com [ReactJS](https://pt-br.reactjs.org/), onde um administrador cria, edita, exclui e visualiza salas de perguntas através de uma *dashboard* estilizada com [Bootstrap](https://getbootstrap.com/). Além das operações de *dashboard*, a aplicação gera QRCodes para compartilhamento das salas, possibilitando que um convidado responda as perguntas.
* Uma aplicação móvel construída em [React Native](https://reactnative.dev/), onde um usuário pode ler o link de um QRCode para ser redirecionado a uma sala com perguntas. Ele então as preenche e as responde.

## Bibliotecas Utilizadas

Para o desenvolvimento das aplicações, diversas bibliotecas adicionais foram utilizadas:

### API

* Express: Para a criação rápida de um servidor Node;
* CORS: Biblioteca que cuida dos protocolos de controle de acesso;
* Dotenv: Biblioteca que permite a leitura e configuração de variáveis de ambiente;
* Mongoose: Biblioteca que lida com a conexão ao banco de dados não-relacional [MongoDB](https://cloud.mongodb.com/).

### Sistema Web

* Font Awesome: Biblioteca com diversos ícones SVG prontos para uso;
* Bootstrap: Biblioteca com temas e funcionalidades CSS e JS pré-configurados;
* Axios: Biblioteca usada para comunicação HTTP entre cliente e servidor;
* QRCode React: Biblioteca usada para gerar códigos QR.

### Aplicação Móvel:

* Expo: Plataforma para a criação de aplicativos em React Native. Dispõe de diversas funcionalidades que auxiliam no desenvolvimento, emulação e *build* do aplicativo.
* Axios: Biblioteca usada para comunicação HTTP entre cliente e servidor;
* Expo BarCode Scanner: Biblioteca do Expo para leitura de códigos de barra. Utilizada na leitura de códigos QR;
* React Navigation: Biblioteca para realizar o roteamento das páginas da aplicação;