// import { IncomingForm } from "formidable";
// import { promises as fs } from "fs";
// import { stat } from "fs";
// // first we need to disable the default body parser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async (req, res) => {
//   if (req.method === "POST") {
//     // parse form with a Promise wrapper
//     const data = await new Promise((resolve, reject) => {
//       const form = new IncomingForm();
//       form.parse(req, (err, fields, files) => {
//         if (err) return reject(err);
//         resolve({ fields, files });
//       });
//     });

//     try {
//       //   console.log(data.fields.foldername);
//       const fileName = await data.files.media.originalFilename;
//       const folder = await data.fields.foldername;
//       const imageFile = await data.files.media; // .media because I named it in client side by that name: // pictureData.append('media', pictureFile);
//       const imagePath = await imageFile.filepath;

//       const folderName = `projectAssets/${folder}`;
//       stat(folderName, (err, stats) => {
//         if (err) {
//           if (err.errno.toString() === "-4058") {
//             fs.mkdir(folderName);
//           }
//         } else {
//           if (!stats.isDirectory()) {
//             fs.mkdir(folderName);
//           }
//         }
//       });

//       const pathToWriteImage = `projectAssets/${folder}/${fileName}`; // include name and .extention, you can get the name from data.files.image object
//       const image = await fs.readFile(imagePath);
//       await fs.writeFile(pathToWriteImage, image);
//       //store path in DB
//       res.status(200).json({ message: "image uploaded!" });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//       return;
//     }
//   }
// };
