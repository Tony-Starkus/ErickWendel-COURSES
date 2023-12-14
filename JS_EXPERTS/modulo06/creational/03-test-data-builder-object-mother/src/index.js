/**
 * ProductId: should be between and 2 and 20 characters
 * Name: should be only words
 * Price: should be from zero to a thousand
 * Category: should be eletronic or organic
 */

function productValidator(product) {
  const errors = []
  if (!(product.id.length >= 2 && product.id <= 20)) {
    errors.push(`id: invalid lenth, current [${product.id}] expected to be between 2 and 20`)
  }

  if (/(\W|\d)/.test(product.name)) {
    errors.push(`name: invalid valid, current [${product.name}] expected to have only words`)
  }

  if (!(product.price >= 1 && product.price <= 1000)) {
    errors.push(`price: invalid value, current [${product.price}] expected to be between 1 and 1000`)
  }

  if (!(['eletronic', 'organic'].includes(product.category))) {
    errors.push(`category: invalid value, current [${product.category}] expected to be either eletronic or organic`)
  }

  return {
    result: errors.length === 0,
    errors
  }
}

module.exports = {
  productValidator
}
