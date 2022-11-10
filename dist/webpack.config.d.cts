export const entry: string;
export namespace module {
    const rules: {
        test: RegExp;
        use: string;
        include: string;
    }[];
}
export namespace resolve {
    const extensions: string[];
}
export const devtool: string;
export const mode: string;
export const plugins: any[];
export namespace devServer {
    export const port: number;
    export const liveReload: boolean;
    export namespace _static {
        const directory: string;
        const serveIndex: boolean;
        const watch: boolean;
    }
    export { _static as static };
}
export namespace output {
    const filename: string;
    const path: string;
}
