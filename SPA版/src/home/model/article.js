'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
    addArticle(title,content,badges) {
        this.add({
            title : title,
            content: content,
            badges : badges,
            ctime: new Date()
        });

    }


    findArticle() {
        return this.select();
    }
}