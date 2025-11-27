(() => {
    const STORAGE_KEY = 'miniTodoTasks';
    const form = document.querySelector('.todo-form');
    const input = document.querySelector('#taskInput');
    const list = document.querySelector('#todoList');
    const clearDoneBtn = document.querySelector('#clearDone');

    let tasks = [];

    const load = () => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(saved)
                ? saved.map(item => ({ text: String(item.text), done: Boolean(item.done) }))
                : [];
        } catch (err) {
            console.warn('Could not read saved tasks', err);
            return [];
        }
    };

    const save = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    };

    const render = () => {
        list.innerHTML = '';

        if (!tasks.length) {
            const empty = document.createElement('li');
            empty.className = 'todo-item';
            empty.style.opacity = '0.65';
            empty.innerHTML = '<span>Nothing yet. Add a task!</span>';
            list.appendChild(empty);
            return;
        }

        tasks.forEach((task, index) => {
            const item = document.createElement('li');
            item.className = `todo-item${task.done ? ' done' : ''}`;
            item.dataset.index = String(index);

            const label = document.createElement('span');
            label.textContent = task.text;

            item.appendChild(label);
            list.appendChild(item);
        });
    };

    const saveAndRender = () => {
        save();
        render();
    };

    const addTask = (text) => {
        const clean = text.trim();
        if (!clean) return;

        tasks.push({ text: clean, done: false });
        saveAndRender();
        input.value = '';
        input.focus();
    };

    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        addTask(input.value);
    });

    list.addEventListener('click', (event) => {
        const item = event.target.closest('li.todo-item');
        if (!item) return;

        const index = Number(item.dataset.index);
        if (Number.isNaN(index) || !tasks[index]) return;

        tasks[index].done = !tasks[index].done;
        saveAndRender();
    });

    clearDoneBtn?.addEventListener('click', () => {
        const remaining = tasks.filter(task => !task.done);
        if (remaining.length === tasks.length) return;

        tasks = remaining;
        saveAndRender();
    });

    tasks = load();
    render();
    input?.focus();
})();
