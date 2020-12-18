'use strict'
/*
When you start working with Node.js, one of the first concepts you learn is the module pattern.
According to some, you don’t need dependency injection in Node.js
because there’s require. Personally, I don’t really agree with that.

DI is a pattern where, instead of creating or requiring dependencies directly
inside a module, we pass them as parameters or reference.
*/

const User = require('./User');
const UsersRepository = require('./users-repository');

async function getUsers() {
  return UsersRepository.findAll();
}

async function addUser(userData) {
  const user = new User(userData);

  return UsersRepository.addUser(user);
}

module.exports = {
  getUsers,
  addUser
}

/*
we do not have an interface of the function 'getUsers'

so that -- the service is coupled with a specific repository.
If we wanted to change it to something else, then we would have to modify the entire code
*/

/*
Let’s use dependency injection to fix it up!
*/

const User = require('./User');

function UsersService(usersRepository) {
  async function getUsers() {
    return usersRepository.findAll();
  }

  async function addUser(userData) {
    const user = new User(userData);

    return usersRepository.addUser(user);
  }

  return {
    getUsers,
    addUser
  };
}

module.exports = UsersService

/*
Dependency injection in Node.js – classes vs functions

Another reason why dependency injections are not popular in the Node.js ecosystem
might be a myth that DI is an OOP-only concept. That’s most definitely not true!
*/

/*
we’re big fans of reducing the number of params being passed to class/function by enclosing them in object.
You can easily use destructuring to access specific dependencies you need
*/

class UsersService {
  constructor({ usersRepository, mailer, logger }) {
    this.usersRepository = usersRepository;
    this.mailer = mailer;
    this.logger = logger;
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async addUser(user) {
    await this.usersRepository.addUser(user);
    this.logger.info(`User created: ${user}`);
    await this.mailer.sendConfirmationLink(user);
    this.logger.info(`Confirmation link sent: ${user}`);
  }
}

module.exports = UsersService;

const usersService = new UsersService({
  usersRepository,
  mailer,
  logger
});

/*
Because of the closure we created, we have access to dependencies
 from the inner functions.
*/

type UsersDependencies = {
  usersRepository: UsersRepository
  mailer: Mailer
  logger: Logger
};

export const usersService = (dependencies: UsersDependencies) => {
  const findAll = () => dependencies.usersRepository.findAll();
  const addUser = user => {
    await dependencies.usersRepository.addUser(user)
    dependencies.logger.info(`User created: ${user}`)
    await dependencies.mailer.sendConfirmationLink(user)
    dependencies.logger.info(`Confirmation link sent: ${user}`)
  };

  return {
    findAll,
    addUser
  };
}

const service = usersService({
  usersRepository,
  mailer,
  logger
});
