const fsPromises = require("fs").promises;
const path = require("path");
const { addAbortSignal } = require("stream");

// Async ile dosya okuma işlemi
// fsPromises.readFile() ile dosya okuma işlemi yapabiliriz.
const fileOperations = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt")
    );
    console.log(data.toString());
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt")); // Dosyayı siler
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\nnice to meet you bitches"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseWriteUpdatesName.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseWriteUpdatesName.txt")
    );
    console.log(newData.toString());
  } catch (err) {
    console.error(err);
  }
};
fileOperations();

//Dosya okuma işlemi

// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf-8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
//   }
// );
// //!         OR like this
// fs.readFile("./files/starter.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

//Dosya yazma işlemi
// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "hi nice to meet you",
//   (err) => {
//     if (err) throw err;
//     console.log("write complete");
// //Dosya ekleme islemi ya da var olan dosyanin sonuna ekleme islemi
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\nYes it is.",
//       (err) => {
//         if (err) throw err;
//         console.log("append complete");
//       }
//     );
//   }
// );

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "hi nice to meet you",
//   (err) => {
//     if (err) throw err;
//     console.log("write complete");

//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\nYes it is.",
//       (err) => {
//         if (err) throw err;
//         console.log("append complete");
//         //!dosya adi degistirme islemi
//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "newReply.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("rename complete");
//           }
//         );
//       }
//     );
//   }
// );

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1);
});
