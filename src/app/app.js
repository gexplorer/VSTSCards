export default {
    name: 'app',
    data() {
        return {
            config: false,
            bg: null,
            idIndex: null,
            typeIndex: null,
            titleIndex: null,
            effortIndex: null,
            zoom: true,
            columns: [],
            cards: []
        }
    },
    methods: {
        print(){
            this.closeConfig();
            window.print();
        },
        openConfig(){
            this.config = true;
        },
        closeConfig(){
            this.config = false;
            this.refresh();
        },
        refresh() {
            this.cards = [];
            this.$nextTick()
                .then(() => {
                    this.cards = this.bg.table.rows
                        .map(row => {
                            return {
                                id: row[this.idIndex],
                                type: row[this.typeIndex],
                                title: row[this.titleIndex],
                                effort: row[this.effortIndex],
                                hidden: false
                            }
                        });
                })
                .then(() => {
                    if (this.zoom) {
                        this.$refs.title.forEach(title => {
                            var $title = $(title);
                            var parentHeight = Math.floor($title.parent().height() * 0.9);
                            var parentWidth = Math.floor($title.parent().width());

                            var step = 3;
                            for (var font = 50; font > 10; font -= step) {
                                $title.css("font-size", font + "px");

                                if ($title.height() < parentHeight && $title.width() <= parentWidth) {
                                    $title.css("font-size", (--font) + "px");
                                    return;
                                }
                            }
                        });
                    }
                });
        },
        toggleCard(card) {
            card.hidden = !card.hidden;
        }
    },
    mounted() {
        this.bg = chrome.extension.getBackgroundPage();
        
        for (var c in this.bg.table.columns) {
            var column = {
                value: c,
                text: this.bg.table.columns[c]
            };
            this.columns.push(column);

            switch (column.text.toLowerCase()) {
                case "id":
                    this.idIndex = column.value;
                    break;
                case "work item type":
                    this.typeIndex = column.value;
                    break;
                case "title":
                    this.titleIndex = column.value;
                    break;
                case "effort":
                    this.effortIndex = column.value;
                    break;
            }
        }
        //$("#config").modal("show");
        this.openConfig();
    }
}