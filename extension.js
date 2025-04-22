const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('GBox4 extension is now active');

    // 注册运行GBox4文件的命令
    let disposable = vscode.commands.registerCommand('gbox4.run', function () {
        runGboxFile();
    });

    context.subscriptions.push(disposable);
}

/**
 * 运行当前打开的GBox4文件
 */
function runGboxFile() {
    // 获取当前打开的编辑器
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No file is open.');
        return;
    }

    // 检查文件扩展名是否为.gb
    const filePath = editor.document.uri.fsPath;
    if (path.extname(filePath) !== '.gb') {
        vscode.window.showErrorMessage('Current file is not a GBox4 (.gb) file.');
        return;
    }

    // 确保文件已保存
    if (editor.document.isDirty) {
        vscode.window.showInformationMessage('Saving file before running...');
        editor.document.save().then(() => {
            executeGboxEngine(filePath);
        });
    } else {
        executeGboxEngine(filePath);
    }
}

/**
 * 获取macOS应用程序的可执行文件路径
 * @param {string} appPath macOS应用程序路径 (.app)
 * @returns {string} 可执行文件路径
 */
function getMacOSExecutablePath(appPath) {
    // 移除路径末尾的斜杠（如果有）
    appPath = appPath.replace(/\/$/, '');
    
    // 检查是否是.app路径
    if (!appPath.endsWith('.app')) {
        return appPath;
    }
    
    // 应用名称（不包含.app）
    const appName = path.basename(appPath, '.app');
    
    // macOS应用的可执行文件通常位于Contents/MacOS/目录下
    const executablePath = path.join(appPath, 'Contents', 'MacOS', appName);
    
    // 检查可执行文件是否存在
    if (fs.existsSync(executablePath)) {
        return executablePath;
    }
    
    // 如果按常规名称查找不到，尝试查找Contents/MacOS/目录下的任意可执行文件
    const macOSDir = path.join(appPath, 'Contents', 'MacOS');
    if (fs.existsSync(macOSDir)) {
        try {
            const files = fs.readdirSync(macOSDir);
            if (files.length > 0) {
                // 返回第一个找到的文件
                return path.join(macOSDir, files[0]);
            }
        } catch (error) {
            console.error('Error searching executable in MacOS directory:', error);
        }
    }
    
    // 如果找不到可执行文件，返回原始路径
    return appPath;
}

/**
 * 执行GBox4引擎来运行指定的文件
 * @param {string} filePath 要运行的GBox4文件路径
 */
function executeGboxEngine(filePath) {
    // 从设置中获取GBox4引擎路径
    const config = vscode.workspace.getConfiguration('gbox4');
    let enginePath = config.get('enginePath');
    const additionalArgs = config.get('additionalArgs') || '';

    // 如果没有配置引擎路径，提示用户配置
    if (!enginePath) {
        vscode.window.showErrorMessage(
            'GBox4 engine path is not configured. Please set it in the settings.',
            'Open Settings'
        ).then(selected => {
            if (selected === 'Open Settings') {
                vscode.commands.executeCommand('workbench.action.openSettings', 'gbox4.enginePath');
            }
        });
        return;
    }

    // 如果是相对路径，转换为绝对路径
    if (!path.isAbsolute(enginePath)) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            enginePath = path.join(workspaceFolders[0].uri.fsPath, enginePath);
        } else {
            vscode.window.showErrorMessage('Cannot resolve relative engine path without a workspace folder.');
            return;
        }
    }

    // 处理macOS的.app应用程序路径
    const platform = os.platform();
    if (platform === 'darwin' && enginePath.endsWith('.app')) {
        const originalPath = enginePath;
        enginePath = getMacOSExecutablePath(enginePath);
        console.log(`macOS app detected. Converted path from ${originalPath} to ${enginePath}`);
    }

    // 检查引擎是否存在
    if (!fs.existsSync(enginePath)) {
        vscode.window.showErrorMessage(
            `GBox4 engine not found at ${enginePath}. Please check your settings.`,
            'Open Settings'
        ).then(selected => {
            if (selected === 'Open Settings') {
                vscode.commands.executeCommand('workbench.action.openSettings', 'gbox4.enginePath');
            }
        });
        return;
    }

    // 创建终端并运行命令
    const terminal = vscode.window.createTerminal('GBox4 Run');
    
    // 构建完整的命令
    const command = `"${enginePath}" "${filePath}" ${additionalArgs}`;
    
    terminal.sendText(command);
    terminal.show();

    vscode.window.showInformationMessage(`Running: ${path.basename(filePath)} (${filePath}) with engine: ${path.basename(enginePath)}`);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}; 