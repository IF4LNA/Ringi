/* js/detail.js - Logika Halaman Detail & Approval */

var app = new Vue({
    el: '#app',
    data: {
        // Simulasi Role User yang sedang login (bisa diganti lewat dropdown di UI)
        currentUserRole: 'approver', // 'applicant' atau 'approver'

        // Data Dokumen (Read Only)
        form: {
            doc_no: 'CT25121003',
            status: 0, // 0: Waiting, 1: Approved, 2: Rejected, 3: Withdrawn
            subject: '山田商事 (税務顧問契約)',
            applicant_name: '田中 美咲',
            applied_date: '2025-12-10',
            company_name: '山田商事 株式会社',
            amount: '300,000',
            contract_overview: '税務顧問契約の締結をお願いします。期間は来年1月から1年間です。',
        },

        // Data Approval Route (Siapa saja yang harus approve)
        approvalRoute: [
            { role: '上長 (Atasan)', name: '佐藤 健', date: '2025-12-10 14:00', statusText: '承認 (Approved)', statusColor: 'green' },
            { role: '経理 (Keuangan)', name: '鈴木 一郎', date: null, statusText: '未承認 (Pending)', statusColor: '#999' },
            { role: '社長 (Direktur)', name: '高橋 大輔', date: null, statusText: '-', statusColor: '#ccc' }
        ]
    },

    methods: {
        // Aksi APPROVE
        doApprove: function() {
            if(!confirm('本当に承認しますか？ (Apakah Anda yakin menyetujui?)')) return;

            // Simulasi Update Status
            this.form.status = 1; // Ubah jadi Approved
            
            // Update tabel route (Baris ke-2 yaitu user ini)
            this.approvalRoute[1].date = new Date().toLocaleString('ja-JP');
            this.approvalRoute[1].statusText = '承認 (Approved)';
            this.approvalRoute[1].statusColor = 'green';

            alert('承認しました (Disetujui)');
        },

        // Aksi REJECT
        doReject: function() {
            let reason = prompt('否認理由を入力してください (Masukkan alasan penolakan):');
            if (reason === null) return; // Cancel

            this.form.status = 2; // Ubah jadi Rejected
            
            this.approvalRoute[1].date = new Date().toLocaleString('ja-JP');
            this.approvalRoute[1].statusText = '否認 (Rejected)';
            this.approvalRoute[1].statusColor = 'red';

            alert('否認しました (Ditolak)');
        },

        // Aksi REMAND (Kembalikan ke pemohon)
        doRemand: function() {
            let reason = prompt('差戻し理由を入力してください (Masukkan alasan pengembalian):');
            if (reason === null) return;

            alert('申請者に差戻しました (Dikembalikan ke pemohon)');
            // Biasanya status kembali ke Draft atau status khusus Remand
            location.href = 'list.html';
        },

        // Aksi WITHDRAW (Tarik Kembali oleh Pemohon)
        doWithdraw: function() {
            if(!confirm('申請を取り下げますか？ (Tarik kembali pengajuan?)')) return;

            this.form.status = 3; // Withdrawn status
            alert('取下げました (Ditarik)');
        }
    }
});