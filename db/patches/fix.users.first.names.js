var params = {
    'name.first': null
};
var index = 0;
var maximum = db.tblUsers.find(params).count();
var percentage = 0;

db.tblUsers.find(params, {
    '_id': 1,
    'email': 1
}).forEach((user) => {
    db.tblUsers.update({
        '_id': user._id
    }, {
        $set: {
            'name.first': user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)
        }
    });
    index++;
    var progress = parseFloat(((index / maximum) * 100).toFixed(0));
    if (progress != percentage) {
        percentage = progress;
        print(percentage + '%');
    };
});