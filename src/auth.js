const web = require('js-web')

const social = web.social
const db = web.storage.mysql
/**
 * Tables!
*/
const users = db.table('users')
const googleAccess = db.table('google_access')
const twitterAccess = db.table('twitter_access')
const facebookAccess = db.table('facebook_access')

const createUser = name => users.create({ name })

module.exports.getUserByAccess = (access) => {
  if (typeof access === 'number') {
    return users.find({ id: access })
  }
  return users.find({ id: access.user_id })
}

/**
 * Facebook Auth
 */

module.exports.facebookAccessExists = input => facebookAccess.find({ facebook_id: input.userID })

module.exports.createFacebookAccess = async (input) => {
  const userId = await createUser(input.name)
  social.getFacebookImage(input.accessToken, `assets/user-images/${userId}.jpg`)
  await facebookAccess.create({
    accessToken: input.accessToken,
    signedRequest: input.signedRequest,
    user_id: userId,
    expiresIn: input.expiresIn,
    facebook_id: input.userID
  })
  return userId
}

/**
 * Twitter Auth
 */

module.exports.twitterAccessExists = input => twitterAccess.find({ twitter_id: input.user_id })

module.exports.createTwitterAccess = async (input) => {
  const userId = await createUser(input.screen_name)
  social.getTwitterImage(input.screen_name, `assets/user-images/${userId}.jpg`)
  await twitterAccess.create({
    accessToken: input.accessToken,
    accessTokenSecret: input.accessTokenSecret,
    screen_name: input.screen_name,
    twitter_id: input.user_id,
    user_id: userId
  })
  return userId
}

/**
 * Google Auth
 */
module.exports.googleAccessExists = input => googleAccess.find({ google_id: input.id })

module.exports.createGoogleAccess = async (input) => {
  const userId = await createUser(`${input.givenName} ${input.familyName}`)
  social.getGoogleImage(input.id, `assets/user-images/${userId}.jpg`)
  await googleAccess.create(Object.assign(
    input.only([
      'resourceName',
      'displayName',
      'familyName',
      'givenName'
    ]), {
      google_id: input.id,
      user_id: userId
    }
  ))
  return userId
}
