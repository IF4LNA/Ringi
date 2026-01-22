/* js/contract_form.js */

var app = new Vue({
    el: '#app',
    data: {
        form: {
            // --- HEADER ---
            doc_type: 'contract',
            contract_category: 'tax', 
            subject: '',
            applied_date: new Date().toISOString().slice(0, 10),

            // --- INFO PERUSAHAAN ---
            corp_type: '1', 
            company_name: '',
            company_kana: '',
            establishment_date: '',
            capital: '',
            
            // --- INFO PAJAK & INDUSTRI ---
            industry_name: '',
            closing_month: 3, 
            declaration_type: 'blue',
            tax_office_name: '',
            tax_number: '',
            
            // --- ALAMAT ---
            zip1: '',
            zip2: '',
            address: '',
            address2: '',
            tel1: '',
            tel2: '',
            tel3: '',

            // --- PERWAKILAN ---
            rep_name: '',
            rep_kana: '',
            rep_title: '1', 
            rep_birth: '',
            rep_address: '',
            rep_tel: '',
            rep_tel_none: false,

            // --- KEUANGAN ---
            fin_assets: '',
            fin_sales: '',
            fin_profit: '',
            fin_workers: '',
            consumption_tax: '1', 
            accounting_soft: '1', 

            // --- KONTRAK ---
            contract_type: '1', 
            fee_accounting: '',
            fee_tax: '',
            start_date: '',
            background: '',

            // --- FILES ---
            file_estimate: null
        },
        isSubmitting: false
    },

    computed: {
        isCorporate: function() {
            return this.form.corp_type === '1';
        }
    },

    mounted: function() {
        if ($.fn.autoKana) {
            $.fn.autoKana('#company_name', '#company_kana', { katakana: true });
        }
    },

    methods: {
        searchAddress: function() {
            AjaxZip3.zip2addr('zip1', 'zip2', 'address', 'address');
        },

        formatFee: function(field, event) {
            let val = event.target.value.replace(/[^0-9]/g, '');
            if(val) {
                this.form[field] = new Intl.NumberFormat('ja-JP').format(val);
            } else {
                this.form[field] = '';
            }
            this.$forceUpdate();
        },

        handleFileUpload: function(event, fieldName) {
            this.form[fieldName] = event.target.files[0];
        },

        submitForm: function() {
            if (!this.form.subject) return alert('件名 (Subjek) Wajib diisi');
            if (!this.form.company_name) return alert('商号 (Nama Perusahaan) Wajib diisi');
            if (!this.form.tax_office_name) return alert('管轄税務署 (Kantor Pajak) Wajib diisi');

            this.isSubmitting = true;
            
            console.log("SENDING DATA:", JSON.parse(JSON.stringify(this.form)));
            alert("Validasi OK. Data siap dikirim ke server.");
            
            this.isSubmitting = false;
        }
    }
});