module.exports = {
    multipleMongooseToObject: objects => {
        return objects.map(objects => objects.toObject());
    },

    mongooseToObject: object => {
        return object ? object.toObject() : object;
    }
}