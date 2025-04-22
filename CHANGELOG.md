# Change Log

All notable changes to the "GBox4" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.6] - 2024-06-25

### Fixed
- 修复在macOS上运行GBox4 .app应用程序的权限问题
- 增强了对macOS应用程序包的支持，自动定位并使用内部可执行文件
- 改进了执行引擎的日志，显示更详细的信息

## [0.0.5] - 2024-06-25

### Fixed
- Fixed syntax highlighting for special identifiers like `id#walk` 
- Ensured the entire identifier is properly highlighted by using an improved regular expression pattern
- Prioritized special identifier matching to prevent partial matching by other rules

## [0.0.4] - 2024-06-25

### Enhanced
- Improved syntax highlighting for special identifiers like `id#walk`
- Now the entire identifier (including the prefix and content) is highlighted with a distinct color

## [0.0.3] - 2024-06-25

### Added
- Run button in editor title bar for .gb files
- Integrated terminal execution of GBox4 scripts
- Engine path configuration option
- Support for additional command-line arguments
- Automatic file saving before running

## [0.0.2] - 2024-06-24

### Enhanced
- Significantly improved syntax highlighting with complete GBox4 API coverage
- Added highlighting for:
  - Member variables (m_* prefix)
  - All GBox4 engine classes
  - Functions and methods
  - Namespaces and special identifiers
  - Constants and numeric literals
  - Operators and special symbols
- Updated README with better documentation and examples

## [0.0.1] - 2024-05-01

### Added
- Initial release
- Basic syntax highlighting
- Language configuration
- File association for .gb files