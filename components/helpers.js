// import CryptoJS from "crypto-js";
import axios from "axios";


const decryptData = (encryptedData, key, iv) =>  {
    // let CryptoJS = require("crypto-js");
    // console.log(encryptedData, 'encryptedData')
    // console.log(key, 'key')
    // console.log(iv, 'iv')
    //
    // key = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256(key).toString().substr(0, 32));
    // iv = CryptoJS.enc.Hex.parse(iv);
    // let cipherParams = CryptoJS.lib.CipherParams.create({
    //     ciphertext: CryptoJS.enc.Base64.parse(encryptedData),
    //     iv: iv,
    // });
    // let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {iv: iv});
    //
    // console.log(decrypted, 'decrypted')
    // // return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    // return decrypted.toString(CryptoJS.enc.Utf8);

    //--------
    // key = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256(key).toString().substr(0, 32));
    // iv = CryptoJS.enc.Hex.parse(iv);
    // let cipherParams = CryptoJS.lib.CipherParams.create({
    //     ciphertext: CryptoJS.enc.Base64.parse(encryptedData),
    //     iv: iv,
    // });
    // let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {iv: iv});
    // return decrypted.toString(CryptoJS.enc.Utf8);


    // ------


    let CryptoJS = require("crypto-js");

    key = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256(key).toString().substr(0, 32));
    let cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(encryptedData),
        iv: iv,
    });
    let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {iv: iv});
    let decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    let decryptedJson = JSON.parse(decryptedData);
    return decryptedJson
}

export const sendEncryptData = (url, data_info, callback) => {
        let CryptoJS = require("crypto-js");
        let data = {};
        let arr = JSON.stringify({
            "url":url,
            "data": data_info
        });
        let key = '12345'; //https://qr-gid.by/api/key.php

        key = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256(key).toString().substr(0, 32));
        let iv = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]).toString().substr(0, 16));
        let encrypted = CryptoJS.AES.encrypt(arr, key, {iv: iv});

        data.request = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
        data.iv = CryptoJS.enc.Hex.stringify(iv);

        axios.post('https://qr-gid.by/api/request_app.php', JSON.stringify(data))
        .then(response => {
            callback(response, decryptData(response.data, '12345', iv))
        })
        .catch(error => console.log(error));

}


