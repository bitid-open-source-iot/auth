db.tblUsers.find({}).forEach(user => {
    db.tblUsers.update({
        '_id': user._id
    }, {
        $set: {
            "name": {
                "last":     user.lastName,
                "first":    user.firstName,
                "middle":   ""
            },
            "number": {
                "tel":      "",
                "mobile":   user.mobileNumber
            },
            "address": {
                "billing": {
                    "company": {
                        "vat":  "",
                        "reg":  ""
                    },
                    "street":       "",
                    "suburb":       "",
                    "country":      "",
                    "cityTown":     "",
                    "additional":   "",
                    "postalCode":   ""
                },
                "physical": {
                    "company": {
                        "vat":  "",
                        "reg":  ""
                    },
                    "street":       "",
                    "suburb":       "",
                    "country":      "",
                    "cityTown":     "",
                    "additional":   "",
                    "postalCode":   ""
                },
                "same": true
            },
            "identification": {
                "type":     "id",
                "number":   user.idNumber
            },
            "picture":  user.profilePic,
            "timezone": user.timeZone,
            "username": user.userName
        },
        $unset: {
            "idNumber":     1,
            "timeZone":     1,
            "userName":     1,
            "lastName":     1,
            "firstName":    1,
            "profilePic":   1,
            "mobileNumber": 1
        }
    });
});