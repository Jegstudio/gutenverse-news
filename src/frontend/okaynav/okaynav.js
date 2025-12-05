class OkayNav {
    constructor(element, options = {}) {
        this.nav = element;
        this.options = Object.assign({
            toggleIconClass: 'okayNav__menu-toggle',
            toggleIconContent: '<span></span><span></span><span></span>',
            alignRight: true,
            threshold: 30,
            beforeOpen: () => { },
            afterOpen: () => { },
            beforeClose: () => { },
            afterClose: () => { },
            itemHidden: () => { },
            itemDisplayed: () => { },
        }, options);

        this.navOpen = false;
        this.parent = this.nav.parentElement;
        this._init();
    }

    _init() {
        document.body.classList.add('okayNav-loaded');
        this.nav.classList.add('okayNav', 'loaded');

        const navVisible = this.nav.querySelector('ul');
        navVisible.classList.add('okayNav__nav--visible');

        const invisibleClass = `okayNav__nav--invisible transition-enabled nav-${this.options.alignRight ? 'right' : 'left'}`;
        const invisibleList = document.createElement('ul');
        invisibleList.className = invisibleClass;

        const toggleBtn = document.createElement('a');
        toggleBtn.href = '#';
        toggleBtn.className = `${this.options.toggleIconClass} okay-invisible`;
        toggleBtn.innerHTML = this.options.toggleIconContent;
        toggleBtn.setAttribute('aria-label', 'Show all Category');

        if (this.options.alignRight) {
            this.nav.append(invisibleList, toggleBtn);
        } else {
            this.nav.prepend(toggleBtn, invisibleList);
        }

        this.navVisible = navVisible;
        this.navInvisible = invisibleList;
        this.toggleIcon = toggleBtn;

        this.toggleIconWidth = this.toggleIcon.offsetWidth;
        this.defaultWidth = this._getChildrenWidth(this.nav);
        this.parentFullWidth = this.parent.offsetWidth;
        this.lastVisibleChildWidth = 0;
        this._bindEvents();
        this.toggleIcon.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleInvisibleNav();
        });

        this._recalcNav();
    }

    _bindEvents() {
        this.documentClick = (e) => {
            if (!this.nav.contains(e.target) && this.navOpen) {
                this.closeInvisibleNav();
            }
        };

        this.windowResize = this._debounce(() => this._recalcNav(), 100);

        document.addEventListener('click', this.documentClick);
        window.addEventListener('resize', this.windowResize);
    }

    destroy() {
        // Remove event listeners
        document.removeEventListener('click', this.documentClick);
        window.removeEventListener('resize', this.windowResize);

        // Move all children from invisible list back to visible list
        if (this.navInvisible && this.navInvisible.children.length > 0) {
            const children = Array.from(this.navInvisible.children);
            children.forEach(child => {
                this.navVisible.appendChild(child);
            });
        }

        // Remove elements created by OkayNav
        if (this.navInvisible) {
            this.navInvisible.remove();
        }
        if (this.toggleIcon) {
            this.toggleIcon.remove();
        }

        // Remove classes added by OkayNav
        this.nav.classList.remove('okayNav', 'loaded');
        if (this.navVisible) {
            this.navVisible.classList.remove('okayNav__nav--visible');
        }
        document.body.classList.remove('okayNav-loaded');
    }

    openInvisibleNav() {
        this.options.beforeOpen();
        this.toggleIcon.classList.add('icon--active');
        this.navInvisible.classList.add('nav-open');
        this.navOpen = true;
        this.options.afterOpen();
    }

    closeInvisibleNav() {
        this.options.beforeClose();
        this.toggleIcon.classList.remove('icon--active');
        this.navInvisible.classList.remove('nav-open');
        this.navOpen = false;
        this.options.afterClose();
    }

    toggleInvisibleNav() {
        this.navOpen ? this.closeInvisibleNav() : this.openInvisibleNav();
    }

    _getChildrenWidth(el) {
        let width = 0;
        [...el.children].forEach(child => {
            width += child.offsetWidth;
        });
        return width;
    }

    _getVisibleItemCount() {
        return this.navVisible.querySelectorAll('li').length;
    }

    _getHiddenItemCount() {
        return this.navInvisible.querySelectorAll('li').length;
    }

    _recalcNav() {
        const wrapperWidth = this.parent.offsetWidth * this.options.threshold / 100;
        const navFullWidth = this.nav.offsetWidth;
        const visibleCount = this._getVisibleItemCount();

        if (visibleCount > 0 && navFullWidth >= wrapperWidth) {
            this._collapseNavItem();
            this._recalcNav();
        }

        if (this._getHiddenItemCount() === 0) {
            this.toggleIcon.classList.add('okay-invisible');
        } else {
            this.toggleIcon.classList.remove('okay-invisible');
        }
    }

    _collapseNavItem() {
        const last = this.navVisible.querySelector('li:last-child');
        if (!last) return;
        this.lastVisibleChildWidth = last.offsetWidth;
        this.navInvisible.prepend(last);
        this.options.itemHidden();
    }

    _debounce(fn, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    }
}

export default OkayNav;