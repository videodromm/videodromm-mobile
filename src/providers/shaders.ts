import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { Shader } from '../models/shader';

@Injectable()
export class shaders {

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {
    return this.api.get('/shaders', params)
      .map(resp => resp.json());
  }

  add(shader: Shader) {
  }

  delete(shader: Shader) {
  }

}
