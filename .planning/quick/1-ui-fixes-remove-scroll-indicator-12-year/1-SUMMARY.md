# Quick Task 1: UI Fixes — Summary

**Date:** 2026-03-12
**Status:** Complete

## Changes Made

### 1. Hero cleanup (Hero.astro)
- Removed "Scroll to discover" indicator and all related CSS/animations
- Removed "12+ Years of Crafting" floating badge and all related CSS/animations
- Removed `overflow: hidden` from `.hero` to fix image clipping at bottom

### 2. Process section legibility (Process.astro)
- Added `:global(.section-title)` override to use `var(--color-cream)` on dark background
- "From Raw Earth" heading is now clearly visible

### 3. Reservation step simplification (ReservationFlow.astro)
- Changed step 4 from "Collect or Deliver" to "Collect"
- Updated description to "Pick up from our studio in Colombo"

### 4. Contact button restyle (global.css, ReservationFlow.astro)
- `.btn-instagram`: replaced garish gradient with solid terracotta fill
- `.btn-whatsapp`: replaced neon green with transparent + white border (ghost style)
- `.channel-instagram`: matching terracotta fill for reservation badges
- `.channel-whatsapp`: ghost badge style (outlined, espresso text)

### 5. DM button alignment (ProductCard.astro)
- Made `.product-card` a flex column container
- Made `.product-card-link` flex-grow to fill space
- Added `flex: 1` to `.product-card-info`
- Used `margin-top: auto` on `.product-card-reserve` to pin buttons to card bottom
- Applied same fix for mobile breakpoint

## Files Modified
- `src/components/Hero.astro`
- `src/components/Process.astro`
- `src/components/ReservationFlow.astro`
- `src/components/ProductCard.astro`
- `src/styles/global.css`
