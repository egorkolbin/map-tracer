// map-tracer.d.ts
declare module 'map-tracer' {
    export interface NodePoint {
        x: number;
        y: number;
    }

    export function mapTracer(options: {
        dataArray: NodePoint[]
        mapWidth?: number
        mapHeight?: number
        dashAnimate?: boolean
        pathColor?: string
        strokeDasharray?: string
        parentNode?: string
        runAnimate?: boolean | string
        runColor?: string
        drawSpeed?: number
        strokeWidth?: number
    }): void;
}
