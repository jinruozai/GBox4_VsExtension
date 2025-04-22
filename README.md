# GBox4 VSCode Extension

Welcome to the GBox4 extension for Visual Studio Code! This extension provides comprehensive support for the GBox4 scripting language, used primarily in game development with the GBox4 game engine. Enhance your game development workflow with features specifically tailored for `.gb` files.

## Features

### Syntax Highlighting
- **Complete API Coverage**: Highlights all GBox4 engine classes, functions, variables, and namespaces
- **Keyword Recognition**: All language keywords, control structures, and built-in types are properly colored
- **Member Variables**: Automatic highlighting of member variables using GBox4 naming conventions (m_* prefixes)
- **Constants & Operators**: Special coloring for constants, operators, and special symbols
- **Special Identifiers**: Distinct highlighting for special GBox4 identifiers like `id#walk`, `fn#name`, `res#resource`

### Run GBox4 Files
- **Run Button**: Easy-to-use run button in the editor title bar for .gb files
- **Integrated Terminal**: Run scripts directly within VS Code's integrated terminal
- **Configurable Engine Path**: Set your GBox4 engine path in the extension settings
- **Additional Arguments**: Customize your run configuration with additional command-line arguments

### Code Intelligence
- Basic code completion for GBox4 language elements
- Recognition of code structure and scope

### File Integration
- Automatic association with `.gb` files
- Custom language configuration for comments and bracket pairs

## Example

```gbox4
// Create a simple 2D object
GObjShape $ {
    // Set position and size
    SetPosSize(100, 100, 200, 200);
    
    // Set color and properties
    SetColor(0xff00ff00);
    m_fAlpha = 0.8;
    
    // Handle touch events
    m_nCanTouch = TOUCHFLAG_NORMAL;
    
    // Special identifiers with distinct highlighting
    static var s_vActMap=makevid(id#idel,ANI_站立,id#walk,ANI_走,id#run,ANI_跑);
    
    void OnTouch(var &dn) {
        if(dn.flag == TOUCH_UP) {
            // Change color on click
            m_nColor = 0xff000000 | rand(0x00ffffff);
        }
    }
}
```

## Requirements

- Visual Studio Code 1.85.0 or higher.
- GBox4 Game Engine (if working on game projects).

## Setup

1. Install the extension from the VS Code Marketplace
2. Open your VS Code settings (File > Preferences > Settings)
3. Search for "GBox4"
4. Set the path to your GBox4 engine executable in "GBox4: Engine Path"
5. Optionally, configure additional command-line arguments in "GBox4: Additional Args"

## Using the Run Button

When viewing a .gb file, you'll see a "Run" button in the editor's title bar (top-right corner). Clicking this button will:
1. Save your file if needed
2. Execute it using the configured GBox4 engine
3. Show the output in VS Code's integrated terminal

## Extension Settings

This extension contributes the following settings:

- `gbox4.enginePath`: Path to the GBox4 engine executable
- `gbox4.additionalArgs`: Additional arguments to pass to the GBox4 engine
- `gbox4.autocomplete`: Enable/disable auto-completion for GBox4 language (coming soon)

## Known Issues

- Advanced code completion features are still in development
- Some complex expressions may not highlight perfectly

## Release Notes

### 0.0.4
- Improved syntax highlighting for special identifiers like `id#walk`
- Now the entire identifier (including the prefix and content) is highlighted with a distinct color

### 0.0.3
- Added Run button functionality for .gb files
- Added engine path configuration
- Added support for command-line arguments

### 0.0.2
- Enhanced syntax highlighting with complete GBox4 API coverage
- Added support for member variables, namespaces, and constants
- Improved color theming and token recognition

### 0.0.1
- Initial release of GBox4 extension
- Basic syntax highlighting for `.gb` files

## About GBox4

GBox4 is a cross-platform lightweight game engine that provides 2D/3D graphics rendering, particle effects, animation, UI development, audio processing, resource management, and scripting capabilities. The engine enables developers to quickly create high-quality games and interactive applications.

## Feedback and Contributions

Your feedback and contributions are welcome! Please submit issues or pull requests to the [GitHub repository](https://github.com/jinruozai/GBox4_VsExtension).