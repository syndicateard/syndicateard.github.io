let TotalHargaBarang = 0;
let TotalBarang = 0;
let TotalSemuanya = 0;
let biayaongkir = 0;

var input = document.getElementById("Nomor");

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

function setDPI(canvas, dpi) {
    // Set up CSS size.
    canvas.style.width = canvas.style.width || canvas.width + 'px';
    canvas.style.height = canvas.style.height || canvas.height + 'px';

    // Get size information.
    var scaleFactor = dpi / 96;
    var width = parseFloat(canvas.style.width);
    var height = parseFloat(canvas.style.height);

    // Backup the canvas contents.
    var oldScale = canvas.width / width;
    var backupScale = scaleFactor / oldScale;
    var backup = canvas.cloneNode(false);
    backup.getContext('2d').drawImage(canvas, 0, 0);

    // Resize the canvas.
    var ctx = canvas.getContext('2d');
    canvas.width = Math.ceil(width * scaleFactor);
    canvas.height = Math.ceil(height * scaleFactor);

    // Redraw the canvas image and scale future draws.
    ctx.setTransform(backupScale, 0, 0, backupScale, 0, 0);
    ctx.drawImage(backup, 0, 0);
    ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
}

function varToPrintContent(){
    $("#pid_nomor").html("#"+$("#Nomor").val());
    $("#pid_date").html($("#Tanggal").val());
    $("#pid_time").html($("#Jam").val());
    $("#pid_namacust").html($("#Customer").val());
    
    const rows = document.getElementById('TabelProduk').getElementsByTagName('tbody')[0].rows;

    TotalHargaBarang = 0;
    TotalBarang = 0;
    TotalSemuanya = 0;
    $("#pid_produk").html('');
    
    for (let i = 0; i < rows.length; i++){

        const namaForRow = rows[i].getElementsByTagName('input')[0].value;
        const HargaForRow=  parseInt(rows[i].getElementsByTagName('input')[1].value);
        const jumlahForRow=  parseInt(rows[i].getElementsByTagName('input')[2].value);
        const totalForRow=  "Rp " + rupiah(parseInt(rows[i].getElementsByTagName('span')[0].innerHTML));

        $("#pid_produk").append(
            `<li>
            <div class="p_namaproduk">` + namaForRow + `</div>
            <div class="p_isiproduk">
                <div>` + jumlahForRow + `x ` + HargaForRow + `</div>
                <div>` + totalForRow + `</div>
            </div>
            </li>`
        );
    }

    $("#pid_totalitem").html("Total - " + $("#totalbarang").html() + " Item");
    $("#pid_totalhargaproduk").html("Rp " + rupiah($("#totalhargabarang").html()));
    $("#pid_ongkir").html("Rp " + rupiah($("#BiayaOngkir").val()));
    $("#pid_alamat").html("<strong>Alamat Tujuan : </strong>" + $("#AlamatKirim").val());
    $("#pid_totalitembawah").html("Total - " + $("#totalbarang").html() + " Item");
    $("#pid_total").html("Rp " + rupiah($("#total").html()) + ",00");
    $("#pid_sudahbayar").html($("#udahbayar").val());

    if ($('#udahbayar').is(":checked"))
    {
        $("#pid_sudahbayar").html("Sudah Bayar");
    }
    else{
        $("#pid_sudahbayar").html("Belum Bayar");
    }
}

$(document).ready(function(){
    // Reading the value, which was store as "theValue"
    if (localStorage && 'nomorstruk' in localStorage) {
        input.value = localStorage.nomorstruk;
    }

    $("#Produk-0").change(changeTotal);
    
    $("#AddProduk").click(function(){
        AddProduk();
    });

    var today = new Date();
    document.getElementById("Tanggal").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);   
    document.getElementById("Jam").value = ('0' + today.getHours()).slice(-2) + ':' + ('0' + today.getMinutes()).slice(-2);
    console.log(('0' + today.getHours()).slice(-2));
    console.log(('0' + today.getMinutes()).slice(-2));

    var element = $("#print-content"); // global variable
    var getCanvas; // global variable

    $("#btn-Preview-Image").on('click', function () {
        $("#print-content").css("display", "block");
        varToPrintContent();
        html2canvas(document.querySelector("#print-content")).then(canvas => {
            console.log(canvas.width);
            setDPI(canvas, 288);
            console.log(canvas.width);
            $("#previewImage").html(canvas);
            getCanvas = canvas;
        });
        $("#print-content").css("display", "none");
        const myFile = new File(['hello-world'], 'my-file.txt');
        myFile.name = 'my-file-final-1-really.txt';
    });

    $("#btn-Convert-Html2Image").on('click', function () {

        localStorage && (localStorage.nomorstruk = input.value);

        var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = getCanvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'titipmarinceu-' + $("#Nomor").val() + '.jpg';
        a.click();
    });

});

$("#BiayaOngkir").change(function(){
    biayaongkir = parseInt($("#BiayaOngkir").val());
    changeAllValHarga();
});

// const ong = new AutoNumeric('#BiayaOngkir', {
//     decimalCharacter: ",",
//     decimalPlaces: '2',
//     digitGRoupSeparator : '.',
//     minimumValue: "0",
// });

// const autoNumericOptions = {
//     decimalCharacter: ",",
//     decimalPlaces: '2',
//     digitGRoupSeparator : '.',
//     minimumValue: "0",
//   };
// AutoNumeric.multiple(".rupiah",null, autoNumericOptions); 


function rupiah(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}