user_Validation
Sobre o Projeto

Este projeto é uma aplicação CRUD que permite criar, ler, atualizar e deletar dados de usuários. É construída usando Next.js para o frontend e backend, com Prisma para o ORM e TypeScript para maior segurança de tipos. O propósito deste projeto é fornecer uma base sólida para aplicações web usando tecnologias modernas.
Tecnologias Utilizadas

    Next.js - Framework React para desenvolvimento web
    React - Biblioteca para construção de interfaces de usuário
    Prisma - ORM para interagir com o banco de dados
    TypeScript - Superset de JavaScript para segurança de tipos
    MySQL (PHPMyAdmin) - Banco de dados


Para configurar e executar o projeto localmente, siga os passos abaixo:
Clone o repositório

 
    git clone https://github.com/PedroSol4ira/user_Validation.git
    cd user_Validation

Instale as dependências:


    npm install
        

Configure as variáveis de ambiente. Criando um arquivo .env na raiz do projeto com os valores necessários:

    DATABASE_URL=SuaURLdoBancoDeDados

Configure o Prisma e gere os arquivos necessários para o banco de dados:

    $ npx prisma migrate dev --name init

Inicie o servidor de desenvolvimento:

    npm run dev

  O projeto estará disponível em http://localhost:3000.

Uso do Projeto

Depois de seguir os passos acima, você verá uma tela de cadastro de usuário com os seguintes campos:

    Nome: Armazena o nome do usuário.
    Email: Armazena o email do usuário. Este campo é único, então não permite dois emails iguais.
    Senha: Armazena a senha do usuário.
    Confirmação de senha: Valida que a senha coincide. Caso contrário, um toast de erro será exibido.

Após preencher corretamente todos os campos e clicar em "Criar Conta", o usuário será registrado no banco de dados.

Logo abaixo, há um botão azul chamado "Gerenciamento de Contas" que redireciona para uma página onde:

    Uma tabela exibe todos os usuários cadastrados (exceto as senhas).
    É possível editar ou excluir cada usuário.
    A tabela exibe também a data de criação do usuário.

Licença

Este projeto está licenciado sob a MIT License.
