export interface NodePoint {
    x: number
    y: number
}

interface DrawSvgLinesOptions {
    dataArray: NodePoint[]
    mapWidth?: number
    mapHeight?: number
    dashAnimate?: boolean
    pathColor?: string
    strokeDasharray?: string
    strokeWidth?: number
    parentNode?: string
    runAnimate?: boolean | string
    runColor?: string
    drawSpeed?: number
}

export const mapTracer = ({
                              dataArray,
                              mapWidth,
                              mapHeight,
                              dashAnimate = false,
                              pathColor = '#000000',
                              strokeDasharray = '10, 10',
                              strokeWidth = 2,
                              parentNode,
                              runAnimate = false,
                              runColor = '#000000',
                              drawSpeed = 2,
                          }: DrawSvgLinesOptions) => {
    const executeTracer = () => {
        if (!dataArray || dataArray.length === 0) {
            throw new Error('dataArray is required and should not be empty')
        }

        const calculatedWidth =
            mapWidth || Math.max(...dataArray.map((point) => point.x))
        const calculatedHeight =
            mapHeight || Math.max(...dataArray.map((point) => point.y))

        const svgNS = 'http://www.w3.org/2000/svg'
        const svg = document.createElementNS(svgNS, 'svg')
        svg.setAttribute('viewBox', `0 0 ${calculatedWidth} ${calculatedHeight}`)

        const pathData = dataArray
            .map((point, index) => {
                const command = index === 0 ? 'M' : 'L'
                return `${command}${point.x} ${point.y}`
            })
            .join(' ')

        const path = document.createElementNS(svgNS, 'path')
        path.setAttribute('id', 'path')
        path.setAttribute('d', pathData)
        path.setAttribute('fill', 'none')
        path.setAttribute('stroke', pathColor)
        path.setAttribute('stroke-width', strokeWidth.toString())

        const parentElement = parentNode
            ? document.querySelector(parentNode)
            : document.body
        if (parentElement) {
            const existingSvg = parentElement.querySelector('svg')
            if (existingSvg) {
                parentElement.removeChild(existingSvg)
            }
            parentElement.appendChild(svg)
        } else {
            throw new Error(`Parent node "${parentNode}" not found`)
        }

        const totalLength = path.getTotalLength().toString()

        if (dashAnimate) {
            path.setAttribute('stroke-dasharray', strokeDasharray)

            const style = document.createElement('style')
            style.textContent = `
                @keyframes dashDraw {
                    from {
                        stroke-dashoffset: ${totalLength};
                    }
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                path {
                    animation: dashDraw ${drawSpeed}s linear infinite;
                }
            `
            document.head.appendChild(style)
        } else {
            path.setAttribute('stroke-dasharray', totalLength)
            path.setAttribute('stroke-dashoffset', totalLength)

            const style = document.createElement('style')
            style.textContent = `
                @keyframes draw {
                    from {
                        stroke-dashoffset: ${totalLength};
                    }
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                path {
                    animation: draw ${drawSpeed}s linear forwards;
                }
            `
            document.head.appendChild(style)
        }

        svg.appendChild(path)

        if (runAnimate) {
            let runner

            if (typeof runAnimate === 'string') {
                runner = document.createElementNS(svgNS, 'image')
                runner.setAttribute('href', runAnimate) // Путь к пользовательской иконке
                runner.setAttribute('width', '20') // Adjust size as needed
                runner.setAttribute('height', '20') // Adjust size as needed
            } else {
                const iconSvg = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g fill="${runColor}">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M13 6C14.1046 6 15 5.10457 15 4C15 2.89543 14.1046 2 13 2C11.8955 2 11 2.89543 11 4C11 5.10457 11.8955 6 13 6ZM11.0528 6.60557C11.3841 6.43992 11.7799 6.47097 12.0813 6.68627L13.0813 7.40056C13.3994 7.6278 13.5559 8.01959 13.482 8.40348L12.4332 13.847L16.8321 20.4453C17.1384 20.9048 17.0143 21.5257 16.5547 21.8321C16.0952 22.1384 15.4743 22.0142 15.168 21.5547L10.5416 14.6152L9.72611 13.3919C9.58336 13.1778 9.52866 12.9169 9.57338 12.6634L10.1699 9.28309L8.38464 10.1757L7.81282 13.0334C7.70445 13.575 7.17759 13.9261 6.63604 13.8178C6.09449 13.7094 5.74333 13.1825 5.85169 12.641L6.51947 9.30379C6.58001 9.00123 6.77684 8.74356 7.05282 8.60557L11.0528 6.60557ZM16.6838 12.9487L13.8093 11.9905L14.1909 10.0096L17.3163 11.0513C17.8402 11.226 18.1234 11.7923 17.9487 12.3162C17.7741 12.8402 17.2078 13.1234 16.6838 12.9487ZM6.12844 20.5097L9.39637 14.7001L9.70958 15.1699L10.641 16.5669L7.87159 21.4903C7.60083 21.9716 6.99111 22.1423 6.50976 21.8716C6.0284 21.6008 5.85768 20.9911 6.12844 20.5097Z"
                    />
                </g>
            </svg>
        `
                runner = document.createElementNS(svgNS, 'foreignObject')
                runner.setAttribute('width', '20')
                runner.setAttribute('height', '20')
                runner.innerHTML = iconSvg
            }

            const motionAnimation = document.createElementNS(svgNS, 'animateMotion')
            motionAnimation.setAttribute('dur', `${drawSpeed}s`)
            motionAnimation.setAttribute('repeatCount', 'indefinite')
            motionAnimation.setAttribute('begin', '0s') // Анимация начинается сразу
            motionAnimation.setAttribute('fill', 'freeze')

            const motionPath = document.createElementNS(svgNS, 'mpath')
            motionPath.setAttributeNS(
                'http://www.w3.org/1999/xlink',
                'xlink:href',
                '#path'
            )
            motionAnimation.appendChild(motionPath)

            runner.appendChild(motionAnimation)
            svg.appendChild(runner)
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', executeTracer)
    } else {
        executeTracer()
    }
}
