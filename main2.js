document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function (event) {
        // event.preventDefault();
        if(confirm("Apakah anda yakin ingin menambahkan buku ke dalam rak?")){
        inputBook();
    }
    
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

