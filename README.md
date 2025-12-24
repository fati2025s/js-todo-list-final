# Todo Master

**todo list** is a professional, modern task management application designed to showcase proficiency in Front-end Development **HTML/CSS/JS** and UI/UX Design.

The system is built to provide a seamless experience for organizing daily activities, featuring a smart suggestion engine, dynamic theme switching, and a highly responsive interface that adapts to any device.

The main focus of **TodoMaster** is to deliver a clean, minimalist workspace combined with advanced features like inline editing and real-time filtering, demonstrating how vanilla technologies can create a premium user experience.

---

## Features & Screenshots

**Modern Task Interface**

![Screenshot 2025-12-24 043502](https://github.com/fati2025s/js-todo-list-final/blob/main/Screenshot%202025-12-24%20043502.jpg)

The application features a dual-pane layout on desktop. The left side handles all task logic, while the right side provides a visual, aesthetic experience with motivational content.

**🌓 Theme Customization (Dark & Light Mode)**

![Screenshot 2025-12-24 043547](https://github.com/fati2025s/js-todo-list-final/blob/main/Screenshot%202025-12-24%20043547.jpg)

TodoMaster includes a robust theme engine. Users can switch between a soft purple-light mode and a high-contrast deep-purple dark mode for better accessibility and night-time use.


**💡 Smart Suggestion System**

![Screenshot 2025-12-24 043640](https://github.com/fati2025s/js-todo-list-final/blob/main/Screenshot%202025-12-24%20043640.jpg)

One of the standout features is the Predictive Input. As users type, the app suggests common tasks to speed up the organization process.

**📚 Task Management & Filtering**

In this section, tasks can be organized and categorized. Using the Filter bar, users can instantly view:

**All**: Every task in the list.

**Active**: Only pending tasks.

**Completed**: Successfully finished tasks.

Additionally, the Inline Editing feature allows users to change task text instantly by simply clicking on it.

**Core Logic Example (Vanilla JS)**

The application utilizes a clean event-driven architecture to handle task states without external libraries:

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    renderTodos(); // Reactive UI update
}

**🛠️ Key Skills & Technologies**

This project demonstrates proficiency in the following areas:

Core Technologies: HTML5, CSS3, JavaScript (ES6+)

UI Framework: Bootstrap 5 (Grid & Components)

State Management & Architecture:

Implementing reactive UI updates using Vanilla JavaScript.

Managing application state through efficient array manipulations.

Handling complex event bubbling for inline editing and deletions.

UI/UX Design:

Building a fully responsive layout with CSS Flexbox and Grid.

Creating a premium look using glassmorphism effects and custom CSS variables.

Implementing smooth transitions and animations for theme switching.

Advanced Interactions:

Developing a custom suggestion engine (Autocomplete).

Integrating "Inline Editing" logic for better user flow.

Handling data filtering and real-time counter updates.

**Getting Started**

To run this project locally, follow these steps:

Clone the repository:

git clone [https://github.com/fati2025s/js-todo-list-final](https://github.com/fati2025s/js-todo-list-final)


Navigate to the project folder:

cd todomaster


Open the main file:

# Simply open todo-list.html in your favorite browser
open todo-list.html


Developed with ❤️ for productivity and clean code enthusiasts.
