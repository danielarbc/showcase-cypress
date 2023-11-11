# Plugins

## Faker

Generate massive amounts of fake (but realistic) data for testing and development. Webpage: [https://fakerjs.dev/](https://fakerjs.dev/)

I'm using this plugin to fill in user, password and address data.

## Prettier

An opinionated code formatter. Webpage: [https://prettier.io/](https://prettier.io/)

I'm using this plugin together with the VSCode plugin.

You can configure it as a pre-commit step, but I'm the only one working on this project, so I don't have the necessity.

## Lodash

A modern JavaScript utility library delivering modularity, performance & extras. Webpage: [https://lodash.com/](https://lodash.com/)

Cypress natively imports Lodash. I'm using this plugin in the checkout command to get the property "innerText". However, I can also use it to test Flaky Tests as the [Cypress documentation recommends](https://www.cypress.io/blog/2020/12/03/retry-rerun-repeat#repeat).
