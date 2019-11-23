const Hapi = require('@hapi/hapi');

const data = [
    {
        id: 1,
        title: 'Novo post',
        content: 'Olá amigos, nosso primeiro post'
    },
    {
        id: 2,
        title: 'Outro post',
        content: 'Olá amigos, estamos à todo vapor produzindo conteúdo por aqui :)'
    }
];

const init = async () => {
    const server = Hapi.server({
        port:8000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return 'Hello hapi';
        }
    });

    server.route({
        method: 'GET',
        path: '/posts',
        handler: async (request, h) => {
            return data;
        }
    });

    server.route({
        method: 'GET',
        path: '/posts/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            const post = data.find(post => post.id === +id); 
   
            return post || {};
        }
    });

    await server.start();
    console.log('Server runnig on %s', server.info.url);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();