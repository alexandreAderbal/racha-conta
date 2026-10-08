module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@Rotas': './src/apresentacao/rotas',
            '@Store': './src/store',
            '@Theme': './src/core/theme',
            '@Paginas': './src/apresentacao/paginas',
            '@Hooks': './src/apresentacao/hooks',
            '@Componentes': './src/apresentacao/componentes',
            '@Providers': './src/apresentacao/providers',
            '@Constant': './src/core/constants',
            '@Mocks': './src/core/mocks',
            '@Infra-data-base': './src/infraestrutura/database',
            '@@Infra-repositorio': './src/infraestrutura/repositorio',
            '@Infra-service': './src/infraestrutura/service',
            '@Infra-modelo': './src/infraestrutura/modelo',
            '@Infra-dto': './src/infraestrutura/dto',
          }
        }
      ]
    ]
  };
};
