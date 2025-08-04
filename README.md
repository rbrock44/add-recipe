# AddRecipe

> This website helps take a recipe and turn it into JSON format for my main [family recipe website](https://family-recipes.ryan-brock.com/). <br/>
> [Live - Add Recipe Website](https://add-recipe.ryan-brock.com/)

---

## 📚 Table of Contents

- [What's My Purpose?](#-whats-my-purpose)
- [Technologies](#-technologies)
- [Getting Started (Local Setup)](#-getting-started-local-setup)
  - [Run Locally](#run-locally)
  - [Test](#test)
  - [GitHub Hooks](#github-hooks)
  - [Build](#build)
  - [Deploy](#deploy)

---

## 🧠 What's My Purpose?

This is a server side single-page angular frontend created to asssit in taking a recipe and turn it into JSON format for my main [family recipe website](https://family-recipes.ryan-brock.com/). After clicking 'Save Recipe' the JSON version is copied to clipboard and should be messaged to me (Ryan - rbrock444@gmail.com). Automation is in the works <br/>

---

## 🛠 Technologies

- Framework: `Angular 19`
- Testing: `Karma`
- Deployment: `GitHub Pages`

---

## 🚀 Getting Started (Local Setup)

* Install [node](https://nodejs.org/en) - v19 is needed (v22 also works)
* Clone [repo](https://github.com/rbrock44/add-recipe)

---

### Run Locally

```
npm install
npm start
```

---

### Test

- Unit
    - `ng test` || `npm run test`
- Integration
    - `ng e2e` || `npm run e2e`

---

### Github Hooks

- Build
    - Trigger: On Push to Main
    - Action(s): Builds application then kicks off gh page action to deploy build output

---

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

---

### Deploy

Run `npm run prod` to build and deploy the project. Make sure to be on `master` and that it is up to date before running the command. It's really meant to be a CI/CD action

---
