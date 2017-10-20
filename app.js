import {
  htmlRoute, route, postRoute, notFound,
  helpers,
  request,
  storage,
  social,
  redirect,
  inject,
  start,
  back
} from 'js-web'

const { mysql } = storage

const auth = require('./src/auth.js')
const parseInputText = require('./src/parse-input-text.js')

/**
 * Injections
*/
const injections = [
  inject.googleAnalytics(),
  inject.jquery(),
  inject.bootstrap(),
  inject.style('style/syntax.css'),
  inject.style('style/style.sass'),
  inject.script('script/main.js')
]
const questionInjections = injections.concat([
  inject.style('style/questions.css')
])
const authInjections = questionInjections.concat([
  inject.googleAuth('/google-login', 'google-login'),
  inject.facebookAuth('/facebook-login', 'fb-login')
])

/**
 * Routes
*/
/*
  Docs!
*/
route('/', () => redirect('/docs/intro'))
htmlRoute('/docs/:doc', 'html/docs.html', async input => ({
  doc: input.doc ? `html/docs/${input.doc}.html` : 'html/docs/routing.html'
}), injections)

/*
  Questions
*/
const categories = mysql.table('categories')
const questions = mysql.table('questions')
const answers = mysql.table('answers')
const answersExtended = mysql.table('answers'
  + ' left join users on users.id = answers.user_id'
  + ' left join questions on questions.id = answers.question_id'
)
const questionExtended = mysql.table('questions'
  + ' left join categories on categories.id = questions.category_id'
  + ' left join users on users.id = questions.user_id'
)
const questionExtendedFields =
  'questions.*, users.name as username, categories.name as category'
const answerExtendedFields =
  'answers.*, users.name as username, questions.title '

const setLoginWarning = (session) => {
  session.setFlash('warning', 'You need to sign in.')
  return false
}
const hasAuth = session => (session.get('user_id') ? true : setLoginWarning(session))

const setOwnAnswers = userId => (answer) => {
  const answerWithIsOwnProp = answer
  answerWithIsOwnProp.isOwn = userId === answer.user_id
  return answerWithIsOwnProp
}

htmlRoute('/questions', 'html/questions.html', async (input, session) => ({
  questions: (await questionExtended.selectFields(questionExtendedFields, null, 'id desc')).map(parseInputText.outputFormat('question')),
  user_id: session.get('user_id'),
  user_name: session.get('user_name'),
  categories: await categories.select()
}), authInjections)

htmlRoute('/questions/categories/:category/:id', 'html/questions.html', async (input, session) => ({
  questions: (await questionExtended.selectFields(questionExtendedFields, { category_id: input.id }, 'id desc')).map(parseInputText.outputFormat('question')),
  user_id: session.get('user_id'),
  user_name: session.get('user_name'),
  categories: await categories.select()
}), authInjections)

postRoute('/answers/create', async (input, session) => {
  if (!hasAuth(session)) return back()

  answers.create({
    question_id: input.question_id,
    answer: input.answer,
    created: mysql.now(),
    user_id: session.get('user_id', -1),
    isSolution: false
  })

  return back()
})

postRoute('/answers/update', async (input, session) => {
  if (!hasAuth(session)) return back()

  await answers.update({ answer: input.answer }, { id: input.answer_id })
  return redirect(`/questions/answers/-/-/${input.question_id}`)
})


const answersData = async (input, session) => {
  const question = parseInputText.outputFormat('question')(
    (await questionExtended.selectFields(questionExtendedFields, { 'questions.id': input.id }))[0]
  )
  return {
    user_id: session.get('user_id'),
    user_name: session.get('user_name'),
    categories: await categories.select(),
    answers: (await answersExtended.selectFields(answerExtendedFields, { question_id: input.id }))
      .map(parseInputText.outputFormat('answer'))
      .map(setOwnAnswers(session.get('user_id'))),
    question,
    isOwnQuestion: session.get('user_id') === question.user_id
  }
}

htmlRoute(
  '/questions/answers/:name/:title/:id',
  'html/anwers.html',
  answersData,
  questionInjections
)

htmlRoute(
  '/questions/edit-answer/:name/:title/:id/:answer_id',
  'html/anwers.html',
  async (input, session) => {
    const answer = await answers.find({ id: input.answer_id })
    if (answer.user_id !== session.get('user_id')) {
      session.setFlash('warning', 'You need to sign in.')
      return back()
    }
    return Object.assign(
      await answersData(input, session),
      {
        edit: answer
      }
    )
  },
  questionInjections
)

htmlRoute('/questions/edit/:id', 'html/questions/edit.html', async (input, session) => {
  if (!hasAuth(session)) return back()
  const question = await questions.find({ id: input.id })

  if (question.user_id !== session.get('user_id')) {
    return back()
  }
  return {
    user_id: session.get('user_id'),
    user_name: session.get('user_name'),
    categories: (await categories.select()).map((c) => {
      c.isSelected = question.category_id === c.id ? 'selected' : ''
      return c
    }),
    question
  }
}, questionInjections)

htmlRoute('/questions/new', 'html/questions/new.html', async (input, session) => {
  if (!hasAuth(session)) return back()

  return {
    user_id: session.get('user_id'),
    user_name: session.get('user_name'),
    categories: await categories.select()
  }
}, questionInjections)

const validateQuestionInput = (input, session) => {
  if (input.question.trim() === '') {
    session.setFlash('danger', 'You can´t ask an empty question!')
    return false
  }
  if (input.title.trim() === '') {
    session.setFlash('danger', 'Title can´t be empty!')
    return false
  }
  return true
}

postRoute('/questions/update', async (input, session) => {
  if (!hasAuth(session)) return back()
  if (!validateQuestionInput(input, session)) return back()

  await questions.update({
    category_id: input.category,
    title: input.title,
    question: input.question
  }, { id: input.id })

  return redirect(`/questions/answers/-/-/${input.id}`)
})

route('/questions/delete/:id', async (input, session) => {
  if (!hasAuth(session)) return back()
  const question = await questions.find({ id: input.id })
  if (question.user_id !== session.get('user_id')) return back()
  await questions.delete({ id: question.id })
  return redirect('/questions')
})

route('/answers/delete/:id', async (input, session) => {
  if (!hasAuth(session)) return back()
  const answer = await answers.find({ id: input.id })
  if (answer.user_id !== session.get('user_id')) return back()
  await answers.delete({ id: answer.id })
  return redirect(`/questions/answers/-/-/${answer.question_id}`)
})

postRoute('/questions/create', async (input, session) => {
  if (!hasAuth(session)) return back()
  if (validateQuestionInput(input, session)) {
    await questions.create({
      category_id: input.category,
      title: input.title,
      question: input.question,
      user_id: session.get('user_id'),
      created: mysql.now()
    })
    return redirect('/questions')
  }
  return back()
})

/*
  Tutorials
*/
route('/tutorials', () => redirect('/tutorials/hello-world'))
htmlRoute('/tutorials/:tutorial', 'html/tutorials.html', async input => ({
  tut: input.tutorial ? `html/tuts/${input.tutorial}.html` : 'html/tuts/hello-world.html'
}), questionInjections)

/*
  AUTH
*/
postRoute('/google-login', async (input, session) => {
  let googleAccess = await auth.googleAccessExists(input)
  if (!googleAccess) {
    googleAccess = await auth.createGoogleAccess(input)
  }
  const user = await auth.getUserByAccess(googleAccess)
  session.set('user_id', user.id)
  session.set('user_name', user.name)
  return back()
})

postRoute('/facebook-login', async (input, session) => {
  let facebookAccess = await auth.facebookAccessExists(input)
  if (!facebookAccess) {
    const extendedData = await social.getFacebookFields(input.accessToken)
    facebookAccess = await auth.createFacebookAccess(
      Object.assign(input, extendedData)
    )
  }
  const user = await auth.getUserByAccess(facebookAccess)
  session.set('user_id', user.id)
  session.set('user_name', user.name)
  return back()
})

//notFound('html/docs.html', _ => redirect('/'))
notFound(null, _ => redirect('/'))

start()
