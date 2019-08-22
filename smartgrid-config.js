const smartgrid = require('smart-grid');

const settings = {
  filename: 'smartgrid',
  outputStyle: 'sass',
  columns: 12,
  offset: '20px', // Расстояние между столбцами (gutter)
  // false => max-width, true => min-width
  mobileFirst: false,
  container: {
    maxWidth: '1440px', // Ширина макета
    // Оступы по краям сайта (padding)
    // fields должен быть не меньше половины offset
    fields: '0px'
  },
  breakPoints: {
    // Bootstrap breakPoints
    xxxl: {
      width: '1480px',
      fields: '20px'
    },
    xxl: {
      width: '1250px'
    },
    xl: {
      width: '1200px'
    },
    lg: {
      width: '992px',
      fields: '15px'
    },
    md: {
      width: '768px',
      fields: '10px'
    },
    sm: {
      width: '540px'
    }
  },
  mixinNames: {
    container: 'container',
    shift: 'offset'
  },
  tab: '  '
};

smartgrid('./src/sass', settings);
