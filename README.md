# Kanban Board

## Description

A kanban board web application used for task management.
Deployed live [here](https://kanban-board.onrender.com).

The backend of this project is located [here](https://github.com/earacena/kanban-board-backend).

### Features

* Columns
  * Add new columns
  * Change column labels
  * Delete columns

* Cards
  * Add new cards for tasks
  * Add a brief description and detailed description of task
  * Assign a color to distinguish tasks

* Tags
  * Add new tags
  * Assign tags to cards

* Settings
  * Set background color

* Authentication
  * Session based user authentication

### Technologies

* Typescript
* React
* Redux + Redux Toolkit
* Emotion (CSS)
* Dnd-kit (Drag and Drop)
* Mantine components

## Usage

### Download

While in terminal with chosen directory, enter the command:

```bash
git clone https://github.com/earacena/kanban-board.git
```

### Install

While in the root project folder, enter the command:

```bash
npm install
```

### Deploy locally for development

Run the following in the root project folder:

```bash
HTTPS=true npm run start
```
