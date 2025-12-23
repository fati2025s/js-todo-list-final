const todoForm = document.querySelector('#todoForm');
    const todoInput = document.querySelector('#todoInput');
    const todoContainer = document.querySelector('#todoContainer');
    const suggestionsMenu = document.querySelector('#suggestionsMenu');
    const inputCardWrapper = document.querySelector('#inputCardWrapper');
    const imageColumn = document.querySelector('#imageColumn');
    const themeToggle = document.querySelector('#themeToggle');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';
    const baseSuggestions = ["ورزش صبحگاهی", "مطالعه کتاب", "خرید روزانه", "برنامه‌نویسی پروژه"];

    themeToggle.onclick = () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.innerText = isDark ? "☀️ حالت روز" : "🌙 حالت شب";
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    todoInput.oninput = () => {
        const val = todoInput.value.trim();
        if (!val) { hideSuggestions(); return; }
        const history = todos.map(t => t.text);
        const filtered = [...new Set([...baseSuggestions, ...history])].filter(opt => opt.includes(val));
        if (filtered.length > 0) {
            suggestionsMenu.innerHTML = filtered.map(item => `<div class="suggestion-item" onclick="selectSuggestion('${item}')">${item}</div>`).join('');
            suggestionsMenu.classList.add('show');
            inputCardWrapper.style.borderRadius = "var(--radius-md) var(--radius-md) 0 0";
        } else { hideSuggestions(); }
    };

    function hideSuggestions() {
        suggestionsMenu.classList.remove('show');
        inputCardWrapper.style.borderRadius = "var(--radius-md)";
    }

    window.selectSuggestion = (text) => {
        todoInput.value = text;
        hideSuggestions();
        todoInput.focus();
    };

    const save = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
        render();
    };

    const render = () => {
        todoContainer.innerHTML = "";
        let filtered = todos.filter(t => {
            if (currentFilter === 'active') return !t.completed;
            if (currentFilter === 'completed') return t.completed;
            return true;
        }).sort((a, b) => b.id - a.id);

        filtered.forEach(todo => {
            const card = document.createElement('div');
            card.className = `card todo-card shadow-sm ${todo.completed ? 'completed' : ''}`;
            card.innerHTML = `
                <div class="card-body p-3 d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center flex-grow-1 overflow-hidden">
                        <div class="custom-check" onclick="toggleTodo(${todo.id})">
                            ${todo.completed ? '<span class="text-white">✓</span>' : ''}
                        </div>
                        <div class="flex-grow-1 text-truncate pe-2" id="text-container-${todo.id}">
                            <span class="fw-bold ${todo.completed ? 'completed-text' : ''}" 
                                  onclick="editTodo(${todo.id})" 
                                  style="cursor: text;">${todo.text}</span>
                        </div>
                    </div>
                    <button class="btn btn-link text-danger p-0 ms-2" onclick="deleteTodo(${todo.id})">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            `;
            todoContainer.appendChild(card);
        });
        document.getElementById('itemsLeftCount').innerText = todos.filter(t => !t.completed).length.toLocaleString('fa-IR');
        document.getElementById('clearBtn').classList.toggle('d-none', !todos.some(t => t.completed));
    };

    // تابع جدید برای ویرایش تسک‌های قبلی
    window.editTodo = (id) => {
        const todo = todos.find(t => t.id === id);
        if (todo.completed) return; // تسک‌های انجام شده معمولاً ویرایش نمی‌شوند
        
        const container = document.getElementById(`text-container-${id}`);
        const originalText = todo.text;
        
        // تبدیل متن به اینپوت
        container.innerHTML = `<input type="text" class="edit-mode-input" value="${originalText}" id="edit-input-${id}">`;
        const input = document.getElementById(`edit-input-${id}`);
        input.focus();
        
        // ذخیره هنگام اینتر یا خروج از فوکوس
        const saveEdit = () => {
            const newValue = input.value.trim();
            if (newValue && newValue !== originalText) {
                todo.text = newValue;
                save();
            } else {
                render(); // بازگشت به حالت عادی بدون تغییر
            }
        };

        input.onblur = saveEdit;
        input.onkeydown = (e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') render();
        };
    };

    window.toggleTodo = (id) => { todos = todos.map(t => t.id === id ? {...t, completed: !t.completed} : t); save(); };
    window.deleteTodo = (id) => { todos = todos.filter(t => t.id !== id); save(); };

    todoForm.onsubmit = (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if(!text) return;
        todos.push({ id: Date.now(), text: text, completed: false });
        todoInput.value = "";
        hideSuggestions();
        save();
    };

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
            btn.classList.add('active', 'btn-primary');
            currentFilter = btn.dataset.filter;
            render();
        };
    });

    document.getElementById('clearBtn').onclick = () => { todos = todos.filter(t => !t.completed); save(); };

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerText = "☀️ حالت روز";
    }

    imageColumn.style.backgroundImage = `url('https://picsum.photos/800/1200?random=1')`;
    render();