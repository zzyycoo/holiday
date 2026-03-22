# Changelog

## [3.2.0] - 2026-03-22

### Changed
- 🦾 **Renamed to A KANG TOOLS** - New branding
- 🎬 **Random Movie Quotes** - Classic movie quotes as subtitle
- 🔢 **Version sync** - All version numbers updated to 3.2.0

## [3.1.1] - 2026-03-22

### Changed
- 🎨 **Compact UI Design** - More efficient use of screen space
- 🔤 **Smaller Icons** - Service icons reduced from 2rem to 1.5rem (mobile 1.25rem)
- 📐 **Two-Column Desktop Layout** - Forms on left, preview on right (≥1024px)
- 📏 **Reduced Spacing** - Less padding and margins throughout
- 🔘 **Compact Buttons** - Smaller button sizes

## [3.1.0] - 2026-03-22

### Added
- 🌅 **A171 One Day Trip — Patron Registration** mode
  - Patron visit without room booking
  - Separate subject line format
  - Quick entry from main page
- 📊 **PID Database Import**
  - Excel (.xlsx/.xls) file upload
  - Auto-fill PID names from database
  - Status indicator showing loaded record count
- 📋 **Changelog tracking** started

### Changed
- 🔧 Fixed module loading order (window.app undefined errors)
- 🔧 Fixed Litepicker loading with retry mechanism
- 🔧 Removed duplicate window.app exports from sub-modules

### Fixed
- Service selector now renders correctly
- Click handlers working properly
- Date picker fallback to native inputs when Litepicker fails

## [3.0.0] - 2026-03-22

### Initial Release
- 🏨 Room Booking with guest/sharer management
- 🚗 Car Service with pickup/dropoff locations
- ⛳ Golf Booking with pax and guest list
- 🚌 Bus Service with HCM ↔ HT routes
- 📧 Email generation with copy/send functionality
- 🎨 Modular Vite architecture with CSS modules
