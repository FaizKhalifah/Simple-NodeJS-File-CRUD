import fs from "fs";
import process from "process";

fs.writeFile("teks1","",(err)=>{
    if(err){
        console.log("terjadi error saat membuat file");
    }
});