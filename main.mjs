import { promises as fsPromises } from 'fs';
import process from "process";
import readlinePromises from "readline/promises";
import {files} from "list.mjs";


let input = readlinePromises.createInterface({
    input:process.stdin,
    output:process.stdout
})

const opsi = ["CREATE", "READ", "CHANGE", "UPDATE", "DELETE", "LIST"];
let status = true;

    async function main(){
        while(status){
            console.log("Masukkan perintah yang kamu mau");
            list(opsi);
            let perintah = await input.question("Masukkan perintah : ");
           
            if(perintah.toLocaleLowerCase()==opsi[0].toLocaleLowerCase()){
                let masukan = await input.question("Masukkan nama file yang ingin dibuat : ");
                if(files.includes(masukan)){
                    console.log("File dengan nama yang sama sudah ada ");
                    continue;
                }
                const respon = await createFile(masukan);
                files.push(masukan); 
                console.log(respon);
            }
            else if(perintah.toLocaleLowerCase()==opsi[1].toLocaleLowerCase()){
               let masukan = await input.question("Masukkan nama file yang ingin dibaca : ");
               if(files.includes(masukan)==false){
                console.log("File tidak ditemukan");
                continue;
               }
               const data = await readFile(masukan);
               console.log(data);
            }else if(perintah.toLocaleLowerCase()==opsi[2].toLocaleLowerCase()){
                let nama = await input.question("Masukkan nama file yang ingin diubah : ");
                if(!files.includes(nama)){
                    console.log("File tidak ditemukan");
                    continue;
                   }
                let tulisan = await input.question("Masukkan tulisan yang ingin dimasukkan ke file : \n");
                const respon = await changeFile(nama,tulisan);
                console.log(respon);
            }else if(perintah.toLocaleLowerCase()==opsi[3].toLowerCase()){
                let nama = await input.question("Masukkan nama file yang ingin diupdate : ");
                if(!files.includes(nama)){
                    console.log("File tidak ditemukan");
                    continue;
                   }
                let tulisan = await input.question("Masukkan tulisan yang ingin dimasukkan ke file : \n");
                const respon = await updateFile(nama,tulisan);
                console.log(respon);
            }
            else if(perintah.toLocaleLowerCase()==opsi[4].toLocaleLowerCase()){
                let masukan = await input.question("Masukkan nama file yang ingin dihapus : ");
                if(!files.includes(masukan)){
                    console.log("File tidak ditemukan");
                    continue;
                   }
                const respon = await deleteFile(masukan);
                let index = files.indexOf(masukan);
                if(index!=-1){
                    files.splice(index,1);
                    console.log(respon);
                }else{
                    console.log("Elemen tersebut tidak ada di array");
                }
                
            }else if(perintah.toLowerCase()==opsi[5].toLowerCase()){
                if(files[0]=""){
                    console.log("Tidak ada file lain dalam folder");
                }else{
                    list(files);
                }
            }
            else{
                console.log("Perintah tidak dikenal, keluar dari program");
                process.exit(0);
            }
       
    }
    }

    
    

//Fungsi create
async function createFile(nama){
    let namaFile = nama.concat(".txt");
    await fsPromises.writeFile(namaFile,"",(err)=>{
        if(err){
            console.log("Error ketika membuat file");
        }
        
    })
   
    return "File berhasil dibuat";
}

//Fungsi Read
async function readFile(nama){
    let namaFile = nama.concat(".txt");
    const data = await fsPromises.readFile(namaFile)
    return data.toString();
}

//Fungsi change
async function changeFile(nama, tulisan){
    let namaFile = nama.concat(".txt");
    await fsPromises.writeFile(namaFile,tulisan,(err)=>{
        if(err){
            console.log("Error saat mengubah file");
        } 
    })
    return "File berhasil di-update";
}

//Fungsi update
async function updateFile(nama, tulisan){
    let namaFile = nama.concat(".txt");
    await fsPromises.appendFile(namaFile,tulisan,(err)=>{
        if(err){
            console.log("Error saat meng-update file")
        }
    })
    return "File berhasil diupdate"
}
//Fungsi Delete
async function deleteFile(nama){
    let namaFile = nama.concat(".txt");
    await fsPromises.unlink(namaFile,(err)=>{
        if(err){
            console.log("Error saat menghapus file");
        }
    })
    return "File berhasil dihapus";
}
//Fungsi List
function list(array){
    for(let i in array){
        console.log(array[i]);
    }
}

main();