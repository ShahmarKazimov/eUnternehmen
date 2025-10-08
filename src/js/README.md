# JavaScript Folder Structure

Bu layihənin JavaScript kod strukturu aşağıdaki kimi təşkil edilib:

## 📁 Folder Structure

```
src/
├── js/
│   ├── header.js      # Header functionality (Navigation, Dropdowns, Mobile Menu)
│   ├── homepage.js    # Homepage features (Video Player, Pricing Slider)
│   ├── faq.js         # FAQ Accordion functionality
│   └── main.js        # Main app coordinator
├── style.css          # All CSS styles
└── main.js           # Old file (can be deleted)
```

## 🎯 File Responsibilities

### header.js
- Navigation dropdowns
- Language selector
- Mobile hamburger menu
- Outside click handling

### homepage.js
- Video player functionality
- Pricing slider with touch support
- Additional services slider
- Swipe gestures

### faq.js
- FAQ accordion open/close
- Single item active state
- Smooth height transitions

### main.js
- Application coordinator
- Component initialization
- Error handling
- Console logging for debugging

## 🚀 How it works

1. All JS files are loaded in HTML
2. Each file creates a global class (Header, Homepage, FAQ)
3. main.js initializes all components when DOM is ready
4. Each component is self-contained and independent

## ✅ Benefits

- **Modularity**: Each feature in separate file
- **Maintainability**: Easy to find and fix bugs
- **Scalability**: Easy to add new features
- **Clarity**: Clear separation of concerns
- **Debugging**: Console logs for component status