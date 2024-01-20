/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  constructor() {
    this.todos = []
  }

  // Add todo to the todos array
  add(todo) {
    this.todos.push(todo)
    console.log(this.todos)
  }

  // Remove todo at specified index
  remove(indexOfTodo) {
    this.todos.splice(indexOfTodo, 1)
    
  }

  // Update todo
  update(index, updateTodo) {
    let lengthOfTodos = this.todos.length
    if(index >= lengthOfTodos || index < 0) {
      console.log("Index is out of range")
    } else {
      this.todos[index] = updateTodo
    }
  }

  // Get todo at certain index
  get(indexOfTodo) {
    let lengthOfTodos = this.todos.length
    if (indexOfTodo >= lengthOfTodos || indexOfTodo < 0) {
      console.log("Index is out of range")
      return null
    }else {
      return this.todos[indexOfTodo]
    }
  }

  // Get all todos 
  getAll() {
    return this.todos
  }

  // Clear all todos
  clear() {
    this.todos = []
  }
}

let todos = new Todo()
todos.add("first todo")
todos.add("second todo")
todos.add("third todo")

todos.update(1, "Hello world")
console.log(todos.getAll())


todos.remove(0)
console.log(todos.getAll())

specificTodo = todos.get(1)
console.log(specificTodo)

todos.clear()
console.log(todos.getAll())
module.exports = Todo;
