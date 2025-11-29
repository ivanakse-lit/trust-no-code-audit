# Screenshot Capture Guide

This guide will help you capture high-quality screenshots of the Trust No Code Audit Dashboard for documentation.

## Prerequisites

1. Frontend is running at http://localhost:3100 (use `npm run dev` from the `frontend` directory)
2. Browser preview is available or open the URL directly in your browser
3. Screenshot tool ready (Windows: Win + Shift + S, Mac: Cmd + Shift + 4)

## Screenshots to Capture

### 1. Audit Configuration Screen (`audit-config.png`)

**What to show:**
- Main "Configure" tab active
- All three audit type buttons visible (Security, Architecture, Production Readiness)
- One audit type selected (e.g., Security)
- Codebase Path input field with example path
- Reports Folder input field with example path
- "Copy to Clipboard" button visible
- Dark theme UI

**Steps:**
1. Navigate to http://localhost:3100
2. Ensure you're on the "Configure" tab
3. Select an audit type (Security recommended)
4. Fill in example paths:
   - Codebase: `B:\Dev\MyProject`
   - Reports: `B:\Dev\Audits\reports`
5. Capture the full screen or crop to show the main content area

### 2. Path Browser Interface (`path-browser.png`)

**What to show:**
- Path input field with browse button
- File/folder browser modal or dropdown (if implemented)
- Drive selection (C:, D:, etc. on Windows)
- Path validation indicators (checkmarks or error states)

**Steps:**
1. Click on the browse/folder icon next to a path input
2. Show the file browser interface
3. Capture the modal/dropdown showing folder structure
4. Include validation states if visible

### 3. Report Viewer (`report-viewer.png`)

**What to show:**
- "Reports" tab active
- List of available reports in the sidebar/list
- A report opened and rendered with Markdown formatting
- Syntax highlighting for code blocks (if present in report)
- Recent reports section (if visible)

**Steps:**
1. Navigate to the "Reports" tab
2. Ensure there's at least one report file in your reports folder
3. Click on a report to open it
4. Scroll to show both the report list and rendered content
5. Capture showing the Markdown rendering quality

### 4. Dashboard Overview (`dashboard-overview.png`)

**What to show:**
- Full application layout
- Navigation tabs (Configure, Reports)
- Header/title area
- Dark theme aesthetic
- Overall UI structure

**Steps:**
1. Capture the full dashboard view
2. Show the main navigation and layout
3. Include enough context to show the overall design
4. Ensure the "Trust No Code Audit Dashboard" title is visible

## Screenshot Best Practices

### Resolution & Quality
- **Recommended resolution**: 1920x1080 or higher
- **Format**: PNG (for crisp UI elements)
- **File size**: Optimize but maintain clarity (aim for < 500KB per image)

### Composition
- **Crop appropriately**: Remove excessive browser chrome/OS elements
- **Show context**: Include enough UI to understand the feature
- **Avoid clutter**: Close unnecessary browser tabs/windows in background
- **Consistent zoom**: Use 100% browser zoom for all screenshots

### Content
- **Use realistic data**: Show example paths that make sense
- **No sensitive info**: Don't include real project paths with sensitive names
- **Clean state**: No error messages unless demonstrating error handling
- **Professional**: Ensure UI looks polished and intentional

## Saving Screenshots

1. Save all screenshots to `./screenshots/` directory
2. Use exact filenames as specified:
   - `audit-config.png`
   - `path-browser.png`
   - `report-viewer.png`
   - `dashboard-overview.png`
3. Verify images display correctly in README by opening `README.md`

## Verification

After capturing screenshots:

1. Check that all 4 images are in `./screenshots/` directory
2. Open `README.md` in a Markdown viewer or GitHub
3. Verify all images load correctly
4. Ensure images are clear and demonstrate the features well
5. Optimize file sizes if needed (use tools like TinyPNG or ImageOptim)

## Optional: Animated GIFs

For enhanced documentation, consider creating animated GIFs showing:
- Complete workflow from configuration to report viewing
- Path browser interaction
- Report navigation

Tools for GIF creation:
- **Windows**: ScreenToGif
- **Mac**: Kap, Gifox
- **Cross-platform**: LICEcap

Save GIFs with descriptive names like `workflow-demo.gif` in the screenshots directory.

## Troubleshooting

**Frontend not loading?**
- Ensure `npm run dev` is running
- Check http://localhost:3100 is accessible
- Verify no port conflicts

**Screenshots too large?**
- Use PNG optimization tools
- Crop to relevant content only
- Consider 1280x720 if 1080p is too large

**Dark theme not showing?**
- The app uses dark theme by default
- Check browser's color scheme settings
- Refresh the page if needed

## Next Steps

After capturing screenshots:
1. Commit the images to the repository
2. Push to GitHub to see them in the README
3. Update screenshot descriptions in README if needed
4. Share the updated documentation with your team
