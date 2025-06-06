# Dotnet Format Command

Right-click `.cs` files or folders to run `dotnet format` directly from the context menu.

## Features

- 📝 Format C# files using `dotnet format`
- 📁 Works on single files or entire folders
- ⚙️ Automatically creates a `.editorconfig` if none is found

## Requirements

You must have the [.NET SDK](https://dotnet.microsoft.com/download) installed and accessible via the `dotnet` command.

## Usage

- Right-click a `.cs` file or folder in the **Explorer** or **Editor**
- Select:
  - **RUN: Dotnet Format**
  - **RUN: Dotnet Format**

That’s it — the command runs `dotnet format --include <target>` in the background.

## Note

If no `.editorconfig` file is found in your project root, one will be created automatically with default formatting rules.

