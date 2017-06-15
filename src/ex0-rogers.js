const R = require('ramda');

/**
 * Increase the price by 10% on all plans.
 * @param {Object[]} plans A list of all plans
 */
function increatePrice(plans) {
    const increaser = R.multiply(1.10);
    return plans.map(plan => R.assoc('price', increaser(plan.price), plan));
}

module.exports.increatePrice = increatePrice;
