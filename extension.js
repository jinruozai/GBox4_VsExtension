const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

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

    vscode.window.showInformationMessage(`Running: ${path.basename(filePath)}`);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}; 