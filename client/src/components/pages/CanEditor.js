import React, { Component } from "react";

import BabylonScene from "../utils/BabylonScene";
import ImageEditorContainer from "../utils/ImageEditorContainer";

import "./CanEditor.scss";

class CanEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    };
  }

  updateImage = img => {
    this.setState({
      img
    });
  };

  render() {
    return (
      <div className="can-editor-container">
        <BabylonScene img={this.state.img} />
        <ImageEditorContainer updateImage={this.updateImage} />
      </div>
    );
  }
}

export default CanEditor;
