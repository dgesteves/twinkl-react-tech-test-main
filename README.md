# TwinklReactTechTestMain

## Task

[Task description]('task/README.md').

[Task resources]('task/assets').

## Solution

- Since I had a short time to complete the task, I decided to prioritise the main functionality of the task.
- The initial project setup was incomplete and not working properly, so I had to complete the setup (I assume that was part of the task).
- I focused most of my time on the components logic and performance neglecting the page design.
- A debounced search was implemented to avoid unnecessary API calls.
- Posts are displayed on a infinite scrollable list to improve performance.
- Deleted posts are removed from the list only on UI, since the API doesn't provide a way to remove them.
- Most important functions are tested, but due to the time constraints, I didn't have time to implement more tests as I would like.
- E2E tests were not implemented, but the setup is ready to use.
- There are several improvements that should be made on a real world scenario like: error handling, loading states, better UI/UX, more tests, etc.

## How to run

- Run `npm install` to install the dependencies.
- Run `npm start` to start the project.
- Run `npm test` to run the tests.
- Run `npm run build` to build the project.
- Run `npm run preview` to preview the build project.
- Run `npm run lint` to lint the project.
- Run `npm run format` to format the project.
