import React, { Component } from "react";
import Snap from "snapsvg-cjs";
import canvg from "canvg";

class ImageEditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursor: null,
      textBoxes: [
        {
          text: ["Line1", "Line2", "Line3"]
        }
      ],
      img: ""
    };
  }

  canvasRender = () => {
    let s = Snap(this.svgDiv);
    s.clear();
    s.attr({ viewBox: "0,0,5079,3187" });
    s.image(this.state.img, 0, 0, 5079, 3187);
    /*
    var block = s.rect(50, 50, 100, 100, 20, 20);

    block.attr({
      fill: "rgb(236, 240, 241)",
      stroke: "#1f2c39",
      strokeWidth: 3
    });

    var text = s
      .text({ text: this.state.textBoxes[0].text })
      .attr({ fill: "black", fontSize: "18px" })
      .selectAll("tspan")
      .forEach((tspan, i) => {
        tspan
          .attr({ x: 0, y: 25 * (i + 1), id: `text-span-${i}` })
          .click(() => this.setState({ cursor: i }));
      });
      */
  };
  canvasClear = () => {
    let s = Snap(this.svgDiv);
  };
  componentDidMount() {
    this.canvasRender();
  }
  componentDidUpdate() {
    this.canvasRender();
  }
  onKeyDown = e => {
    let textBoxes = this.state.textBoxes;
    let str = textBoxes[0].text[this.state.cursor];
    if (e.keyCode === 8) {
      str = str.slice(0, str.length - 1) + str.slice(str.length, str.length);
    } else {
      str += e.key;
    }

    textBoxes[0].text[this.state.cursor] = str;

    this.setState({
      textBoxes
    });
    this.canvasClear();
  };

  onUploadImage = (e, f) => {
    let file = f || e.target.files[0];
    let reader = new FileReader();

    reader.onload = e => {
      this.setState({
        img: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  onSubmitSvg = () => {
    let canvas = this.canvasImg;
    let ctx = canvas.getContext("2d");
    let svgString = new XMLSerializer().serializeToString(this.svgDiv);
    let b64 = "data:image/svg+xml;base64,";

    b64 += window.btoa(svgString);

    let img = new Image(5079, 3187);
    img.src = b64;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      var png_dataurl = canvas.toDataURL("image/png");

      this.setState({
        img: png_dataurl
      });
      this.props.updateImage(png_dataurl);
    };
  };

  render() {
    return (
      <div>
        <canvas ref={i => (this.canvasImg = i)} style={{ display: "none" }} />
        <nav>
          <input type="file" onChange={this.onUploadImage} id="file-input" />
        </nav>
        <svg
          tabIndex={0}
          onKeyDown={this.onKeyDown}
          ref={d => (this.svgDiv = d)}
          style={{ width: "507.9px", height: "318.7px" }}
        />
        <button onClick={this.onSubmitSvg}>Submit</button>
      </div>
    );
  }
}

export default ImageEditorContainer;
