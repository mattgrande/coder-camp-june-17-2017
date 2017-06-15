const R = require('ramda');

const getViews = R.pipe(
    R.filter(R.has('views')),
    R.map(v => v.views)
);

module.exports.getViews = getViews;
