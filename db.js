const db = require('js-web').migration.mysql
const seed = require('js-web').storage.mysql

/*
  Fieldtypes:
  id (auto increment),
  string,
  int,
  datetime,
  bool,
  text
 */

const seedCategories = async () => {
  const categories = seed.table('categories')
  await categories.truncate()
  await categories.create({ name: 'MYSQL' })
  await categories.create({ name: 'Setup' })
  await categories.create({ name: 'Injection' })
  await categories.create({ name: 'Routing' })
}

db.table('categories', {
  id: 'id',
  name: 'name'
}).then(seedCategories)

db.table('questions', {
  id: 'id',
  category_id: 'category',
  user_id: 'int',
  title: 'string',
  question: 'text',
  created: 'datetime'
})

db.table('answers', {
  id: 'id',
  question_id: 'int',
  answer: 'text',
  created: 'datetime',
  user_id: 'int',
  isSolution: 'bool'
})

db.table('google_access', {
  id: 'id',
  resourceName: 'string',
  google_id: 'string',
  displayName: 'string',
  familyName: 'string',
  givenName: 'string',
  user_id: 'int'
})

db.table('twitter_access', {
  id: 'id',
  accessToken: 'string',
  accessTokenSecret: 'string',
  user_id: 'int',
  twitter_id: 'string',
  screen_name: 'string'
})

db.table('facebook_access', {
  id: 'id',
  accessToken: 'text',
  signedRequest: 'text',
  user_id: 'int',
  expiresIn: 'int',
  facebook_id: 'string'
})

db.table('users', {
  id: 'id',
  name: 'string'
})
