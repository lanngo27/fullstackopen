# Ultimate hooks

In this exercise, we are refactoring https://github.com/fullstack-hy2020/ultimate-hooks using custom hooks. This app displays notes and phone numbers fetched from a backend server.

However, we noticed that the same code responsible for fetching notes from the backend could be reused in the blog post application. Indeed, only the baseUrl differs. As a result, we extracted the code for communicating with a backend server into its own useResource hook.