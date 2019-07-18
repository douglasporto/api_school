# School _[api]_

Api for a meeting system about tech and development

## Required

- [Yarn](https://yarnpkg.com/lang/en/)
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)


## Init App
- Install depends
  `Yarn install`

## Docker init

### Postgree
`docker run --name database_school -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=school -p 5432:5432 -d postgres`

**__Insomnia__**
 - To download [Insomnia](https://insomnia.rest/)
 - In insomnia you must to ckick *import/Export->Import Data*
 - Import de archive `api_school/Insomnia-school.json`

**__Run the migrations__**
  `yarn migrate`


### MongoDb
`docker run --name mongo_school -p 27017:27017 -d -t mongo`

### Commands important

 - Fix ESLint `yarn eslint --fix src --ext .js`


** By [DouglasPorto](http://douglasporto.com.br) **
