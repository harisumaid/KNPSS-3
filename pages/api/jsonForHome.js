export default (req,res)=>{
    var details = {
        'data':[
            {
                'id': 1,
                'date' : "1/1/2020",
        'details': "Standardization of Environmental Clearance Conditions...."
            },
            {
                'id': 2,
                'date' : "1/1/2020",
        'details': "Directions under section 18(1)(b) of The Water act of 1974...."
            },
            {
                'id': 3,
                'date' : "1/1/2020",
        'details': "Standardization of Environmental Clearance Conditions...."
            },
            {
                'id': 4,
                'date' : "1/1/2020",
        'details': "Maharashtra Plastic ban booklet."
            },
            {
                'id': 5,
                'date' : "1/1/2020",
        'details': "Some Case Laws on Frequently Sought Information and their answers."
            }
        ]
    }

    res.json(JSON.stringify(details));
}
