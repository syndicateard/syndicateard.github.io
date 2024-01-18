let TotalHargaBarang = 0;
let TotalBarang = 0;
let TotalSemuanya = 0;
let biayaongkir = 0;

function AddProduk(){
    const tableBody = document.getElementById('TabelProduk').getElementsByTagName('tbody')[0];
    const lastRow = tableBody.rows[tableBody.rows.length - 1];
    const newRowId = parseInt(lastRow.id.replace('Produk-', '')) + 1;
    
    console.log("last row : " + lastRow);
    const newRow = lastRow.cloneNode(true);
    
    tableBody.appendChild(newRow);

    newRow.id = `Produk-${newRowId}`;
    newRow.addEventListener('change', changeTotal);
    newRow.getElementsByTagName('input')[0].name = `NamaProduk-${newRowId}`; 
    newRow.getElementsByTagName('input')[0].value = ""; 
    newRow.getElementsByTagName('input')[1].name = `HargaProduk-${newRowId}`;
    newRow.getElementsByTagName('input')[1].value = 0;
    newRow.getElementsByTagName('input')[2].name = `JumlahProduk-${newRowId}`;
    newRow.getElementsByTagName('input')[2].value = 0;
    newRow.getElementsByTagName('span')[0].id = `total-${newRowId}`;
    newRow.getElementsByTagName('span')[0].innerHTML = '0';
    if(newRowId==1){
        $("#Produk-1").append(`<td><button class="remProduk" type="button">-</button></td>`);
    }
    newRow.getElementsByTagName('button')[0].addEventListener('click', removeProduk);
}

function changeAllValHarga(){
        // Untuk Total keseluruhan barang
        const rows = document.getElementById('TabelProduk').getElementsByTagName('tbody')[0].rows;

        TotalHargaBarang = 0;
        TotalBarang = 0;
        TotalSemuanya = 0;
        
        for (let i = 0; i < rows.length; i++){
            const jumlahForRow=  parseInt(rows[i].getElementsByTagName('input')[2].value);
            TotalBarang += jumlahForRow;
    
            const totalForRow=  parseInt(rows[i].getElementsByTagName('span')[0].innerHTML);
            TotalHargaBarang += totalForRow;
        }
    
        TotalSemuanya = TotalHargaBarang + biayaongkir;
        console.log(TotalSemuanya);
        
        $("#totalbarang").html(TotalBarang);
        $("#totalhargabarang").html(TotalHargaBarang);
        $("#total").html(TotalSemuanya);
}

function removeProduk(e) {
    const row = e.target.closest('tr');
    row.parentNode.removeChild(row);
    
    changeAllValHarga();
}


function changeTotal(e){
    
    // Untuk tiap baris jika ada berubah
    const row = e.target.closest('tr');
    var Harga = row.getElementsByTagName('input')[1].value;
    var Jumlah = row.getElementsByTagName('input')[2].value;
    var TotHargaPerProduk = Harga * Jumlah;
    row.getElementsByTagName('span')[0].innerHTML = TotHargaPerProduk;
    
    changeAllValHarga();
}

$(document).ready(function(){
    $("#Produk-0").change(changeTotal);
    
    $("#AddProduk").click(function(){
        AddProduk();
    });
    
    var today = new Date();
    document.getElementById("Tanggal").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);   
    document.getElementById("Jam").value = ('0' + today.getHours()).slice(-2) + ':' + ('0' + today.getMinutes()).slice(-2);
    console.log(('0' + today.getHours()).slice(-2));
    console.log(('0' + today.getMinutes()).slice(-2));
    $("#ongkir").hide();
});

$("#ongkirgak").change(function(){
    if($(this).prop("checked") == true){
        biayaongkir = parseInt($("#BiayaOngkir").val());
        $("#ongkir").show();
    }
    else{
        biayaongkir = parseInt(0);
        $("#ongkir").hide();
    }
    changeAllValHarga();
});

$("#BiayaOngkir").change(function(){
    if($(ongkirgak).prop("checked") == true){
        biayaongkir = parseInt($("#BiayaOngkir").val());
        $("#ongkir").show();
    }
    else{
        biayaongkir = parseInt(0);
        $("#ongkir").hide();
    }

    changeAllValHarga();
});