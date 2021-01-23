// [[ Class Utama ]]
class SelekuClass {

	// Konstraktor
	constructor(elemen) {
		if (elemen === null) {
			console.log('Target tidak ditemukan.');
			this.elemen = 'Tidak ada elemen!'
		} else {
			this.elemen = elemen;
		}
	}

	style(properti, nilai) {
		const gayaku = this.elemen.style;
		gayaku[properti] = nilai;
	}

	// Append Element
	tambahElemen(tag, isi) {

		const tagBaru = document.createElement(tag);
		const isiTagBaru = document.createTextNode(isi);

		tagBaru.appendChild(isiTagBaru);

		const hasilGabung = this.elemen.appendChild(tagBaru);

		return hasilGabung;

	}

	// Mengganti isi elemen
	isi(data) {
		return this.isi.innerHTML(data);
	}

	// Menambah class pada tag
	tambahClass(namaClass) {
		const hasil_tambahClass = this.elemen.classList.add(namaClass);
		return hasil_tambahClass;
	}

	// Toggle class pada tag
	toggleClass(namaClass) {
		const hasil_toggleClass = this.elemen.classList.toggle(namaClass);
		return hasil_toggleClass;
	}

	// Log elemen yang dipilih
	log() {
		console.log(this.elemen);
	}

	// EventListener
	pas(event, aksi) {
		return this.elemen.addEventListener(event, aksi);
	}

}

// [[ Mengambil Satu Elemen ]]
function $elek (elemen, indeks) {

	if (typeof(indeks) === 'number') {

		const els_html = document.querySelectorAll(elemen)[indeks]; // ambil elemen-elemen
		
		if (els_html === undefined) {
			console.log('SelekuJS : indeks yang anda pilih tidak ada');
		} else {
			return els_html;
		}


	} else if (typeof(indeks) === 'string') {
		if (indeks === 'semua') {
			const els_html = document.querySelectorAll(elemen); // ambil semua elemen
			return els_html;
		} else {
			console.log('SelekuJS : Parameter tidak benar');
		}
	} else {
		const el_html = document.querySelector(elemen); // ambil elemen
		return el_html;
	}
}


// [[ Mengambil Satu Elemen dan Memanipulasinya ]]
function $ku (elemen, indeks) {
	const el_html = document.querySelector(elemen); // ambil elemen
	return new SelekuClass(el_html); // membuat objek dan mengirimkan elemen tadi
}