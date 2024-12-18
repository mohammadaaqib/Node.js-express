const login =async(req,res)=>{
    res.send('Fake Login/Register/Signup Route')
}

const dashboard=async(req,res)=>{
    const luckyNumber=Math.floor(Math.random()*100);
    res.status(200).json({msg:`Hello, Jhon Doe`,secret:`Here is your authorized data, you r lucky number is ${luckyNumber}`})
}
module.exports={
    login,
    dashboard
}