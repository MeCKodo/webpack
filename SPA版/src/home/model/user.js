'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
    addUser () {

        var ret  = this.add({
            name: Date()
        });

        console.log(this.getModelName(),this.db());

        return ret;
    }
    findUser() {
        return this.select({content:"sdf"});
    }
}