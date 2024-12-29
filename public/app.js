document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const categoryInput = document.getElementById('categoryInput');
  const taskTime = document.getElementById('taskTime');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  const fetchTasks = async () => {
      const response = await fetch('/api/tasks');
      const tasks = await response.json();
      taskList.innerHTML = '';
      tasks.forEach(({ id, task, category, time }) => {
          const li = document.createElement('li');
          li.className = 'todo-item';
          li.innerHTML = `
              <span>${task} (${category || 'No Category'}) - ${time || 'No Time Set'}</span>
              <button class="detailsBtn">Details</button>
              <button class="deleteBtn">Delete</button>
          `;

          li.querySelector('.detailsBtn').onclick = () => {
              window.location.href = `/details.html?id=${id}`;
          };

          li.querySelector('.deleteBtn').onclick = async () => {
              if (confirm('Are you sure you want to delete this task?')) {
                  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
                  fetchTasks();
              }
          };

          taskList.appendChild(li);
      });
  };

  addTaskBtn.onclick = async () => {
      const task = taskInput.value.trim();
      const category = categoryInput.value.trim();
      const time = taskTime.value;
      if (task) {
          await fetch('/api/tasks', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ task, category, time }),
          });
          taskInput.value = '';
          categoryInput.value = '';
          taskTime.value = '';
          fetchTasks();
      }
  };

  fetchTasks();
});
