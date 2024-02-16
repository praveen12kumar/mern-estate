const mockApi = (req, res)=>{
    try {
        res.status(200).json({
            message: "Hello, world"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error: ",error
        })
    }
}

export {
    mockApi
}