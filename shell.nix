{ pkgs ? import <nixpkgs> { } }:
with pkgs;

mkShell {
  name = "conhecimentosBeradeiros";

  # Add executable packages to the nix-shell environment.
  packages = with pkgs; [
    gcc
    android-tools
    android-studio
    nodejs_20
    nodePackages.yarn
    nodePackages.npm
    nodePackages.typescript
    nodePackages.typescript-language-server
  ];

  DEVELOP = "true";
}
