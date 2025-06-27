# Task Tonic

A simple and polished Task Manager built using the provided Postman API collection. This app delivers a dashboard-like experience with clean UI/UX and complete CRUD functionality.

## Features

### 1. Dashboard (`/`)
- List all tasks with:
  - Title
  - Status
  - Due Date (formatted)
  - Action buttons: **View**, **Edit**, **Delete**
- Filter by task status: **All**, **Pending**, **Completed**

### 2. View Task (`/tasks/[id]`)
- View single task details: Title, Description, Status, Due Date
- Loading skeleton/spinner during fetch
- Error message for invalid task ID

### 3. Add Task (`/tasks/new`)
- Create new task via form:
  - Fields: title, description, status (dropdown), due date (datepicker)
- Input validation and error/success handling
- Sends **POST** request

### 4. Edit Task (`/tasks/[id]/edit`)
- Pre-filled form for updating a task
- Submit updates via **PUT** request
- Loading state while fetching data

### 5. Delete Task
- Delete from task list or single view
- Confirmation prompt
- Sends **DELETE** request

### 6. Report Tasks
- Completed, Incomplete, In-progress and total tasks count

### 7. Loading States
- Shown during:
  - Data fetch
  - Form submit
  - Navigation

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Date Formatting:** dayjs
- **Forms:** React Hook Form
- **State Management:** useState, useEffect
- **Navigation:** next/navigation

## Getting Started

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/abunaim5/task-tonic

# Navigate into the directory
cd task-tonic

# Install dependencies
npm install

# Run the development server
npm run dev