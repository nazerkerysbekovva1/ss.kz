'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('EmploymentTypes', [
      { name: 'Полная занятость' },
      { name: 'Частичная занятость' },
      { name: 'Проектная работа' },
      { name: 'Волонтерства' },
      { name: 'Стажировка' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('EmploymentTypes', null, {});
  }
};