(function () {
    const page = window.location.pathname.split('/').pop() || 'login.html';
    const pagesWithoutSidebar = new Set(['login.html', 'create_ticket.html']);

    if (pagesWithoutSidebar.has(page)) {
        return;
    }

    const activeByPage = {
        'analytics.html': 'Dashboard',
        'dashboard.html': 'Tickets',
        'details.html': 'Tickets',
        'roles.html': 'Customers',
        'dashboard_user.html': 'Knowledge Base',
        'configuration.html': 'Team'
    };

    const activeItem = activeByPage[page] || 'Dashboard';
    const items = [
        { label: 'Dashboard', icon: 'dashboard', href: 'analytics.html' },
        { label: 'Tickets', icon: 'confirmation_number', href: 'dashboard.html' },
        { label: 'Customers', icon: 'group', href: 'roles.html' },
        { label: 'Knowledge Base', icon: 'book', href: 'dashboard_user.html' },
        { label: 'AI Insights', icon: 'psychology', href: 'analytics.html' },
        { label: 'Team', icon: 'diversity_3', href: 'configuration.html' }
    ];

    const activeClass = 'bg-primary-container text-on-primary-container dark:bg-primary dark:text-on-primary shadow-sm';
    const inactiveClass = 'text-text-secondary dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-variant hover:text-on-surface';

    document.querySelectorAll('aside').forEach((aside) => {
        const isAppSidebar = aside.className.includes('sidebar-width') || aside.textContent.includes('Support Ops');
        if (isAppSidebar) {
            aside.remove();
        }
    });

    const sidebar = document.createElement('aside');
    sidebar.id = 'app-sidebar';
    sidebar.className = 'fixed left-0 top-0 h-full w-sidebar-width bg-surface-container dark:bg-surface-dim flex flex-col border-r border-border-default dark:border-outline-variant z-[70]';
    sidebar.innerHTML = `
        <a class="p-layout-margin flex items-center gap-md" href="analytics.html">
            <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
                <span class="material-symbols-outlined">psychology</span>
            </div>
            <div class="flex flex-col">
                <span class="font-headline-sm text-headline-sm font-black text-primary dark:text-primary-fixed">Support Ops</span>
                <span class="font-label-bold text-[10px] uppercase tracking-wider text-text-secondary">Enterprise Tier</span>
            </div>
        </a>
        <div class="px-sm">
            <button class="w-full mb-lg py-md px-lg bg-primary text-on-primary rounded-lg font-label-bold flex items-center justify-center gap-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-sm" type="button" data-nav="create_ticket.html">
                <span class="material-symbols-outlined text-[18px]">add</span>
                <span>New Ticket</span>
            </button>
        </div>
        <nav class="flex-1 px-sm space-y-xs overflow-y-auto custom-scrollbar">
            ${items.map((item) => `
                <a class="flex items-center gap-md px-md py-base rounded-lg mx-2 transition-all active:scale-[0.98] ${item.label === activeItem ? activeClass : inactiveClass}" href="${item.href}">
                    <span class="material-symbols-outlined ${item.label === 'AI Insights' ? 'text-ai-gold' : ''}">${item.icon}</span>
                    <span class="font-label-bold text-label-bold">${item.label}</span>
                </a>
            `).join('')}
        </nav>
        <div class="mt-auto px-sm py-lg border-t border-border-default space-y-xs">
            <a class="flex items-center gap-md px-md py-base text-text-secondary hover:bg-surface-container-highest rounded-lg mx-2 transition-all" href="dashboard_user.html">
                <span class="material-symbols-outlined">contact_support</span>
                <span class="font-label-bold text-label-bold">Help Center</span>
            </a>
            <a class="flex items-center gap-md px-md py-base text-error hover:bg-error-container rounded-lg mx-2 transition-all" href="login.html">
                <span class="material-symbols-outlined">logout</span>
                <span class="font-label-bold text-label-bold">Log Out</span>
            </a>
        </div>
    `;

    document.body.prepend(sidebar);
    sidebar.querySelector('[data-nav="create_ticket.html"]').addEventListener('click', () => {
        window.location.href = 'create_ticket.html';
    });

    const topBar = document.querySelector('body > header, body > nav');
    if (topBar) {
        topBar.style.marginLeft = '240px';
        topBar.style.width = 'calc(100% - 240px)';
    }

    const bodyMain = document.querySelector('body > main');
    if (bodyMain && !bodyMain.className.includes('ml-sidebar-width')) {
        bodyMain.style.marginLeft = '240px';
    }
})();
