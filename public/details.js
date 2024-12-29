document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get('id');

  const response = await fetch(`/api/tasks/${taskId}`);
  const { task, category, time } = await response.json();

  document.getElementById('taskDetail').textContent = task;
  document.getElementById('categoryDetail').textContent = category || 'No Category';
  document.getElementById('timeDetail').textContent = time || 'No Time Set';

  document.getElementById('editTaskBtn').onclick = async () => {
      const newTask = prompt('Edit Task Name:', task);
      if (newTask) {
          await fetch(`/api/tasks/${taskId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ task: newTask }),
          });
          window.location.reload();
      }
  };
});
