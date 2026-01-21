/* js/list.js - Logika Daftar Pengajuan */

var app = new Vue({
    el: '#app',
    data: {
        currentTab: 'all', // Tab aktif default
        filters: {
            type: 'all',
            keyword: ''
        },
        // DATA DUMMY (Simulasi dari Database)
        // Status Code: 0=Waiting, 1=Approved, 2=Rejected, 9=Need Action
        items: [
            {
                id: 'AR25120101',
                type: 'common',
                category: '物品購入',
                date: '2025/12/01',
                subject: 'PCモニター購入の件',
                deadline: '2025/12/10',
                amount: 45000,
                applicant: '佐藤 健',
                status: 1 // Approved
            },
            {
                id: 'CV25120502',
                type: 'contract',
                category: '取引先',
                date: '2025/12/05',
                subject: '株式会社テックソリューションズ (新規契約)',
                deadline: '2026/01/01',
                amount: 1200000,
                applicant: '鈴木 一郎',
                status: 9 // Need Action (Login user perlu approve)
            },
            {
                id: 'CT25121003',
                type: 'contract',
                category: '税務',
                date: '2025/12/10',
                subject: '山田商事 (税務顧問)',
                deadline: '2026/01/15',
                amount: 300000,
                applicant: '田中 美咲',
                status: 0 // Waiting
            },
            {
                id: 'AR25121504',
                type: 'common',
                category: '出張申請',
                date: '2025/12/15',
                subject: '大阪支店への出張について',
                deadline: '2025/12/20',
                amount: 25000,
                applicant: '佐藤 健',
                status: 2 // Rejected
            },
            {
                id: 'CO25121805',
                type: 'contract',
                category: 'その他顧客',
                date: '2025/12/18',
                subject: '合同会社未来デザイン',
                deadline: '2026/02/01',
                amount: 500000,
                applicant: '鈴木 一郎',
                status: 9 // Need Action
            }
        ]
    },
    computed: {
        // Logika Filter Utama
        filteredList: function() {
            return this.items.filter(item => {
                // 1. Filter Tab
                if (this.currentTab === 'waiting' && item.status !== 0) return false;
                if (this.currentTab === 'approved' && item.status !== 1) return false;
                if (this.currentTab === 'rejected' && item.status !== 2) return false;
                if (this.currentTab === 'action_needed' && item.status !== 9) return false;

                // 2. Filter Tipe Ringi
                if (this.filters.type !== 'all' && item.type !== this.filters.type) return false;

                // 3. Filter Keyword (Subject atau Nama)
                if (this.filters.keyword) {
                    const kw = this.filters.keyword.toLowerCase();
                    return item.subject.toLowerCase().includes(kw) || 
                           item.applicant.toLowerCase().includes(kw);
                }

                return true;
            }).map(item => {
                // Mapping properti tambahan untuk tampilan
                return {
                    ...item,
                    statusText: this.getStatusText(item.status),
                    statusClass: this.getStatusClass(item.status)
                };
            }).sort((a, b) => {
                // Sort Logic [cite: 94-101]
                // Waiting/Need Action: Oldest -> Newest
                if (this.currentTab === 'waiting' || this.currentTab === 'action_needed') {
                    return new Date(a.date) - new Date(b.date);
                }
                // Others: Newest -> Oldest
                return new Date(b.date) - new Date(a.date);
            });
        },
        
        // Hitung jumlah badge untuk tab "Perlu Aksi"
        pendingCount: function() {
            return this.items.filter(i => i.status === 9).length;
        }
    },
    methods: {
        formatCurrency: function(value) {
            if (!value) return '-';
            return '¥ ' + new Intl.NumberFormat('ja-JP').format(value);
        },
        resetFilters: function() {
            this.filters.type = 'all';
            this.filters.keyword = '';
        },
        getStatusText: function(status) {
            switch(status) {
                case 0: return '承認待ち';
                case 1: return '承認済み';
                case 2: return '否認';
                case 9: return '要承認'; // Anda harus approve ini
                default: return '-';
            }
        },
        getStatusClass: function(status) {
            switch(status) {
                case 0: return 'status-waiting';
                case 1: return 'status-approved';
                case 2: return 'status-rejected';
                case 9: return 'status-action';
                default: return '';
            }
        }
    }
});