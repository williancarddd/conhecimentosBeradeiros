{
  description = "NixOS environment";

  inputs = { nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable"; };

  outputs = { self, nixpkgs, }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
        config.android_sdk.accept_license = true;
      };

    in
    {
      devShell.${system} = with pkgs;

        let androidSdk = androidenv.androidPkgs_9_0.androidsdk;
        in
        mkShell rec {
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
          shellHook = ''
            export PRISMA_SCHEMA_ENGINE_BINARY="${prisma-engines}/bin/schema-engine"
            export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
            export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
            export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
            export ANDROID_SDK_ROOT=$HOME/Android/Sdk/
          '';
        };
    };
}
