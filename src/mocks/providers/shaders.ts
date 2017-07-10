import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Shader } from '../../models/shader';

@Injectable()
export class shaders {
  shaders: Shader[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/shaders/bear.jpg",
    "fragment": "Burt is a Bear.",
  };


  constructor(public http: Http) {
    let shaders = [
      {
        "name": "Burt Bear",
        "profilePic": "assets/img/shaders/bear.jpg",
        "fragment": "Burt is a Bear."
      },
      {
        "name": "Charlie Cheetah",
        "profilePic": "assets/img/shaders/cheetah.jpg",
        "fragment": "Charlie is a Cheetah."
      }
    ];

    for (let shader of shaders) {
      this.shaders.push(new Shader(shader));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.shaders;
    }

    return this.shaders.filter((shader) => {
      for (let key in params) {
        let field = shader[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return shader;
        } else if (field == params[key]) {
          return shader;
        }
      }
      return null;
    });
  }

  add(shader: Shader) {
    this.shaders.push(shader);
  }

  delete(shader: Shader) {
    this.shaders.splice(this.shaders.indexOf(shader), 1);
  }
}
