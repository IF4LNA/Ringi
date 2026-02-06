/* js/common_form.js */

var app = new Vue({
    el: '#app',
    data: {
        form: {
            doc_type: 'common',
            business_type: '1', 
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
        // Data Master Kategori
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
        errors: {}, // Store errors
        isSubmitting: false
    },
    computed: {
        // Hitung Total Otomatis
        formattedTotalAmount: function() {
            let total = this.form.details.reduce((sum, item) => {
                let val = parseInt(String(item.amount).replace(/[^0-9]/g, '')) || 0;
                return sum + val;
            }, 0);
            return new Intl.NumberFormat('ja-JP').format(total);
        }
    },
    methods: {
        formatDetailAmount: function(index, event) {
            let val = event.target.value.replace(/[^0-9]/g, '');
            if(val) {
                this.form.details[index].amount = new Intl.NumberFormat('ja-JP').format(val);
            } else {
                this.form.details[index].amount = '';
            }
        },
        addRow: function() {
            this.form.details.push({ category_id: '', payer: '', amount: '' });
        },
        removeRow: function(index) {
            this.form.details.splice(index, 1);
        },
        handleFileUpload: function(event) {
            this.form.file_attachment = event.target.files[0];
        },
        submitForm: function() {
            // 1. Reset
            this.errors = {};
            let hasError = false;

            // 2. Validasi
            if (!this.form.subject) {
                this.$set(this.errors, 'subject', true);
                hasError = true;
            }
            if (!this.form.deadline) {
                this.$set(this.errors, 'deadline', true);
                hasError = true;
            }
            if (!this.form.overview) {
                this.$set(this.errors, 'overview', true);
                hasError = true;
            }

            // 3. Stop jika error
            if (hasError) {
                window.scrollTo(0, 0);
                return;
            }
            
            // 4. Submit
            this.isSubmitting = true;
            console.log("SENDING COMMON RINGI:", JSON.parse(JSON.stringify(this.form)));
            alert("Validasi OK. Data siap dikirim ke server.");
            this.isSubmitting = false;
        }
    }
});