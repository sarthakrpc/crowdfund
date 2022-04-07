import dbConnect from "../../../../utils/dbConnect";
import campaign from "../../../../mongooseModel/campaign";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  if(method === "POST"){
	
  }else{
	  return -1;
  }
};
