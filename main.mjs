import fs from "fs";
import process from "process";
import readlinePromises from "readline/promises";


let input = readlinePromises.createInterface({
    input:process.stdin,
    output:process.stdout
})

const opsi = ["CREATE", "READ", "UPDATE", "DELETE", "LIST"];
const files = [];

console.log("Masukkan perintah yang kamu mau");
list(opsi);
let perintah = await input.question("");

createFile("teks1");
list(files);


//Fungsi create
function createFile(nama){
    let namaFile = nama.concat(".txt");
    fs.writeFile(namaFile,"",()=>{
        console.log("File telah dibuat");
    });
    files.push(nama.toString());
}

//Fungsi Read
function readFile(nama){
    let namaFile = nama.concat(".txt");
    fs.readFile(namaFile,(err, data)=>{
        if(err){
            console.log("Error, tidak bisa membaca file");
        }else{
            console.log(data.toString());
        }
    })
}
//Fungsi update
function writeFile(nama, tulisan){
    let namaFile=nama.concat(".txt");
    fs.writeFile(namaFile,tulisan,()=>{
        console.log("File berhasil di-update")
    })
}
//Fungsi Delete

//Fungsi List
function list(array){
    for(let i in array){
        console.log(array[i]);
    }
}