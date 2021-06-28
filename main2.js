document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function (event) {
        // event.preventDefault();
        inputBook();

    judul = "";
    penulis = "";
    tahun = "";
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }


});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });

document.addEventListener("ondataloaded", () => {
    refreshData ()
 });


 const statusBuku = document.getElementById("check").checked;
