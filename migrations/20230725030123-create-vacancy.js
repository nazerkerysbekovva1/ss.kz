'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vacancies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      salary_from: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      salary_to: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      salary_type: {
        allowNull: false,
        type: Sequelize.STRING,      
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      skills: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      about_company: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      cityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',
          key: 'id',
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      companyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies',
          key: 'id',
        }
      },
      specializationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Specializations',
          key: 'id',
        }
      },
      experienceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Experiences',
          key: 'id',
        }
      },
      emloyementTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'EmploymentTypes',
          key: 'id',
        }
      },createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vacancies');
  }
};
