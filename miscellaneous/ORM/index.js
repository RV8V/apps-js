require('./database.js')();

const UserModel = require('./objection/models/user.js');
const TodoModel = require('./objection/models/todo.js');
const ActorModel = require('./objection/models/actor.js');
const Student = require('./objection/models/student.js');
const PersonModel = require('./objection/models/person.js');
const AnimalModel = require('./objection/models/animal.js');

(async () => {
  const users = await UserModel.query()
  const todos = await TodoModel.query()
  // const actors = await ActorModel.query().withGraphFetched('channels')

  const relations = await UserModel.query()
    .select('*')
    .innerJoin('todos', 'todos.user_id', 'users.id')

  // const related = await TodoModel.query()
  //   .joinRelated('users')

  // const related = await TodoModel.relatedQuery('users')

  const students = await Student.query()
  const studentCourses = await Student.query().withGraphFetched('courses')

  const channels = await ActorModel.query().withGraphFetched('channel')
  const personWithAnimals = await PersonModel.query().withGraphFetched('animals')
  const animalWithOwner = await AnimalModel.query().withGraphFetched('owner')

  console.dir({ students, studentCourses, channels, personWithAnimals, animalWithOwner }, { depth: 4 })
})()
