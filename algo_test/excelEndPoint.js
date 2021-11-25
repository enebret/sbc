const User = require("../Models/User"); // This has data to be used
const excelJS = require("exceljs");
const exportUser = async (req, res) => { 
  const workbook = new excelJS.Workbook();  // Create a new workbook
  const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
  const path = "./files";  // Path to download excel
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "S no.", key: "s_no", width: 10 }, 
    { header: "Product Name", key: "fname", width: 10 },
    { header: "Product Category", key: "lname", width: 10 },
    { header: "Image", key: "email", width: 10 },
];
// Looping through User data
let counter = 1;
User.forEach((user) => {
  user.s_no = counter;
  worksheet.addRow(user); // Add data in worksheet
  counter++;
});
// Making first line in excel bold
worksheet.getRow(1).eachCell((cell) => {
  cell.font = { bold: true };
});
try {
  const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)
   .then(() => {
     res.send({
       status: "success",
       message: "file successfully downloaded",
       path: `${path}/users.xlsx`,
      });
   });
} catch (err) {
    res.send({
    status: "error",
    message: "Something went wrong",
  });
  }
};
module.exports = exportUser;