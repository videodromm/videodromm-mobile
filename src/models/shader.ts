/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Shader" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or a "Animal," or something like that.
 *
 * The shaders service manages creating instances of Shader, so go ahead and rename
 * that something that fits your app as well.
 */
export class Shader {

  constructor(private fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (let f in fields) {
      this[f] = fields[f];
    }
  }

}
