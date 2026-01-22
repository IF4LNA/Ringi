var app = new Vue({
  el: "#app",
  data: {
    currentTab: "all",
    filters: {
      date_start: "2025-11-16",
      date_end: "",
      form_type: "",
      keyword: "",
    },
    // DATA DUMMY (Tetap sama)
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
        // Filter Tab
        if (
          this.currentTab === "waiting" &&
          item.status !== 0 &&
          item.status !== 9
        )
          return false;
        if (this.currentTab === "approved" && item.status !== 1) return false;
        if (this.currentTab === "rejected" && item.status !== 2) return false;
        if (this.currentTab === "action_needed" && item.status !== 9)
          return false;

        // Filter Search
        if (
          this.filters.form_type === "holiday" &&
          item.form_name !== "休日出勤申請"
        )
          return false;
        if (
          this.filters.form_type === "contract" &&
          item.form_name !== "契約稟議"
        )
          return false;
        if (this.filters.keyword) {
          const kw = this.filters.keyword.toLowerCase();
          const matchSubject = item.subject.toLowerCase().includes(kw);
          const matchName = item.applicant.toLowerCase().includes(kw);
          if (!matchSubject && !matchName) return false;
        }
        return true;
      });

      // 2. SORTING (Sesuai Spesifikasi PDF Hal. 11)
      return result.sort((a, b) => {
        // Ubah format tanggal "YYYY.MM.DD" jadi Date Object
        let dateA = new Date(a.date.replace(/\./g, "-"));
        let dateB = new Date(b.date.replace(/\./g, "-"));

        // Jika Tab "Waiting" atau "Need Action": Urutkan TUA -> MUDA (Ascending)
        if (
          this.currentTab === "waiting" ||
          this.currentTab === "action_needed"
        ) {
          return dateA - dateB;
        }

        // Tab Lainnya (All, Approved, Rejected): Urutkan MUDA -> TUA (Descending)
        return dateB - dateA;
      });
    },

    pendingCount: function () {
      return this.items.filter((i) => i.status === 9).length;
    },
  },
  methods: {
    doSearch: function () {
      console.log("Searching...");
    },
    resetFilters: function () {
      this.filters.form_type = "";
      this.filters.keyword = "";
    },
  },
});
