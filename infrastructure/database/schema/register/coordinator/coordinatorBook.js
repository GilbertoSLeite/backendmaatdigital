module.exports = (sequelize, Sequelize) => {
  const Countries = sequelize.define('paises', {
    name: Sequelize.STRING,
  });
  const CoordinatorBook = sequelize.define('coordenadores', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    data_cadastro: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      comment: 'A Data do Cadastro do coordenador no banco de dados.',
    },
    primeiro_nome_pessoa: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'Coluna com a definição do Nome da Pessoa que será cadastrado no sistema.',
    },
    segundo_nome_pessoa: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'Coluna com a definição do Segundo Nome da Pessoa que será cadastrado no sistema.',
    },
    ultimo_nome_pessoa: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'Coluna com a definição do Último Nome da Pessoa que será cadastrado no sistema.',
    },
    pais_coordenador_id: {
      type: Sequelize.BIGINT,
      references: {
        model: Countries,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
      comment: 'A vinculação com a tabela de País.',
    },
    numero_cpf: {
      type: Sequelize.STRING(11),
      allowNull: true,
      unique: false,
    },
    sexo_pessoas: {
      type: Sequelize.STRING(1),
      allowNull: false,
      comment: 'Sexo da Pessoa (F - Feminido | M - Masculino | O - Outros).',
    },
    raca_pessoas: {
      type: Sequelize.STRING(1),
      allowNull: false,
      comment: 'Raça da Pessoa (P - Preto | B - Branco | D - Pardo | I - Indígena | A - Amarelo | S - Sem Informação).',
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
  return CoordinatorBook;
};
