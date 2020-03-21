import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      nomor: 1
    };

    this.sound = new Audio();
  }

  tambahNomor = () => {
    let nomor = this.state.nomor;
    nomor++;
    this.setState({ nomor }, this.playSound(nomor));
  };

  kurangNomor = () => {
    let nomor = this.state.nomor;
    nomor--;
    this.setState({ nomor }, this.playSound(nomor));
  };

  readNumber = nomor => {
    const split = this.splitNumber(nomor);
    if (nomor < 10) {
      return split;
    } else if ([10, 11, 100].indexOf(nomor) !== -1) {
      return [nomor];
    } else if (nomor < 20) {
      return [split[1], "belas"];
    } else if (nomor < 100) {
      return split[1] === "0"
        ? [split[0], "puluh"]
        : [split[0], "puluh", split[1]];
    } else if (nomor < 1000) {
      if (split[1] === "0") {
        return [split[0], "ratus", split[0]];
      } else if (split[2] === "0") {
        return [split[0], "ratus", split[1], "puluh"];
      } else {
        return [split[0], "ratus", split[1], "puluh", split[0]];
      }
    } else {
      return [];
    }
  };

  splitNumber = nomor => {
    return nomor.toString().split("");
  };

  playSound = nomor => {
    const number = this.readNumber(nomor).map(val => {
      return require("./assets/wavenet/" + val + ".mp3");
    });

    const track = [
      require("./assets/wavenet/in.wav"),
      require("./assets/wavenet/urutan.mp3"),
      ...number
    ];

    this.playSequence(track);
  };

  playSequence = songList => {
    const newSongList = songList.slice();
    const song = newSongList.shift();
    if (song) {
      this.sound.src = song;
      this.sound.onended = () => {
        this.playSequence(newSongList);
      };
      this.sound.play();
    }
  };

  render() {
    return (
      <div className="fluid-container">
        <h1 className="number">{this.state.nomor}</h1>
        <div className="row">
          <div className="col-md-12">
            <button onClick={this.tambahNomor} className="btn btn-primary mr-2">
              +
            </button>
            <button onClick={this.kurangNomor} className="btn btn-danger">
              -
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
