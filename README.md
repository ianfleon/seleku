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

**Memilih lebih dari satu atau semua element html :**
```js
$elek('p', 1); // mengambil tag <p> pada index ke-1
$elek('p', 'semua'); // mengambil semua tag <p>
```

**Memilih satu element html dan memanipulasinya :**

###### Memberi CSS
```js
$ku('h2').style('color', 'red');
```

###### Tambah element
```js
$ku('body').tambahElemen('p', 'Saya menggunakan SelekJS untuk ini!');
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
