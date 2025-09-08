// Community Bridge Documentation Site - Markdown Enhanced Version (Clean)
class CommunityBridgeDocumentation {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.currentModule = null;
        this.allModules = {};
        this.searchIndex = [];
        this.isLoading = false;
        this.currentModuleToc = null;
        this.currentModuleName = null;

        this.init();
    }

    async init() {
        console.log('🚀 Initializing Community Bridge Documentation...');

        try {
            // Cleanup previous instance if exists
            this.cleanup();

            this.setupTheme();
            this.setupBasicEventListeners();
            await this.loadModuleStructure();
            this.setupRouter();
            
            // Only load default content if no hash is present
            if (!window.location.hash) {
                this.loadInitialContent();
            }
            
            console.log('✅ Initialization complete!');
        } catch (error) {
            console.error('❌ Initialization failed:', error);
            this.showError('Failed to initialize documentation site');
        }
    }

    cleanup() {
        // Remove click-outside handler if it exists
        if (this.clickOutsideHandler) {
            document.removeEventListener('click', this.clickOutsideHandler);
            this.clickOutsideHandler = null;
        }
    }

    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        const darkIcon = document.querySelector('.theme-toggle-dark');
        const lightIcon = document.querySelector('.theme-toggle-light');
        
        if (darkIcon && lightIcon) {
            if (this.currentTheme === 'dark') {
                darkIcon.style.display = 'none';
                lightIcon.style.display = 'block';
            } else {
                darkIcon.style.display = 'block';
                lightIcon.style.display = 'none';
            }
        }
    }

    setupBasicEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Setup mobile navigation toggle
        this.setupMobileNavigation();
        
        this.setupSearchInput();
    }

    setupMobileNavigation() {
        const mobileToggle = document.getElementById('mobile-nav-toggle');
        const sidebar = document.getElementById('sidebar');
        const mobileOverlay = document.getElementById('mobile-overlay');
        
        if (mobileToggle && sidebar) {
            // Toggle sidebar on burger menu click
            mobileToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });

            // Close sidebar when clicking on overlay
            if (mobileOverlay) {
                mobileOverlay.addEventListener('click', () => {
                    sidebar.classList.remove('open');
                });
            }

            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', (e) => {
                const isClickInsideSidebar = sidebar.contains(e.target);
                const isClickOnToggle = mobileToggle.contains(e.target);
                const isClickOnOverlay = mobileOverlay && mobileOverlay.contains(e.target);
                
                if (!isClickInsideSidebar && !isClickOnToggle && !isClickOnOverlay && sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                }
            });

            // Close sidebar when clicking on navigation links
            const updateNavLinks = () => {
                const navLinks = sidebar.querySelectorAll('.nav-item, .nav-section-header, .nav-subsection-header');
                navLinks.forEach(link => {
                    // Remove existing listeners to prevent duplicates
                    link.removeEventListener('click', this.closeMobileSidebar);
                    link.addEventListener('click', this.closeMobileSidebar);
                });
            };

            // Store reference for cleanup
            this.closeMobileSidebar = () => {
                sidebar.classList.remove('open');
            };

            // Initial setup
            updateNavLinks();

            // Update links when navigation is re-rendered
            this.updateMobileNavLinks = updateNavLinks;
        }
    }

    setupSearchInput() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            const newSearchInput = searchInput.cloneNode(true);
            searchInput.parentNode.replaceChild(newSearchInput, searchInput);

            newSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length > 0) {
                    this.handleSearch(query);
                } else {
                    this.hideSearchResults();
                }
            });

            newSearchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.hideSearchResults();
                    e.target.blur();
                }
            });

            // Add click-outside functionality to close search
            this.setupSearchClickOutside(newSearchInput);

            console.log('🔍 Search input configured');
        } else {
            console.warn('⚠️ Search input not found');
        }
    }

    setupSearchClickOutside(searchInput) {
        // Remove any existing click handler
        if (this.clickOutsideHandler) {
            document.removeEventListener('click', this.clickOutsideHandler);
        }

        this.clickOutsideHandler = (event) => {
            const searchResults = document.querySelector('.search-results');
            const searchContainer = searchInput.closest('.search-container') || searchInput.parentElement;

            // Check if click is outside search input and search results
            const isClickInsideSearch = searchContainer && searchContainer.contains(event.target);
            const isClickInsideResults = searchResults && searchResults.contains(event.target);

            if (!isClickInsideSearch && !isClickInsideResults) {
                this.hideSearchResults();
            }
        };

        document.addEventListener('click', this.clickOutsideHandler);
        console.log('👆 Click-outside handler for search configured');
    }

    setupNavigationEvents() {
        console.log('🎯 Setting up navigation click handlers...');

        const sectionHeaders = document.querySelectorAll('.nav-section-header');
        console.log('📂 Found section headers:', sectionHeaders.length);

        sectionHeaders.forEach((header) => {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                const section = header.closest('.nav-section');
                if (section) {
                    section.classList.toggle('collapsed');
                    section.classList.toggle('expanded');
                    // CSS handles the arrow rotation via ::after pseudo-element
                }
            });
        });

        const subsectionHeaders = document.querySelectorAll('.nav-subsection-header');
        console.log('📦 Found subsection headers:', subsectionHeaders.length);

        subsectionHeaders.forEach((header) => {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                const subsection = header.closest('.nav-subsection');
                if (subsection) {
                    subsection.classList.toggle('collapsed');
                    subsection.classList.toggle('expanded');
                    // CSS handles the arrow rotation via ::after pseudo-element
                }
            });
        });

        const navItems = document.querySelectorAll('.nav-item');
        console.log('🔗 Found nav items:', navItems.length);

        navItems.forEach((navItem) => {
            navItem.addEventListener('click', (e) => {
                e.preventDefault();
                const path = navItem.getAttribute('data-path');
                const type = navItem.getAttribute('data-type');

                if (path) {
                    console.log('📄 Nav item clicked:', path, type);
                    this.navigateToPath(path);
                }
            });
        });

        console.log('✅ Navigation events attached successfully');
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.setupTheme(); // Update icon display
    }

    async loadModuleStructure() {
        console.log('📋 Starting loadModuleStructure...');
        this.setLoading(true);

        try {
            console.log('🔍 Starting discoverPagesStructure...');
            const structure = await this.discoverPagesStructure();

            this.allModules = structure;
            console.log('📋 Module structure loaded:', this.allModules);

            this.renderNavigation();
            await this.buildSearchIndex();

            console.log('✅ Module structure loaded successfully');
        } catch (error) {
            console.error('❌ Error loading module structure:', error);
            this.showError('Failed to load documentation structure');
        } finally {
            this.setLoading(false);
        }
    }

    async discoverPagesStructure() {
        console.log('🔍 Starting discoverPagesStructure...');
        const structure = {};

        try {
            // Create Community Bridge as the main section
            structure['Community Bridge'] = {
                icon: 'fas fa-bridge',
                items: {},
                type: 'section'
            };

            // Add top-level Community Bridge files
            const topLevelFiles = ['overview', 'getting-started'];
            for (const fileName of topLevelFiles) {
                try {
                    const response = await fetch(`./assets/pages/Community Bridge/${fileName}.md`);
                    if (response.ok) {
                        const content = await response.text();
                        const icon = this.extractIconFromMarkdown(content) || 'fas fa-file-alt';

                        structure['Community Bridge'].items[fileName] = {
                            path: `Community Bridge/${fileName}`,
                            type: 'markdown',
                            name: this.formatTitle(fileName),
                            icon: icon
                        };
                        console.log(`✅ Found top-level file: ${fileName}.md with icon: ${icon}`);
                    }
                } catch (e) {
                    // File doesn't exist, continue
                }
            }

            // Discover all subsections under Community Bridge
            await this.discoverSubsection(structure, 'Libraries', 'fas fa-book');
            await this.discoverSubsection(structure, 'Modules', 'fas fa-cubes');

            // Create The Orders Recipe as a separate main section
            structure['The Orders Recipe'] = {
                icon: 'fas fa-utensils',
                items: {},
                type: 'section'
            };

            // Discover The Orders Recipe content
            await this.discoverOrdersRecipeSection(structure);

            // Discover root-level pages
            await this.discoverRootLevelPages(structure);

        } catch (error) {
            console.error('❌ Error in discoverPagesStructure:', error);
        }

        return structure;
    }

    async discoverSubsection(structure, folderName, folderIcon) {
        console.log(`🔍 Discovering ${folderName} content...`);

        const folderItems = {};
        const knownModules = {
            'Libraries': ['Anim', 'Batch', 'Behaviors', 'Cache', 'Callback', 'Cutscenes', 'Entities', 'Ids', 'Logs', 'Markers', 'Math', 'Particles', 'Placers', 'Point', 'Raycast', 'Scaleform', 'Shells', 'SQL', 'Table', 'Utility'],
            'Modules': ['Banking', 'BossMenu', 'Clothing', 'Dialogue', 'Dispatch', 'Doorlock', 'Framework', 'Fuel', 'HelpText', 'Housing', 'Input', 'Inventory', 'Locales', 'Math', 'Menu', 'Notify', 'Phone', 'ProgressBar', 'Shops', 'Skills', 'Target', 'VehicleKey', 'Version', 'Weather']
        };

        if (knownModules[folderName]) {
            for (const moduleName of knownModules[folderName]) {
                try {
                    // Try the main pattern: Libraries/Anim/anim.md
                    const mainPath = `./assets/pages/Community Bridge/${folderName}/${moduleName}/${moduleName.toLowerCase()}.md`;
                    const response = await fetch(mainPath);
                    if (response.ok) {
                        const content = await response.text();
                        const icon = this.extractIconFromMarkdown(content) || '📄';

                        folderItems[moduleName] = {
                            path: `Community Bridge/${folderName}/${moduleName}/${moduleName.toLowerCase()}`,
                            type: 'markdown',
                            name: moduleName,
                            icon: icon
                        };
                        console.log(`✅ Found module: ${folderName}/${moduleName}/${moduleName.toLowerCase()}.md with icon: ${icon}`);
                    }
                } catch (e) {
                    // File doesn't exist, continue
                }
            }
        }

        if (Object.keys(folderItems).length > 0) {
            structure['Community Bridge'].items[folderName] = {
                icon: folderIcon,
                items: folderItems,
                type: 'subsection',
                name: folderName
            };
            console.log(`✅ Added ${folderName} subsection with ${Object.keys(folderItems).length} items`);
        }
    }

    async discoverOrdersRecipeSection(structure) {
        console.log('🔍 Discovering The Orders Recipe content...');

        const recipeFiles = ['overview', 'getting-started', 'video-tutorials'];
        
        for (const fileName of recipeFiles) {
            try {
                const response = await fetch(`./assets/pages/The Orders Recipe/${fileName}.md`);
                if (response.ok) {
                    const content = await response.text();
                    const icon = this.extractIconFromMarkdown(content) || '🍳';

                    structure['The Orders Recipe'].items[fileName] = {
                        path: `The Orders Recipe/${fileName}`,
                        type: 'markdown',
                        name: this.formatTitle(fileName),
                        icon: icon
                    };
                    console.log(`✅ Found Orders Recipe file: ${fileName}.md with icon: ${icon}`);
                }
            } catch (e) {
                console.log(`⚠️ Orders Recipe file not found: ${fileName}.md`);
            }
        }

        console.log(`✅ Added The Orders Recipe section with ${Object.keys(structure['The Orders Recipe'].items).length} items`);
    }

    async discoverRootLevelPages(structure) {
        console.log('🔍 Discovering root-level pages...');

        // List of root-level pages to check
        const rootPages = ['contributors-and-partners'];
        
        for (const fileName of rootPages) {
            try {
                const response = await fetch(`./assets/pages/${fileName}.md`);
                if (response.ok) {
                    const content = await response.text();
                    const icon = this.extractIconFromMarkdown(content) || '📄';

                    // Add as a top-level section
                    structure[this.formatTitle(fileName)] = {
                        path: fileName,
                        type: 'markdown',
                        name: this.formatTitle(fileName),
                        icon: icon
                    };
                    console.log(`✅ Found root-level page: ${fileName}.md with icon: ${icon}`);
                }
            } catch (e) {
                console.log(`⚠️ Root-level page not found: ${fileName}.md`);
            }
        }
    }

    async discoverSimpleFolder(structure, folderName) {
        console.log(`🔍 Discovering simple folder: ${folderName}`);

        try {
            // Try to load toc.json first
            // try {
            //     const tocResponse = await fetch(`./assets/pages/${folderName}/toc.json`);
            //     if (tocResponse.ok) {
            //         const tocData = await tocResponse.json();
            //         for (const [fileName, fileData] of Object.entries(tocData)) {
            //             // Try to load the actual file to extract icon
            //             let icon = '📄'; // default
            //             try {
            //                 const fileResponse = await fetch(`./assets/pages/${folderName}/${fileName}.md`);
            //                 if (fileResponse.ok) {
            //                     const content = await fileResponse.text();
            //                     icon = this.extractIconFromMarkdown(content) || '📄';
            //                 }
            //             } catch (e) {
            //                 // Use default icon if file can't be loaded
            //             }

            //             structure[folderName].items[fileName] = {
            //                 path: `${folderName}/${fileName}`,
            //                 type: 'markdown',
            //                 name: fileData.name || this.formatTitle(fileName),
            //                 icon: icon
            //             };
            //             console.log(`✅ Added from toc: ${fileName} with icon: ${icon}`);
            //         }
            //         return;
            //     }
            // } catch (e) {
            //     console.log(`No toc.json found for ${folderName}, discovering files...`);
            // }

            // If no toc.json, discover markdown files directly
            const commonFiles = ['index', 'basic-usage', 'advanced'];
            for (const fileName of commonFiles) {
                try {
                    const response = await fetch(`./assets/pages/${folderName}/${fileName}.md`);
                    if (response.ok) {
                        const content = await response.text();
                        const icon = this.extractIconFromMarkdown(content) || '📄';

                        structure[folderName].items[fileName] = {
                            path: `${folderName}/${fileName}`,
                            type: 'markdown',
                            name: this.formatTitle(fileName),
                            icon: icon
                        };
                        console.log(`✅ Found file: ${fileName}.md in ${folderName} with icon: ${icon}`);
                    }
                } catch (e) {
                    // File doesn't exist, continue
                }
            }
        } catch (error) {
            console.error(`❌ Error discovering ${folderName}:`, error);
        }
    }

    extractIconFromMarkdown(content) {
        // Look for Font Awesome icons in header pattern: # <i class="fas fa-icon"></i> ModuleName
        const faHeaderMatch = content.match(/^#\s+<i\s+class="([^"]+)"><\/i>/m);
        
        if (faHeaderMatch) {
            console.log(`🎯 Found Font Awesome icon: ${faHeaderMatch[1]}`);
            return faHeaderMatch[1];
        }

        // Look for emoji patterns in headers: # ModuleName 🎯 or # 🎯 ModuleName
        const emojiHeaderMatch = content.match(/^#\s*(?:(\w+)\s+)?([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/mu);

        if (emojiHeaderMatch) {
            console.log(`🎯 Found emoji icon in header: ${emojiHeaderMatch[2]}`);
            return emojiHeaderMatch[2];
        }

        // Fallback: look for any emoji in the first few lines
        const lines = content.split('\n').slice(0, 5);
        for (const line of lines) {
            const emojiMatch = line.match(/([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u);
            if (emojiMatch) {
                console.log(`🎯 Found fallback emoji icon: ${emojiMatch[1]}`);
                return emojiMatch[1];
            }
        }

        return null; // No icon found
    }

    renderNavigation() {
        const navMenu = document.getElementById('nav-menu');
        if (!navMenu) {
            console.error('❌ Navigation menu element not found');
            return;
        }

        let html = '';
        let contributorsHtml = '';

        for (const [categoryName, categoryData] of Object.entries(this.allModules)) {
            // Special handling for Contributors and Partners - render at bottom
            if (categoryName.toLowerCase().includes('contributors') || categoryName.toLowerCase().includes('partners')) {
                if (categoryData.type === 'markdown') {
                    const iconHtml = this.renderIcon(categoryData.icon || 'fas fa-users');
                    contributorsHtml = `
                        <div class="nav-item nav-item-bottom" data-path="${categoryData.path}" data-type="markdown">
                            <span class="nav-icon">${iconHtml}</span>
                            <span class="nav-title">${categoryData.name || categoryName}</span>
                        </div>
                    `;
                }
                continue; // Skip normal rendering for this item
            }

            // Handle root-level pages (direct markdown files)
            if (categoryData.type === 'markdown') {
                const iconHtml = this.renderIcon(categoryData.icon || 'fas fa-file-alt');
                html += `
                    <div class="nav-item" data-path="${categoryData.path}" data-type="markdown">
                        <span class="nav-icon">${iconHtml}</span>
                        <span class="nav-title">${categoryData.name || categoryName}</span>
                    </div>
                `;
            } else {
                // Handle sections with sub-items
                const iconHtml = this.renderIcon(categoryData.icon || '📁');
                html += `
                    <div class="nav-section expanded" data-category="${categoryName}">
                        <div class="nav-section-header" data-category="${categoryName}">
                            <span class="nav-icon">${iconHtml}</span>
                            <span class="nav-title">${categoryName}</span>
                        </div>
                        <div class="nav-items">
                            ${this.renderNavItems(categoryData.items || {})}
                        </div>
                    </div>
                `;
            }
        }

        // Add contributors at the bottom with special styling
        if (contributorsHtml) {
            html += `
                <div class="nav-bottom-section">
                    ${contributorsHtml}
                </div>
            `;
        }

        navMenu.innerHTML = html;

        // IMPORTANT: Set up navigation events AFTER rendering
        this.setupNavigationEvents();

        // Update mobile navigation links
        if (this.updateMobileNavLinks) {
            this.updateMobileNavLinks();
        }

        console.log('🎨 Navigation rendered successfully');
    }

    renderIcon(icon) {
        if (!icon) return '📄';
        
        // Check if the icon includes a color parameter (syntax: "fas fa-icon|#color" or "fas fa-icon|colorname")
        let iconClass = icon;
        let color = '';
        
        if (icon.includes('|')) {
            const parts = icon.split('|');
            iconClass = parts[0];
            color = parts[1];
        }
        
        // Check if it's a Font Awesome icon class
        if (iconClass.includes('fa-') || iconClass.includes('fas ') || iconClass.includes('far ') || iconClass.includes('fab ') || iconClass.includes('fal ') || iconClass.includes('fad ')) {
            const style = color ? ` style="color: ${color};"` : '';
            return `<i class="${iconClass}"${style}></i>`;
        }
        
        // Check if it's already HTML (Font Awesome wrapped in <i> tags)
        if (iconClass.startsWith('<i ') && iconClass.includes('class=') && iconClass.endsWith('</i>')) {
            return iconClass;
        }
        
        // For emojis and plain text, return as-is
        return iconClass;
    }

    renderNavItems(items) {
        let html = '';

        for (const [itemName, itemData] of Object.entries(items)) {
            if (itemData.type === 'subsection' && itemData.items) {
                html += `
                    <div class="nav-subsection collapsed" data-subsection="${itemName}">
                        <div class="nav-subsection-header" data-subsection="${itemName}">
                            <span class="nav-icon">${this.renderIcon(itemData.icon || '📁')}</span>
                            <span class="nav-title">${itemName}</span>
                        </div>
                        <div class="nav-items">
                            ${this.renderNavItems(itemData.items)}
                        </div>
                    </div>
                `;
            } else if (itemData.type === 'markdown') {
                html += `
                    <div class="nav-item" data-path="${itemData.path}" data-type="markdown">
                        <span class="nav-icon">${this.renderIcon(itemData.icon || '📄')}</span>
                        <span class="nav-title">${itemData.name || this.formatTitle(itemName)}</span>
                    </div>
                `;
            }
        }

        return html;
    }

    setupRouter() {
        window.addEventListener('hashchange', () => this.handleRouteChange());
        
        // Handle initial hash on page load
        if (window.location.hash) {
            this.handleRouteChange();
        }
    }

    handleRouteChange() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            // Decode URL encoding (e.g., %20 -> space)
            const decodedHash = decodeURIComponent(hash);
            
            // Check if hash contains an anchor (using @ as separator)
            if (decodedHash.includes('@')) {
                const [path, anchor] = decodedHash.split('@');
                this.navigateToFunction(path, anchor, false); // Don't update URL
            } else {
                this.navigateToPath(decodedHash, false); // Don't update URL since we're responding to URL change
            }
        }
    }

    async navigateToPath(path, updateUrl = true) {
        console.log('🎯 Navigating to:', path);
        
        // Update URL if needed (avoid infinite loops from hashchange events)
        if (updateUrl) {
            const newHash = `#${path}`;
            if (window.location.hash !== newHash) {
                window.location.hash = newHash;
            }
        }
        
        const item = this.findNavigationItem(path);
        if (item) {
            await this.loadContent(path, item.type, item);
        } else {
            console.warn('⚠️ Could not find navigation item for path:', path);
            this.showError(`Page not found: ${path}`);
        }
    }

    findNavigationItem(targetPath) {
        const searchItems = (items) => {
            for (const [key, item] of Object.entries(items)) {
                const itemPath = item.path ? item.path.replace('.md', '') : '';
                if (itemPath === targetPath) {
                    return item;
                } else if (item.items) {
                    const found = searchItems(item.items);
                    if (found) return found;
                }
            }
            return null;
        };

        for (const [category, categoryData] of Object.entries(this.allModules)) {
            // Check if this is a root-level page
            if (categoryData.type === 'markdown' && categoryData.path === targetPath) {
                return categoryData;
            }
            
            // Search within section items
            const found = searchItems(categoryData.items || {});
            if (found) return found;
        }
        return null;
    }

    async loadContent(path, type, item) {
        this.setLoading(true);

        try {
            console.log(`📄 Loading content for: ${path}`);

            // Try to load markdown content
            const markdownContent = await this.loadMarkdownContent(path);

            // Set current module info
            this.currentModule = item;
            this.currentModuleName = path.split('/').pop();

            // Render the content
            this.renderMarkdownContent(markdownContent, path);

            console.log(`✅ Content loaded successfully for: ${path}`);
        } catch (error) {
            console.error(`❌ Error loading content for ${path}:`, error);
            this.showError(`Failed to load content for: ${path}`);
        } finally {
            this.setLoading(false);
        }
    }

    async loadMarkdownContent(path) {
        try {
            console.log(`📄 Loading markdown content: ${path}`);
            const response = await fetch(`./assets/pages/${path}.md`);

            if (!response.ok) {
                throw new Error(`Failed to load ${path}: ${response.status}`);
            }

            const content = await response.text();

            return {
                content: content,
                meta: this.parseMarkdownMeta(content)
            };
        } catch (error) {
            console.error(`❌ Error loading markdown content for ${path}:`, error);
            throw error;
        }
    }

    parseMarkdownMeta(content) {
        const meta = {};
        const metaMatch = content.match(/<!--META\s*([\s\S]*?)\s*-->/);
        if (metaMatch) {
            const metaContent = metaMatch[1];
            const lines = metaContent.split('\n');

            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.includes(':')) {
                    const [key, ...valueParts] = trimmed.split(':');
                    const value = valueParts.join(':').trim();

                    if (value === 'true' || value === 'false') {
                        meta[key.trim()] = value === 'true';
                    } else {
                        meta[key.trim()] = value;
                    }
                }
            }
        }

        return meta;
    }

    renderMarkdownContent(markdownData, modulePath) {
        const contentArea = document.getElementById('content-area');
        if (!contentArea) return;

        // Initialize marked.js with our configuration
        this.initializeMarked();

        // Parse functions from markdown first (before cleaning)
        const functions = this.parseFunctionsFromMarkdown(markdownData.content);

        // Convert markdown to HTML using marked.js
        let html = this.convertMarkdownToHTML(markdownData.content);

        // Add functions section if functions exist
        if (functions.length > 0) {
            html += '<h2 id="functions-section">Functions</h2>';
            html += functions.map(func => this.renderFunction(func, func.side, this.currentModuleName)).join('');
        }

        // Set content
        contentArea.innerHTML = html;
        
        // Load GitHub contributors if this is the contributors page
        if (modulePath.includes('contributors-and-partners')) {
            this.loadGitHubContributors();
        }
        
        // Apply syntax highlighting with highlight.js
        setTimeout(() => {
            contentArea.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);
            });
            
            // Generate TOC after content is rendered and DOM is updated
            this.updateTableOfContents(functions);
            
            // Setup copy buttons after everything is rendered
            this.setupCopyLinkButtons();
        }, 50);

        // Update current module info
        this.currentModule = markdownData;
        this.currentModuleName = modulePath.split('/').pop();
    }

    initializeMarked() {
        // Configure marked.js options
        marked.setOptions({
            highlight: function(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(code, { language: lang }).value;
                    } catch (err) {}
                }
                return hljs.highlightAuto(code).value;
            },
            langPrefix: 'hljs language-',
            breaks: false,
            gfm: true,
            tables: true,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });

        // Custom renderer for better control
        const renderer = new marked.Renderer();

        // Custom heading renderer with anchor support
        renderer.heading = function(text, level) {
            // Remove emojis and special chars for ID, but keep original text for display
            const escapedText = text.toLowerCase()
                .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
                .replace(/[^\w]+/g, '-')
                .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes

            let className = '';

            if (level === 4) {
                className = ' class="section-header"';
            }

            return `<h${level}${className} id="${escapedText}">${text}</h${level}>`;
        };

        // Custom table renderer with our styling
        renderer.table = function(header, body) {
            return `<div class="table-container">
                <table class="content-table">
                    <thead>${header}</thead>
                    <tbody>${body}</tbody>
                </table>
            </div>`;
        };

        // Custom code block renderer with copy button
        renderer.code = function(code, lang) {
            const language = lang || 'text';
            return `<div class="code-block-container">
                <button class="copy-button">Copy</button>
                <pre><code class="hljs language-${language}">${code}</code></pre>
            </div>`;
        };

        marked.use({ renderer });
    }

    parseFunctionsFromMarkdown(markdown) {
        console.log('🔧 Parsing functions from markdown...');
        console.log('📄 Markdown content length:', markdown.length);

        const functions = [];

        // Parse markdown function documentation using headers and structured content
        // Look for function patterns like:
        // ## FunctionName (Client/Server/Shared)
        // ### Description
        // ### Syntax
        // ### Parameters
        // ### Returns
        // ### Example

        const sections = this.splitMarkdownBySections(markdown);

        for (const section of sections) {
            const func = this.parseMarkdownFunctionSection(section);
            if (func) {
                functions.push(func);
            }
        }

        console.log(`✅ Successfully parsed functions: ${functions.length}`);
        return functions;
    }

    splitMarkdownBySections(markdown) {
        // Split markdown by ## headers (function definitions)
        const sections = [];
        const lines = markdown.split('\n');
        let currentSection = [];

        for (const line of lines) {
            if (line.match(/^##\s+\w+.*\((Client|Server|Shared)\)/i)) {
                if (currentSection.length > 0) {
                    sections.push(currentSection.join('\n'));
                }
                currentSection = [line];
            } else {
                currentSection.push(line);
            }
        }

        if (currentSection.length > 0) {
            sections.push(currentSection.join('\n'));
        }

        return sections;
    }

    parseMarkdownFunctionSection(section) {
        const lines = section.split('\n');
        const headerLine = lines[0];

        // Parse function header: ## FunctionName (Client/Server/Shared)
        // Updated regex to capture function names with dots like LootTable.GetRandomItemsWithLimit
        const headerMatch = headerLine.match(/^##\s+([^\s(]+).*\((Client|Server|Shared)\)/i);
        if (!headerMatch) {
            return null;
        }

        const fullName = headerMatch[1];
        const side = headerMatch[2].toLowerCase();

        // Extract just the function name part (after the last dot if present)
        const nameParts = fullName.split('.');
        const functionName = nameParts[nameParts.length - 1];

        const func = {
            name: functionName,
            fullName: fullName, // Keep the full name for display
            side: side,
            description: '',
            syntax: '',
            parameters: [],
            returns: [],
            example: ''
        };

        let currentSection = 'description';
        let currentContent = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];

            if (line.match(/^###\s+Description/i)) {
                currentSection = 'description';
                currentContent = [];
            } else if (line.match(/^###\s+Syntax/i)) {
                if (currentContent.length > 0) {
                    func.description = currentContent.join('\n').trim();
                }
                currentSection = 'syntax';
                currentContent = [];
            } else if (line.match(/^###\s+Parameters/i)) {
                if (currentContent.length > 0 && currentSection === 'syntax') {
                    func.syntax = this.extractCodeFromContent(currentContent.join('\n'));
                }
                currentSection = 'parameters';
                currentContent = [];
            } else if (line.match(/^###\s+Returns/i)) {
                if (currentContent.length > 0 && currentSection === 'parameters') {
                    func.parameters = this.parseParametersFromMarkdown(currentContent.join('\n'));
                }
                currentSection = 'returns';
                currentContent = [];
            } else if (line.match(/^###\s+Example/i)) {
                if (currentContent.length > 0 && currentSection === 'returns') {
                    func.returns = this.parseReturnsFromMarkdown(currentContent.join('\n'));
                } else if (currentContent.length > 0 && currentSection === 'parameters') {
                    func.parameters = this.parseParametersFromMarkdown(currentContent.join('\n'));
                }
                currentSection = 'example';
                currentContent = [];
            } else if (line.trim() !== '') {
                currentContent.push(line);
            }
        }

        // Handle the last section
        if (currentContent.length > 0) {
            switch (currentSection) {
                case 'description':
                    func.description = currentContent.join('\n').trim();
                    break;
                case 'syntax':
                    func.syntax = this.extractCodeFromContent(currentContent.join('\n'));
                    break;
                case 'parameters':
                    func.parameters = this.parseParametersFromMarkdown(currentContent.join('\n'));
                    break;
                case 'returns':
                    func.returns = this.parseReturnsFromMarkdown(currentContent.join('\n'));
                    break;
                case 'example':
                    func.example = this.extractCodeFromContent(currentContent.join('\n'));
                    break;
            }
        }

        return func;
    }

    extractCodeFromContent(content) {
        // Extract code from markdown code blocks
        const codeBlockMatch = content.match(/```(?:lua|javascript|js)?\s*([\s\S]*?)\s*```/);
        if (codeBlockMatch) {
            return codeBlockMatch[1].trim();
        }

        // Extract code from inline code
        const inlineCodeMatch = content.match(/`([^`]+)`/);
        if (inlineCodeMatch) {
            return inlineCodeMatch[1];
        }

        // Return plain text if no code blocks found
        return content.trim();
    }

    parseParametersFromMarkdown(content) {
        const parameters = [];

        // Look for list items with parameter information
        // Format: - **paramName** (type): description (parent parameters)
        // Format: -- **paramName** (type): description (nested parameters)
        const paramRegex = /(--?)\s*\*\*(\w+)\*\*\s*\(([^)]+)\):\s*(.+)/gi;
        let match;

        while ((match = paramRegex.exec(content)) !== null) {
            const isNested = match[1] === '--';
            parameters.push({
                name: match[2],
                type: match[3].trim(),
                description: match[4].trim(),
                nested: isNested
            });
        }

        // Alternative format: - paramName (type) - description
        if (parameters.length === 0) {
            const altParamRegex = /(--?)\s*(\w+)\s*\(([^)]+)\)\s*[-–—]\s*(.+)/gi;
            while ((match = altParamRegex.exec(content)) !== null) {
                const isNested = match[1] === '--';
                parameters.push({
                    name: match[2],
                    type: match[3].trim(),
                    description: match[4].trim(),
                    nested: isNested
                });
            }
        }

        return parameters;
    }

    parseReturnsFromMarkdown(content) {
        const returns = [];

        // Look for return type information
        // Format: - (type): description
        const returnRegex = /[-*]\s*\(([^)]+)\):\s*(.+)/gi;
        let match;

        while ((match = returnRegex.exec(content)) !== null) {
            returns.push({
                type: match[1].trim(),
                description: match[2].trim()
            });
        }

        // Alternative format: Returns type - description
        if (returns.length === 0) {
            const altReturnRegex = /Returns?\s+(\w+)\s*[-–—]\s*(.+)/gi;
            while ((match = altReturnRegex.exec(content)) !== null) {
                returns.push({
                    type: match[1],
                    description: match[2].trim()
                });
            }
        }

        return returns;
    }

    convertMarkdownToHTML(markdown) {
        console.log('🔧 Converting markdown to HTML with marked.js...');

        // Remove function sections before rendering regular markdown content
        // Function sections will be rendered separately as cards
        let cleanMarkdown = this.removeFunctionSections(markdown);

        // Remove META and TOC comments
        cleanMarkdown = cleanMarkdown.replace(/<!--META[\s\S]*?-->/g, '');
        cleanMarkdown = cleanMarkdown.replace(/<!--TOC:[\s\S]*?-->/g, '');

        // Use marked.js to convert markdown to HTML
        const html = marked.parse(cleanMarkdown);

        console.log('✅ Markdown conversion complete');
        return html;
    }

    removeFunctionSections(markdown) {
        // Remove function sections (## FunctionName (Side) ... until next non-function ## or end)
        const lines = markdown.split('\n');
        const cleanLines = [];
        let inFunctionSection = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Check if this line starts a function section
            if (line.match(/^##\s+\w+.*\((Client|Server|Shared)\)/i)) {
                inFunctionSection = true;
                continue;
            }

            // Check if this line starts a non-function section (like ## Overview)
            if (line.match(/^##\s+/) && !line.match(/\((Client|Server|Shared)\)/i)) {
                inFunctionSection = false;
                cleanLines.push(line);
                continue;
            }

            // If we're not in a function section, keep the line
            if (!inFunctionSection) {
                cleanLines.push(line);
            }
        }

        let cleanMarkdown = cleanLines.join('\n');

        // Clean up any leftover function-related content
        cleanMarkdown = cleanMarkdown.replace(/^## (Client|Server|Shared) Functions\s*$/gm, '');
        cleanMarkdown = cleanMarkdown.replace(/^Context:.*$/gm, '');
        cleanMarkdown = cleanMarkdown.replace(/^Syntax:.*$/gm, '');
        cleanMarkdown = cleanMarkdown.replace(/^Parameters:.*$/gm, '');
        cleanMarkdown = cleanMarkdown.replace(/^Returns:.*$/gm, '');
        cleanMarkdown = cleanMarkdown.replace(/^Example:.*$/gm, '');

        return cleanMarkdown;
    }

    renderFunction(func, side, moduleName = 'unknown') {
        const anchor = this.generateAnchor(func.name, side, moduleName);

        const parameters = func.parameters?.map(p => `
            <li class="${p.nested ? 'param-nested' : 'param-parent'}">
                <code>${p.name}</code>
                <span class="param-type">(${p.type})</span>
                ${p.optional ? '<span class="param-optional">optional</span>' : ''}
                - <span class="param-desc">${p.description}</span>
            </li>`).join('') || '<li>None</li>';

        const returns = func.returns?.map(r => `
            <li>
                <span class="param-type">(${r.type})</span>
                - <span class="param-desc">${r.description}</span>
            </li>`).join('') || '<li>None</li>';

        const example = func.example ?
            `<div class="code-block-container">
                <button class="copy-button">Copy</button>
                <pre><code class="lua">${Array.isArray(func.example) ? func.example.join('\n') : func.example}</code></pre>
            </div>` : '<p>No example provided.</p>';

        return `
            <div class="function-card" id="${anchor}">
                <div class="function-header">
                    <span class="function-name">${func.fullName || func.name}</span>
                    <div class="function-meta">
                        <span class="function-side ${side}">${side}</span>
                        <button class="copy-link-btn" title="Copy Link" data-anchor="${anchor}">🔗</button>
                    </div>
                </div>
                <div class="function-body">
                    <p class="function-description">${func.description || 'No description provided.'}</p>
                    <h4>Parameters</h4>
                    <ul class="param-list">${parameters}</ul>
                    <h4>Returns</h4>
                    <ul class="param-list">${returns}</ul>
                    <h4>Example</h4>
                    ${example}
                </div>
            </div>
        `;
    }

    generateAnchor(name, side, module) {
        return `${name}-${side}-${module}`.toLowerCase().replace(/[^a-z0-9-]/g, '');
    }

    updateTableOfContents(functions = []) {
        const tocContainer = document.getElementById('toc-container');
        const tocContent = document.getElementById('toc-content');

        if (!tocContainer || !tocContent) return;

        // Generate TOC from both content headers and functions
        const tocItems = this.generateTocItems(functions);

        if (tocItems.length === 0) {
            tocContainer.style.display = 'none';
            return;
        }

        tocContent.innerHTML = tocItems;
        tocContainer.style.display = 'block';

        // Add click handlers
        this.addTocClickHandlers(tocContainer);
    }

    generateTocItems(functions = []) {
        let tocHtml = '';

        // First, add content headers from the rendered HTML
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            const headers = contentArea.querySelectorAll('h2, h3, h4');
            const contentHeaders = [];

            headers.forEach(header => {
                // Skip the "Functions" header as we'll handle that separately
                if (header.textContent.trim() === 'Functions') return;

                const level = parseInt(header.tagName.charAt(1));
                const text = header.textContent.trim();
                const id = header.id || this.generateHeaderId(text);

                // Ensure the header has an ID for linking
                if (!header.id) {
                    header.id = id;
                }

                contentHeaders.push({
                    level: level,
                    text: text, // Use original text with emojis
                    id: id,
                    element: header
                });
            });

            // Generate hierarchical content TOC
            if (contentHeaders.length > 0) {
                const hierarchicalToc = this.buildHierarchicalToc(contentHeaders);

                tocHtml += `
                    <div class="toc-category">
                        <h4 class="toc-category-header">
                            <span class="toc-category-icon">📄</span>
                            Content
                            <span class="toc-count">(${contentHeaders.length})</span>
                        </h4>
                        <ul class="toc-list toc-category-list">
                            ${hierarchicalToc}
                        </ul>
                    </div>
                `;
            }
        }

        // Then, add functions if they exist
        if (functions.length > 0) {
            // Group functions by side (Client, Server, Shared)
            const groupedFunctions = {
                'Client': [],
                'Server': [],
                'Shared': []
            };

            functions.forEach(func => {
                const side = func.side.charAt(0).toUpperCase() + func.side.slice(1);
                if (groupedFunctions[side]) {
                    groupedFunctions[side].push(func);
                }
            });

            // Generate functions TOC
            for (const [category, categoryFunctions] of Object.entries(groupedFunctions)) {
                if (categoryFunctions.length > 0) {
                    const categoryIcon = {
                        'Client': '🖥️',
                        'Server': '⚙️',
                        'Shared': '🔄'
                    }[category];

                    tocHtml += `
                        <div class="toc-category">
                            <h4 class="toc-category-header">
                                <span class="toc-category-icon">${categoryIcon}</span>
                                ${category} Functions
                                <span class="toc-count">(${categoryFunctions.length})</span>
                            </h4>
                            <ul class="toc-list toc-category-list">
                                ${categoryFunctions.map(func => {
                                    const anchor = this.generateAnchor(func.name, func.side, this.currentModuleName);
                                    const displayName = func.fullName || func.name;
                                    return `<li><a href="#${anchor}" class="toc-link" data-side="${func.side}">${displayName}</a></li>`;
                                }).join('')}
                            </ul>
                        </div>
                    `;
                }
            }
        }

        return tocHtml;
    }

    buildHierarchicalToc(headers) {
        let tocHtml = '';
        let i = 0;

        while (i < headers.length) {
            const header = headers[i];

            // Check if this is a main header (h2)
            if (header.level === 2) {
                // Look for children (h3, h4)
                const children = [];
                let j = i + 1;

                while (j < headers.length && headers[j].level > 2) {
                    if (headers[j].level <= header.level) break;
                    children.push(headers[j]);
                    j++;
                }

                // Create collapsible section if there are children
                if (children.length > 0) {
                    const childrenHtml = this.buildChildrenToc(children);
                    tocHtml += `
                        <li class="toc-collapsible">
                            <div class="toc-header-with-toggle">
                                <button class="toc-toggle collapsed" aria-expanded="false">▶</button>
                                <a href="#${header.id}" class="toc-link main-header" data-level="${header.level}">${header.text}</a>
                            </div>
                            <ul class="toc-children collapsed">
                                ${childrenHtml}
                            </ul>
                        </li>
                    `;
                } else {
                    // Simple header without children
                    tocHtml += `<li class="toc-no-toggle"><a href="#${header.id}" class="toc-link" data-level="${header.level}">${header.text}</a></li>`;
                }

                i = j; // Skip processed children
            } else {
                // Standalone header (shouldn't happen with proper structure, but handle it)
                tocHtml += `<li><a href="#${header.id}" class="toc-link" data-level="${header.level}">${header.text}</a></li>`;
                i++;
            }
        }

        return tocHtml;
    }

    buildChildrenToc(children) {
        let childrenHtml = '';
        let i = 0;

        while (i < children.length) {
            const child = children[i];

            // Check for nested children (h4 under h3)
            if (child.level === 3) {
                const nestedChildren = [];
                let j = i + 1;

                while (j < children.length && children[j].level > 3) {
                    nestedChildren.push(children[j]);
                    j++;
                }

                if (nestedChildren.length > 0) {
                    const nestedHtml = nestedChildren.map(nested => {
                        return `<li class="toc-nested"><a href="#${nested.id}" class="toc-link nested" data-level="${nested.level}">${nested.text}</a></li>`;
                    }).join('');

                    childrenHtml += `
                        <li class="toc-collapsible">
                            <div class="toc-header-with-toggle">
                                <button class="toc-toggle collapsed" aria-expanded="false">▶</button>
                                <a href="#${child.id}" class="toc-link sub-header" data-level="${child.level}">${child.text}</a>
                            </div>
                            <ul class="toc-children collapsed">
                                ${nestedHtml}
                            </ul>
                        </li>
                    `;
                } else {
                    childrenHtml += `<li class="toc-no-toggle"><a href="#${child.id}" class="toc-link" data-level="${child.level}">${child.text}</a></li>`;
                }

                i = j;
            } else {
                childrenHtml += `<li class="toc-no-toggle"><a href="#${child.id}" class="toc-link" data-level="${child.level}">${child.text}</a></li>`;
                i++;
            }
        }

        return childrenHtml;
    }

    cleanHeaderText(text) {
        // Remove emojis and extra formatting from header text for TOC
        return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
    }

    generateHeaderId(text) {
        // Remove emojis and special characters for ID generation, but preserve for display
        return text.toLowerCase()
            .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '') // Remove emojis for ID
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-')      // Replace spaces with dashes
            .replace(/-+/g, '-')       // Replace multiple dashes with single dash
            .trim('-');                // Remove leading/trailing dashes
    }

    getHeaderIcon(text) {
        // No contextual icons - just return empty string
        // Let the original markdown emojis show through
        return '';
    }

    addTocClickHandlers(tocContainer) {
        // Handle TOC link clicks for navigation
        tocContainer.querySelectorAll('.toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const anchorId = link.getAttribute('href').substring(1);
                const element = document.getElementById(anchorId);
                if (element) {
                    this.scrollToElement(element);
                }
            });
        });

        // Handle TOC toggle buttons for collapse/expand
        tocContainer.querySelectorAll('.toc-toggle').forEach(toggleBtn => {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
                const childrenContainer = toggleBtn.closest('.toc-collapsible').querySelector('.toc-children');

                if (isExpanded) {
                    // Collapse
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    toggleBtn.classList.add('collapsed');
                    toggleBtn.classList.remove('expanded');
                    toggleBtn.textContent = '▶';
                    childrenContainer.classList.add('collapsed');
                    childrenContainer.classList.remove('expanded');
                } else {
                    // Expand
                    toggleBtn.setAttribute('aria-expanded', 'true');
                    toggleBtn.classList.remove('collapsed');
                    toggleBtn.classList.add('expanded');
                    toggleBtn.textContent = '▼';
                    childrenContainer.classList.remove('collapsed');
                    childrenContainer.classList.add('expanded');
                }
            });
        });
    }

    scrollToElement(element) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 60;
        const additionalOffset = 20;
        const totalOffset = headerHeight + additionalOffset;

        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - totalOffset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        console.log(`📍 Scrolled to element with ${totalOffset}px offset`);
    }

    async buildSearchIndex() {
        this.searchIndex = [];
        console.log('🔍 Building comprehensive search index...');

        const addToIndex = async (item, path, category) => {
            if (item.type === 'markdown') {
                try {
                    // Load the markdown content
                    const response = await fetch(`./assets/pages/${path}.md`);
                    if (response.ok) {
                        const content = await response.text();
                        const functions = this.parseFunctionsFromMarkdown(content);

                        // Add the main module/page to index
                        this.searchIndex.push({
                            name: item.name || path.split('/').pop(),
                            path: path,
                            category: category,
                            type: 'module',
                            description: item.meta?.description || this.extractDescription(content),
                            content: content.toLowerCase(),
                            functions: functions.map(f => (f.fullName || f.name).toLowerCase())
                        });

                        // Add each function as a separate searchable item
                        functions.forEach(func => {
                            const displayName = func.fullName || func.name;
                            this.searchIndex.push({
                                name: displayName,
                                path: path,
                                category: category,
                                type: 'function',
                                side: func.side,
                                description: func.description || '',
                                parentModule: item.name || path.split('/').pop(),
                                anchor: this.generateAnchor(func.name, func.side, path.split('/').pop())
                            });
                        });

                        console.log(`✅ Indexed ${item.name}: ${functions.length} functions`);
                    }
                } catch (error) {
                    console.warn(`⚠️ Failed to index ${path}:`, error);
                }
            } else if (item.type === 'subsection' && item.items) {
                for (const key of Object.keys(item.items)) {
                    await addToIndex(item.items[key], item.items[key].path || `${path}/${key}`, category);
                }
            }
        };

        // Process all categories
        for (const category of Object.keys(this.allModules)) {
            const categoryData = this.allModules[category];
            if (categoryData.items) {
                for (const key of Object.keys(categoryData.items)) {
                    const item = categoryData.items[key];
                    const itemPath = item.path || `${category}/${key}`;
                    await addToIndex(item, itemPath, category);
                }
            }
        }

        console.log(`🔍 Search index built: ${this.searchIndex.length} items`);
        console.log(`📊 Index breakdown:`, {
            modules: this.searchIndex.filter(i => i.type === 'module').length,
            functions: this.searchIndex.filter(i => i.type === 'function').length
        });
    }

    extractDescription(content) {
        // Try to extract description from META comment first
        const metaMatch = content.match(/<!--META[\s\S]*?description:\s*([^\n]+)/);
        if (metaMatch) {
            return metaMatch[1].trim();
        }

        // Fallback: extract from the first paragraph after the title
        const lines = content.split('\n');
        let foundTitle = false;
        for (const line of lines) {
            if (line.startsWith('#') && !foundTitle) {
                foundTitle = true;
                continue;
            }
            if (foundTitle && line.trim() && !line.startsWith('#') && !line.startsWith('<!--')) {
                return line.trim().substring(0, 150); // First 150 chars
            }
        }

        return '';
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.hideSearchResults();
            return;
        }

        const queryLower = query.toLowerCase();
        const results = [];

        // Search through all indexed items
        this.searchIndex.forEach(item => {
            let score = 0;
            let matchType = '';

            if (item.type === 'function') {
                // Exact function name match gets highest score
                if (item.name.toLowerCase() === queryLower) {
                    score = 100;
                    matchType = 'exact function';
                }
                // Function name starts with query
                else if (item.name.toLowerCase().startsWith(queryLower)) {
                    score = 90;
                    matchType = 'function prefix';
                }
                // Function name contains query
                else if (item.name.toLowerCase().includes(queryLower)) {
                    score = 80;
                    matchType = 'function contains';
                }
                // Function description contains query
                else if (item.description.toLowerCase().includes(queryLower)) {
                    score = 70;
                    matchType = 'function description';
                }
            } else if (item.type === 'module') {
                // Module name match
                if (item.name.toLowerCase().includes(queryLower)) {
                    score = 60;
                    matchType = 'module name';
                }
                // Module description match
                else if (item.description.toLowerCase().includes(queryLower)) {
                    score = 50;
                    matchType = 'module description';
                }
                // Content match (search in the actual markdown content)
                else if (item.content && item.content.includes(queryLower)) {
                    score = 40;
                    matchType = 'content match';
                }
                // Function names in module match
                else if (item.functions && item.functions.some(fn => fn.includes(queryLower))) {
                    score = 65;
                    matchType = 'has matching function';
                }
            }

            if (score > 0) {
                results.push({
                    ...item,
                    score: score,
                    matchType: matchType
                });
            }
        });

        // Sort by score (highest first), then by name
        results.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.name.localeCompare(b.name);
        });

        // Limit results to top 10
        const limitedResults = results.slice(0, 10);

        this.showSearchResults(limitedResults, query);
    }

    showSearchResults(results, searchTerm) {
        const searchResults = document.querySelector('.search-results');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-results-container">
                    <h3>No results found for "${searchTerm}"</h3>
                    <p>Try a different search term or browse the navigation.</p>
                </div>
            `;
        } else {
            const resultsHtml = results.map(result => {
                let resultContent = '';
                let clickHandler = '';

                if (result.type === 'function') {
                    // For functions, navigate to the module and scroll to the function
                    clickHandler = `window.app.navigateToFunction('${result.path}', '${result.anchor}')`;
                    const sideLabel = result.side ? `(${result.side.charAt(0).toUpperCase() + result.side.slice(1)})` : '';

                    resultContent = `
                        <div class="search-result-item function-result" onclick="${clickHandler}">
                            <h4>
                                <span class="function-icon">⚡</span>
                                ${result.name} ${sideLabel}
                                <span class="match-type">${result.matchType}</span>
                            </h4>
                            <p class="result-path">${result.category} → ${result.parentModule}</p>
                            <p class="result-description">${result.description || 'Function in ' + result.parentModule}</p>
                        </div>
                    `;
                } else {
                    // For modules, navigate to the module
                    clickHandler = `window.app.navigateToPath('${result.path}')`;

                    resultContent = `
                        <div class="search-result-item module-result" onclick="${clickHandler}">
                            <h4>
                                <span class="module-icon">📄</span>
                                ${result.name}
                                <span class="match-type">${result.matchType}</span>
                            </h4>
                            <p class="result-path">${result.category} → ${result.path}</p>
                            <p class="result-description">${result.description}</p>
                        </div>
                    `;
                }

                return resultContent;
            }).join('');

            searchResults.innerHTML = `
                <div class="search-results-container">
                    <h3>Search Results for "${searchTerm}" (${results.length})</h3>
                    ${resultsHtml}
                </div>
            `;
        }

        searchResults.style.display = 'block';
    }

    async navigateToFunction(path, anchor, updateUrl = true) {
        // Update URL if needed
        if (updateUrl) {
            const newHash = `#${path}@${anchor}`;
            if (window.location.hash !== newHash) {
                window.location.hash = newHash;
            }
        }
        
        // Navigate to the module first (don't update URL again)
        await this.navigateToPath(path, false);

        // Wait a bit for content to load, then scroll to the function
        setTimeout(() => {
            const element = document.getElementById(anchor);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Highlight the function briefly
                element.style.backgroundColor = 'var(--accent-color-alpha)';
                setTimeout(() => {
                    element.style.backgroundColor = '';
                }, 2000);
            }
        }, 100);

        // Hide search results
        this.hideSearchResults();
    }

    hideSearchResults() {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }

        // Also clear the search input when hiding results via navigation
        const searchInput = document.getElementById('search-input');
        if (searchInput && searchInput.value) {
            searchInput.value = '';
        }
    }

    setupCopyLinkButtons() {
        // Remove any existing event listeners to prevent duplicates
        document.querySelectorAll('.copy-link-btn').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        });
        
        document.querySelectorAll('.copy-button').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        });

        // Set up copy link buttons
        document.querySelectorAll('.copy-link-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const button = e.currentTarget;
                const anchor = button.getAttribute('data-anchor');
                
                if (!anchor) {
                    console.warn('No anchor found for copy link button');
                    return;
                }
                
                // Get current page path from the hash and combine with anchor using @ separator
                const currentPath = window.location.hash.slice(1); // Remove the #
                let basePath = currentPath;
                
                // If current path already has an anchor, remove it
                if (currentPath.includes('@')) {
                    basePath = currentPath.split('@')[0];
                }
                
                const url = `${window.location.origin}${window.location.pathname}#${basePath}@${anchor}`;

                if (navigator.clipboard && button) {
                    navigator.clipboard.writeText(url).then(() => {
                        // Double check the button still exists
                        if (button && button.textContent !== undefined) {
                            const originalText = button.textContent;
                            button.textContent = '✅';
                            setTimeout(() => {
                                if (button && button.textContent !== undefined) {
                                    button.textContent = originalText || '🔗';
                                }
                            }, 2000);
                        }
                    }).catch((err) => {
                        console.warn('Failed to copy link:', err);
                    });
                } else {
                    // Fallback for browsers without clipboard API
                    console.warn('Clipboard API not available');
                }
            });
        });

        // Set up code copy buttons
        document.querySelectorAll('.copy-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const button = e.currentTarget;
                const codeElement = button.nextElementSibling?.querySelector('code');
                
                if (!codeElement) {
                    console.warn('No code element found for copy button');
                    return;
                }
                
                const code = codeElement.textContent;

                if (navigator.clipboard && button && code) {
                    navigator.clipboard.writeText(code).then(() => {
                        // Double check the button still exists
                        if (button && button.textContent !== undefined) {
                            const originalText = button.textContent;
                            button.textContent = 'Copied!';
                            setTimeout(() => {
                                if (button && button.textContent !== undefined) {
                                    button.textContent = originalText || 'Copy';
                                }
                            }, 2000);
                        }
                    }).catch((err) => {
                        console.warn('Failed to copy code:', err);
                    });
                } else {
                    console.warn('Clipboard API not available or missing elements');
                }
            });
        });
    }

    loadInitialContent() {
        const defaultPath = 'Community Bridge/overview';
        this.navigateToPath(defaultPath);
    }

    formatTitle(title) {
        return title.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    setLoading(loading) {
        this.isLoading = loading;
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = loading ? 'block' : 'none';
        }
    }

    showError(message) {
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.innerHTML = `
                <div class="error-message">
                    <h2>❌ Error</h2>
                    <p>${message}</p>
                </div>
            `;
        }
    }

    async loadGitHubContributors() {
        console.log('🔍 Loading GitHub contributors...');
        const contributorsContainer = document.getElementById('github-contributors');
        if (!contributorsContainer) return;

        try {
            // Show loading state
            contributorsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="color: #8b949e;">Loading contributors from GitHub...</div>
                </div>
            `;

            // Add timeout to fetch to prevent hanging
            const fetchWithTimeout = async (url, timeout = 10000) => {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);
                
                try {
                    const response = await fetch(url, { signal: controller.signal });
                    clearTimeout(timeoutId);
                    return response;
                } catch (error) {
                    clearTimeout(timeoutId);
                    throw error;
                }
            };

            // Fetch repositories first (members might be private)
            const reposResponse = await fetchWithTimeout('https://api.github.com/orgs/TheOrderFivem/repos');
            
            if (!reposResponse.ok) {
                throw new Error(`Failed to fetch GitHub repositories: ${reposResponse.status} ${reposResponse.statusText}`);
            }

            const repos = await reposResponse.json();

            // Get all unique contributors from repositories
            const contributorsSet = new Set();
            const contributorDetails = new Map();

            // Try to fetch members (might be empty due to privacy settings)
            try {
                const membersResponse = await fetchWithTimeout('https://api.github.com/orgs/TheOrderFivem/members');
                if (membersResponse.ok) {
                    const members = await membersResponse.json();
                    // Add organization members if available
                    for (const member of members) {
                        contributorDetails.set(member.login, {
                            login: member.login,
                            avatar_url: member.avatar_url,
                            html_url: member.html_url,
                            type: 'Member',
                            contributions: 0
                        });
                        contributorsSet.add(member.login);
                    }
                } else {
                    console.info('Organization members not accessible (likely private)');
                }
            } catch (e) {
                console.info('Organization members not accessible:', e.message);
                // Members might be private, continue with repository contributors
            }
            // Only process original repositories (not forks) to show actual contributors to your organization's work
            // Filter out repositories we want to exclude and only include non-forked repos
            const excludedRepos = ['RecipeImages', 'ox_inventory', 'ox_target', 'ox_doorlock'];
            const filteredRepos = repos.filter(repo => !excludedRepos.includes(repo.name) && !repo.fork);
            
            for (const repo of filteredRepos.slice(0, 10)) { // Process original repos only
                try {
                    const contributorsResponse = await fetchWithTimeout(`https://api.github.com/repos/TheOrderFivem/${repo.name}/contributors`);
                    if (contributorsResponse.ok) {
                        const repoContributors = await contributorsResponse.json();
                        for (const contributor of repoContributors.slice(0, 10)) { // Top 10 contributors per repo
                            if (!contributorDetails.has(contributor.login)) {
                                contributorDetails.set(contributor.login, {
                                    login: contributor.login,
                                    avatar_url: contributor.avatar_url,
                                    html_url: contributor.html_url,
                                    type: 'Contributor',
                                    contributions: contributor.contributions
                                });
                            } else {
                                // Update contributions count
                                const existing = contributorDetails.get(contributor.login);
                                existing.contributions += contributor.contributions;
                            }
                            contributorsSet.add(contributor.login);
                        }
                    } else {
                        console.warn(`Failed to fetch contributors for ${repo.name}: ${contributorsResponse.status}`);
                    }
                } catch (e) {
                    console.warn(`Error fetching contributors for ${repo.name}:`, e);
                }
            }

            // Sort contributors by contributions
            const sortedContributors = Array.from(contributorDetails.values())
                .sort((a, b) => b.contributions - a.contributions);

            // Render contributors
            this.renderGitHubContributors(contributorsContainer, sortedContributors, repos.length);

        } catch (error) {
            console.error('❌ Error loading GitHub contributors:', error);
            
            let errorMessage = 'Unable to load contributors from GitHub API.';
            let detailMessage = 'Visit our <a href="https://github.com/TheOrderFivem" target="_blank" style="color: #58a6ff;">GitHub organization</a> directly.';
            
            // Provide more specific error messages
            if (error.name === 'AbortError') {
                errorMessage = 'Request timed out while loading contributors.';
                detailMessage = 'The GitHub API may be temporarily unavailable. Please try again later.';
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage = 'Network error while loading contributors.';
                detailMessage = 'Check your internet connection and try again.';
            } else if (error.message.includes('Failed to fetch GitHub repositories')) {
                errorMessage = 'GitHub API error while loading contributors.';
                detailMessage = error.message + '. The API may be rate limited or temporarily unavailable.';
            }
            
            // Provide a manual fallback with known contributors
            const fallbackContributors = [
                {
                    login: 'MrNewb',
                    avatar_url: 'https://github.com/MrNewb.png',
                    html_url: 'https://github.com/MrNewb',
                    type: 'Core Developer',
                    contributions: 'Multiple repositories'
                },
                {
                    login: 'gononono64',
                    avatar_url: 'https://github.com/gononono64.png',
                    html_url: 'https://github.com/gononono64',
                    type: 'Core Developer',
                    contributions: 'Multiple repositories'
                }
            ];
            
            contributorsContainer.innerHTML = `
                <div style="margin: 20px 0;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <div style="width: 40px; height: 40px; background: #f85149; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2em;">
                            ⚠️
                        </div>
                        <div>
                            <h4 style="margin: 0; color: #f0f6fc;">${errorMessage}</h4>
                            <p style="margin: 0; color: #8b949e; font-size: 0.9em;">${detailMessage}</p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <button onclick="window.app.loadGitHubContributors()" style="background: #238636; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-right: 10px;">
                            🔄 Retry Loading from GitHub
                        </button>
                        <a href="https://github.com/TheOrderFivem" target="_blank" style="display: inline-block; background: #21262d; color: #58a6ff; border: 1px solid #30363d; padding: 10px 20px; border-radius: 6px; text-decoration: none;">
                            🐙 View on GitHub
                        </a>
                    </div>

                    <h4 style="color: #f0f6fc; margin: 20px 0 15px 0;">Core Contributors</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                        ${fallbackContributors.map(contributor => `
                            <div style="background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%); border: 1px solid #3a3a3a; border-radius: 12px; padding: 15px; text-align: center; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                <img src="${contributor.avatar_url}" alt="${contributor.login}" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #238636; margin-bottom: 10px;">
                                <div style="color: #f0f6fc; font-weight: 600; margin-bottom: 5px;">${contributor.login}</div>
                                <div style="color: #8b949e; font-size: 0.8em; margin-bottom: 8px;">${contributor.type}</div>
                                <div style="color: #58a6ff; font-size: 0.8em;">${contributor.contributions}</div>
                                <div style="margin-top: 10px;">
                                    <a href="${contributor.html_url}" target="_blank" style="color: #58a6ff; text-decoration: none; font-size: 0.8em;">View Profile</a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; padding: 20px; background: rgba(88, 166, 255, 0.1); border-radius: 8px;">
                        <p style="color: #8b949e; margin: 0 0 10px 0;">Want to contribute to The Order Framework?</p>
                        <a href="https://github.com/TheOrderFivem" target="_blank" style="display: inline-block; background: #238636; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                            🚀 Visit Our GitHub
                        </a>
                    </div>
                </div>
            `;
        }
    }

    renderGitHubContributors(container, contributors, repoCount) {
        const html = `
            <div style="margin: 20px 0;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <div style="width: 40px; height: 40px; background: #238636; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2em;">
                        🐙
                    </div>
                    <div>
                        <h4 style="margin: 0; color: #f0f6fc;">GitHub Contributors</h4>
                        <p style="margin: 0; color: #8b949e; font-size: 0.9em;">From ${repoCount} repositories in TheOrderFivem organization</p>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                    ${contributors.map(contributor => `
                        <div style="background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%); border: 1px solid #3a3a3a; border-radius: 12px; padding: 15px; text-align: center; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <img src="${contributor.avatar_url}" alt="${contributor.login}" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #238636; margin-bottom: 10px;">
                            <div style="color: #f0f6fc; font-weight: 600; margin-bottom: 5px;">${contributor.login}</div>
                            <div style="color: #8b949e; font-size: 0.8em; margin-bottom: 8px;">${contributor.type}</div>
                            ${contributor.contributions > 0 ? `<div style="color: #58a6ff; font-size: 0.8em;">${contributor.contributions} contributions</div>` : ''}
                            <div style="margin-top: 10px;">
                                <a href="${contributor.html_url}" target="_blank" style="color: #58a6ff; text-decoration: none; font-size: 0.8em;">View Profile</a>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="text-align: center; margin-top: 20px; padding: 20px; background: rgba(88, 166, 255, 0.1); border-radius: 8px;">
                    <p style="color: #8b949e; margin: 0 0 10px 0;">Want to contribute to The Order Framework?</p>
                    <a href="https://github.com/TheOrderFivem" target="_blank" style="display: inline-block; background: #238636; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                        🚀 Visit Our GitHub
                    </a>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CommunityBridgeDocumentation();
});
