// Community Bridge Documentation Site - Fixed Version
class CommunityBridgeDocumentation {    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.currentModule = null;
        this.allModules = {};
        this.searchIndex = [];
        this.isLoading = false;
        this.currentModuleToc = null; // Store TOC data for current module
        this.currentModuleName = null; // Store current module name for anchor generation

        this.init();
    }

    async init() {
        console.log('🚀 Initializing Community Bridge Documentation...');

        try {
            console.log('🎨 Setting up theme...');
            this.setupTheme();

            console.log('🎯 Setting up basic event listeners...');
            this.setupBasicEventListeners();

            console.log('📁 Loading module structure...');
            await this.loadModuleStructure();

            console.log('🛣️ Setting up router...');
            this.setupRouter();

            console.log('📄 Loading initial content...');
            this.loadInitialContent();

            console.log('✅ Initialization complete!');
        } catch (error) {
            console.error('❌ Initialization failed:', error);
            this.showError('Failed to initialize documentation site');
        }
    }

    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = this.currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
        }
    }

    setupBasicEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());        }

        // Search functionality with better error handling
        this.setupSearchInput();
    }

    setupSearchInput() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            console.log('✅ Search input found, setting up listeners');

            // Ensure input is properly configured
            searchInput.removeAttribute('disabled');
            searchInput.removeAttribute('readonly');
            searchInput.style.pointerEvents = 'auto';
            searchInput.style.userSelect = 'text';

            // Clear any existing value
            searchInput.value = '';

            // Add input event listener
            searchInput.addEventListener('input', (e) => {
                console.log('🔍 Search input changed:', e.target.value);
                this.handleSearch(e.target.value);
            });

            // Add keyup event as backup
            searchInput.addEventListener('keyup', (e) => {
                console.log('⌨️ Key up in search:', e.target.value);
                this.handleSearch(e.target.value);
            });

            // Add focus event
            searchInput.addEventListener('focus', () => {
                console.log('🎯 Search input focused');
            });

            // Test if the input is working
            searchInput.addEventListener('click', () => {
                console.log('👆 Search input clicked');
                searchInput.focus();
            });

        } else {
            console.warn('⚠️ Search input not found! Retrying in 500ms...');
            setTimeout(() => this.setupSearchInput(), 500);
        }
    }

    // NEW: Fixed navigation event setup - called AFTER navigation is rendered
    setupNavigationEvents() {
        console.log('🎯 Setting up navigation click handlers...');

        // Handle section headers (Community Bridge, etc.)
        const sectionHeaders = document.querySelectorAll('.nav-section-header');
        console.log('📂 Found section headers:', sectionHeaders.length);

        sectionHeaders.forEach((header) => {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const section = header.closest('.nav-section');
                const wasCollapsed = section.classList.contains('collapsed');

                if (wasCollapsed) {
                    section.classList.remove('collapsed');
                    console.log('🔓 Expanded section:', header.textContent);
                } else {
                    section.classList.add('collapsed');
                    console.log('🔒 Collapsed section:', header.textContent);
                }
            });
        });

        // Handle subsection headers (Modules, etc.)
        const subsectionHeaders = document.querySelectorAll('.nav-subsection-header');
        console.log('📦 Found subsection headers:', subsectionHeaders.length);

        subsectionHeaders.forEach((header) => {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const subsection = header.closest('.nav-subsection');
                const wasCollapsed = subsection.classList.contains('collapsed');

                if (wasCollapsed) {
                    subsection.classList.remove('collapsed');
                    console.log('🔓 Expanded subsection:', header.textContent);
                } else {
                    subsection.classList.add('collapsed');
                    console.log('🔒 Collapsed subsection:', header.textContent);
                }
            });
        });

        // Handle navigation item clicks
        const navItems = document.querySelectorAll('.nav-item');
        console.log('🔗 Found nav items:', navItems.length);

        navItems.forEach((navItem) => {
            navItem.addEventListener('click', (e) => {
                const path = navItem.dataset.path;
                const type = navItem.dataset.type;

                if (path) {
                    console.log('🔗 Navigation clicked:', path, type);
                    e.preventDefault();
                    window.location.hash = path;
                    this.navigateToPath(path);

                    // Update active state
                    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                    navItem.classList.add('active');
                }
            });
        });

        console.log('✅ Navigation events attached successfully');
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);

        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = this.currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
        }
    }

    async loadModuleStructure() {
        console.log('📋 Starting loadModuleStructure...');
        this.setLoading(true);

        try {
            console.log('📁 Loading page structure...');
            const structure = await this.discoverPagesStructure();
            console.log('📊 Structure result:', structure);            this.allModules = structure;
            await this.buildSearchIndex();
            this.renderNavigation();

            console.log('✅ Structure loaded successfully:', this.allModules);
        } catch (error) {
            console.error('❌ Failed to load structure:', error);
            this.showError('Failed to load documentation structure');
        } finally {
            this.setLoading(false);
        }
    }    async discoverPagesStructure() {
        console.log('🔍 Starting discoverPagesStructure...');
        const structure = {};

        try {
            // Load main Community Bridge toc.json
            console.log('📋 Attempting to load: assets/pages/Community Bridge/toc.json');
            const tocResponse = await fetch('assets/pages/Community Bridge/toc.json');

            if (tocResponse.ok) {
                const tocData = await tocResponse.json();
                console.log('✅ Loaded toc.json successfully:', tocData);

                structure['Community Bridge'] = {
                    icon: '',
                    items: {}
                };

                // Add main pages (markdown files in root)
                const mainPages = ['overview', 'getting-started', 'index'];
                for (const page of mainPages) {
                    try {
                        const pageResponse = await fetch(`assets/pages/Community Bridge/${page}.md`);
                        if (pageResponse.ok) {
                            structure['Community Bridge'].items[page] = {
                                type: 'markdown',
                                path: `Community Bridge/${page}`
                            };
                            console.log(`✅ Found page: ${page}.md`);
                        }
                    } catch (e) {
                        console.log(`❌ Error checking page ${page}.md:`, e.message);
                    }
                }                // DYNAMIC FOLDER DISCOVERY: Automatically detect all folders under Community Bridge
                const foldersToCheck = await this.discoverCommunityBridgeFolders();
                console.log('📁 Discovered folders:', foldersToCheck);

                for (const folderInfo of foldersToCheck) {
                    const { folderName, folderIcon } = folderInfo;
                    console.log(`🔍 Processing dynamic folder: ${folderName}`);

                    // Try to load folder's toc.json
                    try {
                        const folderTocUrl = `assets/pages/Community Bridge/${folderName}/toc.json`;
                        console.log(`📋 Attempting to load: ${folderTocUrl}`);
                        const folderTocResponse = await fetch(folderTocUrl);

                        if (folderTocResponse.ok) {
                            const folderTocData = await folderTocResponse.json();
                            console.log(`📋 Loaded ${folderName} toc.json:`, folderTocData);

                            const folderItems = {};
                            let itemCount = 0;

                            for (const item of folderTocData) {                                if (item.type === 'folder') {
                                    console.log(`🔍 Processing ${folderName} item: ${item.name}`);
                                    const itemName = item.name.toLowerCase();

                                    // Construct the correct JSON path based on folder structure
                                    let jsonPath;
                                    if (folderName === 'Modules' || folderName === 'Libraries') {
                                        // For Modules and Libraries: folderName/ItemName/itemname.json
                                        jsonPath = `assets/pages/Community Bridge/${folderName}/${item.name}/${itemName}.json`;
                                    } else {
                                        // For other folders: folderName/ItemName/itemname.json (same pattern)
                                        jsonPath = `assets/pages/Community Bridge/${folderName}/${item.name}/${itemName}.json`;
                                    }                                    try {
                                        const jsonResponse = await fetch(jsonPath);
                                        if (jsonResponse.ok) {
                                            folderItems[item.title || item.name] = {
                                                type: 'json-module',
                                                path: `${folderName.toLowerCase()}/${item.name}`,
                                                jsonFile: jsonPath,
                                                icon: item.icon,
                                                name: item.name,
                                                category: folderName
                                            };
                                            itemCount++;
                                            console.log(`✅ Added JSON item: ${item.name} to ${folderName} (${jsonPath})`);
                                        } else {
                                            console.log(`⚠️ JSON file not found: ${jsonPath} (Status: ${jsonResponse.status})`);
                                        }
                                    } catch (e) {
                                        console.log(`❌ Error loading ${jsonPath}:`, e.message);
                                    }
                                } else if (item.type === 'file' && item.name.endsWith('.md')) {
                                    // Handle markdown files in folder
                                    const mdPath = `assets/pages/Community Bridge/${folderName}/${item.name}`;
                                    try {
                                        const mdResponse = await fetch(mdPath);
                                        if (mdResponse.ok) {
                                            const itemKey = item.name.replace('.md', '');
                                            folderItems[item.title || itemKey] = {
                                                type: 'markdown',
                                                path: `Community Bridge/${folderName}/${itemKey}`,
                                                icon: item.icon,
                                                category: folderName
                                            };
                                            itemCount++;
                                            console.log(`✅ Added markdown file: ${item.name} to ${folderName}`);
                                        }
                                    } catch (e) {
                                        console.log(`❌ Error loading ${mdPath}:`, e.message);
                                    }
                                }
                            }

                            if (Object.keys(folderItems).length > 0) {
                                structure['Community Bridge'].items[folderName] = {
                                    icon: folderIcon,
                                    items: folderItems
                                };
                                console.log(`✅ Added ${itemCount} items to ${folderName} folder`);
                            }
                        } else {
                            console.log(`⚠️ No toc.json found for ${folderName}, checking for direct content...`);
                            // If no toc.json, try to discover content directly
                            await this.discoverFolderContentDirectly(structure, folderName, folderIcon);
                        }
                    } catch (error) {
                        console.log(`❌ Error processing ${folderName}:`, error.message);
                        // Fallback: try to discover content directly
                        await this.discoverFolderContentDirectly(structure, folderName, folderIcon);
                    }
                }

            } else {
                // Fallback structure
                structure['Community Bridge'] = {
                    icon: '🏗️',
                    items: {
                        'overview': {
                            type: 'markdown',
                            path: 'Community Bridge/overview'
                        }
                    }
                };
            }
        } catch (error) {
            console.error('❌ Error in discoverPagesStructure:', error);
            // Fallback structure
            structure['Community Bridge'] = {
                icon: '🏗️',
                items: {
                    'overview': {
                        type: 'markdown',
                        path: 'Community Bridge/overview'
                    }
                }
            };
        }

        return structure;
    }

    // NEW: Discover all folders under Community Bridge
    async discoverCommunityBridgeFolders() {
        console.log('🔍 Discovering Community Bridge folders...');

        // Known folders with their icons (you can extend this list)
        const knownFolders = [
            { folderName: 'Modules', folderIcon: '📦' },
            { folderName: 'Libraries', folderIcon: '📚' },
            { folderName: 'Examples', folderIcon: '💡' },
            { folderName: 'Getting Started', folderIcon: '🚀' },
            { folderName: 'Instructions', folderIcon: '📋' },
            { folderName: 'Tutorials', folderIcon: '🎓' },
            { folderName: 'API Reference', folderIcon: '📖' },
            { folderName: 'Configuration', folderIcon: '⚙️' },
            { folderName: 'Troubleshooting', folderIcon: '🔧' }
        ];

        const discoveredFolders = [];

        // Try to discover folders by attempting to fetch their toc.json or checking for common files
        for (const { folderName, folderIcon } of knownFolders) {
            try {
                // Try to fetch the folder's toc.json or any common file to verify it exists
                const tocResponse = await fetch(`assets/pages/Community Bridge/${folderName}/toc.json`);
                const indexResponse = await fetch(`assets/pages/Community Bridge/${folderName}/index.md`);

                if (tocResponse.ok || indexResponse.ok) {
                    discoveredFolders.push({ folderName, folderIcon });
                    console.log(`✅ Discovered folder: ${folderName}`);
                }
            } catch (e) {
                console.log(`⚠️ Folder ${folderName} not accessible`);
            }
        }

        // Fallback: If no dynamic discovery is possible, return known existing folders
        if (discoveredFolders.length === 0) {
            console.log('⚠️ Using fallback folder discovery');
            return [
                { folderName: 'Modules', folderIcon: '📦' },
                { folderName: 'Libraries', folderIcon: '📚' }
            ];
        }

        return discoveredFolders;
    }

    // NEW: Discover folder content directly when no toc.json exists
    async discoverFolderContentDirectly(structure, folderName, folderIcon) {
        console.log(`🔍 Discovering ${folderName} content directly...`);

        const folderItems = {};

        // Try common file patterns
        const commonFiles = ['index.md', 'overview.md', 'readme.md', 'getting-started.md'];

        for (const fileName of commonFiles) {
            try {
                const response = await fetch(`assets/pages/Community Bridge/${folderName}/${fileName}`);
                if (response.ok) {
                    const itemKey = fileName.replace('.md', '');
                    folderItems[itemKey] = {
                        type: 'markdown',
                        path: `Community Bridge/${folderName}/${itemKey}`,
                        category: folderName
                    };
                    console.log(`✅ Found direct file: ${fileName} in ${folderName}`);
                }
            } catch (e) {
                // File doesn't exist, continue
            }
        }

        if (Object.keys(folderItems).length > 0) {
            structure['Community Bridge'].items[folderName] = {
                icon: folderIcon,
                items: folderItems
            };
            console.log(`✅ Added ${Object.keys(folderItems).length} items to ${folderName} via direct discovery`);
        }
    }

    renderNavigation() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        let html = '';

        for (const [categoryName, categoryData] of Object.entries(this.allModules)) {
            html += `
                <div class="nav-section" data-section="${categoryName}">
                    <div class="nav-section-header">
                        <span>${categoryData.icon || '📁'} ${categoryName}</span>
                        <span class="icon">▼</span>
                    </div>
                    <div class="nav-items">
            `;

            html += this.renderNavItems(categoryData.items);

            html += `
                    </div>
                </div>
            `;
        }

        sidebar.innerHTML = html;

        // Initialize collapsed states
        const sections = sidebar.querySelectorAll('.nav-section');
        sections.forEach((section, index) => {
            if (index > 0) {
                section.classList.add('collapsed');
            }
        });

        const subsections = sidebar.querySelectorAll('.nav-subsection');
        subsections.forEach(subsection => {
            subsection.classList.add('collapsed');
        });

        // IMPORTANT: Set up navigation events AFTER rendering
        this.setupNavigationEvents();

        console.log('🎨 Navigation rendered successfully');
    }

    renderNavItems(items) {
        let html = '';

        for (const [itemName, itemData] of Object.entries(items)) {
            if (itemData.items) {
                // This is a subsection (like Modules)
                html += `
                    <div class="nav-subsection">
                        <div class="nav-subsection-header">${itemData.icon || '📂'} ${itemName}</div>
                        <div class="nav-items">
                `;
                html += this.renderNavItems(itemData.items);
                html += `
                        </div>
                    </div>
                `;
            } else {
                // This is a nav item
                const displayName = itemName.charAt(0).toUpperCase() + itemName.slice(1).replace(/-/g, ' ');
                html += `
                    <a href="#${itemData.path}" class="nav-item" data-path="${itemData.path}" data-type="${itemData.type}">
                        ${displayName}
                    </a>
                `;
            }
        }

        return html;
    }

    setupRouter() {
        window.addEventListener('hashchange', () => this.handleRouteChange());
    }    handleRouteChange() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const decodedPath = decodeURIComponent(hash);
            console.log('🛣️ Route changed to:', decodedPath);

            // Check if this is a function anchor (contains dashes indicating function-side-module format)
            if (this.isFunctionAnchor(decodedPath)) {
                console.log('🔗 Detected function anchor:', decodedPath);
                this.handleFunctionAnchor(decodedPath);
            } else {
                // Regular page navigation
                this.navigateToPath(decodedPath);
            }
        }
    }

    isFunctionAnchor(path) {
        // Function anchors follow the pattern: functionname-side-modulename
        // They contain at least two dashes and are not typical page paths
        const parts = path.split('-');
        return parts.length >= 3 && !path.includes('/') && !path.includes(' ');
    }

    handleFunctionAnchor(anchorId) {
        console.log('🎯 Handling function anchor:', anchorId);

        // Check if the target element exists on the current page
        const targetElement = document.getElementById(anchorId);
        if (targetElement) {
            console.log('✅ Found function element:', anchorId);
            this.scrollToElement(targetElement);
            this.highlightElement(targetElement);
            this.updateTocActiveState(anchorId);
        } else {
            console.log('❌ Function element not found on current page:', anchorId);
            // The function might be on a different module page
            // Try to extract module name and navigate to that page first
            this.navigateToModuleForFunction(anchorId);
        }
    }

    navigateToModuleForFunction(anchorId) {
        // Extract module name from anchor (last part after final dash)
        const parts = anchorId.split('-');
        if (parts.length >= 3) {
            const moduleName = parts[parts.length - 1];
            console.log('🔍 Trying to find module for function:', moduleName);

            // Find the module path
            const moduleItem = this.findModuleByName(moduleName);
            if (moduleItem) {
                console.log('📦 Found module:', moduleItem.path);
                // Navigate to the module page, then scroll to the function
                this.loadContent(moduleItem.path, moduleItem.type, moduleItem).then(() => {
                    // After the module loads, try to scroll to the function
                    setTimeout(() => {
                        const targetElement = document.getElementById(anchorId);
                        if (targetElement) {
                            this.scrollToElement(targetElement);
                            this.highlightElement(targetElement);
                            this.updateTocActiveState(anchorId);
                        }
                    }, 500); // Give time for content to load
                });
            }
        }
    }

    findModuleByName(moduleName) {
        const searchItems = (items) => {
            for (const [key, item] of Object.entries(items)) {
                if (item.name && item.name.toLowerCase() === moduleName.toLowerCase()) {
                    return item;
                }
                if (item.items) {
                    const found = searchItems(item.items);
                    if (found) return found;
                }
            }
            return null;
        };

        for (const [category, categoryData] of Object.entries(this.allModules)) {
            const found = searchItems(categoryData.items);
            if (found) return found;
        }
        return null;
    }

    scrollToElement(element) {
        // Calculate offset to account for fixed header
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 60;
        const additionalOffset = 20;
        const totalOffset = headerHeight + additionalOffset;

        // Get target position and subtract offset
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - totalOffset;

        // Smooth scroll to adjusted position
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        console.log(`📍 Scrolled to element with ${totalOffset}px offset`);
    }

    updateTocActiveState(anchorId) {
        // Remove active class from all TOC links
        document.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to the TOC link that corresponds to this anchor
        const tocLink = document.querySelector(`.toc-link[href="#${anchorId}"]`);
        if (tocLink) {
            tocLink.classList.add('active');
            console.log('✅ Updated TOC active state for:', anchorId);
        }
    }    async navigateToPath(path) {
        console.log('🎯 Navigating to:', path);
        const item = this.findNavigationItem(path);
        if (item) {
            console.log('✅ Found navigation item:', item);
            return await this.loadContent(path, item.type, item);
        } else {
            console.warn('❌ Navigation item not found:', path);
            this.showError(`Page not found: ${path}`);
            return Promise.reject(new Error(`Page not found: ${path}`));
        }
    }

    findNavigationItem(targetPath) {
        const searchItems = (items) => {
            for (const [key, item] of Object.entries(items)) {
                if (item.path === targetPath) {
                    return item;
                }
                if (item.items) {
                    const found = searchItems(item.items);
                    if (found) return found;
                }
            }
            return null;
        };

        for (const [category, categoryData] of Object.entries(this.allModules)) {
            const found = searchItems(categoryData.items);
            if (found) return found;
        }
        return null;
    }    async loadContent(path, type, item) {
        this.setLoading(true);

        try {
            if (type === 'markdown') {
                await this.loadMarkdownContent(path);
            } else if (type === 'json-module') {
                await this.loadJsonModuleContent(path, item.jsonFile);
            }            setTimeout(() => {
                this.updateTableOfContents();
                this.applySyntaxHighlighting();
                this.setupCopyLinkButtons();
            }, 100);

        } catch (error) {
            console.error('Failed to load content:', error);
            this.showError(`Failed to load: ${path}`);
        } finally {
            this.setLoading(false);
        }
    }

    async loadMarkdownContent(path) {
        try {
            const filePath = `assets/pages/${path}.md`;
            console.log(`📄 Loading markdown: ${filePath}`);

            const response = await fetch(filePath);
            if (response.ok) {
                const content = await response.text();
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.innerHTML = this.renderMarkdown(content);
                }
            } else {
                throw new Error(`Failed to load ${filePath}: ${response.status}`);
            }
        } catch (error) {
            console.error('Error loading markdown:', error);
            throw error;
        }
    }    async loadJsonModuleContent(path, jsonFile) {
        try {
            console.log(`📦 Loading JSON module: ${jsonFile}`);
            const response = await fetch(jsonFile);

            if (response.ok) {
                const moduleData = await response.json();
                console.log('📊 Module data loaded:', moduleData);

                // Extract category and item name from path
                let itemName, tocPath, category;
                const pathParts = path.split('/');

                if (pathParts.length >= 2) {
                    category = pathParts[0];
                    itemName = pathParts[1];

                    // Map category names to proper case for file paths
                    let folderName = category;
                    if (category === 'modules') folderName = 'Modules';
                    else if (category === 'libraries') folderName = 'Libraries';
                    else {
                        // For dynamic folders, capitalize first letter of each word
                        folderName = category.split(' ').map(word =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ');
                    }

                    tocPath = `assets/pages/Community Bridge/${folderName}/${itemName}/toc.json`;
                    console.log(`📋 Constructed TOC path: ${tocPath} for category: ${category}`);
                } else {
                    // Fallback for legacy paths
                    itemName = path;
                    tocPath = null;
                    category = 'unknown';
                }

                // Load the module/library's TOC
                let tocData = null;
                if (tocPath) {
                    try {
                        console.log(`📋 Loading TOC: ${tocPath}`);
                        const tocResponse = await fetch(tocPath);
                        if (tocResponse.ok) {
                            tocData = await tocResponse.json();
                            console.log('📋 TOC data loaded:', tocData);
                        }
                    } catch (tocError) {
                        console.warn('⚠️ Could not load TOC:', tocError);
                    }
                }

                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    // Pass item name and category for anchor generation
                    mainContent.innerHTML = this.renderJsonModule(moduleData, tocData, itemName, category);
                }
                console.log(`✅ Loaded JSON module: ${moduleData.name} from category: ${category}`);
            } else {
                throw new Error(`Failed to load ${jsonFile}: ${response.status}`);
            }
        } catch (error) {
            console.error('Error loading JSON module:', error);
            throw error;
        }
    }    renderJsonModule(moduleData, tocData = null, moduleName = 'unknown', category = 'unknown') {
        if (!moduleData || (!moduleData.clientFunctions && !moduleData.serverFunctions && !moduleData.sharedFunctions)) {
            return '<div class="error-message">No module data available</div>';
        }

        // Store current module info for TOC generation
        this.currentModuleName = moduleName;
        this.currentModuleToc = tocData;
        this.currentCategory = category;

        let html = `
            <div class="module-header">
                <h1 id="overview">${moduleData.icon || '📦'} ${moduleData.name}</h1>
                <p class="module-description">${moduleData.description || 'No description available.'}</p>
                <div class="module-meta">
                    <span class="module-category">📂 Category: ${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </div>
            </div>
        `;

        // Client Functions
        if (moduleData.clientFunctions && moduleData.clientFunctions.length > 0) {
            html += '<section class="functions-section"><h2 id="client-functions">🖥️ Client Functions</h2><div class="functions-grid">';
            moduleData.clientFunctions.forEach(func => {
                html += this.renderFunction(func, 'client', moduleName);
            });
            html += '</div></section>';        }

        // Server Functions
        if (moduleData.serverFunctions && moduleData.serverFunctions.length > 0) {
            html += '<section class="functions-section"><h2 id="server-functions">🖧 Server Functions</h2><div class="functions-grid">';
            moduleData.serverFunctions.forEach(func => {
                html += this.renderFunction(func, 'server', moduleName);
            });
            html += '</div></section>';
        }

        // Shared Functions
        if (moduleData.sharedFunctions && moduleData.sharedFunctions.length > 0) {
            html += '<section class="functions-section"><h2 id="shared-functions">🔗 Shared Functions</h2><div class="functions-grid">';
            moduleData.sharedFunctions.forEach(func => {
                html += this.renderFunction(func, 'shared', moduleName);
            });
            html += '</div></section>';
        }

        return html;
    }renderMarkdown(content) {
        // Simple but better markdown renderer
        let html = content
            // Headers
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^#### (.+)$/gm, '<h4>$1</h4>')

            // Code blocks
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<div class="code-block-container"><pre class="code-block"><code class="language-$1">$2</code></pre></div>')

            // Inline code
            .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')

            // Bold and italic
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')

            // Lists
            .replace(/^[\-\*] (.+)$/gm, '<li>$1</li>')

            // Line breaks and paragraphs
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.+)$/gm, '<p>$1</p>')

            // Clean up headers in paragraphs
            .replace(/<\/p><p><h([1-6])>/g, '</p><h$1>')
            .replace(/<\/h([1-6])><p>/g, '</h$1><p>')

            // Clean up lists
            .replace(/<p><li>/g, '<ul><li>')
            .replace(/<\/li><\/p>/g, '</li></ul>')
            .replace(/<\/ul><ul>/g, '');

        // Wrap content in a container
        return `<div class="markdown-content">${html}</div>`;
    }    renderFunction(func, side, moduleName = 'unknown') {
        const sideClass = side === 'client' ? 'client' : 'server';
        const sideIcon = side === 'client' ? '🖥️' : '🖧';

        // Create comprehensive unique anchor ID: functionname-side-module
        const cleanFunctionName = func.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanModuleName = moduleName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const anchorId = `${cleanFunctionName}-${side}-${cleanModuleName}`;

        console.log(`🔗 Creating anchor: ${anchorId} for function ${func.name} (${side}) in ${moduleName}`);

        let parametersHtml = '';
        if (func.parameters && func.parameters.length > 0) {
            parametersHtml = `
                <div class="function-parameters">
                    <h4>Parameters:</h4>
                    <ul>
                        ${func.parameters.map(param => `
                            <li><code>${param.name}</code> (${param.type}) - ${param.description || ''}</li>
                        `).join('')}
                    </ul>
                </div>
            `;        }        return `
            <div class="function-card" id="${anchorId}">
                <div class="function-header">
                    <h3>${func.name}</h3>
                    <div class="function-badges">
                        <span class="badge ${sideClass}">${sideIcon} ${side}</span>
                        <button class="copy-link-btn" title="Copy direct link to this function" data-anchor="${anchorId}">🔗</button>
                    </div>
                </div>
                <p>${func.description || 'No description available.'}</p>
                <div class="function-syntax">
                    <h4>Syntax:</h4>
                    <div class="code-block-container">
                        <pre class="code-block"><code>${func.syntax || func.name + '()'}</code></pre>
                        <button class="copy-button" title="Copy code">📋</button>
                    </div>
                </div>
                ${parametersHtml}
                ${func.example ? `
                    <div class="function-example">
                        <h4>Example:</h4>
                        <div class="code-block-container">
                            <pre class="code-block"><code>${func.example}</code></pre>
                            <button class="copy-button" title="Copy code">📋</button>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;}

    copyCode(button) {
        const codeBlock = button.parentNode.querySelector('code');
        const text = codeBlock.textContent;

        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = '✅';
            button.style.color = 'var(--accent-color)';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy code:', err);
            button.textContent = '❌';
            setTimeout(() => {
                button.textContent = '📋';
            }, 2000);
        });
    }    // Apply syntax highlighting to all code blocks after content is loaded
    applySyntaxHighlighting() {
        // Apply Lua syntax highlighting to code blocks
        const codeBlocks = document.querySelectorAll('.code-block code');
        codeBlocks.forEach(block => {
            this.applyLuaSyntaxHighlighting(block);
        });

        // Set up copy button event listeners
        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            button.addEventListener('click', () => this.copyCode(button));
        });
    }    applyLuaSyntaxHighlighting(codeElement) {
        let html = codeElement.textContent;

        // First, fix newline characters - convert \n to actual line breaks
        html = html.replace(/\\n/g, '\n');

        // Convert multiple consecutive newlines to single line breaks
        html = html.replace(/\n+/g, '\n');

        // Remove leading/trailing whitespace but preserve internal formatting
        html = html.trim();

        // Lua keywords
        const keywords = [
            'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for',
            'function', 'if', 'in', 'local', 'nil', 'not', 'or', 'repeat',
            'return', 'then', 'true', 'until', 'while'
        ];

        // Apply highlighting in specific order to avoid conflicts

        // 1. Protect strings first
        html = html.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="lua-string">$&</span>');

        // 2. Highlight comments (but not inside strings)
        html = html.replace(/--.*$/gm, '<span class="lua-comment">$&</span>');

        // 3. Highlight numbers
        html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="lua-number">$1</span>');

        // 4. Highlight keywords (but not inside strings/comments)
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b(${keyword})\\b(?![^<]*</span>)`, 'g');
            html = html.replace(regex, '<span class="lua-keyword">$1</span>');
        });

        // 5. Highlight function calls (word followed by parentheses)
        html = html.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="lua-function">$1</span>');

        // 6. Highlight special Lua operators and symbols
        html = html.replace(/(\.\.|\:\:|\=\=|\~\=|\<\=|\>\=|\.|\:)/g, '<span class="lua-operator">$1</span>');

        codeElement.innerHTML = html;
    }    async buildSearchIndex() {
        console.log('📚 Building search index...');
        this.searchIndex = [];

        const indexPromises = [];

        // Debug: Log the entire structure
        console.log('🔍 All modules structure:', this.allModules);

        // Index all modules and their functions
        for (const [categoryName, categoryData] of Object.entries(this.allModules)) {
            console.log(`📂 Processing category: ${categoryName}`, categoryData);
            if (categoryData.items) {
                for (const [itemName, itemData] of Object.entries(categoryData.items)) {
                    console.log(`  📄 Processing item: ${itemName}`, itemData);

                    // Check if this item has nested items (like "Modules" containing actual modules)
                    if (itemData.items) {
                        console.log(`  📁 Found nested items in ${itemName}:`, Object.keys(itemData.items));
                        // Process nested items
                        for (const [nestedName, nestedData] of Object.entries(itemData.items)) {
                            console.log(`    📋 Processing nested item: ${nestedName}`, nestedData);

                            // Add nested module to search index
                            this.searchIndex.push({
                                type: 'module',
                                name: nestedName,
                                category: categoryName,
                                path: nestedData.path,
                                description: nestedData.description || '',
                                data: nestedData
                            });

                            // If it's a JSON module, index its functions
                            if (nestedData.type === 'json-module' && nestedData.jsonFile) {
                                console.log(`    🔧 Found JSON module: ${nestedName}, queueing for indexing...`);
                                indexPromises.push(this.indexJsonModuleFunctions(nestedName, categoryName, nestedData));
                            }
                        }
                    } else {
                        // Add regular module/page to search index
                        this.searchIndex.push({
                            type: 'module',
                            name: itemName,
                            category: categoryName,
                            path: itemData.path,
                            description: itemData.description || '',
                            data: itemData
                        });

                        // If it's a JSON module, index its functions
                        if (itemData.type === 'json-module' && itemData.jsonFile) {
                            console.log(`  🔧 Found JSON module: ${itemName}, queueing for indexing...`);
                            indexPromises.push(this.indexJsonModuleFunctions(itemName, categoryName, itemData));
                        }
                    }
                }
            }
        }

        console.log(`⏳ Waiting for ${indexPromises.length} JSON modules to be indexed...`);

        // Wait for all function indexing to complete
        await Promise.all(indexPromises);

        console.log(`✅ Search index built with ${this.searchIndex.length} items`);
        console.log('📊 Search index breakdown:');
        const modules = this.searchIndex.filter(item => item.type === 'module').length;
        const clientFunctions = this.searchIndex.filter(item => item.type === 'function' && item.side === 'client').length;
        const serverFunctions = this.searchIndex.filter(item => item.type === 'function' && item.side === 'server').length;
        console.log(`   📦 Modules: ${modules}`);
        console.log(`   🖥️ Client Functions: ${clientFunctions}`);
        console.log(`   🖧 Server Functions: ${serverFunctions}`);
    }    async indexJsonModuleFunctions(moduleName, categoryName, moduleItem) {
        try {
            console.log(`📥 Indexing functions for module: ${moduleName}`);
            const response = await fetch(moduleItem.jsonFile);
            if (response.ok) {
                const moduleData = await response.json();
                let functionsAdded = 0;

                // Index client functions
                if (moduleData.clientFunctions && Array.isArray(moduleData.clientFunctions)) {
                    console.log(`   🖥️ Found ${moduleData.clientFunctions.length} client functions`);
                    moduleData.clientFunctions.forEach(func => {
                        this.searchIndex.push({
                            type: 'function',
                            side: 'client',
                            name: func.name,
                            module: moduleName,
                            category: categoryName,
                            path: moduleItem.path,
                            description: func.description || '',
                            syntax: func.syntax || '',
                            example: func.example || '',
                            parameters: func.parameters || [],
                            data: func
                        });
                        functionsAdded++;
                    });
                }

                // Index server functions
                if (moduleData.serverFunctions && Array.isArray(moduleData.serverFunctions)) {
                    console.log(`   🖧 Found ${moduleData.serverFunctions.length} server functions`);
                    moduleData.serverFunctions.forEach(func => {
                        this.searchIndex.push({
                            type: 'function',
                            side: 'server',
                            name: func.name,
                            module: moduleName,
                            category: categoryName,
                            path: moduleItem.path,
                            description: func.description || '',
                            syntax: func.syntax || '',
                            example: func.example || '',
                            parameters: func.parameters || [],
                            data: func
                        });
                        functionsAdded++;
                    });
                }

                console.log(`   ✅ Added ${functionsAdded} functions from ${moduleName}`);
            } else {
                console.warn(`⚠️ Failed to fetch JSON for ${moduleName}: ${response.status}`);
            }
        } catch (error) {
            console.warn(`⚠️ Could not index functions for ${moduleName}:`, error);
        }
    }handleSearch(query) {
        console.log('🔍 Search query:', query);

        if (!query || query.trim().length < 2) {
            this.hideSearchResultsOnly();
            return;
        }

        const searchTerm = query.toLowerCase().trim();
        const results = this.searchIndex.filter(item => {
            return (
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                (item.module && item.module.toLowerCase().includes(searchTerm)) ||
                (item.category && item.category.toLowerCase().includes(searchTerm)) ||
                (item.syntax && item.syntax.toLowerCase().includes(searchTerm))
            );
        });

        // Sort results by relevance
        results.sort((a, b) => {
            const aNameMatch = a.name.toLowerCase().startsWith(searchTerm);
            const bNameMatch = b.name.toLowerCase().startsWith(searchTerm);

            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;

            return a.name.localeCompare(b.name);
        });

        this.showSearchResults(results, searchTerm);
    }

    showSearchResults(results, searchTerm) {
        let searchContainer = document.querySelector('.search-results');

        if (!searchContainer) {
            // Create search results container
            searchContainer = document.createElement('div');
            searchContainer.className = 'search-results';

            const searchInputContainer = document.querySelector('.search-container');
            if (searchInputContainer) {
                searchInputContainer.parentNode.insertBefore(searchContainer, searchInputContainer.nextSibling);
            }
        }

        if (results.length === 0) {
            searchContainer.innerHTML = `
                <div class="search-no-results">
                    <p>No results found for "${searchTerm}"</p>
                </div>
            `;
        } else {
            const resultsHtml = results.slice(0, 10).map(result => {
                const icon = result.type === 'function'
                    ? (result.side === 'client' ? '🖥️' : '🖧')
                    : '📦';

                const badge = result.type === 'function'
                    ? `<span class="badge ${result.side}">${icon} ${result.side}</span>`
                    : `<span class="badge module">${icon} module</span>`;

                return `
                    <div class="search-result-item" data-path="${result.path}" data-anchor="${result.type === 'function' ? this.generateAnchor(result) : ''}">
                        <div class="search-result-header">
                            <span class="search-result-name">${this.highlightMatch(result.name, searchTerm)}</span>
                            ${badge}
                        </div>
                        <div class="search-result-path">${result.category} → ${result.module || result.name}</div>
                        ${result.description ? `<div class="search-result-description">${this.highlightMatch(result.description, searchTerm)}</div>` : ''}
                    </div>
                `;
            }).join('');
              searchContainer.innerHTML = `
                <div class="search-results-header">
                    <span>Found ${results.length} result${results.length === 1 ? '' : 's'} for "${searchTerm}"</span>
                    <button class="search-close">✕</button>
                </div>
                <div class="search-results-list">
                    ${resultsHtml}
                </div>
            `;
        }
          searchContainer.style.display = 'block';

        // Add click handler for close button
        const closeButton = searchContainer.querySelector('.search-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.hideSearchResults());
        }

        // Add click handlers for search results
        searchContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const path = item.dataset.path;
                const anchor = item.dataset.anchor;

                this.hideSearchResults();
                this.navigateToPath(path);

                // If it's a function, scroll to it after a delay
                if (anchor) {
                    setTimeout(() => {
                        const element = document.getElementById(anchor);
                        if (element) {
                            const header = document.querySelector('.header');
                            const headerHeight = header ? header.offsetHeight : 60;
                            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });

                            // Highlight the found element
                            element.classList.add('toc-highlight');
                            setTimeout(() => element.classList.remove('toc-highlight'), 2000);
                        }
                    }, 500);
                }
            });
        });
    }

    generateAnchor(result) {
        if (result.type === 'function') {
            const cleanFunctionName = result.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            const cleanModuleName = result.module.toLowerCase().replace(/[^a-z0-9]/g, '');
            return `${cleanFunctionName}-${result.side}-${cleanModuleName}`;
        }
        return '';
    }

    highlightMatch(text, searchTerm) {
        if (!text || !searchTerm) return text;

        const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }    hideSearchResultsOnly() {
        const searchContainer = document.querySelector('.search-results');
        if (searchContainer) {
            searchContainer.style.display = 'none';
        }
    }

    hideSearchResults() {
        const searchContainer = document.querySelector('.search-results');
        if (searchContainer) {
            searchContainer.style.display = 'none';
        }

        // Clear search input - only when explicitly hiding search
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }
    }updateTableOfContents() {
        console.log('📋 Updating table of contents...');
        const tocContainer = document.querySelector('.toc-list');
        if (!tocContainer) {
            console.warn('⚠️ TOC container not found');
            return;
        }

        // Check if we have TOC data from the current module
        if (this.currentModuleToc && this.currentModuleToc.items) {
            this.renderTocFromData(this.currentModuleToc, tocContainer);
        } else {
            // Fallback to old method for non-module pages
            this.renderTocFromHeadings(tocContainer);
        }
    }    renderTocFromData(tocData, tocContainer) {
        console.log('📋 Rendering TOC from toc.json data');

        let tocHtml = '';
        const moduleName = this.currentModuleName || 'unknown';

        const renderTocItems = (items, level = 0, parentType = null) => {
            return items.map(item => {
                const indent = level * 1;
                const icon = level === 0 ? '' :
                           item.title.includes('Functions') ? '' : '⚡ ';

                // Determine the correct anchor based on context
                let anchor = item.anchor;                // If this is a function under Client Functions, Server Functions, or Shared Functions
                if (level > 0 && parentType && !item.title.includes('Functions')) {
                    const side = parentType.includes('Client') ? 'client' :
                                parentType.includes('Server') ? 'server' :
                                parentType.includes('Shared') ? 'shared' : 'client';
                    const cleanFunctionName = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const cleanModuleName = moduleName.toLowerCase().replace(/[^a-z0-9]/g, '');
                    anchor = `#${cleanFunctionName}-${side}-${cleanModuleName}`;
                    console.log(`🔗 Generated TOC anchor: ${anchor} for ${item.title} (${side})`);
                }

                let html = `
                    <li class="toc-item toc-level-${level + 1}" style="margin-left: ${indent}rem;">
                        <a href="${anchor}" class="toc-link">
                            ${icon}${item.title}
                        </a>
                    </li>
                `;

                // Render children if they exist, passing parent type for context
                if (item.children && item.children.length > 0) {
                    const currentParentType = item.title.includes('Functions') ? item.title : parentType;
                    html += renderTocItems(item.children, level + 1, currentParentType);
                }

                return html;
            }).join('');
        };

        tocHtml = renderTocItems(tocData.items);
        tocContainer.innerHTML = tocHtml;

        // Add click handlers for smooth scrolling
        this.addTocClickHandlers(tocContainer);

        console.log(`✅ TOC updated from toc.json with ${tocData.items.length} main items`);
    }

    renderTocFromHeadings(tocContainer) {
        console.log('📋 Rendering TOC from headings (fallback)');
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) {
            console.warn('⚠️ Main content not found for TOC');
            return;
        }

        // Find main headings only (h1, h2)
        const headings = mainContent.querySelectorAll('h1, h2');

        if (headings.length === 0) {
            tocContainer.innerHTML = '<li class="toc-empty">No headings found</li>';
            return;
        }

        let tocHtml = '';
        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            const text = heading.textContent.trim();
            const id = heading.id || `heading-${index}`;

            // Add ID to heading if it doesn't have one
            if (!heading.id) {
                heading.id = id;
            }

            const indent = (level - 1) * 1;

            tocHtml += `
                <li class="toc-item toc-level-${level}" style="margin-left: ${indent}rem;">
                    <a href="#${id}" class="toc-link">
                        ${text}
                    </a>
                </li>
            `;
        });

        tocContainer.innerHTML = tocHtml;
        this.addTocClickHandlers(tocContainer);

        console.log(`✅ TOC updated from headings with ${headings.length} items`);
    }    addTocClickHandlers(tocContainer) {
        // Remove existing listeners
        const newTocContainer = tocContainer.cloneNode(true);
        tocContainer.parentNode.replaceChild(newTocContainer, tocContainer);

        // Add click handlers for smooth scrolling with header offset
        newTocContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('toc-link')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');

                // Remove active class from all TOC links
                newTocContainer.querySelectorAll('.toc-link').forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to clicked TOC link
                e.target.classList.add('active');

                if (href.startsWith('#')) {
                    const targetId = href.substring(1);

                    // Update the browser URL to include the function anchor
                    const currentPath = window.location.hash.slice(1);
                    if (this.isFunctionAnchor(targetId)) {
                        // For function anchors, update the URL completely
                        window.history.pushState(null, null, `#${targetId}`);
                        console.log('🔗 Updated URL to:', `#${targetId}`);
                    }

                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        this.scrollToElement(targetElement);
                        this.highlightElement(targetElement);
                        console.log(`📍 Scrolled to ${targetId} with highlight effect`);
                    }
                }
            }
        });
    }

    highlightElement(element) {
        // Add highlight class for visual feedback
        element.classList.add('toc-highlight');

        // Remove highlight after animation completes
        setTimeout(() => {
            element.classList.remove('toc-highlight');
        }, 2000); // 2 seconds to match a nice highlight duration

        console.log('✨ Applied highlight effect to element:', element.id);
    }    loadInitialContent() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const decodedPath = decodeURIComponent(hash);

            // Check if this is a function anchor
            if (this.isFunctionAnchor(decodedPath)) {
                console.log('🔗 Initial load with function anchor:', decodedPath);
                // For function anchors, we need to load the appropriate module first
                this.navigateToModuleForFunction(decodedPath);
            } else {
                // Regular page navigation
                this.navigateToPath(decodedPath);
            }
        } else {
            // Load default content
            const firstItem = this.findFirstNavigationItem();
            if (firstItem) {
                this.navigateToPath(firstItem.path);
            }
        }
    }

    findFirstNavigationItem() {
        for (const [category, categoryData] of Object.entries(this.allModules)) {
            for (const [itemName, item] of Object.entries(categoryData.items)) {
                if (item.path) {
                    return item;
                }
                if (item.items) {
                    for (const [subItemName, subItem] of Object.entries(item.items)) {
                        if (subItem.path) {
                            return subItem;
                        }
                    }
                }
            }
        }
        return null;
    }

    setLoading(loading) {
        this.isLoading = loading;
        const mainContent = document.querySelector('.main-content');
        if (mainContent && loading) {
            mainContent.innerHTML = '<div class="loading">Loading...</div>';
        }
    }

    showError(message) {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-message">
                    <h2>⚠️ Error</h2>
                    <p>${message}</p>
                </div>
            `;
        }
    }

    setupCopyLinkButtons() {
        const copyLinkButtons = document.querySelectorAll('.copy-link-btn');
        copyLinkButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const anchorId = button.getAttribute('data-anchor');
                const currentUrl = window.location.origin + window.location.pathname;
                const fullUrl = `${currentUrl}#${anchorId}`;

                // Copy to clipboard
                navigator.clipboard.writeText(fullUrl).then(() => {
                    // Visual feedback
                    const originalText = button.textContent;
                    button.textContent = '✅';
                    button.style.background = 'var(--accent-color)';

                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = '';
                    }, 2000);

                    console.log('🔗 Copied function link:', fullUrl);
                }).catch(err => {
                    console.error('Failed to copy link:', err);
                    // Fallback: select text for manual copy
                    const textArea = document.createElement('textarea');
                    textArea.value = fullUrl;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);

                    button.textContent = '📋';
                    setTimeout(() => {
                        button.textContent = '🔗';
                    }, 2000);
                });
            });
        });

        console.log(`✅ Set up ${copyLinkButtons.length} copy link buttons`);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CommunityBridgeDocumentation();
});
