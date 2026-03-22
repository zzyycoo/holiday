# Hotel Service Booking System v3.1.0

A modular, modern booking email generator for hotel services with PID database support and A171 One Day Trip mode.

## Features

- 🏨 **Room Booking** - Multi-guest room booking with sharer support
- 🚗 **Car Service** - VIP car service booking
- ⛳ **Golf Booking** - Golf course reservations
- 🚌 **Bus Service** - Shuttle bus booking (HCM ↔ HT)
- 🌅 **A171 One Day Trip** - Patron registration without room booking
- 📊 **PID Database Import** - Excel import for auto-fill
- 📧 **Email Generation** - Auto-generate formatted booking emails
- 📋 **Quick Copy** - One-click copy to clipboard
- 📱 **Responsive** - Works on desktop and mobile

## What's New in v3.1.0

- ✨ **A171 One Day Trip Mode** - Dedicated patron registration workflow
- ✨ **PID Database Import** - Upload Excel file for auto-fill functionality
- ✨ **Changelog Tracking** - Documented version history
- 🔧 Fixed module loading order issues
- 🔧 Fixed Litepicker initialization with retry mechanism

## Architecture

```
src/
├── css/
│   ├── variables.css    # CSS custom properties
│   ├── layout.css       # Layout and containers
│   ├── forms.css        # Form elements and buttons
│   └── components.css   # UI components
├── js/
│   ├── main.js          # Application entry point
│   ├── state.js         # Central state management
│   ├── hotels.js        # Hotel data and helpers
│   ├── utils.js         # Date/PID utilities
│   ├── room-booking.js  # Room booking module
│   ├── car-booking.js   # Car service module
│   ├── golf-booking.js  # Golf booking module
│   └── bus-booking.js   # Bus service module
└── data/
    └── hotels.json      # Hotel configuration
```

## Tech Stack

- **Vite** - Fast build tool
- **Vanilla JS** - No framework dependencies
- **CSS Variables** - Easy theming
- **Modular Architecture** - Clean separation of concerns
- **SheetJS** - Excel file reading for PID database

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Data Configuration

Edit `src/data/hotels.json` to add/modify:
- Hotels and room types
- Promotions per room type
- Agent quick select list
- Service configurations

## PID Database Format

Import an Excel file with columns:
- `Old PID` - Legacy PID number
- `New PID` - Current PID number
- `Player Name` - Guest name

## Comparison with v2.0

| Metric | v2.0 | v3.1.0 |
|--------|------|--------|
| File Structure | Single HTML (4143 lines) | Modular (10+ files) |
| Total Size | 173KB | 44KB JS + 13KB CSS |
| Maintainability | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Build Tool | None | Vite |
| Hot Reload | No | Yes |
| A171 Mode | ✅ | ✅ |
| PID Import | ✅ | ✅ |

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## License

MIT
