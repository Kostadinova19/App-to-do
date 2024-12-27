document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    taskList.innerHTML = '';
    tasks.forEach(({ id, task }) => {
      const li = document.createElement('li');
      li.textContent = task;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = async () => {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        fetchTasks();
      };

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  };

  addTaskBtn.onclick = async () => {
    const task = taskInput.value.trim();
    if (task) {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
      });
      taskInput.value = '';
      fetchTasks();
    }
  };

  fetchTasks();
});
