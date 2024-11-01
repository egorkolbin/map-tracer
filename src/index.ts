export interface NodePoint {
    x: number;
    y: number;
}

interface DrawSvgLinesOptions {
    dataArray: NodePoint[];
    mapWidth?: number;
    mapHeight?: number;
    dashAnimate?: boolean;
    pathColor?: string;
    parentNode?: string;
}

export const mapTracer = ({
                              dataArray,
                              mapWidth,
                              mapHeight,
                              dashAnimate = false,
                              pathColor = '#000000',
                              parentNode,
                          }: DrawSvgLinesOptions) => {
    // Проверка на наличие обязательного параметра dataArray
    if (!dataArray || dataArray.length === 0) {
        throw new Error('dataArray is required and should not be empty');
    }

    // Вычисление ширины и высоты, если они не указаны
    const calculatedWidth =
        mapWidth || Math.max(...dataArray.map((point) => point.x));
    const calculatedHeight =
        mapHeight || Math.max(...dataArray.map((point) => point.y));

    // Создание SVG элемента
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${calculatedWidth} ${calculatedHeight}`);

    // Создание пути
    const pathData = dataArray
        .map((point, index) => {
            const command = index === 0 ? 'M' : 'L';
            return `${command}${point.x} ${point.y}`;
        })
        .join(' ');

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', pathColor);
    path.setAttribute('stroke-width', '2');

    // Определение анимации
    if (dashAnimate) {
        path.setAttribute('stroke-dasharray', '10, 10');
        path.setAttribute('stroke-dashoffset', '0');

        // Добавляем анимацию с помощью ключевых кадров
        const style = document.createElement('style');
        style.textContent = `
      @keyframes dash {
        from {
          stroke-dashoffset: 0;
        }
        to {
          stroke-dashoffset: -20;
        }
      }
      path {
        animation: dash 1s linear infinite;
      }
    `;
        document.head.appendChild(style);
    } else {
        // Анимация рисования непрерывной линии
        const totalLength = path.getTotalLength().toString();
        path.setAttribute('stroke-dasharray', totalLength);
        path.setAttribute('stroke-dashoffset', totalLength);

        // Добавляем анимацию с помощью ключевых кадров
        const style = document.createElement('style');
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
        animation: draw 2s linear forwards;
      }
    `;
        document.head.appendChild(style);
    }

    svg.appendChild(path);

    // Добавляем SVG в указанный родительский элемент или в body
    const parentElement = parentNode
        ? document.querySelector(parentNode)
        : document.body;
    if (parentElement) {
        parentElement.appendChild(svg);
    } else {
        throw new Error(`Parent node "${parentNode}" not found`);
    }
};
