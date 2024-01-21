import fs from "fs";
import process from "process";
import readlinePromises from "readline/promises";


let input = readlinePromises.createInterface({
    input:process.stdin,
    output:process.stdout
})

const opsi = ["CREATE", "READ", "UPDATE", "DELETE", "LIST"];
const files = [];
let status = true;




while(status){
    console.log("Masukkan perintah yang kamu mau");
    list(opsi);
    let perintah = await input.question("");
        if(perintah.toLocaleLowerCase()==opsi[0].toLocaleLowerCase()){
            let masukan = await input.question("Masukkan nama file yang ingin kamu buat : ");
            createFile(masukan.toString());
        }else if(perintah.toLocaleLowerCase()==opsi[1].toLocaleLowerCase()){
            let masukan = await input.question("Masukkan nama file yang ingin kamu baca : ");
            readFile(masukan.toString());
        }else if(perintah.toLocaleLowerCase()==opsi[2].toLocaleLowerCase()){
            let nama = await input.question("Masukkan nama file yang ingin kamu update : ");
            let tulisan = await input.question("Masukkan tulisanmu : \n");
            writeFile(nama,tulisan);
        }else if(perintah.toLocaleLowerCase()==opsi[3].toLocaleLowerCase()){
            let masukan = await input.question("Masukkan nama file yang ingin kamu hapus : "); 
            deleteFile(masukan);
        }else{
            console.log("Perintah tidak dikenal, keluar dari program");
            process.exit(0);
        }
}






//Fungsi create
function createFile(nama){
    let namaFile = nama.concat(".txt");
    fs.writeFile(namaFile,"",(err)=>{
        if(err){
            console.log("terjadi error saat membuat file");
        }else{
            console.log("File telah dibuat"); 
        }
    });
   
}


//Fungsi Read
function readFile(nama){
    let namaFile = nama.concat(".txt");
    fs.readFile(namaFile,(err, data)=>{
        if(err){
            console.log("Error, tidak bisa membaca file");
        }
        console.log(data.toString());
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
function deleteFile(nama){
    let namaFile=nama.concat(".txt");
    fs.unlink(namaFile,(err)=>{
        if(err){
            console.log("Error saat menghapus file");
        }
        console.log("File berhasil dihapus");
    })
}
//Fungsi List
function list(array){
    for(let i in array){
        console.log(array[i]);
    }
}