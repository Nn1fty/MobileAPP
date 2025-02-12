import json

def load_tasks():
    try:
        with open("tasks.json", "r") as file:
            tasks = json.load(file)
    except FileNotFoundError:
        tasks = []
    return tasks

def save_tasks(tasks):
    with open("tasks.json", "w") as file:
        json.dump(tasks, file)

def display_tasks(tasks):
    if len(tasks) == 0:
        print("No tasks available.")
    else:
        print("\nYour Tasks:")
        for idx, task in enumerate(tasks):
            print(f"{idx + 1}. {task['task']} - {'Done' if task['completed'] else 'Not done'}")

def add_task(tasks, task_name):
    tasks.append({"task": task_name, "completed": False})
    save_tasks(tasks)
    print(f"Task '{task_name}' added!")

def mark_task_completed(tasks, task_id):
    try:
        tasks[task_id - 1]["completed"] = True
        save_tasks(tasks)
        print(f"Task {task_id} marked as completed!")
    except IndexError:
        print("Invalid task ID.")

def remove_task(tasks, task_id):
    try:
        removed_task = tasks.pop(task_id - 1)
        save_tasks(tasks)
        print(f"Task '{removed_task['task']}' removed.")
    except IndexError:
        print("Invalid task ID.")

def main():
    tasks = load_tasks()
    
    while True:
        print("\n1. Add Task")
        print("2. Remove Task")
        print("3. Mark Task Completed")
        print("4. Show Tasks")
        print("5. Exit")

        choice = input("Choose an option: ")

        if choice == "1":
            task_name = input("Enter task name: ")
            add_task(tasks, task_name)
        elif choice == "2":
            display_tasks(tasks)
            task_id = int(input("Enter task number to remove: "))
            remove_task(tasks, task_id)
        elif choice == "3":
            display_tasks(tasks)
            task_id = int(input("Enter task number to mark as completed: "))
            mark_task_completed(tasks, task_id)
        elif choice == "4":
            display_tasks(tasks)
        elif choice == "5":
            print("Exiting...")
            break
        else:
            print("Invalid choice! Please try again.")

if __name__ == "__main__":
    main()

