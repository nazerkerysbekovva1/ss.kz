'use strict';

const Country = require('../app/region/Country')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('asd');
    // const countries = await queryInterface.sequelize.query('SELECT id FROM Countries;');
    const countries = await Country.findAll();
    // const countryRows = countries[0];
    const countryRows = countries;

    const citiesData = [
      // Города России
      { name: 'Москва', countryId: countryRows[0].id },
      { name: 'Санкт-Петербург', countryId: countryRows[0].id },
      { name: 'Новосибирск', countryId: countryRows[0].id },
      { name: 'Екатеринбург', countryId: countryRows[0].id },
      { name: 'Казань', countryId: countryRows[0].id },
      { name: 'Нижний Новгород', countryId: countryRows[0].id },
      { name: 'Челябинск', countryId: countryRows[0].id },
      
      // Города Украины
      { name: 'Киев', countryId: countryRows[1].id },
      { name: 'Харьков', countryId: countryRows[1].id },
      { name: 'Одесса', countryId: countryRows[1].id },
      { name: 'Днепр', countryId: countryRows[1].id },
      { name: 'Запорожье', countryId: countryRows[1].id },
      { name: 'Львов', countryId: countryRows[1].id },
      { name: 'Кривой Рог', countryId: countryRows[1].id },
      
      // Города Беларуси
      { name: 'Минск', countryId: countryRows[2].id },
      { name: 'Гомель', countryId: countryRows[2].id },
      { name: 'Могилев', countryId: countryRows[2].id },
      { name: 'Витебск', countryId: countryRows[2].id },
      { name: 'Гродно', countryId: countryRows[2].id },
      { name: 'Брест', countryId: countryRows[2].id },
      { name: 'Пинск', countryId: countryRows[2].id },
      
      // Города Казахстана
      { name: 'Нур-Султан', countryId: countryRows[3].id },
      { name: 'Алматы', countryId: countryRows[3].id },
      { name: 'Шымкент', countryId: countryRows[3].id },
      { name: 'Караганда', countryId: countryRows[3].id },
      { name: 'Актобе', countryId: countryRows[3].id },
      { name: 'Семей', countryId: countryRows[3].id },
      { name: 'Усть-Каменогорск', countryId: countryRows[3].id },
      
      // Города Армении
      { name: 'Ереван', countryId: countryRows[4].id },
      { name: 'Гюмри', countryId: countryRows[4].id },
      { name: 'Ванадзор', countryId: countryRows[4].id },
      { name: 'Ханты-Мансийск', countryId: countryRows[4].id },
      { name: 'Абакан', countryId: countryRows[4].id },
      { name: 'Сочи', countryId: countryRows[4].id },
      { name: 'Краснодар', countryId: countryRows[4].id },
      
      // Города Азербайджана
      { name: 'Баку', countryId: countryRows[5].id },
      { name: 'Гянджа', countryId: countryRows[5].id },
      { name: 'Сумгаит', countryId: countryRows[5].id },
      { name: 'Мингечевир', countryId: countryRows[5].id },
      { name: 'Шеки', countryId: countryRows[5].id },
      { name: 'Барда', countryId: countryRows[5].id },
      { name: 'Габала', countryId: countryRows[5].id },
      
      // Города Грузии
      { name: 'Тбилиси', countryId: countryRows[6].id },
      { name: 'Кутаиси', countryId: countryRows[6].id },
      { name: 'Батуми', countryId: countryRows[6].id },
      { name: 'Сухуми', countryId: countryRows[6].id },
      { name: 'Зугдиди', countryId: countryRows[6].id },
      { name: 'Гори', countryId: countryRows[6].id },
      { name: 'Рустави', countryId: countryRows[6].id },
      
      // Города Молдовы
      { name: 'Кишинев', countryId: countryRows[7].id },
      { name: 'Тирасполь', countryId: countryRows[7].id },
      { name: 'Бельцы', countryId: countryRows[7].id },
      { name: 'Бендеры', countryId: countryRows[7].id },
      { name: 'Рыбница', countryId: countryRows[7].id },
      { name: 'Кагул', countryId: countryRows[7].id },
      { name: 'Оргеев', countryId: countryRows[7].id },
      
      // Города Таджикистана
      { name: 'Душанбе', countryId: countryRows[8].id },
      { name: 'Худжанд', countryId: countryRows[8].id },
      { name: 'Куляб', countryId: countryRows[8].id },
      { name: 'Курган-Тюбе', countryId: countryRows[8].id },
      { name: 'Хорог', countryId: countryRows[8].id },
      { name: 'Джиргиталь', countryId: countryRows[8].id },
      { name: 'Ишкашим', countryId: countryRows[8].id },
      
      // Города Туркменистана
      { name: 'Ашхабад', countryId: countryRows[9].id },
      { name: 'Туркменабат', countryId: countryRows[9].id },
      { name: 'Дашогуз', countryId: countryRows[9].id },
      { name: 'Мары', countryId: countryRows[9].id },
      { name: 'Туркменбаши', countryId: countryRows[9].id },
      { name: 'Балканабад', countryId: countryRows[9].id },
      { name: 'Серхетабад', countryId: countryRows[9].id },
      
      // Города Узбекистана
      { name: 'Ташкент', countryId: countryRows[10].id },
      { name: 'Самарканд', countryId: countryRows[10].id },
      { name: 'Бухара', countryId: countryRows[10].id },
      { name: 'Наманган', countryId: countryRows[10].id },
      { name: 'Андижан', countryId: countryRows[10].id },
      { name: 'Фергана', countryId: countryRows[10].id },
      { name: 'Ургенч', countryId: countryRows[10].id },
      
      // Города Кыргызстана
      { name: 'Бишкек', countryId: countryRows[11].id },
      { name: 'Ош', countryId: countryRows[11].id },
      { name: 'Джалал-Абад', countryId: countryRows[11].id },
      { name: 'Каракол', countryId: countryRows[11].id },
      { name: 'Токмок', countryId: countryRows[11].id },
      { name: 'Нарын', countryId: countryRows[11].id },
      { name: 'Талас', countryId: countryRows[11].id }
    ];

    await queryInterface.bulkInsert('Cities', citiesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
