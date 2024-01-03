const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors')
app.use(cors())
app.get('',(req,res)=>{
res.status(200).json({radio:"val1",defaultOption:"value2"})
})
app.get('/abc',(req,res)=>{
    const result = {
        children: [
            {
                "name": "Top Level",
                "parent": "temp",
                "color": "green",
                "children": [
                    {
                        "name": "Level 2: A",
                        "parent": "Top Level",
                        "color": "red",
                        "children": [
                            {
                                "name": "Son 1 of A",
                                "parent": "Level 2: A",
                                "children": [
                                    {
                                        "name": "Son 2 of A",
                                        "parent": "Level 2: A",
                                        "color": "blue"
                                    },
                                    {
                                        "name": "Son 3 of A",
                                        "parent": "Level 2: A",
                                        "color": "blue"
                                    },
                                    {
                                        "name": "Son 4 of A",
                                        "parent": "Level 2: A",
                                        "color": "blue"
                                    },
                                    {
                                        "name": "Son 5 of A",
                                        "parent": "Level 2: A",
                                        "color": "blue"
                                    },
                                    {
                                        "name": "Son 6 of A",
                                        "parent": "Level 2: A",
                                        "color": "blue"
                                    },
                                    {
                                        "name": "Son 7 of A",
                                        "parent": "Level 2: A",
                                        "color": "blue"
                                    },
                                    {
                                        "name": "Son 8 of A",
                                        "parent": "Level 2: A",
                                        "color": "blue"
                                    },
                                    {
                                        "name": "Son 9 of A",
                                        "parent": "Level 2: A",
                                        "color": "blue"
                                    },
                                    {
                                        "name": "Son 10 of A",
                                        "parent": "Level 2: A",
                                        "color": "blue"
                                    },
                                    {
                                        "name": "Son 11 of A",
                                        "parent": "Level 2: A",
                                        "color": "blue"
                                    },
                                    {
                                        "name": "Son 12 of A",
                                        "parent": "Level 2: A",
                                        "color": "blue"
                                    },
                                    {
                                        "name": "Son 13 of A",
                                        "parent": "Level 2: A",
                                        "color": "blue"
                                    }
                                ]
                            },
                            {
                                "name": "Son 2 of A",
                                "parent": "Level 2: A",
                                "color": "cyan"
                            },
                            {
                                "name": "Son 3 of A",
                                "parent": "Level 2: A",
                                "color": "cyan"
                            },
                            {
                                "name": "Son 4 of A",
                                "parent": "Level 2: A",
                                "color": "cyan"
                            },
                            {
                                "name": "Son 5 of A",
                                "parent": "Level 2: A",
                                "color": "cyan"
                            },
                            {
                                "name": "Son 6 of A",
                                "parent": "Level 2: A",
                                "color": "cyan"
                            },
                            {
                                "name": "Son 7 of A",
                                "parent": "Level 2: A",
                                "color": "cyan"
                            },
                            {
                                "name": "Son 8 of A",
                                "parent": "Level 2: A",
                                "color": "cyan"
                            },
                            {
                                "name": "Son 9 of A",
                                "parent": "Level 2: A",
                                "color": "cyan"
                            },
                            {
                                "name": "Son 10 of A",
                                "parent": "Level 2: A",
                                "color": "cyan"
                            },
                            {
                                "name": "Son 11 of A",
                                "parent": "Level 2: A",
                                "color": "cyan"
                            },
                            {
                                "name": "Son 12 of A",
                                "parent": "Level 2: A",
                                "color": "cyan"
                            },
                            {
                                "name": "Son 13 of A",
                                "parent": "Level 2: A",
                                "color": "cyan"
                            }
                        ]
                    },
                    {
                        "name": "Level 2: B",
                        "parent": "Top Level",
                        "color": "purple",
                        "children": [
                            {
                                "name": "Son 1 of B",
                                "parent": "Level 2: B",
                                "color": "green"
                            },
                            {
                                "name": "Son 2 of B",
                                "parent": "Level 2: B",
                                "color": "green"
                            },
                            {
                                "name": "Son 3 of B",
                                "parent": "Level 2: B",
                                "color": "green"
                            },
                            {
                                "name": "Son 4 of B",
                                "parent": "Level 2: B",
                                "color": "green"
                            },
                            {
                                "name": "Son 5 of B",
                                "parent": "Level 2: B",
                                "color": "green"
                            },
                            {
                                "name": "Son 6 of B",
                                "parent": "Level 2: B",
                                "color": "green"
                            },
                            {
                                "name": "Son 7 of B",
                                "parent": "Level 2: B",
                                "color": "green"
                            },
                            {
                                "name": "Son 8 of B",
                                "parent": "Level 2: B",
                                "color": "green"
                            },
                            {
                                "name": "Son 9 of B",
                                "parent": "Level 2: B",
                                "color": "green"
                            },
                            {
                                "name": "Son 10 of B",
                                "parent": "Level 2: B",
                                "color": "green"
                            },
                            {
                                "name": "Son 11 of B",
                                "parent": "Level 2: B",
                                "color": "green"
                            },
                            {
                                "name": "Son 12 of B",
                                "parent": "Level 2: B",
                                "color": "green"
                            },
                            {
                                "name": "Son 13 of B",
                                "parent": "Level 2: B",
                                "color": "purple"
                            }
                        ]
                    }
                ]
            }
        ]
    }
res.status(200).json(result)
})
app.listen(3000,()=>{
    console.log("listining")
})