/* js/list.js */

var app = new Vue({
  el: "#app",
  data: {
    currentTab: "all",
    filters: {
      date_start: "", // Kosongkan default agar menampilkan semua dulu
      date_end: "",
      form_type: "",
      keyword: "",
    },
    // DATA DUMMY
    items: [
      {
        id: "W251204002",
        form_name: "休日出勤申請",
        applicant: "細貝 悠斗",
        date: "2025.12.04",
        subject: "2025.12.14 休日出勤",
        status: 1,
        statusText: "承認済",
      },
      {
        id: "W251205005",
        form_name: "休日出勤申請",
        applicant: "佐藤 健",
        date: "2025.12.05",
        subject: "2025.12.20 プロジェクト対応",
        status: 9,
        statusText: "承認待ち",
      },
      {
        id: "C251210003",
        form_name: "契約稟議",
        applicant: "鈴木 一郎",
        date: "2025.12.10",
        subject: "株式会社テック (新規契約)",
        status: 9,
        statusText: "承認待ち",
      },
      {
        id: "A251120001",
        form_name: "通常稟議",
        applicant: "田中 美咲",
        date: "2025.11.20",
        subject: "PCモニター購入",
        status: 1,
        statusText: "承認済",
      },
      {
        id: "W251201001",
        form_name: "休日出勤申請",
        applicant: "高橋 大輔",
        date: "2025.12.01",
        subject: "2025.12.07 休日出勤",
        status: 2,
        statusText: "否認",
      },
    ],
  },
  computed: {
    filteredList: function () {
      // 1. FILTERING
      let result = this.items.filter((item) => {
        // A. Filter Tab Status
        if (this.currentTab === "waiting" && item.status !== 0 && item.status !== 9) return false;
        if (this.currentTab === "approved" && item.status !== 1) return false;
        if (this.currentTab === "rejected" && item.status !== 2 && item.status !== 3) return false;
        if (this.currentTab === "action_needed" && item.status !== 9) return false;

        // B. Filter Tipe Form
        if (this.filters.form_type === "holiday" && item.form_name !== "休日出勤申請") return false;
        if (this.filters.form_type === "contract" && item.form_name !== "契約稟議") return false;

        // C. Filter Tanggal (Start - End) [FIXED]
        // Konversi "2025.12.04" (Data) menjadi "2025-12-04" (Format Input HTML)
        let itemDate = item.date.replace(/\./g, '-');
        
        if (this.filters.date_start && itemDate < this.filters.date_start) {
            return false;
        }
        if (this.filters.date_end && itemDate > this.filters.date_end) {
            return false;
        }

        // D. Filter Keyword
        if (this.filters.keyword) {
          const kw = this.filters.keyword.toLowerCase();
          const matchSubject = item.subject.toLowerCase().includes(kw);
          const matchName = item.applicant.toLowerCase().includes(kw);
          if (!matchSubject && !matchName) return false;
        }
        return true;
      });

      // 2. SORTING (Sesuai Spesifikasi)
      return result.sort((a, b) => {
        let dateA = new Date(a.date.replace(/\./g, "-"));
        let dateB = new Date(b.date.replace(/\./g, "-"));

        // Tab "Waiting" / "Action Needed": Ascending (Tugas lama di atas)
        if (this.currentTab === "waiting" || this.currentTab === "action_needed") {
          return dateA - dateB;
        }
        // Tab Lainnya: Descending (Terbaru di atas)
        return dateB - dateA;
      });
    },

    pendingCount: function () {
      return this.items.filter((i) => i.status === 9).length;
    },
  },
  methods: {
    doSearch: function () {
      console.log("Mencari dengan filter:", this.filters);
      // Karena filter otomatis via computed, tombol ini hanya trigger visual/log
    },
    resetFilters: function () {
      this.filters.date_start = "";
      this.filters.date_end = "";
      this.filters.form_type = "";
      this.filters.keyword = "";
    },
    // Helper untuk warna status text
    getStatusClass: function(status) {
        if(status === 1) return 'status-approved'; // Perlu CSS .status-approved { color: green; font-weight: bold; }
        if(status === 2) return 'status-rejected'; // Perlu CSS .status-rejected { color: red; font-weight: bold; }
        if(status === 9) return 'status-waiting';  // Perlu CSS .status-waiting { color: #f0ad4e; font-weight: bold; }
        return '';
    }
  },
});