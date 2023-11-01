{ pkgs ? import <nixpkgs> {
  config.android_sdk.accept_license = true;
  config.allowUnfree = true;
} }:
with pkgs;

let androidSdk = androidenv.androidPkgs_9_0.androidsdk;

in mkShell {
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
    androidSdk
  ];

  DEVELOP = "true";
  ANDROID_SDK_ROOT="$HOME/Android/Sdk/"
}
