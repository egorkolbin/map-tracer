// map-tracer.d.ts
declare module 'map-tracer' {
    export interface NodePoint {
        x: number;
        y: number;
    }

    export function mapTracer(options: {
        dataArray: NodePoint[];
        mapWidth?: number;
        mapHeight?: number;
        dashAnimate?: boolean;
        pathColor?: string;
        parentNode?: string;
    }): void;
}
