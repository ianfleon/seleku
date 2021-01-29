# Seleku JS
Manipulasi HTML dengan Javascript sederhana.

## Penggunaan Online :
```HTML
<script src="https://cdn.statically.io/gh/ianfleon/seleku/main/seleku.min.js"></script>
```

## Penggunaan Offline :

Download file yang ada disini

Link : [Download SelekuJS](https://github.com/ianfleon/seleku/archive/main.zip)

## Dokumentasi Penggunaan :

**Memilih satu element html :**
```js
$elek('tag / .class / #id', index (opsional));
```
###### Contoh :
```js
$elek('.tombol'); // mengambil satu element
```

**Memilih element tertentu atau semua element html yang dipilih :**
```js
$elek('p', 1); // mengambil tag <p> pada index ke-1
$elek('p', 'semua'); // mengambil semua tag <p>
$elek('p', 'awal'); // mengambil tag <p> pertama
$elek('p', 'akhir'); // mengambil tag <p> terakhir
```

**Memilih satu element html dan memanipulasinya :**

###### Memberi CSS (hanya satu properti)
```js
$ku('h2').style('color', 'red');
```

###### Memberi CSS (lebih dari satu properti)
```js
$ku('.card').css({
	'background-color' : 'teal',
	'color' : '#fff'
});
```

###### Tambah tag sederhana
```js
$ku('body').tambahTag('p', 'Saya menggunakan SelekJS untuk ini!');
```

###### Tambah elemen
1. Menggunakan cara objek
```js
const seleku = new SelekuClass();

const div = seleku.tambahElemen({
	'tag' : 'div',
	'attr' : {
		'class' : 'container'
	}
});

const card = seleku.tambahElemen({
	'tag' : 'h2',
	'attr' : {
		'class' : 'card',
		'id' : 'card'
	},
	'isi' : 'Ini judul dari card menggunakan Seleku JS'
});

seleku.gabung(div, card); // menggabungkan 'card' ke 'div'

$ku('body').gabung(div); // menggabungkan ke elemen 'body' atau yang lain sesuai target ($ku)
```

2. Menggunakan cara string
```js
$ku('body').tambahElemen("<h2 class='judul' name='judul' id='judul'>Halo teman-teman.</h2>"); // Beserta Attribute
$ku('body').tambahElemen("<p>Selamat datang di web saya!</p>"); // Tanpa Attribute
```

###### Mengubah isi dari sebuah tag
```js
$ku('h2').isi('Selamat datang');
```

###### Menambah class pada tag
```js
$ku('h2').tambahClass('judul');
```

###### Toggle class
```js
$ku('h2').toggleClass('modemalam');
```

###### Log data yang ditangkap
```js
$ku('h2').log();
```

###### Event Listener
```js
$ku('.tombol').pas('click', () => {
  alert('Anda menekan tombol!');
);
```
<h2>Binding dan Reactivity di selek</h2>
<p>selek juga memiliki binding dan reactivity ingat hanya untuk tag ```input``` dan `textarea`, untuk menggunakan nya cukup menambahkan atribut `this-bind={variabel}`</p>
<p>Contoh</p>


```HTML

<!DOCTYPE html>
<html>
<head>
	<title>selek</title>
</head>
<body>
	
	<h1>hello {name}</h1>
	<input type="text" name="try" this-bind={p}>
	
	<script src="seleku.js"></script>
	<script src="seleku-embbeded.js"></script>
	<script>

		let name = "seleku";

		selekDOM();
		binding();
		reactive();

	</script>
</body>
</html>

```


