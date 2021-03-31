var query = [
    {
        $project: {
            email: {
                $toLower: '$email'
            },
            _id: 1
        }
    }
];
var index = 0;
var maximum = db.tblUsage.aggregate(query).toArray().length;
var percentage = 0;

db.tblUsage.aggregate(query).forEach(row => {
    db.tblUsage.update({
        _id: row._id
    }, {
        $set: {
            email: row.email
        }
    });
    index++;
    var progress = parseFloat(((index / maximum) * 100).toFixed(0));
    if (progress != percentage) {
        percentage = progress;
        print(percentage + '%');
    }; 
});