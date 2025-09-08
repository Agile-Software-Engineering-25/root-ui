import {defineConfig} from "vite";
import path from 'path';
import react from "@vitejs/plugin-react";
import vitePluginSingleSpa from "vite-plugin-single-spa";

const PORT = 3000;

// https://vitejs.dev/config/
export default defineConfig(({command}) => ({
    server: {
        port: PORT,
    },
    base: command == "serve" ? "" : "/api/root-ui/",
    preview: {
        port: PORT,
    },
    define: {
        "process.env": process.env,
    },
    plugins: [
        react(),
        vitePluginSingleSpa({
            type: "root",
            imo: "3.1.1",
            imoUi: {
                variant: "full",
                buttonPos: "bottom-right",
            },
            importMaps: {
                dev: ["src/importMap.dev.json", "src/importMap.shared.json"],
                build: ["src/importMap.json", "src/importMap.shared.json"],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@custom-types': path.resolve(__dirname, './src/@custom-types'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@stores': path.resolve(__dirname, './src/stores'),
        }
    }
}));
