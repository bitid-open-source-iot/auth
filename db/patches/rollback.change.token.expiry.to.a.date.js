var params = {
    $or: [
        {
            'token.expiry': {
                $type: 9
            }
        }
    ]
};
var index = 0;
var maximum = db.tblTokens.find(params).count();
var percentage = 0;

db.tblTokens.find(params, {
    '_id': 1,
    'token.expiry': 1
}).forEach(item => {
    db.tblTokens.update({
        '_id': item._id
    }, {
        $set: {
            'token.expiry': item.token.expiry.getTime()
        }
    });
    index++;
    var progress = parseFloat(((index / maximum) * 100).toFixed(0));
    if (progress != percentage) {
        percentage = progress;
        print(percentage + '%');
    };
});