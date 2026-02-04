/* js/common_form.js */

var app = new Vue({
    el: '#app',
    data: {
        form: {
            doc_type: 'common',
            subject: '',
            applied_date: new Date().toISOString().slice(0, 10),
            deadline: '',
            overview: '',
            memo: '',
            // List rincian biaya
            details: [
                { category_id: '', payer: '', amount: '' }
            ],
            file_attachment: null
        },
        // Data Master Kategori (Sesuai Spec Hal 11)
        categories: [
            { id: 1, name: '書籍購入' },
            { id: 2, name: '物品購入' },
            { id: 3, name: '役務の提供' },
            { id: 4, name: '教育研修費' },
            { id: 5, name: '会場費' },
            { id: 6, name: '交際費' },
            { id: 7, name: '厚生費' },
            { id: 8, name: '広告協賛' },
            { id: 9, name: '外注' }
        ],
        isSubmitting: false
    },
    computed: {
        // Hitung Total Otomatis
        formattedTotalAmount: function() {
            let total = this.form.details.reduce((sum, item) => {
                // Hapus koma sebelum menjumlahkan
                let val = parseInt(String(item.amount).replace(/[^0-9]/g, '')) || 0;
                return sum + val;
            }, 0);
            return new Intl.NumberFormat('ja-JP').format(total);
        }
    },
    methods: {
        // Format input uang per baris
        formatDetailAmount: function(index, event) {
            let val = event.target.value.replace(/[^0-9]/g, '');
            if(val) {
                this.form.details[index].amount = new Intl.NumberFormat('ja-JP').format(val);
            } else {
                this.form.details[index].amount = '';
            }
        },
        // Tambah Baris
        addRow: function() {
            this.form.details.push({ category_id: '', payer: '', amount: '' });
        },
        // Hapus Baris
        removeRow: function(index) {
            this.form.details.splice(index, 1);
        },
        handleFileUpload: function(event) {
            this.form.file_attachment = event.target.files[0];
        },
        submitForm: function() {
            if (!this.form.subject) return alert('件名 (Subject) Wajib diisi');
            if (!this.form.overview) return alert('概要 (Overview) Wajib diisi');
            
            this.isSubmitting = true;
            console.log("SENDING COMMON RINGI:", JSON.parse(JSON.stringify(this.form)));
            alert("Validasi OK. Data siap dikirim.");
            this.isSubmitting = false;
        }
    }
});