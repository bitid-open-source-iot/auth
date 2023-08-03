/*
This is rerunable
Its safe to run as it takes the existing apps/users/groups arrays and converts them to v1
*/
let appCount = 0
let userCount = 0
let groupCount = 0
use auth
db.tblApps.find({

})
   .projection({})
   .sort({_id:-1})
   .toArray()
   .forEach(item => {
       let v1Arr = []
       let key = 'apps'
       if(item.bitid.auth[key]){
           for (let i = 0; i < item.bitid.auth[key].length; i++) {
               let o = item.bitid.auth[key][i]
               appCount++
               v1Arr.push(
                   {
                        "type": "app",
                        "id": o.id,
                        "role": o.role
                   }
               )
           }
       }
       key = 'users'
       if(item.bitid.auth[key]){
           for (let i = 0; i < item.bitid.auth[key].length; i++) {
               let o = item.bitid.auth[key][i]
               userCount++
               v1Arr.push(
                   {
                        "type": "user",
                        "id": o.id,
                        "role": o.role
                   }
               )
           }
       }       
       key = 'groups'
       if(item.bitid.auth[key]){
           for (let i = 0; i < item.bitid.auth[key].length; i++) {
               let o = item.bitid.auth[key][i]
               groupCount++
               v1Arr.push(
                   {
                        "type": "group",
                        "id": o.id,
                        "role": o.role
                   }
               )
           }
       }              
      db.tblApps.updateOne({_id: item._id},{$set:{
          "bitid.auth.v1": v1Arr
      }})
   })
console.log(`tblApps appCount ${appCount} userCount ${userCount} groupCount ${groupCount}`)


appCount = 0
userCount = 0
groupCount = 0




db.tblGroups.find({

})
   .projection({})
   .sort({_id:-1})
   .toArray()
   .forEach(item => {
       let v1Arr = []
       let key = 'apps'
       if(item.bitid.auth[key]){
           for (let i = 0; i < item.bitid.auth[key].length; i++) {
               let o = item.bitid.auth[key][i]
               appCount++
               v1Arr.push(
                   {
                        "type": "app",
                        "id": o.id,
                        "role": o.role
                   }
               )
           }
       }
       key = 'users'
       if(item.bitid.auth[key]){
           for (let i = 0; i < item.bitid.auth[key].length; i++) {
               let o = item.bitid.auth[key][i]
               userCount++
               v1Arr.push(
                   {
                        "type": "user",
                        "id": o.id,
                        "role": o.role
                   }
               )
           }
       }       
       key = 'groups'
       if(item.bitid.auth[key]){
           for (let i = 0; i < item.bitid.auth[key].length; i++) {
               let o = item.bitid.auth[key][i]
               groupCount++
               v1Arr.push(
                   {
                        "type": "group",
                        "id": o.id,
                        "role": o.role
                   }
               )
           }
       }              
      db.tblGroups.updateOne({_id: item._id},{$set:{
          "bitid.auth.v1": v1Arr
      }})
   })
console.log(`tblGroups appCount ${appCount} userCount ${userCount} groupCount ${groupCount}`)



