/**
 * Increase the price by 10% on all plans.
 * @param {Object[]} plans A list of all plans
 */
function increatePrice(plans) {
    for (var i = 0; i < plans.length; i++) {
        plans[i].price *= 1.10;
    }
    return plans;
}

module.exports.increatePrice = increatePrice;
