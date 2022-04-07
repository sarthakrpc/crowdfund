export default async(req, res) => {
	const {method} = req;
	if(method === "POST"){
		console.log(req.body.file);
	}else{
		res.send("err")
	}
}