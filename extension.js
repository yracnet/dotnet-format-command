const vscode = require('vscode');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

let dotnetTerminal = null; // Variable global para mantener la terminal activa

function activate(context) {
    const formatFile = vscode.commands.registerCommand('dotnet-format-command.formatFile', async (uri) => {
        const filePath = uri.fsPath;
        await checkAndCreateEditorConfig(uri);
        runDotnetFormat([filePath]);
    });

    const formatFolder = vscode.commands.registerCommand('dotnet-format-command.formatFolder', async (uri) => {
        const folderPath = uri.fsPath;
        await checkAndCreateEditorConfig(uri);
        runDotnetFormat([folderPath]);
    });

    context.subscriptions.push(formatFile, formatFolder);
}

function runDotnetFormat(paths) {
    const includes = paths.map(p => `"${p}"`).join(' ');

    // Si ya existe la terminal y no está cerrada, reutilizarla
    if (!dotnetTerminal || dotnetTerminal.exitStatus) {
        dotnetTerminal = vscode.window.createTerminal({
            name: "Dotnet Format"
        });
    }

    dotnetTerminal.show();
    dotnetTerminal.sendText(`dotnet format --include ${includes}`);
}

async function checkAndCreateEditorConfig(uri) {
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder found.');
        return;
    }

    const rootPath = workspaceFolder.uri.fsPath;
    const editorConfigPath = path.join(rootPath, '.editorconfig');

    if (fs.existsSync(editorConfigPath)) {
        return;
    }

    const defaultConfig = `[*.cs]
indent_style = space
indent_size = 4
max_line_length = 80
`;

    fs.writeFileSync(editorConfigPath, defaultConfig, 'utf8');
    vscode.window.showInformationMessage('.editorconfig created successfully.');
}

function deactivate() {
    if (dotnetTerminal) {
        dotnetTerminal.dispose();
    }
}

module.exports = {
    activate,
    deactivate
};
