import fs from "fs";
import process from "process";
import readlinePromises from "readline/promises";


let input = readlinePromises.createInterface({
    input:process.stdin,
    output:process.stdout
})

const opsi = ["CREATE", "READ", "UPDATE", "DELETE", "LIST"];
const files = [];



createFile("teks4");

//Fungsi create
function createFile(nama){
    let namaFile = nama.concat(".txt");
    fs.open(namaFile,'w',function(err,file){
        if(err){
            throw err;
        }else{
            console.log(`File dengan nama ${namaFile} berhasil ditambah`);
        }
    })
    let deskriptorFile = fs.openSync(namaFile);
    fs.close();
}

//Fungsi Read

//Fungsi update

//Fungsi Delete