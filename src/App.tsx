import React from 'react'
import './App.css'
import { Stage, Layer, Star, Ring, Circle } from 'react-konva';


interface AppState {
  isDragging: boolean;
  openCloseAddingTool: boolean;
  selectedFigure: string | null;
  elements: Element[];
  windowParams: WindowParams;
}

interface WindowParams {
  height: number;
  width: number;
}

interface Element {
  type: string;
  x: number;
  y: number;
}

class App extends React.Component<unknown, AppState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stageRef: React.RefObject<any>;
  figures: string[];

  constructor(props: unknown) {
    super(props);

    this.state = {
      windowParams: {
        height: window.innerHeight,
        width: window.innerWidth
      },
      isDragging: false,
      selectedFigure: null,
      openCloseAddingTool: false,
      elements: []
    }

    this.figures = ["circle", "star", "ring"];
    this.stageRef = React.createRef();
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowParams: {
        height: window.innerHeight,
        width: window.innerWidth
      }
    })
  }

  onOffDragging = () => {
    this.setState({ isDragging: !this.state.isDragging });
  }

  openCloseAddingTool = () => {
    this.setState({ openCloseAddingTool: !this.state.openCloseAddingTool });
  }

  handleClick = () => {
    const stage = this.stageRef.current.getStage();
    const pointerPosition = stage.getPointerPosition();
    const stagePosition = stage.position();
    const x = pointerPosition.x - stagePosition.x;
    const y = pointerPosition.y - stagePosition.y;

    this.setState((prevState) => ({
      elements: [
        ...prevState.elements,
        {
          type: this.state.selectedFigure!,
          x,
          y,
        },
      ],
    }));
  };

  selectFigure = (figure: string) => {
    if (this.state.selectedFigure === figure) {
      this.setState({ selectedFigure: null });
    } else {
      this.setState({ selectedFigure: figure });
    }

  }

  render() {
    const {
      isDragging,
      elements,
      windowParams,
      openCloseAddingTool,
      selectedFigure
    } = this.state;

    const {
      height,
      width
    } = windowParams;

    return (
      <div className="canvas">
        <div className="header">
          <div className='menu'>
            <div
              className="add"
              onClick={this.openCloseAddingTool}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg>
            </div>

            <div className={`drag ${isDragging ? "dragging" : "stand-by"}`}
              onClick={this.onOffDragging}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2a.75.75 0 0 1 .53.22l1.5 1.5a.75.75 0 0 1-1.06 1.06l-.22-.22v1.69a.75.75 0 0 1-1.5 0V4.56l-.22.22a.75.75 0 0 1-1.06-1.06l1.5-1.5A.75.75 0 0 1 10 2m2 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-9.78-.53a.75.75 0 0 0 0 1.06l1.5 1.5a.75.75 0 0 0 1.06-1.06l-.22-.22h1.69a.75.75 0 0 0 0-1.5H4.56l.22-.22a.75.75 0 0 0-1.06-1.06zM10 18a.75.75 0 0 0 .53-.22l1.5-1.5a.75.75 0 1 0-1.06-1.06l-.22.22v-1.69a.75.75 0 0 0-1.5 0v1.69l-.22-.22a.75.75 0 0 0-1.06 1.06l1.5 1.5c.14.141.331.22.53.22m7.78-8.53a.75.75 0 0 1 0 1.06l-1.5 1.5a.75.75 0 1 1-1.06-1.06l.22-.22h-1.69a.75.75 0 0 1 0-1.5h1.69l-.22-.22a.75.75 0 0 1 1.06-1.06z" /></svg>
            </div>
          </div>
        </div>

        <div className={`adding-menu ${openCloseAddingTool ? "open" : "close"}`}>
          <div className="menu-inner">
            {
              this.figures && this.figures.map((figure, index) => {
                return (
                  <div
                    key={index}
                    className={`figure ${figure === this.state.selectedFigure ? "selected" : "default"}`}
                    onClick={() => this.selectFigure(figure)}
                  >
                    {
                      figure === "star" &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#89b717" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z" /></svg>
                    }

                    {
                      figure === "circle" &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#89b717" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
                    }

                    {
                      figure === "ring" &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="#89b717" d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7s-7-3.1-7-7s3.1-7 7-7m0-1C3.6 0 0 3.6 0 8s3.6 8 8 8s8-3.6 8-8s-3.6-8-8-8" /></svg>
                    }
                  </div>
                )
              })
            }

            <div
              className='close-button'
              onClick={this.openCloseAddingTool}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" /></svg>
            </div>
          </div>
        </div>

        <Stage
          ref={this.stageRef}
          x={0}
          y={0}
          width={width}
          height={height}
          style={{ backgroundColor: 'lightblue' }}
          draggable
          onClick={() => {
            if (selectedFigure) {
              this.handleClick();
            }
          }}
        >
          <Layer>
            {
              elements && elements.map((element, index) => {
                if (element.type === "star") {
                  return (
                    <Star
                      key={index}
                      x={element.x}
                      y={element.y}
                      numPoints={5}
                      innerRadius={20}
                      outerRadius={40}
                      fill="#89b717"
                      draggable={isDragging ? true : false}
                    />
                  )
                }
                if (element.type === "ring") {
                  return (
                    <Ring
                      key={index}
                      x={element.x}
                      y={element.y}
                      numPoints={5}
                      innerRadius={30}
                      outerRadius={20}
                      fill="#89b717"
                      draggable={isDragging ? true : false}
                    />
                  )
                }
                if (element.type === "circle") {
                  return (
                    <Circle
                      key={index}
                      x={element.x}
                      y={element.y}
                      radius={20}
                      fill="#89b717"
                      draggable={isDragging ? true : false}
                    />
                  )
                }
              })}
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default App
