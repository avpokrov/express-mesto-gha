const errNotFound = new Error('Объект не найден');
errNotFound.name = 'NotFoundError';

module.exports = { errNotFound };
